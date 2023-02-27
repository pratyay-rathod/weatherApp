import { React, useEffect, useState } from 'react';
import './App.css';
import Weather from './Components/Weather';

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
      {
        latitude ?
          <Weather latitude={latitude} longitude={longitude} name="pratyay" /> :
          <p style={{ alignItems: "center" }}>Please Allow Location Access So I can Display Your city Weather</p>
      }
    </div>
  );
}

export default App;
