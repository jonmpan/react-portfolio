const GameSession = require('./gameSession');
const mongoose = require('mongoose');
const Session = require('../models/gameSession');

function gameManager(io){
    this.activeSessions = {};
    this.users = [];

    // Method for creating a new session using the gameSession class
    this.createSession = (sessionType)=>{
        console.log("Attempting to create a new session");
        // Instantiate a new session class
        let newSession = new GameSession(io);

        // Call the new session's create method to setup the session
        // newSession.create();
        // Push the new session variable to gameManager's activeSessions key
        this.addSession(newSession,sessionType);
    };

    this.addUser = (user,room)=>{
        // this.users.push(user);
        this.activeSessions[room].addUser(user);
        // console.log('pushed to '+room+' user '+user.name);
    }
    // Method for adding the session to the list of activeSessions
    this.addSession = (newSession, type)=>{
        // Add the session to the activeSessions list
        // Check if this is a master lobby or regular one
        if (type === 'master') {
            newSession.save((res) => {
                this.activeSessions['master'] = newSession;
                this.logSessions('master');
                // Call the new session's create method to setup the session
                this.activeSessions['master'].create();
            });
        }
        else {
            // Mongoose function to create a private room
            newSession.save((res) => {
                this.activeSessions[res._id] = newSession;
                this.logSessions(res._id);
            });
        }
        // Save the session to MongoDB
    };

    this.handleAnswer = (answerObj)=>{
        this.activeSessions[answerObj.room].handleAnswer(answerObj)
    }

    this.logSessions = (sessionName)=>{
        console.log("New session " + sessionName + " created and added to activeSessions");
        console.log("Current sessions:");
        console.log(this.activeSessions);
    };
    this.logThis = ()=>{
        console.log(this);
    };
}

module.exports = gameManager;