import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const hotels = await prisma.hotel.findMany();
    return res.json(hotels);
  }

  if (req.method === 'POST') {
    const userId = requireUser(req);
    const { name, slug } = req.body;
    const hotel = await prisma.hotel.create({
      data: { name, slug, users: { connect: { id: userId } } },
    });
    return res.status(201).json(hotel);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
