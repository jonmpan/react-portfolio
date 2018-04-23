const axios = require('axios');
const defaultTrivCall = "https://opentdb.com/api.php?amount=10&type=multiple";

function triviaCall(cb){
axios.get(defaultTrivCall)
  .then((response) => {
    cb(response);
  })
  .catch(function (error) {
    console.log(error);
  });

}
  module.exports = triviaCall;