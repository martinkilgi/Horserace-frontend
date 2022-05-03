import React, { useState, useEffect } from 'react';
import "../style/allResults.scss";
import axios from 'axios';
import { Horse } from './RaceHorses';

interface Race {
    id: number,
    location: String,
    time: String,
    finished: boolean
}

interface RaceResult {
    id: number,
    horses: Horse[],
    race: Race,
    winnerHorse: number 
}

const AllResults: React.FC = () => {
    const [error, setError] = useState();
    const [results, setResults] = useState<RaceResult[]>([]);
    const [activeIndex, setActiveIndex] = useState<any>(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/raceresults"
        ).then((response) => {
            if (response.data) {
                console.log(response.data);
                setResults(response.data);
            }
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })
    }, [])

    return (
        <div>
            <h2>All results</h2>
            {results.length === 0 ? 
            <h2>None of the races are finished yet!</h2> :
            <h2>Here you can browse all the race results</h2>}
            
            <div className="results">
                {results.map((result: any, index) => {
                    return (
                        <div className="result" key={index}>
                            <h3>{result.race.location}</h3>
                            <h4>{result.race.time}</h4>
                            <h4>Winning horse number: {result.winnerHorse}</h4>
                            <button className="infoButton" onClick={()=> setActiveIndex(activeIndex === index ? null : index)}>
                                {activeIndex === index ? <img src="./arrow-up.png" alt="down" height={40} width={40}/> : <img src="./arrow-down.png" alt="up" height={40} width={40}/>}
                            </button>
                            {activeIndex === index ? 
                            <div className="horseList">
                                {result.horses.map((horse: Horse) => {
                                    return (
                                        <div className='horseContainer' key={horse.id}>
                                            <div className="horseResult">
                                                <h2>{horse.id}</h2>
                                                <h2>{horse.name}</h2>
                                                <h2>{horse.runTime}</h2>
                                            </div>
                                            {horse.winner ? 
                                                <div className="crown">
                                                    <img src="./crown.png" alt="winner" height={40} width={40} />
                                                </div>
                                            : null}
                                            {horse.betOn ? 
                                                <div className="chip">
                                                    <img src="./casino-chip.png" alt="bet" height={40} width={40} />
                                                </div>
                                            : null}
                                        </div>
                                    )
                                })}
                            </div> : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllResults;