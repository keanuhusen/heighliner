import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const room = await prisma.room.findUnique({ where: { id: id as string } });
    return res.json(room);
  }

  if (req.method === 'PUT') {
    requireUser(req);
    const { name, price } = req.body;
    const room = await prisma.room.update({
      where: { id: id as string },
      data: { name, price },
    });
    return res.json(room);
  }

  if (req.method === 'DELETE') {
    requireUser(req);
    await prisma.room.delete({ where: { id: id as string } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end('Method Not Allowed');
}
