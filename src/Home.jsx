import React from 'react';
// import  { useEffect }from 'react';
import  { useState } from 'react';
import  axios from 'axios';
import './style.css';
function Home() {
  const [data, setData] = useState({
    celcius :10,
    name : "London",
    humidity: 10,
    speed :2, 
    image: '/images/cloud.png'
  })
  const [name, setName] = useState('');
  const [error, setError] = useState('');
    const handleClick = () =>{
      if(name !== ''){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8c05e9feb5b8f7f09ea30ed53f1984e1&units=metric`;
      axios.get(apiUrl)
      .then (res =>{
        let imagepath = '';
         if(res.data.weather[0].main == "cloud"){
           imagepath = "/images/cloud.png"
         }else if(res.data.weather[0].main == "Clear"){
          imagepath = "/images/Clear.png"
         }else if(res.data.weather[0].main == "Rain"){
          imagepath = "/images/Rain.webp"
         }else if(res.data.weather[0].main == "Drizzle"){
          imagepath = "/images/Drizzle.webp"
         }else if(res.data.weather[0].main == "Mist"){
          imagepath = "/images/Mist.png"
         } else {
             imagepath = "/images/cloud.png"
         }
        setData ({...data, celcius: res.data.main.temp, name: res.data.name,
           humidity: res.data.main.humidity, speed: res.data.wind.speed,
          image: imagepath })
      })
      .catch (err =>{
            if(err.response.status == 404){
     setError("Invalid City Name")
            } else{
              setError('');
            }
        console.log (err)
      });
      }
    }

  return (
    <div className='container'>
     <div className="weather">
          <div className="search">
               <input type="text" placeholder='Enter City' onChange={e=> setName(e.target.value)} />
               <button> <img src="/images/search.png" alt="" onClick={handleClick} /></button>
          </div>
          <div className="error">
            <p>{error}</p>
          </div>
          <div className="winfo">
            <img src={data.image} alt="" className='icon' />
            <h1>{Math.round(data.celcius)}<sup>o</sup>C</h1>
            <h2>{data.name}</h2>
   <div className="details">
    <div className="col">
        <img src="https://thumbs.dreamstime.com/b/sea-wave-icon-illustrated-vector-white-background-sea-wave-icon-illustrated-vector-white-background-173996366.jpg" alt="" />
        <div className='humidity'>
          <p>{Math.round(data.humidity)}%</p>
          <p>Humidity</p>
        </div>
    </div>
    <div className="col">
    <img src="https://static.vecteezy.com/system/resources/previews/000/442/866/original/wind-vector-icon.jpg" alt="" />
        <div className='wind'>
          <p>{Math.round(data.speed)} km/h</p>
          <p>Wind</p>
        </div>
    </div>
   </div>

          </div>
     </div>
      
    </div>
  )
}

export default Home
