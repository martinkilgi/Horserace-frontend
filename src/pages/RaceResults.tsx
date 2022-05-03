import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "../style/raceResults.scss"

interface Horse {
    id: number,
    name: String,
    color: String,
    race: any,
    runTime: String,
    betOn: boolean,
    winner: boolean 
}

const RaceResults: React.FC = () => {

    const [scoresLoaded, setScoresLoaded] = useState(false);
    const [minScore, setMinScore] = useState(10.00);
    const [betWon, setBetWon] = useState(false);
    const [error, setError] = useState();
    const horseRef = useRef<Horse[]>([]);
    const raceResultRef = useRef({
        race: undefined,
        horses: [],
        winnerHorse: 0
    })

    const location = useLocation();
    const state: any = location.state;


    useEffect(() => {
        let length = state.current.horses.length;
        let minScore = 10.00;

        for (let i = 0; i < length; i++) {
            state.current.horses[i].runTime = (Math.random() * (10.00 - 4.00) + 4.00).toFixed(2);
            if (state.current.horses[i].runTime < minScore) {
                minScore = state.current.horses[i].runTime;
            }
        }

        setMinScore(minScore);

        for (let i = 0; i < length; i++) {
            console.log(minScore);
            if (state.current.horses[i].runTime === minScore) {
                console.log("score", state.current.horses[i].id);
                state.current.horses[i].winner = true;
                raceResultRef.current.winnerHorse = state.current.horses[i].id;
            } else {
                state.current.horses[i].winner = false;
            }
        }

        for (let i = 0; i < length; i++) {
            if (state.current.horses[i].winner && state.current.horses[i].betOn) {
                setBetWon(true);
            }
        }

        raceResultRef.current.horses = state.current.horses;
        raceResultRef.current.race = state.current.race;

        setScoresLoaded(true);

        for (let i = 0; i < state.current.horses.length; i++) {
            let horse: Horse = {
                id: state.current.horses[i].id,
                name: state.current.horses[i].name,
                color: state.current.horses[i].color,
                race: state.current.horses[i].race,
                runTime: state.current.horses[i].runTime,
                winner: state.current.horses[i].winner,
                betOn: state.current.horses[i].betOn
            }

            horseRef.current.push(horse);
        }

        axios.put("http://localhost:8080/api/horse/alter", horseRef.current
        ).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })
        
        axios.post("http://localhost:8080/api/raceresult/save", {
            race: state.current.race,
            horses: state.current.horses,
            winnerHorse: raceResultRef.current.winnerHorse
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

    }, [state.current])

    return (
        <div className="resultsContainer">
            <h2>Test lause</h2>
            {betWon ? 
                <div>
                    <h1>Congratulations!</h1>
                    <h2>You won</h2>
                </div>
                :
                <div>
                    <h1>You lost your bet!</h1>
                    <h2>Unfortunately the horse you bet on wasn't the fastest</h2>
                </div>
            }
            {scoresLoaded ? 
            <div className="results">
                {state.current.horses.map((horse: Horse) => {
                    return (
                        <div style={{backgroundColor: horse.winner === true ? 'green' : '#b7b7a4', color: 'white'}} className="horse">
                            <h2>{horse.id}</h2>
                            <h2>{horse.name}</h2>
                            <h2>{horse.color}</h2>
                            <h4>{horse.runTime} sec</h4>
                        </div>
                    )
                })}
            </div> : null
            }
        </div>

    );
}

export default RaceResults;