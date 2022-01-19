import React, {ChangeEvent, useState} from 'react';
import 'bulma';
import './App.css';

interface Rank {
    name: string;
    points: number;
}

const ranks: Rank[] = [
    {name: "Rank 10", points: 4},
    {name: "Rank 9", points: 12},
    {name: "Rank 8", points: 24},
    {name: "Rank 7", points: 36},
    {name: "Rank 6", points: 45},
    {name: "Rank 5", points: 51},
    {name: "Rank 4", points: 60},
    {name: "Rank 3", points: 67},
    {name: "Rank 2", points: 72},
    {name: "Rank 1", points: 76}
]

const App = () => {
    const [gamesRemaining, setGamesRemaining] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);

    const handleGamesRemaining = (event: ChangeEvent<HTMLInputElement>): void => {
        setGamesRemaining(parseInt(event.target.value));
    };

    const handlePointsChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPoints(parseInt(event.target.value));
    };

    const isPossible = (rank: Rank): boolean => roundedWins(rank) > gamesRemaining;

    const roundedWins = (rank: Rank): number => Math.round((rank.points - points) / 4)

    return (
        <div className="container m-5">
            <h1 className="title has-text-centered">FUT Champions Calculator</h1>

            <div className="columns is-centered">
                <div className="column is-6 is-full-mobile">
                    <label htmlFor="played">Games Remaining</label>
                    <input name="played" id="played" className="input" type="number" value={gamesRemaining} max={20} onChange={handleGamesRemaining} />

                    <label htmlFor="points">Points</label>
                    <input name="points" id="points" className="input" type="number" value={points} onChange={handlePointsChange}/>

                    <div className="has-text-centered mt-5">
                    {ranks.map((rank: Rank) => {
                        return (
                            <>
                                {roundedWins(rank) > 0 &&
                                <p key={rank.name} className={isPossible(rank) ? "has-text-danger" : "has-text-success"}>
                                    <b>{rank.name} -</b> wins needed: {roundedWins(rank)}</p>
                                }
                            </>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
