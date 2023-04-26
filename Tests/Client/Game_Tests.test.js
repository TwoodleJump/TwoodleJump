const { 
    playerMoves,
    playerMovesBackwards,
    wrapPlayers,
    createPlatforms
  } = require('./Game_Tests.js');

// Test movements (w/o reversed powerup)
test('Going left: no superspeed', async () => {
  expect(playerMoves(true, false, false, true, false, false)).toBe(-250);
  });

test('Going Left: superspeed', async () => {
  expect(playerMoves(true, false, false, true, true, false)).toBe(-450);
  });


test('Going right: no superspeed', async () => {
  expect(playerMoves(false, true, false, true, false, false)).toBe(250);
  });

test('Going right: superspeed', async () => {
  expect(playerMoves(false, true, false, true, true, false)).toBe(450);
  });

test('Jumping: no superjump', async () => {
  expect(playerMoves(false, false, true, true, false, false)).toBe(-580);
  });

test('Jumping: superjump', async () => {
  expect(playerMoves(false, false, true, true, false, true)).toBe(-700);
  });

test('Jumping: not on ground', async () => {
  expect(playerMoves(false, false, true, false, false, true)).toBe(0);
  });

test('No movement', async () => {
  expect(playerMoves(false, false, false, false, false, false)).toBe(0);
  });




// Test movements (with reversed powerup)
test('Going left REVERSED: no superspeed', async () => {
  expect(playerMovesBackwards(true, false, false, true, false, false)).toBe(250);
  });


test('Going Left REVERSED: superspeed', async () => {
  expect(playerMovesBackwards(true, false, false, true, true, false)).toBe(450);
  });


test('Going right REVERSED: no superspeed', async () => {
  expect(playerMovesBackwards(false, true, false, true, false, false)).toBe(-250);
  });


test('Going right REVERSED: superspeed', async () => {
  expect(playerMovesBackwards(false, true, false, true, true, false)).toBe(-450);
  });

test('Jumping REVERSED: no superjump', async () => {
  expect(playerMovesBackwards(false, false, true, true, false, false)).toBe(-580);
  });

test('Jumping REVERSED: superjump', async () => {
  expect(playerMovesBackwards(false, false, true, true, false, true)).toBe(-700);
  });

test('Jumping REVERSED: not on ground', async () => {
  expect(playerMovesBackwards(false, false, true, false, false, true)).toBe(0);
  });

test('No movement REVERSED', async () => {
  expect(playerMovesBackwards(false, false, false, false, false, false)).toBe(0);
  });




// Test character wrapping
test('Wrap players: player goes off right side of screen', async () => {
  expect(wrapPlayers(-1)).toBe(1280);
  });

test('Wrap players: player goes off left side of screen', async () => {
  expect(wrapPlayers(1281)).toBe(0);
  });




// Test creating platforms
test('Simulate spawning 50 platforms', async () => {
  expect(createPlatforms(50)).toBe(50);
  });

test('Simulate spawning 100 platforms', async () => {
  expect(createPlatforms(100)).toBe(100);
  });

test('Simulate spawning 1000 platforms', async () => {
  expect(createPlatforms(1000)).toBe(1000);
  });