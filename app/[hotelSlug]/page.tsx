import { prisma } from '../../lib/prisma';
import RoomCard from '../../components/RoomCard';

export default async function HotelPage({ params }: { params: { hotelSlug: string } }) {
  const hotel = await prisma.hotel.findUnique({ where: { slug: params.hotelSlug } });
  const rooms = await prisma.room.findMany({ where: { hotelId: hotel?.id } });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{hotel?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
