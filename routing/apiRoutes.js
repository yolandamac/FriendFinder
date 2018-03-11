// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var friendList = require('../app/data/friends.js');

// ===============================================================================
// ROUTING
// ===============================================================================


  //a GET route that displays JSON of all possible friends
module.exports = function(app){
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });

    // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // The post below grabs the new friend's scores and compares with friends in friendList array
  // ---------------------------------------------------------------------------

  app.post('/api/friends', function(req,res){
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;


    for(var i=0; i<friendList.length; i++){
      var scoresDiff = 0;
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

 //Pushes results into scoresArray
      scoresArray.push(scoresDiff);
    }

 //Once friends scores are compared, finds the best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

 //Returns best match info
    var bff = friendList[bestMatch];
    res.json(bff);


    friendList.push(req.body);
  });
};