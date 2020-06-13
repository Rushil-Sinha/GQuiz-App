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
    new Question("First Governor-General of India was", ["Lord Amherst", "Lord William Bentinck","Sir Charles Metcalfe", "Robert Clive"], "Lord William Bentinck"),
    new Question("Who invented the BALLPOINT PEN?", ["Biro Brothers", "Waterman Brothers", "Bicc Brothers", "Write Brothers"], "Biro Brothers"),
    new Question("Adolf Hitler predicted the war in his memoir published in 1925. What was it called?", ["Mein Kampf", "Meinem Triumph","Heimat", "V-E Day"], "Mein Kampf"),
    new Question("First battle of Panipat was fought between?", ["Babur and Lodi", "Akbar and Hemu", "Mughal and British", "Akbar and Lodi"], "Babur and Lodi"),
    new Question("Which scientist discovered the radioactive element radium?", ["Isaac Newton", "Albert Einstein", "Benjamin Franklin", "Marie Curie"], "Marie Curie"),
    new Question("Who is writer of 'Geet Govind'", ["Kabir", "Kalidas", "Ravidas", "Jayadev"], "Jayadev"),
    new Question("Who discovered the X-ray?", ["Alexander Fleming", "Wilhelm Roentgen", "Ray Stevens", "Stephen Hawking"], "Wilhelm Roentgen"),
    new Question("Which group invented and developed the early Internet?", ["The European Union", "The Soviet Union", "The U.S. government", "The United Nations"], "The U.S. government"),
    new Question("In which decade did television become widely available around the world?", ["1930s", "1950s", "1970s", "1940s"], "1950s"),
    new Question("Who said that Indian National Congress is a ‘begging institute’?", ["Mahatma Gandhi", "Bipin Chandra Pal", "Bal Gangadhar Tilak", "Aurobindo Ghosh"], "Aurobindo Ghosh")
];

// create quiz
var quiz = new Quiz(questions);
// display quiz
populate();