import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const hotel = await prisma.hotel.findUnique({ where: { id: id as string } });
    return res.json(hotel);
  }

  if (req.method === 'PUT') {
    requireUser(req);
    const { name, slug } = req.body;
    const hotel = await prisma.hotel.update({
      where: { id: id as string },
      data: { name, slug },
    });
    return res.json(hotel);
  }

  if (req.method === 'DELETE') {
    requireUser(req);
    await prisma.hotel.delete({ where: { id: id as string } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end('Method Not Allowed');
}
