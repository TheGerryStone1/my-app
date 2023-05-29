import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {  
    try {
        const list = await prisma.lista.findMany();
        const listData = list.map((element) => {
            return {value: element.id, label: element.producto, cantidad: element.cantidad, unidad: element.unidad, precio: element.precio}
        });

        const response = {
            elements: listData
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