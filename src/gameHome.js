const Questions = require('../config/test-data');
const axios = require('axios');
const omit = require('../utils/myOmit.js');
const shuffle = require('../utils/shuffle.js');
// const triviaAPI = require('../utils/triviaAPI');
// const gameInstance = require('../models/game');
const Session = require('../models/gameSession');

function Game (questions, users, settings, io, newGame){

    // Game Data Variables Go Here
    this.gameData = {
        // id of game
        _id: undefined,
        // id of Session for updating Session.games
        sessionId: undefined,
        // The settings from the API call
        category: settings.category,
        difficulty: settings.difficulty,
        type: settings.type,
        // Users who have played in the current game
        users: users,
        // Timer for tracking countdowns for questions or to next question
        timer: 10,
        // Questions for the current game. Called for the current API.
        questions: questions,
        // Total number of questions
        totalQuestions: questions.length,
        // The current question
        currentQuestion: undefined,
        // Current question to be sent to client.
        questionToBeSent: undefined,

        questionNum: 0,
        // Current Answer 
        correctAnswer: undefined,
        // Game state variable for tracking PreGame, QuestionActive, Intermission, or GameEnd
        gameState: undefined,
        // Client Answers for rendering on front-end
        clientAnswers: {},
        // Scores object for holding all final scores
        scores: [],
        // Socket object for sending to client.
        socketObj: {
            users:[],
            question:{},
            correctAnswer:"",
            gameState:"pregame",
            timer:10,
            totalQuestions:0,
            questionNum:0
        },

    };

    this.setUsers = (users)=>{
        this.gameData.users = users;
        console.log(this.gameData.users);
    }

    this.initializeGame = () => {
        // Start pregame countdown to first question
        this.gameData.gameState = 'pregame';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
        this.gameData.clientAnswers = this.randomizeAnswers();
        this.tickInterval();
    };

    // Method that transitions to the next game state phase (Question to Intermission, etc.)
    this.gameLoopStep = () => {
        switch(this.gameData.gameState) {
            case 'pregame':
                // addGame(this.gameData._id);
                this.resetTimer(10);
                this.gameData.gameState = 'questionActive';
                this.nextQuestion();
                this.tickInterval();
                break;
            case 'questionActive':
                this.resetTimer(5);
                this.gameData.gameState = 'intermission';
                this.gameData.correctAnswer = this.gameData.currentQuestion.correct_answer;
                // this.update();
                this.tickInterval();
                break;
            case 'intermission':
                if (this.gameData.totalQuestions == this.gameData.questionNum+1) {
                    this.resetTimer(10);
                    console.log("Game End!");
                    this.gameData.gameState = 'gameEnd';
                    // this.update();
                    this.tickInterval();
                    break;
                } else {
                    this.resetTimer(10);
                    this.gameData.gameState = 'questionActive';
                    this.gameData.correctAnswer = undefined;
                    this.nextQuestion();
                    // this.update();
                    this.tickInterval();
                    break;
                }
            case 'gameEnd':
                // Clear the interval
                clearInterval(this.tick);
                // Initializes MongoDB save and passes newGame cb to start new game
                this.saveGame(newGame);
                break; 
        }
    }
    // Game tick variable for storing our interval
    this.tick = undefined;
    // Clears interval and resets it
    this.tickInterval = () => {
        clearInterval(this.tick);
        // Lowered handleTick for testing purposes
        this.tick = setInterval(this.handleTick, 500); 
    }
    // Acts on the interval tick. Updates client on tick. Calls gameLoopStep() if timer < 0.
    this.handleTick = () => {        
        this.gameData.socketObj = {
            users:this.gameData.users,
            question:this.gameData.questionToBeSent,
            correctAnswer:this.gameData.correctAnswer,
            gameState:this.gameData.gameState,
            timer:this.gameData.timer,
            totalQuestions:this.gameData.totalQuestions,
            questionNum:this.gameData.questionNum+1
        }
        this.gameData.timer--;
        // console.log(this.gameData.socketObj);
        // console.log(this.gameData.gameState+' question# '+this.gameData.questionNum);
        io.sockets.to('master').emit('gameState', this.gameData.socketObj);
        // moved this here so it will still tick at 0 and reset at 0 instead of having a 1 second delay
        if (this.gameData.timer < 0) {
            this.gameLoopStep();
        }
    }

    // General methods go here
    // Sets up the next question
    this.nextQuestion = () => {
        // Function for setting the next current Question goes here.
        this.gameData.questionNum++;
        this.gameData.currentQuestion = questions[this.gameData.questionNum];
        this.gameData.questionToBeSent = omit(this.gameData.currentQuestion, "correct_answer");
        this.gameData.questionToBeSent = omit(this.gameData.questionToBeSent, "incorrect_answers");
        this.gameData.questionToBeSent.answers = this.randomizeAnswers();
    }

    // Method or randomizing the answers and generating the client-facing question object.
    this.randomizeAnswers = () => {
        // Create temporary array to store our answers before shuffling
        let answers = [];
        // Push the correct answer
        answers.push(this.gameData.currentQuestion.correct_answer);
        // Concatenate the array of incorrect answers
        answers = answers.concat(this.gameData.currentQuestion.incorrect_answers);
        // Shuffle the array
        shuffle(answers);
        
        return answers;
    }
    // Resets the game timer
    this.resetTimer = (time) => {
        this.gameData.timer = time;
    }
    // Resets the game data ahead of a new game
    this.gameReset = () => {
        let category = this.gameData.category;
        let type = this.gameData.type;
        let difficulty = this.gameData.difficulty;
        let users = this.gameData.users;

        this.gameData = {
            // Reset id so a new document can be saved.
            _id: undefined,
            // The settings from the API call
            category: category,
            difficulty: difficulty,
            type: type,
            // Users who have played in the current game
            users: users,
            timer: 10,
            // Questions for the current game. Called for the current API.
            totalQuestions: questions.length,
            // The current question
            currentQuestion: undefined,
            // Current question's number
            questionToBeSent: undefined,

            questionNum: 0,
            // Current Answer 
            correctAnswer: undefined,
            // Game state variable for tracking PreGame, QuestionActive, Intermission, or GameEnd
            gameState: "pregame",

            socketObj: {
                users:[],
                question:{},
                correctAnswer:"",
                gameState:"pregame",
                timer:10,
                totalQuestions:0,
                questionNum:0
            }
        };
    }
    // Saves the game document to the database and returns the MongoDB Object ID
    this.saveGame = (cb) => {
        // gameObj for cultivating mongoDB games object
        const gameObj = {
            users:this.gameData.users,
            questions:this.gameData.questions,
            // Dummy scores data. Will be set to this.gameData.scoress
            scores:[
                {
                    name:"poop",
                    uid:1,
                    score:100
                },
                {
                    name:"herp",
                    uid:2,
                    score:1
                },
                {
                    name:"derp",
                    uid:3,
                    score:2
                }
            ],
            numQuestions: this.gameData.numQuestions,
            category: this.gameData.category,
            difficulty: this.gameData.difficulty,
            type: this.gameData.type
        }

        // Mongoose query for updating a subdocument
        Session.findOneAndUpdate({
            "_id": this.sessionId, 
            "games._id": this._id
        },
        {
            "$set": {
                "games.$":gameObj
            }
        }).then(res=>{
            // console.log(res);
            // initializes newGame
            if(cb){
                cb();
            }
        })
    }
}

module.exports = Game;