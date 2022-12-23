import { PrismaClient } from "@prisma/client";

export default async function handle(req, res) {
    const prisma = new PrismaClient();

    // Obtener Ordenes Incompletas
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })
    res.status(200).json(ordenes);

    // Obtener Ordenes Completas
    // const ordenes = await prisma.orden.findMany({
    //     where: {
    //         estado: false
    //     }
    // })


    // Crear Ordenes
    if (req.method === 'POST') {
        const orden = await prisma.orden.create({
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha,
            },
        })
        console.log(req.body)
        res.status(200).json(orden); 
    }
}