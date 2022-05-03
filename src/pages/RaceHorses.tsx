import React, { useEffect, useRef, useState } from "react";
import "../style/raceHorses.scss";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export interface Horse {
    id: number,
    name: String,
    color: String,
    runTime: String,
    betOn: boolean,
    winner: boolean 
}

const RaceHorses: React.FC = (props: any) => {

    const [name, setName] = useState<String>("");
    const [color, setColor] = useState<String>("");
    const [error, setError] = useState();
    const [horses, setHorses] = useState<Horse[]>([]);
    const [bet, setBet] = useState<number>(0);
    const [betSubmitted, setBetSubmitted] = useState<boolean>(false);

    const raceDataRef: any = useRef({
        race: undefined,
        horses: []
    });

    const location = useLocation();
    const state: any = location.state;

    useEffect(() => {
        axios.get("http://localhost:8080/api/horsesbyrace", {
            params: {
                raceid: state.id
            }
        }).then((response) => {
            setHorses(response.data);
            raceDataRef.current.horses = response.data;
            raceDataRef.current.race = state;
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })

    }, [state])

    
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (name != "" && color != "") {
            axios.post("http://localhost:8080/api/horse/save", {
                name: name,
                color: color,
                race: state
            }).then((response) => {
                console.log(response.data);
            }).catch((err) => {
                const error = err.response.data.error;
                console.log(error);
                setError(error);
            })

            window.location.reload();
        } else {
            toast.error('Check your inputs and try again!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const submitBet = () => {

        for (let i = 0; i < horses.length; i++) {
            if (horses[i].id === bet) {
                horses[i].betOn = true;
            } else {
                horses[i].betOn = false;
            }
        }

        toast.success('Bet placed!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setBetSubmitted(true);
    }

    const handleStartRace = () => {
        axios.put("http://localhost:8080/api/race/update", {
            id: state.id,
            location: state.location,
            time: state.time,
            finished: true
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            const error = err.response.data.error;
            console.log(error);
            setError(error);
        })
    }

    return (
        <>
            <h1>Add horses</h1>
            <div className="raceContainer">
                <div className="raceInfo">
                    <h2>{state.location}</h2>
                    <h2>{state.time}</h2>  
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={e => {setName(e.currentTarget.value)}}/>
                    </label>
                    <label>
                        Color:
                        <input type="text" name="color" onChange={e => {setColor(e.currentTarget.value)}}/>
                    </label>

                    <button type="submit" value="Create">Add horse</button>
                </form>

                <div>
                    {horses.length === 0 ? <h2>There aren't any horses registered to this race yet</h2> : null}
                </div>
        
                <div className="horses">
                    {horses.map((horse: Horse) => {
                        return (
                            <div className="horse">
                                <h3>{horse.id}</h3>
                                <h3>{horse.name}</h3>
                                <h3>{horse.color}</h3>
                            </div>
                        )
                    })}
                </div>
                {horses.length !== 0 ? 
                    <div className="betRace">
                        {betSubmitted ? null : 
                            <div className="bet">
                                <h3>Enter a horse number that you would like to bet on</h3>
                                <input type="number" onChange={e => {setBet(parseInt(e.currentTarget.value))}}/>
                                <button onClick={submitBet}>Submit bet</button>
                            </div>
                        }

                        <Link to="/raceresults" state={raceDataRef} onClick={handleStartRace}>
                            Start race
                        </Link>
                    </div>
                    : null
                }
            </div>
        </>
    )
}

export default RaceHorses;