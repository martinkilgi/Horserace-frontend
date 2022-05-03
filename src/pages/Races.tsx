import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "../style/races.scss"

interface Race {
    id: number,
    location: String,
    time: String,
    finished: boolean
}

const Races: React.FC = () => {

    const [error, setError] = useState();
    const [races, setRaces] = useState<Race[]>([]);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/races").then((response) => {
            setRaces(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })
    }, [])

    const changeRoute = () => {
        let path = "/create";
        navigate(path);
    }

    const deleteRace = (raceId: number) => {
        axios.delete(`http://localhost:8080/api/race/delete/${raceId}`).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

        window.location.reload();
    }

    return(
        <div className="raceCont">
            <img src="./HorseRace-logos_transparent.png" width={180} height={180} />
            <div className="container">
                <h2>All races</h2>
                {races.length === 0 ? <h2>There aren't any races created yet</h2> : null}
                <div className="races">
                    {races.map((race) => {
                        const raceInfo = {
                            id: race.id,
                            location: race.location,
                            time: race.time,
                            finished: race.finished
                        }
                        return (
                            <div className="race">
                                <h3>Location: {race.location}</h3>
                                <h3>Time: {race.time}</h3>
                                {race.finished ? 
                                    <div className='horseButton finished'>
                                        Finished!
                                    </div> : 
                                    <div>
                                        <Link className="horseButton" to={{ pathname: "/horses"}} state={raceInfo}>
                                            Horses
                                        </Link> 
                                        <button className='deleteRaceButton' type="button" onClick={() => deleteRace(race.id)}>
                                            <img src='./close.png'/>
                                        </button>
                                    </div>
                                
                                }       
                            </div>
                        )
                    })}
                    <button type="button" onClick={changeRoute}>Create race</button>
                </div>
            </div>
        </div>
    )
}

export default Races;