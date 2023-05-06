import { useState } from 'react';
import { TbMapSearch } from 'react-icons/tb';
import { TbSearch } from 'react-icons/tb';
import Header from './components/Header';
import DetailsCard from './components/DetailsCard';
import SummaryCard from './components/SummaryCard';

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [noData, setNoData] = useState('No Data Yet !')
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [city, setCity] = useState('Unknown Location !')
  const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`)

  const handleChange = input => {
    const {value} = input.target
    setSearchTerm(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather(searchTerm)
  }

  const getWeather = async (location) => {
    setWeatherData([])
    let how_to_search = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`

    try{
      let res = await fetch (`${process.env.REACT_APP_URL +how_to_search}
      &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`)
      let data = await res.json()
      if (data.cod != 200){
        setNoData('Location Not Found!')
        return
      }
      setWeatherData(data)
      setCity(`${data.city.name}, ${data.city.country}`)
      setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4px.png`)
    }catch (error){
      console.log(error)
    }
  }

  const myIp = (location) => {
    const {latitude, longitude} = location.coords
    getWeather([latitude, longitude])
  }
  
  return (
    <div className='container'>
        <div className='blur' style={{top: '-10%', right: '0'}}></div>
        <div className='blur' style={{top: '36%', left: '-6rem'}}></div>
        <div className='content'>
            <div className='form-container'>
                <div className='name'>
                    <div className='logo'>Derek- Weather App</div>
                    <div className='city'>
                      <TbMapSearch />
                      <p>{city}</p>
                    </div>
                </div>
                <div className='search'>
                  <h2>The Only Weather App You'll Ever Need</h2>
                  <hr />
                  <form className='search-bar' noValidate onSubmit={handleSubmit}>
                    <input type='text' placeholder='Search' onChange={handleChange} required />
                    <button>
                      <TbSearch 
                        onClick={() =>{
                          navigator.geolocation.getCurrentPosition(myIp)
                        }}
                      />
                    </button>
                  </form>
                </div>
            </div>
              <div className='info-container'>
                  <Header />
                  {weatherData.length === 0 ?
                    <div>
                      <div className='nodata'>
                        <h1>{noData}</h1>
                      </div>
                    </div>  :
                    <>
                      <h1>Today</h1>
                      <DetailsCard weather_icon={weatherIcon} data={weatherData} />
                      <h1 className='title'>More on {city}</h1>
                      <ul className='summary'>
                        {weatherData.list.map((days, index)=>{
                          if(index > 0){
                            return(< SummaryCard key={index} day={days} />)
                          }
                        })}
                      </ul>
                    </> 
                }
              </div>
            </div>
        </div>
  );
}

export default App;
