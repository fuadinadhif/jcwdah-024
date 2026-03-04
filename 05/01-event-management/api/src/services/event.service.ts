import fs from "fs/promises";

import type { EventCreateInput } from "../generated/prisma/models.js";

import { cloudinary } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import { redis } from "../lib/redis.js";

/* ------------------------------ UPLOAD SINGLE ----------------------------- */
export async function createEventService(
  organizerId: number,
  data: EventCreateInput,
  file: Express.Multer.File,
) {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path);

    return await prisma.event.create({
      data: {
        ...data,
        image: uploadResult.secure_url,
        organizerId,
      },
    });
  } finally {
    await fs.unlink(file.path);
    await redis.del("events");
  }
}

/* ------------------------------ UPLOAD ARRAY ------------------------------ */
// export async function createEventService(
//   organizerId: number,
//   data: EventCreateInput,
//   files: Express.Multer.File[],
// ) {
//   try {
//     const uploadResult = await Promise.all(
//       files.map((file) => cloudinary.uploader.upload(file.path)),
//     );

//     const imageUrls = uploadResult.map((result) => result.secure_url);

//     const event = await prisma.$transaction(async (tx) => {
//       const newEvent = await tx.event.create({
//         data: {
//           organizerId,
//           title: data.title,
//           location: data.location,
//           price: data.price,
//         },
//       });

//       await tx.eventImage.createMany({
//         data: imageUrls.map((url) => ({ eventId: newEvent.id, url })),
//       });

//       return newEvent;
//     });

//     return event;
//   } finally {
//     await Promise.all(files.map((file) => fs.unlink(file.path)));
//   }
// }
