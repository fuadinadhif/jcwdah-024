import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma.js";
import type { UserCreateInput } from "../generated/prisma/models.js";
import { AppError } from "../utils/app-error.js";

export async function registerService(userInput: UserCreateInput) {
  console.log(userInput);

  function generateReferralCode(name: string) {
    return name.slice(0, 4) + String(Date.now()).slice(0, 4);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: userInput.email },
  });

  if (existingUser) {
    throw new AppError("Email already been used", 400);
  }

  const userData = await prisma.user.create({
    data: {
      email: userInput.email,
      name: userInput.name,
      password: await bcrypt.hash(userInput.password, 10),
      referralCode: generateReferralCode(userInput.name),
    },
  });

  return userData;
}

export async function loginService(userInput: {
  email: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: userInput.email },
  });

  if (!existingUser) {
    throw new AppError("User not found. Please register first", 404);
  }

  const isValidPassword = await bcrypt.compare(
    userInput.password,
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

  return accessToken;
}
