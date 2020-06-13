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
    new Question("A cat has how many whiskers, on average?", ["8", "12","16", "24"], "24"),
    new Question("How many teeth do adult dogs have?", ["24", "32", "42", "38"], "42"),
    new Question("The name of the German dog the ‘dachshund‘ translates as what in English?", ["Killer wolf", "Badger dog","Loud hound", "Long dog"], "Badger dog"),
    new Question("A term for a group of cats is?", ["Caggle", "Covey", "Clutch", "Clowder"], "Clowder"),
    new Question("What is the average number of kittens in a litter?", ["1 to 2", "3 to 5", "6 to 8", "More than 10"], "3 to 5"),
    new Question("Humans have five million olfactory receptors (sense of smell) in our noses, how many do dogs have?", ["1.2 million", "12 million", "120 million", "220 million"], "220 million"),
    new Question("Which Egyptian goddess is pictured as a cat or as a woman with the head of a cat?", ["Nekhbet", "Nut", "Isis", "Bastet"], "Bastet"),
    new Question("About how fast can a domestic cat run in short bursts?", ["30 mph", "35 mph", "55 mph", "45 mph"], "30 mph"),
    new Question("An Egyptian Mau is what kind of animal?", ["Dog", "Cat", "Rabbit", "Horse"], "Cat"),
    new Question("A Finnish spitz is what type of animal?", ["Dog", "Horse", "Cat", "Rabbit"], "Dog")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();