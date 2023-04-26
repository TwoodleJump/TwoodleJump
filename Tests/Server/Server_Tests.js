const id = 9999999999
const route = 'http://localhost:3001'
const player1Name = "test"
const player2Name = "test2"

// SAVED GAMES DB
// Creates game with a Unique ID (POST)
async function create_unique_game(){
    const data = {
        "player1": player1Name,
        "player2": player2Name,
        "player1Wins": 0,
        "player2Wins": 0,
        "passcode": id,
      };
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    
      const response = await fetch(route + '/create_game', options);
      const status = response.status;
      return status;
}

// Creates game with already taken ID (POST)
async function create_common_game(){
    const data = {
        "player1": player1Name,
        "player2": player2Name,
        "player1Wins": 0,
        "player2Wins": 0,
        "passcode": id,
      };
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    
      const response = await fetch(route + '/create_game', options);
      const status = response.status;

      return status;
    return 4;

}

// Retrieves all games (GET)
async function retrieve_game(){
    const options = {
        method: 'GET'
    }
  
    const response = await fetch(route + '/games', options)

    return response.status;
}

// Updates score of game (PUT)
async function update_score(){
    const data = {"player1": player1Name, "player2": player2Name, "player1Wins": 1, "player2Wins": 2}
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    // Sends Post
    const response = await fetch(route + '/games/update/' + id, options);
    return response.status;
}

// Updates score of game that doesn't exist (PUT)
async function update_bad_score(){
    const data = {"player1": player1Name, "player2": player2Name, "player1Wins": 1, "player2Wins": 2}
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    // Sends Post
    const response = await fetch(route + '/games/update/' + (id + 1), options);

    return response.status;
}

// Deletes game (DELETE)
async function delete_game(){
    const options = {
        method: 'DELETE',
    }

    // Sends Post
    const response = await fetch(route + '/games/' + id, options);
    return response.status;
}

// Deletes game that doesn't exist (DELETE)
async function delete_bad_game(){
    const options = {
        method: 'DELETE',
    }

    // Sends Post
    const response = await fetch(route + '/games/' + (id + 1), options);
    return response.status;
}




// LEADERBOARD DB
// Creating new player
async function create_unique_player(){
    const data = {
        "player": player1Name,
        "numWins": 0
      };
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    
      const response = await fetch(route + '/create_player', options);
      const status = response.status;
      return status;
}

// Creating player that already exists
async function create_common_player(){
    const data = {
        "player": player1Name,
        "numWins": 0
      };
    
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
    
      const response = await fetch(route + '/create_player', options);
      const status = response.status;

      return status;
    return 4;

}

// Getting all players
async function retrieve_player(){
    const options = {
        method: 'GET'
    }
  
    const response = await fetch(route + '/players', options)

    return response.status;
}

// Updating player score
async function update_score_player(){
    const data = { "player": player1Name, "numWins": 1 };

    const options = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
    }

    const response = await fetch(route + '/players/update/' + player1Name, options);
    return response.status;
}

// Updating score of player that doesn't exist
async function update_bad_player_score(){
    const data = { "player": player2Name, "numWins": 1 };

    const options = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
    }

    const response = await fetch(route + '/players/update/' + player2Name, options);
    return response.status;
}

// Deleting player
async function delete_player(){
    const options = {
        method: 'DELETE',
    }

    // Sends Post
    const response = await fetch(route + '/players/delete/' + player1Name, options);
    return response.status;
}

// Deleting player that doesn't exist
async function delete_bad_player(){
    const options = {
        method: 'DELETE',
    }

    // Sends Post
    const response = await fetch(route + '/players/delete/' + player2Name, options);
    return response.status;
}

module.exports = {
    create_unique_game,
    create_common_game,
    retrieve_game,
    update_score,
    update_bad_score,
    delete_game,
    delete_bad_game,
    create_unique_player,
    create_common_player,
    retrieve_player,
    update_score_player,
    update_bad_player_score,
    delete_player,
    delete_bad_player
  };