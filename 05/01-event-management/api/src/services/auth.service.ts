import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { loginSchema, registerSchema } from "../validations/auth.validation.js";

import { prisma } from "../lib/prisma.js";
import type { UserCreateInput } from "../generated/prisma/models.js";
import { AppError } from "../utils/app-error.js";
import { sendEmail } from "../utils/email.js";

export async function registerService(userInput: UserCreateInput) {
  function generateReferralCode(name: string) {
    return name.slice(0, 4) + String(Date.now()).slice(0, 4);
  }

  const parsedUserInput = registerSchema.parse({
    ...userInput,
    referralCode: generateReferralCode(userInput.name),
  });

  const existingUser = await prisma.user.findUnique({
    where: { email: parsedUserInput.email },
  });

  if (existingUser) {
    throw new AppError("Email already been used", 400);
  }

  const userData = await prisma.user.create({
    data: {
      email: parsedUserInput.email,
      name: parsedUserInput.name,
      password: await bcrypt.hash(parsedUserInput.password, 10),
      referralCode: parsedUserInput.referralCode,
    },
  });

  sendEmail({
    from: "onboarding@purwadhika.my.id",
    to: parsedUserInput.email,
    subject: "Welcome!",
    emailData: {
      name: parsedUserInput.name,
      referralCode: parsedUserInput.referralCode,
    },
    emailTemplate: "src/templates/emails/welcome.template.hbs",
  });

  return userData;
}

export async function loginService(userInput: {
  email: string;
  password: string;
}) {
  const parsedUserInput = loginSchema.parse(userInput);

  const existingUser = await prisma.user.findUnique({
    where: { email: parsedUserInput.email },
  });

  if (!existingUser) {
    throw new AppError("User not found. Please register first", 404);
  }

  const isValidPassword = await bcrypt.compare(
    parsedUserInput.password,
    existingUser.password,
  );

  if (!isValidPassword) {
    throw new AppError("Wrong password", 400);
  }

  const payload = {
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { accessToken, user: existingUser };
}
