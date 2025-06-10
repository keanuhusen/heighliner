import type { GetServerSideProps } from 'next';
import { prisma } from '../../lib/prisma';
import RoomCard from '../../components/RoomCard';

export default function HotelPage({ hotel, rooms }: any) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map((room: any) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const hotel = await prisma.hotel.findUnique({
    where: { slug: params?.hotelSlug as string },
  });
  const rooms = await prisma.room.findMany({
    where: { hotelId: hotel?.id },
  });
  return { props: { hotel, rooms } };
};
