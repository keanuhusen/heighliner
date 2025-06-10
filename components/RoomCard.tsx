import BookingForm from './BookingForm';

type Room = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
};

export default function RoomCard({ room }: { room: Room }) {
  return (
    <div className="border p-4 rounded shadow">
      {room.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={room.imageUrl} alt={room.name} className="mb-2" />
      )}
      <h3 className="font-bold text-lg">{room.name}</h3>
      <p className="mb-2">{room.description}</p>
      <p className="mb-2 font-semibold">${room.price / 100}</p>
      <BookingForm roomId={room.id} />
    </div>
  );
}
