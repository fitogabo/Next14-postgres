// app/lib/mapData.ts
'use server';

import { prisma } from '@/lib/prisma'; // Importa la instancia única de PrismaClient

export async function fetchReferencialesForMap() {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        id, 
        lat, 
        lng, 
        fojas, 
        numero, 
        anio, 
        cbr, 
        comprador, 
        vendedor, 
        predio, 
        comuna, 
        rol, 
        fechaescritura, 
        superficie, 
        monto, 
        observaciones, 
        userId
      FROM referenciales 
      WHERE lat IS NOT NULL AND lng IS NOT NULL
    `;

    if (!Array.isArray(data)) {
      throw new Error('La respuesta de la base de datos no es un arreglo.');
    }

    const leafletData = data.map(item => {
      return {
        ...item,
        latLng: [item.lat, item.lng] as [number, number],
        geom: [item.lng, item.lat],
        fechaescritura: item.fechaescritura ? new Date(item.fechaescritura).toISOString() : null,
      };
    });

    return leafletData;
  } catch (error) {
    console.error('Error al obtener datos para el mapa:', error);
    throw error;
  }
}