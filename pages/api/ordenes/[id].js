import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
    // Istancia de conexion a la DB 
    const prisma = new PrismaClient();

    if (req.method === 'POST') {
        // req.query permite recuperar el id con el que se esta trabajando
        const { id } = req.query

        const ordenActualizada = await prisma.orden.update({
            where: {
                id: parseInt(id)
            },
            // Se especifica que es lo que se quiere actualizar
            data: {
                estado: true
            }
        })
        res.status(200).json(ordenActualizada)
    }
}