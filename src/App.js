import {React,useEffect,useState} from 'react';
import './App.css';
import Weather from './Components/Weather';
import Clock from './Components/Clock';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  return (
    <div className="App">
      <Weather latitude={latitude} longitude={longitude}/>
    </div>
  );
}

export default App;
