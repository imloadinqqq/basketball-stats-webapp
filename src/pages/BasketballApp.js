import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const nba = require('nba');
const teamInfo = require('nba/src/team-info');

function PlayerSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [player, setPlayer] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    teamInfo()
      .then((data) => {
        console.log("Team data fetched:", data); // Debugging the team data
        setTeamData(data);
	  })
		.catch((err) => setError('Failed to load team information'));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const searchedPlayer = nba.findPlayer(searchQuery);
      if (searchedPlayer) {
        setPlayer(searchedPlayer);
        getTeamName(searchedPlayer.teamId);
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
  
  //currently not working..
  const getTeamName = (teamId) => {
    if (!teamData) return 'Loading...'; // Show a loading message while data is being fetched
    const team = teamData.find((t) => t.teamId === teamId);
    return team ? team.teamName : 'Team not found'; // Return the team name or an error message
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
        <div>
          <p>{`${player.firstName} ${player.lastName} plays for the ${player.teamId} and wears number ${player.jersey}.`}</p>
        </div>
      ) : (
        !error && <p>Search for a player to see the info</p>
      )}

      <HomeButton />
    </div>
  );}

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


