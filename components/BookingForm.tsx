import { useState } from 'react';

export default function BookingForm({ roomId }: { roomId: string }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const book = async () => {
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, startDate, endDate }),
    });
  };

  return (
    <div className="space-y-2">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2"
      />
      <button onClick={book} className="bg-blue-500 text-white px-4 py-2">
        Book
      </button>
    </div>
  );
}
