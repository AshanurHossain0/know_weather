import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faCloud, faStreetView, faSmog,faMoon} from '@fortawesome/free-solid-svg-icons'
import { getData } from "../scripts/script.js";
function Home() {
    let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const [data, setData] = useState({});
    const [town, setTown] = useState("Siliguri");
    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const day=days[new Date().getDay()];
    setInterval(() => {
        setTime(new Date().toLocaleTimeString())
    }, 1000)

    useEffect(() => {
        getData(town)
            .then((response) => {
                setData(response);
                console.log(response);
            })
            .catch((err) => console.log(err));
    }, [town]);
    return (
        <>
            {(Object.keys(data).length !== 0) ? (

                <div className="cont">
                    <div className="search">
                        <input type="text" placeholder="City Name" onChange={(e)=>{setTown(e.target.value)}} />
                    </div>
                    <div className="box">

                        <div id="weather-con">
                            {(new Date().getHours>18 || new Date().getHours<4) 
                                ?(<FontAwesomeIcon id="icon" style={{ color: "#ff7700fe" }} icon={faMoon} />)
                                : (data.data.weather[0].main === "Clear")?(<FontAwesomeIcon id="icon" style={{ color: "#ff7700fe" }} icon={faSun} />)
                                : (data.data.weather[0].main === "Clouds") ? (<FontAwesomeIcon id="icon" style={{ color: "#8b9393" }} icon={faCloud} />)
                                : (data.data.weather[0].main === "Rain") ? (<FontAwesomeIcon id="icon" style={{ color: "white" }} icon={faCloudRain} />)
                                : (data.data.weather[0].main === "Haze") ? (<FontAwesomeIcon id="icon" style={{ color: "grey" }} icon={faSmog} />)
                                : (<FontAwesomeIcon id="icon" style={{ color: "#ff7700fe" }} icon={faSun} />)
                            }
                            <p style={{ fontSize: "1rem" }}>{data.data.weather[0].main}</p>
                        </div>
                        <div className="info">
                            <h2 className="location"> <FontAwesomeIcon icon={faStreetView} /> {data.data.name} , India </h2>
                            <p id="date">{new Date().toLocaleDateString()} {day} , {new Date().toLocaleTimeString()}</p>
                            <h1 className="temp">{(data.data.main.temp - 273).toFixed(2)}°C</h1>
                            <h3 className="temp-min-max">Min {(data.data.main.temp_min - 273).toFixed(2)}°C | Max {(data.data.main.temp_max - 273).toFixed(2)}°C</h3>
                        </div>
                        <div className="developer">
                            <p>Developed by ~Ashanur</p>
                        </div>
                    </div>
                </div>
            ) : (<div><h3>Loading...</h3></div>)}
        </>
    )
}
export default Home;