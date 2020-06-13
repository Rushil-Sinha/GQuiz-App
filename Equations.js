// Timer
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 90;
    var id = setInterval(frame, 1000);
    var secleft = 30;
    function frame() {
      if (width <= 0) {
        clearInterval(id);
        i = 0;
      } else {
        width -= 3;
        secleft--;
        elem.style.width = width + "%";
        elem.innerHTML = secleft;
        if (secleft == 0) {
        showScores();
        }
      }
    }
  }
}

// quiz
function populate() {
    if(quiz.isEnded()) {
        showScores();
        document.getElementById("myBar").style.display = "none";
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

function skip() {
    document.getElementsByClassName('skip')[0].disabled = true;
    quiz.guess(guess);
    quiz.score += 2;
    populate();
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> You scored: " + quiz.score + "</h2>";
    var element = document.getElementById("questions");
    element.innerHTML = gameOverHTML;
};

// Questions
var questions = [
    new Question("If 2x/5 = 4, the value of x is-", ["10", "-10","-8/5", "8/5"], "10"),
    new Question("2 + 5 x 10 = ?", ["52", "70", "25", "50"], "52"),
    new Question("By solving the equation 2a - 2 = 20, the value of 'a' will be", ["12", "14","11", "13"], "11"),
    new Question("The average of first 50 natural numbers is ……", ["25.30", "25.5", "25.00", "12.25"], "25.5"),
    new Question("What is 1004 divided by 2?", ["52", "502", "520", "5002"], "502"),
    new Question("The number of 3-digit numbers divisible by 6, is ……", ["149", "166", "150", "151"], "150"),
    new Question("What is three fifth of 100?", ["3", "5", "20", "60"], "60"),
    new Question("What is 7% equal to?", ["0.007", "0.07", "0.7", "7"], "0.07"),
    new Question("What is the value of x if x2 = 169", ["11", "13", "17", "23"], "13"),
    new Question("If David’s age is 27 years old in 2011. What was his age in 2003?", ["17 yrs", "20 yrs", "19 yrs", "18 yrs"], "19 yrs")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();