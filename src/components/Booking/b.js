import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';

const numRows = 5;
const numSeatsPerRow = 10;
const seatPrice = 100; // Price per seat
const maxSelectedSeats = 10; // Maximum number of seats that can be selected

function Booking() {
  const [seats, setSeats] = useState(() => {
    const initialSeats = [];
    for (let row = 0; row < numRows; row++) {
      const rowSeats = [];
      for (let seat = 0; seat < numSeatsPerRow; seat++) {
        rowSeats.push({ booked: false, seatNumber: seat + 1 });
      }
      initialSeats.push(rowSeats);
    }
    return initialSeats;
  });

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (rowIndex, seatIndex) => {
    const updatedSeats = [...seats];
    updatedSeats[rowIndex][seatIndex].booked = !updatedSeats[rowIndex][seatIndex].booked;

    const seat = updatedSeats[rowIndex][seatIndex];
    if (seat.booked) {
      if (selectedSeats.length < maxSelectedSeats) {
        setSelectedSeats([...selectedSeats, seat]);
        setSeats(updatedSeats);
      }
    } else {
      const updatedSelectedSeats = selectedSeats.filter(
        selectedSeat => selectedSeat !== seat
      );
      setSelectedSeats(updatedSelectedSeats);
      setSeats(updatedSeats);
    }
  };

  const totalCost = selectedSeats.length * seatPrice;

  return (
    <div className="theater">
      <h1>Movie Theater Seat Booking</h1>
      <div className="seat-container" icon={faCouch}>
        {seats.map((row, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            <div className="row-letter">{String.fromCharCode(65 + rowIndex)}</div>
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${seat.booked ? 'booked' : ''} ${
                  selectedSeats.includes(seat) ? 'selected' : ''
                }`}
                onClick={() => toggleSeat(rowIndex, seatIndex)}
              >
                <FontAwesomeIcon
                  icon={faCouch}
                  size="2x"
                  style={{
                    color: selectedSeats.includes(seat) ? '#e74c3c' : 'rgb(30,48,80)',
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="screen-view">
        <div className="screen-content">Screen View</div>
      </div>

      <button
        className="next-button"
        onClick={() =>
          alert(`Proceed to payment. Total Cost: ${totalCost} USD`)
        }
      >
        Next ({totalCost} USD)
      </button>
    </div>
  );
}

export default Booking;