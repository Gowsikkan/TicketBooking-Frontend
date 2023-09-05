import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import emailjs from 'emailjs-com';
import photo from './photo.png';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation(props) {
  const [emailSent, setEmailSent] = useState(false);
  const history = useNavigate();

  
  // Retrieve data from session storage
  const keys = Object.keys(sessionStorage);
  const sessionData = {};

  keys.forEach(key => {
    sessionData[key] = sessionStorage.getItem(key);

  });
  console.log(sessionData)
  const email= sessionData['username']
  const movieName=sessionData['movieName']
  const showtime="10:00 AM"
  const theaterName=sessionData['theaterName']
  const totalCost=sessionData['totalCost']
  const seat=sessionData['selectedSeats']
  console.log('df',theaterName)

console.log(seat); 

  const qrCodeData = `Movie Name:${movieName}\nTheater: ${theaterName}\nShowtime: ${showtime}\nTotalCost: ${totalCost}`;



  const handleConfirm = async (e) => {
    e.preventDefault();

    // Use the base64-encoded image data for photo.png
    const base64data = photo.split(',')[1];

    // Include session data in the QR code
    
    const emailData = {
      to_email: email,
      seat,
      movieName,
      theaterName,
      showtime,
      attachments: [
        { name: 'photo.png', data: base64data },
      ],
    };

    try {
      const serviceID = 'service_9xlja9o';
      const templateID = 'template_9yn4jxb';
      const userID = 'y9EiYc3vqDB6Hm6RC';
      const response = await emailjs.send(
        serviceID,
        templateID,
        emailData,
        userID
      );

      console.log('Email sent!', response);
      setEmailSent(true);

      alert('Booking confirmed, returning to homepage');
      history('/home');
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  return (
    
    <div className='container'>
      <h1>Booking Confirmation</h1>
      <div>
        <h2>Movie Details:</h2>
        <h2>Movie Name: {movieName}</h2>
        <h2>Theater: {theaterName}</h2>
        <h2>Showtime: {showtime}</h2>
        <h2>TotalCost: {totalCost}</h2>
        
      </div>
      <div>
        <h2>QR Code:</h2>
        <QRCode value={qrCodeData} /> {/* Include session data in QR code */}
      </div>
      <br/>
      <br/> 
      {emailSent ? (
        <p>Email has been sent successfully!</p>
      ) : (
        <button className="button" onClick={handleConfirm}>Confirm</button>
      )}
    </div>
  );
}

export default Confirmation;
