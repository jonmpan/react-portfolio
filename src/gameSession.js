const Game = require('./game');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');
const axios = require('axios');
const triviaAPI = require('../utils/triviaAPI');

function GameSession(io) {
    // The current active game's id
    this.activeGame = undefined;
    // Array that stores the userIds of all users within this game session
    this.users = [];
    // Variable that we will instantiate each new game into
    this.currentGame = undefined;
    // Store all of the game ids that were played in this session
    this.games = [];
    // Variable for storing the session's ID
    this._id = undefined;
    // Variable for storign the session's type. 
    this.type = undefined;
    
    // Method that sets up the session's state
    this.create = () => {
        this.save(this.createNewGame);
    };

    // Method that adds a user to the session
    this.addUser = (user)=>{
        // this.users.push(user);
        // this.currentGame.setUsers(this.users);
        if(this.users.length > 0){
            var userCounter = 0;
            this.users.forEach((storedUser,index)=>{
                if(user.id !== storedUser.id){
                    userCounter++;
                }
                if(userCounter === this.users.length){
                    this.users.push(user);
                    this.currentGame.addUser(user)
                    console.log('pushing '+user.name+' into this.users');
                }
            })
        }
        else{
            this.users.push(user);
            this.currentGame.addUser(user)
            console.log('pushing '+user.name+' into this.users');
        }
    };

    // Method for removing a user from the session by userId
    this.remUser = (userId) => {
        // NEED TO WRITE THIS
    };

    // Method for saving the session to MongoDB
    this.save = (cb) => {
        const sessionDocument = new Session({
            users: this.users,
            currentGame: this.currentGame,
            type: 'master',
            games: this.games
        });
        sessionDocument.save().then((res) => {
            this._id = res._id;
            cb(res);
        });
    };

    this.addGame = (id) => {
        this.games.push(id);
        this.save();
        console.log("Added game " + id + " to session " + this._id);
    };

    // Creating a new game
    this.createNewGame = () => {
        let gameSettings = {
            numQuestions: 10,
            category: 0,
            difficulty: 'Any',
            type: 'Multiple'
        }

        // Does the triviaAPI call
        triviaAPI(res => {
            const newGame = new Game(res.data.results, this.users, gameSettings, io, this.createNewGame);
            const gameObj = {
                users:this.users,
                questions:res.data.results,
                scores:{},
                numQuestions: 10,
                category: 0,
                difficulty: 'Any',
                type: 'Multiple'
            }
            // Finds current session to push the gameObj into this session.games
            Session.findOneAndUpdate(
                {"_id":this._id},
                {$push:{"games":gameObj}}
            ).then((res)=>{
                console.log('found gameSession and added game');
                console.log(this._id);
                // Does 2nd mongoose call to find most recent game's _id.
                // This is highly inefficient
                // try to get .create method working
                // .create method is at the bottom of the documentation here:
                // http://mongoosejs.com/docs/subdocs.html
                Session.findById(this._id).then(res2=>{
                    console.log(res2);
                    // console.log("GAME ID IS: "+res2.games[res2.games.length-1]._id);
                    // Sets newGame._id and .sessionId for newGame to update itself
                    newGame._id = res2.games[res2.games.length-1]._id;
                    newGame.sessionId = this._id;
                    this.currentGame = newGame;
                    // Initializes game after all this
                    this.currentGame.initializeGame();
                })
            })
        });
    };

    this.handleAnswer = (answerObj) =>{
        this.currentGame.handleAnswer(answerObj);
    }
}

module.exports = GameSession;