import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { requireUser } from '../../../lib/auth';
import { stripe } from '../../../lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const bookings = await prisma.booking.findMany();
    return res.json(bookings);
  }

  if (req.method === 'POST') {
    const userId = requireUser(req);
    const { roomId, startDate, endDate } = req.body;
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).end('Room not found');

    const days =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      1000 /
      60 /
      60 /
      24;
    const total = room.price * days;

    // placeholder Stripe payment intent
    await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
    });

    const booking = await prisma.booking.create({
      data: {
        hotelId: room.hotelId,
        roomId,
        guestId: userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        total,
      },
    });
    return res.status(201).json(booking);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
