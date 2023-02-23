import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSun } from 'react-icons/fa';
import { BsWind, BsCalendarDay } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faCloudShowersHeavy, faSnowflake, faBolt, faSmog, faWind } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Weather = ({latitude,longitude}) => {

    // const [Weather,setWeather] = useState(["chakde"]);
    const [time, setTime] = useState(new Date());
    const Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [mainData,setMainData] = useState(null);
    const[weatherCode,setWeatherCode] = useState(null);
    const[weatherName,setWeatherName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/');
                
                setMainData(response.data);

                const data = response.data;
                setWeatherCode(data.weather[0].icon);
                setWeatherName(data.weather[0].description)
            
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    function getWeatherIcon(code) {
        switch (code) {
          case "01d":
          case "01n":
            return faSun;
          case "02d":
          case "02n":
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            return faCloud;
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            return faCloudShowersHeavy;
          case "11d":
          case "11n":
            return faBolt;
          case "13d":
          case "13n":
            return faSnowflake;
          case "50d":
          case "50n":
            return faSmog;
          case "50d":
          case "50n":
            return faWind;
          default:
            return faSun;
        }
      }

    const currentHour = time.getHours();
    const currentMinute = time.getMinutes();
    const Today = Day[time.getDay()];
    const weatherIcon = getWeatherIcon(weatherCode);
    
    
    return (
        <Wrapper>
            <CityTime className='city-time'>
                <div className='city'>
                    Adalaj
                </div>
                <div className='time'>
                    {currentHour > 12 ? currentHour - 12 : currentHour} : {currentMinute < 10 ? '0' + currentMinute : currentMinute} : {currentHour > 12 ? 'PM' : 'AM'}
                </div>
            </CityTime>
            <WeatherInfo>

            </WeatherInfo>
            <div className='icon'>
                <FontAwesomeIcon icon={weatherIcon} style={{ color: "yellow", height: "10rem", width: "5rem" }} />
            </div>
            <p style={{ marginTop: "-2rem" }}>{weatherName}</p>
            <Info>
                <div className='info' style={{ paddingLeft: "-10" }}>
                    {mainData ? (
                        <p><BsWind /> {mainData.wind.speed} km/h</p>
                    ) : (
                        <p></p>
                    )}
                    <p><BsCalendarDay /> {Today} </p>
                    {mainData ? (
                        <p><WiHumidity /> {mainData.main.humidity} %</p>
                    ) : (
                        <p></p>
                    )}
                </div>
                <div className='temp'>
                    {mainData ? (
                        <p className='temp_num'>{mainData.main.temp - 273.15}°</p>
                    ) : (
                        <p></p>
                    )}
                </div>
            </Info>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:20rem;
    height:auto;
    padding:2rem 0rem 0.5rem 0rem;
    background-color: #354249; 
    border-radius:1rem;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const CityTime = styled.div`
    display:flex;
    justify-content: space-around;

    .city{
        background-color: #303A40;
        padding:0.5rem;
        font-size:22px;
        border-radius:0.5rem;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .time{
        padding:0.5rem;
        font-size:22px;
    }
`;

const Info = styled.div`
    margin-top: 2rem;
    display:flex;
    justify-content: space-around;
    .temp_num{
        margin-top: 1.5rem;
        font-size: 4.0rem;
    }
`;

const WeatherInfo = styled.div`
    margin:1.0rem 0rem;
`;
export default Weather
