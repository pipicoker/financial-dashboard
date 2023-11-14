import React , {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import {  useDispatch } from 'react-redux';
import { db } from './config/firebase'

import { getDocs, collection } from 'firebase/firestore';
import './App.css';
import {Routes, Route,} from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Home from './Pages/Home';
// import Balances from './Pages/Balances';

import { setCardList} from './redux/balancesSlice'

const queryClient = new QueryClient()
function App() {
  const dispatch = useDispatch();

const cardListRef = collection(db, 'accounts');

// Function to get data from Firestore
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getDocs(cardListRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      dispatch(setCardList(filteredData));
    } catch (err) {
      console.error(err);
    }
  };

  fetchData(); // Call the fetchData function when the component mounts
}, [dispatch, cardListRef]);

  return (
    <QueryClientProvider client={queryClient}>
<div className="App ">
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/ForgotPassword" element={<ForgotPassword/>} />
      <Route path="/Home/*" element={<Home/>} />
      {/* <Route path="/Balances" element={<Balances />} /> */}
      </Routes>
          
    </div>
    </QueryClientProvider>
    
  );
}

export default App;
