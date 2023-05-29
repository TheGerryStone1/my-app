import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {  
  const { id } = req.body;
  const elementID = parseInt(id);
    try {
        const element = await prisma.lista.findUnique({where: { id: elementID },});
        const elementData = {
          value: element?.id,
          label: element?.producto,
          cantidad: element?.cantidad,
          unidad: element?.unidad,
          precio: element?.precio
        };

        const response = {
            elements: elementData
          };

        console.log(JSON.stringify(response));
        res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "An error occurred."})
  } finally {
    await prisma.$disconnect();
  }
}