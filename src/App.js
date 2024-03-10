import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getHost } from './services/hostService';
import BookingsTableV2 from './components/BookingsTableV2';
import BookingsTable from './components/BookingsTable';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import ButtonBar from './components/ButtonBar';
import Header from './components/Header';


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
  


  const [seasonalIncome, setSeasonalIncome] = useState([]);
  const [seasonalIncomeOneYear, setSeasonalIncomeOneYear] = useState([]);

  useEffect(() => {
      
      axios.get(`${getHost()}/api/v1/oneYearSeasonalIncomeData.json`).then((response) => {
        
        console.log(response.data);
        setSeasonalIncome(response.data);
        setSeasonalIncomeOneYear(response.data);
      });
  
    }, []);

  const [seasonalIncomeThreeYears, setSeasonalIncomeThreeYears] = useState([]);

  useEffect(() => {
        
        axios.get(`${getHost()}/api/v1/threeYearsSeasonalIncomeData.json`).then((response) => {
          
          setSeasonalIncomeThreeYears(response.data);
        });
    
      }, []);

    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {

      axios.get(`${getHost()}/api/v1/roomTypesData.json`).then((response) => {
          

        console.log(response.data);
          setRoomTypes(response.data);
        });

    }, []);


  const [stayingLengthData, setStayingLengthData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/stayingLengthData.json`, {}).then((response) => {
      const data = response.data;
      setStayingLengthData(data);
    });
  }, []);

  const [visitPurposeData, setVisitPurposeData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/visitPurposeData.json`, {}).then((response) => {
      const data = response.data;
      setVisitPurposeData(data);
    });
  }, []);

  const [visitorTypeData, setVisitorTypeData] = useState({});
  useEffect(() => {
    axios.get(`${getHost()}/api/v1/visitorTypeData.json`, {}).then((response) => {
      const data = response.data;
      console.log(data)
      setVisitorTypeData(data);
    });
  }, []);

  
  const handleChangeSeasonalIncome = (event) => {
    if(event.target.getAttribute("name") === "oneYear"){
      setSeasonalIncome(seasonalIncomeOneYear);
    }
    else {
      setSeasonalIncome(seasonalIncomeThreeYears);

    }
  
  }



  return (
    <div className="App">
      
      <Header>
        SeasonalIncome

        <ButtonBar managed slot='right' ontap={handleChangeSeasonalIncome}>
          <ef-button name="oneYear" toggles active>
            One Year
          </ef-button>
          <ef-button name="threeYear" toggles>
            Three Years
          </ef-button>

        </ButtonBar>


      </Header>
      <LineChart data={seasonalIncome} displayLegend yAxisLabel={"Income"} />

      <div className='grid grid-cols-2 gap-2' >

        <PieChart data={roomTypes} displayLegend yAxisLabel={"Room Types"} />
        <PieChart data={visitorTypeData} displayLegend yAxisLabel={"Visitor Type"} />
        <PieChart data={visitPurposeData} displayLegend yAxisLabel={"Visit Purpose"} />
        <PieChart data={stayingLengthData} displayLegend yAxisLabel={"Staying Length"} />


      </div>
      
      


      <BookingsTable bookings={bookings} />
    </div>


  );
}

export default App;
