import './App.css';
import { useEffect, useState } from 'react';
import TableComponent from './tableComponent';

const api = {
  key: "32071a8acde2f42a35059238075aea6b",
  base: "http://api.openweathermap.org/geo/1.0/",
  baseLatLang: "http://api.openweathermap.org/data/2.5/forecast",
  limit: 5
}

function App() {

  const [search, setSearch] = useState(" ")
  const [location, setLocation] = useState({})
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // console.log("Weather", weather)

  const searchHandler = (value) => {
    setSearch(value)
  }

  useEffect(() => {
    const langLatSearch = () => {
      fetch(`${api.baseLatLang}?lat=${location.lat}&lon=${location.lon}&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => { 
        const daywiselist = dateFilter(result)
        console.log(daywiselist)
        const daywise = fiveDaysData(daywiselist)
        setWeather(daywise);
    });
    }
    if(location.lat && location.lon ) {
      langLatSearch();
    }
    
  }, [location])

  const searchPressed = () => {
    setIsLoading(true)
    fetch(`${api.base}direct?q=${search}&limit=${api.limit}&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
       
      setLocation(result[0]);
      setIsLoading(false)
      });
  };

  const dateFilter = (data) => {
    let listofdays= []
    data.list.forEach((item => {
         let dt = item.dt_txt.split(" ")[0];
      if(!listofdays[dt]){
          listofdays[dt]= []
      }
      listofdays[dt].push(item)  
  }))
    return listofdays
  }

  const fiveDaysData = (data) => {
    const fivedays = []
    Object.keys(data).forEach(function tst(item){
      fivedays.push(data[item][0])
     })
     return fivedays
  }

  return (
    <div className="container">
      <h1>Weather in you city</h1>
      <div className='search'>
        <input type='text' value={search} onChange={(e) => searchHandler(e.target.value)}/>
        <button onClick={() => searchPressed()}>Search</button> <br />
        {isLoading ? 
        <i className="fa fa-spinner" aria-hidden="true"></i> : null}
      <div className='tableData'>
      <TableComponent weather={weather} />
      </div>
      </div>
    </div>
  );
}

export default App;
