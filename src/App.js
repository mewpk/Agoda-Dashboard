import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getHost } from './services/hostService';
import BookingsTableV2 from './components/BookingsTableV2';
import BookingsTable from './components/BookingsTable';

function App() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    axios.get(`${getHost()}/api/v1/booking.json`).then((response) => {

      setBookings(response.data.bookings);
    });

  }, []);

  const [guests, setGuests] = useState([]);

  useEffect(() => {

    axios.get(`${getHost()}/api/v1/guest.json`).then((response) => {

      setGuests(response.data.guests);
    });

  }, []);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    axios.get(`${getHost()}/api/v1/transaction.json`).then((response) => {

      setTransactions(response.data.transactions);
    });

  }, []);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {

    axios.get(`${getHost()}/api/v1/review.json`).then((response) => {

      const data = response.data.reviews;
      const list_score = data.map((review) => review.score);
      const total = list_score.reduce((a, b) => a + b, 0);
      setAverageRating(total / data.length);
      setReviews(data);
    });

  }, []);

  useEffect(() => {
    console.log(bookings)
    // console.log(guests)
    // console.log(transactions)
    // console.log(reviews)
    // console.log(averageRating)
  }
    , [bookings, guests, transactions, reviews, averageRating]);


  useEffect(() => {
    const rows = bookings.map((booking) => {
      const hasEqual = (record) => record.booking_id === booking.booking_id;
      const guestWithEuqalId = guests.find(hasEqual);
      const transactionWithEuqalId = transactions.find(hasEqual);
      const reviewWithEuqalId = reviews.find(hasEqual);

      return Object.assign({}, booking, guestWithEuqalId, transactionWithEuqalId, reviewWithEuqalId);

    });
    setBookings(rows);
  }, [guests, transactions, reviews])




  // booking
  // guest
  // transaction
  // review




  return (
    <div className="App">

      


      <BookingsTable bookings={bookings} />
    </div>


  );
}

export default App;
