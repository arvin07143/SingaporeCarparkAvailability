import logo from './logo.svg';
import './App.css';
import Parkings from './Parkings/Parkings';
import axios from "axios"
import { useEffect, useState } from 'react'


function App() {

  const [data, setData] = useState(null);


  const fetchData = () => {
    axios.get("http://localhost:4000/")
    .then((response) => {
      setData(response.data)
    })
    .catch(function(error){
      console.log(error.toJSON())
    })
  }

  useEffect(() => {
    fetchData();

    const intervalCall = setInterval(()=>{
      fetchData()
    },60000);
    return()=>{
      clearInterval(intervalCall)
    }
    
  }, []);

  if(!data) return null;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Parkings data={data} />
    </div>
  )
}

export default App;
