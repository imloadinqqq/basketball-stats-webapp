import MyButton from './App.js'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const NBA = require('nba');

function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const searchedPlayer = NBA.findPlayer(searchQuery);
      if (searchedPlayer) {
        setPlayer(searchedPlayer);
        setError(null);
      } else {
        setError('Player not found');
        setPlayer(null); 
      }
    } catch (err) {
      setError('An error occurred while searching for the player');
      setPlayer(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter player name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {player ? (
        <p>
          {`${player.firstName} ${player.lastName} plays for the ${player.teamAbbreviation} and wears number ${player.jersey}.`}
        </p>
      ) : (
        !error && <p>Search for a player to see the info</p>
      )}
      <HomeButton />
    </div>

  );
}

function HomeButton() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={goToHome}>Go Back to Home Page</button>
    </div>
  );
}

export default PlayerSearch;


