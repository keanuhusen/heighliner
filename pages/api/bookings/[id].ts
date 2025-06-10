import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const booking = await prisma.booking.findUnique({ where: { id: id as string } });
    return res.json(booking);
  }

  if (req.method === 'DELETE') {
    requireUser(req);
    await prisma.booking.delete({ where: { id: id as string } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).end('Method Not Allowed');
}
