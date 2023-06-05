import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faCloud, faStreetView } from '@fortawesome/free-solid-svg-icons'
import { getData } from "../scripts/script.js";
function Home() {

    const [data, setData] = useState({});
    const [town, setTown] = useState("Siliguri");
    const [time, setTime] = useState(new Date().toLocaleTimeString())
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
                            {(data.data.weather[0].main === "Clear") ? (<FontAwesomeIcon id="icon" style={{ color: "#ff7700fe" }} icon={faSun} />)
                                : (data.data.weather[0].main === "Clouds") ? (<FontAwesomeIcon id="icon" style={{ color: "#8b9393" }} icon={faCloud} />)
                                    : (data.data.weather[0].main === "Rain") ? (<FontAwesomeIcon id="icon" style={{ color: "white" }} icon={faCloudRain} />)
                                        : (<FontAwesomeIcon id="icon" style={{ color: "#ff7700fe" }} icon={faSun} />)
                            }
                            <p style={{ fontSize: "1rem" }}>{data.data.weather[0].main}</p>
                        </div>
                        <div className="info">
                            <h2 className="location"> <FontAwesomeIcon icon={faStreetView} /> {data.data.name} , India </h2>
                            <p id="date">{new Date().toLocaleDateString()} , {new Date().toLocaleTimeString()}</p>
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