import {NextApiRequest, NextApiResponse} from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler (req:any, res:any) {
  const { producto, cantidad, unidad, precio } = req.body;
  const productoStr = producto;
  const unidadStr = unidad;

  try {
    const newProduct = await prisma.lista.create({
      data: {
        producto: productoStr,
        cantidad: parseInt(cantidad),
        unidad: unidadStr,
        precio: parseInt(precio)
      }
    });
  res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  } finally {
    await prisma.$disconnect();
  }
}