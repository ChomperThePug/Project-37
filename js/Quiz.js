class Quiz {
  constructor() {}

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play() {
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("red");
    //write code to show a heading for showing the result of Quiz

    //call getContestantInfo( ) here
    getContestantInfo();
    if (allContestants !== undefined) {
      //write code to add a note here
      fill('Blue');
      textSize(30);
      text("*NOTE: Contestants who have answered correctly will be marked in green", 130, 250);
      //write code to highlight contest who answered correctly
      for (var plr in allContestants) {
        var correctAns = "2";
        if (correctAns === allContestants[plr].answer) {
          fill('green');
          text(allContestants[plr], 200, plr*30 + 100)
        }else{
          fill("red");
          text(allContestants[plr], 200, plr*30 + 100)
        }
      }
    }
  }

}