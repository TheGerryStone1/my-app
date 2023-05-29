import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    const { id } = req.body;
    const elementID = parseInt(id);

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0

  try {
    const record = await prisma.lista.findUnique({ where: { id: elementID } });
    if (!record) {
      throw new Error(`Record with ID ${id} not found`);
    }

    const updatedRecord = await prisma.lista.delete({
      where: { id: elementID },
    });

    res.status(201).json("Roadmap info saved correctly");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Roadmap info not saved correctly" });
  } finally {
    await prisma.$disconnect();
  }
}