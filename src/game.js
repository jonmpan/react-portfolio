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
        clientAnswers: [],
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

    // this.setUsers = (users)=>{
    //     this.gameData.users = users;
    //     console.log(this.gameData.users);
    // }

    
    this.initializeGame = () => {
        // Start pregame countdown to first question
        this.gameData.gameState = 'pregame';
        this.gameData.currentQuestion = this.gameData.questions[this.gameData.questionNum];
        // this.gameData.clientAnswers = this.randomizeAnswers();
        this.setUserScoreObjs();
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
                this.calculateScores();
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
        this.tick = setInterval(this.handleTick, 1000);
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
            questionNum:this.gameData.questionNum+1,
            scores:this.gameData.scores
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
            scores:this.gameData.scores,
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

    this.addUser = (user)=>{
        this.gameData.users.push[user];
        console.log(this.gameData.users);
        const scoreObj = {
            name:user.name,
            score:0,
            id:user.id
        }
        this.gameData.scores.push(scoreObj);
    }

    this.setUserScoreObjs = ()=>{
        const users = this.gameData.users
        if(users){
            const tempScores = [];
            users.forEach(data=>{
                const scoreObj = {
                    name:data.name,
                    score:0,
                    id:data.id
                }
                tempScores.push(scoreObj);
            })
            this.gameData.scores = tempScores;
        }
    }

    this.calculateScores = ()=>{
        console.log('CALCULATING SCORES');


        console.log(this.gameData.clientAnswers.length);
        console.log(this.gameData.scores.length);
        if(this.gameData.clientAnswers.length > 0){
            // Doesn't work with 2 people
            // const clientAnswers = this.gameData.clientAnswers;
            // const scores = this.gameData.scores;
            // for(var i = 0; i < clientAnswers.length; i++){
            //     if(clientAnswers[i].answer === this.gameData.correctAnswer){
            //         for(var i = 0; i < scores.length; i++){
            //             if(clientAnswers[i].id === scores[i].id){
            //                 scores[i].score++;
            //                 console.log(scores[i].name+' got one right!');
            //             }
            //         }
            //     }
            // }

            // forEach loops work with 2 people for some reason
            this.gameData.clientAnswers.forEach(clientAnswer=>{
                if(clientAnswer.answer === this.gameData.correctAnswer){
                    this.gameData.scores.forEach(score=>{
                        if(clientAnswer.id === score.id){
                            score.score++;
                            console.log(score.name+' got one right!');
                        }
                    })
                }
            })
        }
    }

    this.handleAnswer = (answerObj)=>{
        if(this.gameData.clientAnswers.length>0){
            for(var i = 0; i<this.gameData.clientAnswers.length; i++){
                if(this.gameData.clientAnswers[i].id === answerObj.id){
                    this.gameData.clientAnswers[i] = answerObj;
                    console.log('CLIENTANSWERS');
                    console.log(this.gameData.clientAnswers);
                    break;
                }
                else if(i === this.gameData.clientAnswers.length-1){
                    this.gameData.clientAnswers.push(answerObj);
                    console.log('CLIENTANSWERS');
                    console.log(this.gameData.clientAnswers);
                }
            }
        }
        else{
            this.gameData.clientAnswers.push(answerObj);
            console.log('CLIENTANSWERS');
            console.log(this.gameData.clientAnswers);
        }
    }

    // Socket.io listeners go in here
    // io.on('connection', (socket) => {

    //     socket.on('answer', (userAnswer) => {

    //         if(this.gameData.clientAnswers.length>0){
    //             for(var i = 0; i<this.gameData.clientAnswers.length; i++){
    //                 if(this.gameData.clientAnswers[i].id === userAnswer.id){
    //                     this.gameData.clientAnswers[i] = userAnswer;
    //                     console.log('CLIENTANSWERS');
    //                     console.log(this.gameData.clientAnswers);
    //                     break;
    //                 }
    //                 else if(i === this.gameData.clientAnswers.length-1){
    //                     this.gameData.clientAnswers.push(userAnswer);
    //                     console.log('CLIENTANSWERS');
    //                     console.log(this.gameData.clientAnswers);
    //                 }
    //             }
    //         }
    //         else{
    //             this.gameData.clientAnswers.push(userAnswer);
    //             console.log('CLIENTANSWERS');
    //             console.log(this.gameData.clientAnswers);
    //         }
    //     });
    // });
}

module.exports = Game;