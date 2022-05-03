import React, {useState} from 'react';
import axios from "axios";
import "../style/createRace.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRace: React.FC = () => {

    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (location != "" && time != "") {
            axios.post("http://localhost:8080/api/race/save", {
                location: location,
                time: time 
            }).then((response) => {
                console.log(response.data);
                if (response.data) {
                    toast.success('Race created successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch((err) => {
                const error = err.response.data.error;
                console.log(error);
                setError(error);
            })
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

    return(
        <div className="container">
            <h2>Create race!</h2>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <label>
                        Race location:
                        <input type="text" name="location" onChange={e => {setLocation(e.currentTarget.value)}}/>
                    </label>

                    <label>
                        Race time:
                        <input type="text" name="time" onChange={e => {setTime(e.currentTarget.value)}}/>
                    </label>

                    <button type="submit" value="Create">Create</button>

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateRace;