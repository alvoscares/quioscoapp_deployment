import { PrismaClient } from "@prisma/client"

// estos api rutes siempre corren en el servidor 

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const productos = await prisma.producto.findMany()

  res.status(200).json(productos)
}
