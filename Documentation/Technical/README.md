# **Technical Documentation**
## **Back End (Server)**
### **Database**
The database that is used for the application is MongoDB. Since the database will not only hold each individual player, but each game as well, MongoDB was the best choice to go for a fast and reliable database. The database contains two collections that are necesssary for the game. These collections are named "SavedGames" and "Leaderboard"
#### **SavedGames**
Saved games is used to keep track of on going games. In order to do this, whenever players create a game, data will be saved about that game. This data inlcudes both player's names, the number of wins for each player, and the ID of the game. This ID must be unique or the game will not be created. Once saved, this game will continually updates the player's wins until one player hits 2 wins. From there, the wins can longer be updated and the game will eventually be deleted by the user.
#### **Leaderboard**
The Leaderboard database is used to keep track of the total number of wins a player has. These wins are tracked by a user's name which is created when they start the game. If a name is created that hasn't been seen before, the user gets added to the database once they achieve a single win. If a user types in a name that is already in the database, all wins that user achieves will be added to the already created name. 
### **HTTP Methods**
#### **SavedGames**
* **Get**
   * **Input**: N/A 
   * **Returns**: JSON of all current games in same format as post request
   * **Return codes**:
      * **200** - Success
      * **500** - Error with database 
* **Post**
   * **Input**:{"player1": "playerOneName", "player2": "playerTwoName", "player1Wins": 0,           "player2Wins": 0, "passcode": 123 }
        
   * **Returns**: N/A
   * **Return codes**:
      * **200** - Success
      * **409** - Passcode already in use
      * **500** - Error with database
* **Put**
   * **Input**:{"player1": "playerOneName", "player2": "playerTwoName", "player1Wins": 0, "player2Wins": 1 } as well as ID within the route
   * **Returns**: N/A
   * **Return codes**:
      * **200** - Success
      * **404** - Passcode not found
      * **500** - Error with database
* **Delete**
   * **Input**: Passcode in route
   * **Returns**: N/A
   * **Return codes**:
      * **200** - Success
      * **404** - Passcode not found
      * **500** - Error with database
#### **Leaderboard**
* **Get**
   * **Input**: N/A
   * **Returns**: JSON of all players in same format as post request
   * **Return codes**:
      * **200** - Success
      * **500** - Error with database
* **Post** 
   * **Input**: { "player": "name", "numWins": 1 }
   * **Returns**: N/A
   * **Return codes**:
      * **200** - Success
      * **409** - User already exists 
      * **500** - Error with database
* **Put**
   * **Input**: Player name in route
   * **Returns**: N/A
   * **Return codes**:
      * **200** - Success
      * **404** - Player not found
      * **500** - Error with database
* **Delete**
   * **Input**: Player name in route
   * **Returns**: 
   * **Return codes**:
      * **200** - Success
      * **404** - Player not found
      * **500** - Error with database
### **Routes**
#### **SavedGames**
* **Get**: "/games"
* **Post**: "/create_game"
* **Put**: "/games/update/:passcode"
* **Delete**: "/games/:passcode"
#### **Leaderboard**
* **Get**: "/players"
* **Post**: "/create_player"
* **Put**: "/players/update/:player"
* **Delete**: "/players/delete/:player"
## **Front End (Client)**
The Front End consists of the 7 submenus (Create Game, Credits, How To Play, Leaderboard, Load Game, Main Menu, and Winner Screen) as well as the 3 levels for the game. 
### **Main Menu, How To Play, Credits**
These submenus serve as a way for the player to get familiar with the game before playing their first match. These are static pages so they do not talk to the database. 
### **Create Game**
The Create Game screen takes in 3 inputs: Player one's name, Player two's name, and a passcode. The passcode must only be integers, else the input block will go blank when submitted. When submitted successfully, this form is sent to the database. If the passcode is already in use, the input block will go blank and require the user to type in a new passcode. If not, the game will save the user's information into the database via a POST request and redirect the players to the first level. The user's data will also be saved in the browser's local storage.
### **Load Game**
The Load Game screen takes 1 input. This input is the passcode of a game that has not been completed. The passcode must only be integers, else the input block will go blank when submitted. When submitted successfully, this form is sent to the database. If the database can find the id, it will save the data to the browser's local storage and redirect to the correct level based on the total number of wins between both players. If the total amount of wins equals 3, the user will be redirected to the winner screen. If the database cannot find the id, it will require the user to type in a new passcode.
### **Levels**
The game consists of 3 levels of ascending difficulty. Inside each level is a preload, create, and update function. The preload function consists of sprites, images, and sounds that need to be loaded into the game. The create function consists of items that need to be spawned in before the game starts, such as players, backgrounds and music. The update function consists of functions that continuously run such as movement, item spawning, text movement, etc. 
#### **Platforms/Background**
The platforms spawn randomly across the screen up to 1000 platforms. They are loaded in as the game starts. 1000 background photos are also loaded when the game starts to give the appearance of a repeating background.
#### **Items**
Items spawn randomly above the player in second place. This is done by grabbing the y coordiate of the player who is in second place and randomly putting the item - distance away from the player. Only one item can affect a player at a time. Each item flips a specific variable from false to true to show that the player is affected. These variables allow different conditional statements to become true which will affect movement. After a specific amount of time, the item will lose its affect as the variable will be switched to false.
#### **Movement**
Movement is handled within the update function. Movement is controller either with WASD or the arrow keys. Characters are allowed to jump, go left and right, and thrust downwards. Variables that are affected when picking up items are used in determining which action should be enacted when a button is clicked. For example, if a user has reversed controls, then a function that has the controls inverted will be ran until the variable is no longer true.
#### **End of level**
Once the level completes, it will update one of the player's scores and send a PUT request to the leaderboard database to update the current wins for that player, as well as a PUT request to the saved games database to update the current game. Once updated, a button will show up on the user's screen allowing them to go to the next level. Based on the current amount of wins, the game will decide which page to redirect the user too. For example, if Player One has 1 win and Player Two has 2 wins, the game will redirect to the Winner Screen. This follows the same functionality as the Load Game screen .
### **Winner Screen**
This screen is a static screen that displays the score of both players as well as who won the game. The user will then have the choice to determine if they want to go back to the main menu or leaderboard. If they choose main menu, the webpage will send a DELETE request to remove that game from the saved games database. If the user chooses leaderboard, they will be sent to the leaderboard screen.
### **Leaderboard**
The Leaderboard screen uses a GET request to the leaderboard database to sort the top 10 players and put them into the table. The bottom of the screen also shows the current two players and their ranking within the leaderboard. The user can only go back to the Winner Screen from this webpage. 
### **Routes**
* **Create Game**: "/CreateGameScreen"
* **Credits**: "/Credits"
* **How To Play**: "/HowToPlay"
* **Leaderboard**: "/LeaderboardScreen"
* **Load Game**: "/LoadGame"
* **Main Menu**: "/"
* **Winner Screen**: "/WinnerScreen"