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
    new Question("Which one is not an object oriented programming language?", ["Java", "C#","C++", "C"], "C"),
    new Question("Which one of the following waves are used by the common TV remote control?", ["Radio waves", "Lasers", "Infrared waves", "Ultrasonic waves"], "Infrared waves"),
    new Question("Which of the following compound is not used as an an alkali?", ["Sodium hydroxide", "Potassium hydroxide","Carbon hydroxide", "Nitrogen hydroxide"], "Nitrogen hydroxide"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "Javascript", "All"], "All"),
    new Question("When The Indian Space Research Organisation (ISRO) was set up?", ["1962", "1969", "1972", "1952"], "1969"),
    new Question("Which of the following is a part of electrical circuit?", ["Battery", "Fixed resistance", "Connecting wires", "All of the above"], "All of the above"),
    new Question("Photosynthesis is :", ["An Oxidation-Reduction reaction", "Synthesis reaction", "Organic reaction", "Replacement reaction"], "An Oxidation-Reduction reaction"),
    new Question("What is the name of port that is used for printer?", ["Primary Port", "Ping Port", "Power Port", "Parallel Port"], "Parallel Port"),
    new Question("What is the process of taking food into the body called?", ["Digestion", "Assimilation", "Ingestion", "Egestion"], "Ingestion"),
    new Question("Which of the following is a current-detecting instrument?", ["Voltmeter", "Ammeter", "Magnetometer", "Galvanometer"], "Galvanometer")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();