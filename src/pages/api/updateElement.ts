import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    const { id, producto, cantidad, unidad, precio } = req.body;

    const elementID = parseInt(id);
    const productoStr = producto;
    const cantidadInt = cantidad;
    const unidadStr = unidad;
    const precioInt = precio;

  //TODO: ID FIJO PROVISIONAL MIENTRAS IMPLEMENTAMOS AUTH0
  try {
    const record = await prisma.lista.findUnique({ where: { id: elementID } });
    if (!record) {
      throw new Error(`Record with ID ${elementID} not found`);
    }

    const updatedRecord = await prisma.lista.update({
      where: { id: elementID },
      data: {
        producto: productoStr,
        cantidad: cantidadInt,
        unidad: unidadStr,
        precio: precioInt
      },
    });

    res.status(201).json("Roadmap info saved correctly");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Roadmap info not saved correctly" });
  } finally {
    await prisma.$disconnect();
  }
}
