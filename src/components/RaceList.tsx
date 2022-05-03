import React from "react";

interface RaceProps {
    races: [{
        location: String,
        time: String
    }]
}

const RaceList: React.FC<RaceProps> = (props: RaceProps) => {
    return (
        <div>
            {props.races.map(race => (
                <li>{race.location}</li>
            ))}
        </div>

    )
}

export default RaceList;