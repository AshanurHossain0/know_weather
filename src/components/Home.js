import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faStreetView } from '@fortawesome/free-solid-svg-icons'
import { getData } from "../scripts/script.js";
function Home() {

    const [data, setData] = useState({});
    const [town, setTown] = useState("Kolkata");

    useEffect(() => {
        getData(town)
            .then((response) => {
                setData(response);
            })
            .catch((err) => console.log(err));
    },[town]);
    return (
        <>
            {(Object.keys(data).length !==0)?(
                <div className="box">

                <div id="weather-con">
                    <FontAwesomeIcon id="icon" style={{ color: "#ff7700fe" }} icon={faSun} />
                </div>
                <div className="info">
                    <h2 className="location"> <FontAwesomeIcon icon={faStreetView} /> {data.data.name} , India </h2>
                    <p id="date">06 June 2023</p>
                    <h1 className="temp">38°C</h1>
                    <h3 className="temp-min-max">Min 30°C | Max 40°C</h3>
                </div>
                <div className="developer">
                    <p>Developed by ~Ashanur</p>
                </div>
            </div>
            ):(<div><h3>Loading...</h3></div>)}
        </>
    )
}
export default Home;