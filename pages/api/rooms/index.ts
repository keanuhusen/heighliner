import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const rooms = await prisma.room.findMany();
    return res.json(rooms);
  }

  if (req.method === 'POST') {
    requireUser(req);
    const { hotelId, name, price } = req.body;
    const room = await prisma.room.create({
      data: { hotelId, name, price },
    });
    return res.status(201).json(room);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
