import { PrismaClient } from "@prisma/client"

// estos api rutes siempre corren en el servidor 

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const categorias = await prisma.categoria.findMany({
    include: {
        productos: true,
    }
  })

  res.status(200).json(categorias)
}
