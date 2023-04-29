const { 
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
  } = require('./Server_Tests.js');


// SAVED GAMES DB
test('Creating Game', async () => {
    let returnCode = await create_unique_game()
    expect(returnCode).toBe(200);
    });


test('Creating game with already used ID', async () => {
    let returnCode = await create_common_game()

    expect(returnCode).toBe(409);
    });


test('Retrieving Saved Game Info', async () => {
    let returnCode = await retrieve_game()

    expect(returnCode).toBe(200);
    });


test('Updating score of game', async () => {
    let returnCode = await update_score()

    expect(returnCode).toBe(200);
    });


test('Updating score of game with ID that does not exist', async () => {
    let returnCode = await update_bad_score()
    expect(returnCode).toBe(404);
    });


test('Deleting game', async () => {
    let returnCode = await delete_game()

    expect(returnCode).toBe(200);
    });


test('Deleting game with ID that does not exist', async () => {
    let returnCode = await delete_bad_game()

    expect(returnCode).toBe(404);
    });




// LEADERBOARD DB
test('Creating Player', async () => {
    let returnCode = await create_unique_player()
    expect(returnCode).toBe(200);
    });


test('Creating Player with already used name', async () => {
    let returnCode = await create_common_player()

    expect(returnCode).toBe(409);
    });


test('Retrieving players', async () => {
    let returnCode = await retrieve_player()

    expect(returnCode).toBe(200);
    });


test('Updating player wins', async () => {
    let returnCode = await update_score_player()

    expect(returnCode).toBe(200);
    });


test('Updating player that is not in database', async () => {
    let returnCode = await update_bad_player_score()
    expect(returnCode).toBe(404);
    });


test('Deleting player', async () => {
    let returnCode = await delete_player()

    expect(returnCode).toBe(200);
    });


test('Deleting player that is not in database', async () => {
    let returnCode = await delete_bad_player()

    expect(returnCode).toBe(404);
    });