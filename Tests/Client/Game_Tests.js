// FUNCTIONS ARE MODIFIED FROM ORIGINAL FILE SO THAT THEY CAN BE TESTED
// WITHOUT EDITTING FUNCTIONS, THE ORIGINAL FUNCTIONS ARE UNTESTABLE

// FUNCTIONS RETURN VALUES AS IF THEY WERE BEING USED IN GAME
//     EXAMPLE:
//         In-game: Going right sets x velocity to 250
//         Test: Setting "right" to true in playerMoves() returns 250 from function

function playerMoves(left, right, up, touchingGround, superSpeed, superJump) {
    // Move left with no speed boost
    if (left && !superSpeed) {
        return -250;

    // Move right with no speed boost
    } else if (right  && !superSpeed) {
        return 250;

    // Move left with speed boost
    } else if (left && superSpeed) {
        return -450;
    // Move right with speed boost
    } else if (right  && superSpeed){
        return 450;
    // No Move
    }  else if (!left && !right && !up){
        return 0;
    }

    // Make sure that player is touching ground before they can jump
    if (up && touchingGround && !superJump) { 
        return -580;
    } else if (up && touchingGround && superJump){
        return -700;
    } else if (!touchingGround){
        return 0
    }
}

// Controls up down left right moves for player one
function playerMovesBackwards(left, right, up, touchingGround, superSpeed, superJump) {
    // Move left with no speed boost
    if (left && !superSpeed) {
        return 250;

    // Move right with no speed boost
    } else if (right  && !superSpeed) {
        return -250;

    // Move left with speed boost
    } else if (left && superSpeed) {
        return 450;
    // Move right with speed boost
    } else if (right  && superSpeed){
        return -450;
    // No Move
    }  else if (!left && !right && !up){
        return 0;
    }

    // Make sure that player is touching ground before they can jump
    if (up && touchingGround && !superJump) { 
        return -580;
    } else if (up && touchingGround && superJump){
        return -700;
    } else if (!touchingGround){
        return 0
    }       
}


// If a player walks off the edge of the map (horizontally), move them to the other side
function wrapPlayers(X) {
    if (X < 0){
        return 1280
    } else if (X > 1280) {
        return 0
    }
}

// Creates platforms
function createPlatforms(numOfPlatforms){
    platforms = []
    // Spawns 1000 tiles going up
    for( var i = 0; i < numOfPlatforms; i++){
        platforms.push("playform" + i);
    }

    return platforms.length
} 

module.exports = {
    playerMoves,
    playerMovesBackwards,
    wrapPlayers,
    createPlatforms
  };