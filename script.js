// Function Constructor

var john = {
  name: "John",
  yearOfBirth: 1990,
  job: "teacher"
};

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};
Person.prototype.calculateAge = function() {
  console.log(2018 - this.yearOfBirth);
};
Person.prototype.lastName = "Smith";

var john = new Person("John", 1995, "Designer");
var jane = new Person("John", 1990, "Developer");
var mark = new Person("John", 1992, "Designer2");
john.calculateAge();
jane.calculateAge();
mark.calculateAge();
console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);

// Object.Create

var personProto = {
  calculateAge: function() {
    console.log(2018 - this.yearOfBirth);
  }
};
var john = Object.create(personProto);
john.name = "John";
john.yearOfBirth = 1990;
john.job = "Teacher";

var mark = Object.create(personProto, {
  name: { value: "Mark" },
  yearOfBirth: { value: 1995 },
  job: { value: "designer" }
});

// Primitives vs Objects

// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a, b);

// Objects

var obj1 = {
  name: "Jui",
  age: 23
};

var obj2 = obj1;
obj1.age = 27;
console.log(obj1.age, obj2.age);

// Functions
var age = 27;
var obj = {
  name: "Samiha",
  city: "Sylhet"
};

function change(a, b) {
  a = 30;
  b.city = "Syl";
}

change(age, obj);
console.log(age, obj.city);

// Passing function VS Arguments
var years = [1990, 1995, 1937, 2005, 1965];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2018 - el;
}
function isFullAge(el) {
  return el >= 18;
}
function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - 0.67 * el);
  } else {
    return -1;
  }
}

var ages = arrayCalc(years, calculateAge);
var fullages = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(ages, fullages, rates);

//  Function returning Function

function interviewQuestion(job) {
  if (job === "designer") {
    return function(name) {
      console.log(name + " , can you please explain what UX design is?");
    };
  } else if (job === "teacher") {
    return function(name) {
      console.log("What subject do you teach , " + name + "?");
    };
  } else {
    return function(name) {
      console.log(" Hello " + name + "What do you do?");
    };
  }
}

var teacherQuestion = interviewQuestion("teacher");
var designerQuestion = interviewQuestion("designer");
teacherQuestion("Jui");
designerQuestion("Samin");
designerQuestion("Samina");
designerQuestion("Samiha");
designerQuestion("Sami");
interviewQuestion("teacher")("jane");

// IIFE
function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game();
(function() {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

//console.log(score);

(function(goodluck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodluck);
})(5);

// Clousers

function retirement(retirementAge) {
  var a = " a years untill retirement.";
  return function(yearOfBirth) {
    var age = 2018 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

var retirementUS = retirement(66);
var retirementGermany = retirement(67);
var retirementIceland = retirement(68);
retirementUS(1990);
retirementGermany(1990);
retirementIceland(1990);

//retirement(66)(1995);

function interviewQuestion(job) {
  return function(name) {
    if (job === "designer") {
      console.log(name + " , can you please explain what UX design is?");
    } else if (job === "teacher") {
      console.log("What subject do you teach , " + name + "?");
    } else {
      console.log(" Hello " + name + "What do you do?");
    }
  };
}
interviewQuestion("teacher")("JUI");

// Bind, Call, Apply

var john = {
  name: "John",
  age: 26,
  job: "teacher",
  presentation: function(style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " +
          timeOfDay +
          " , Ladies and Gentalments! I'm a " +
          this.name +
          " and I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old."
      );
    } else if (style === "friendly") {
      console.log(
        "Hey! Whats UP! I'm a " +
          this.name +
          " and I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old."
      );
    }
  }
};

var emliy = {
  name: "Jui",
  age: 35,
  job: "designer"
};

john.presentation("formal", "morning");
john.presentation.call(emliy, "friendly", "morning");
//john.presentation.call(emliy, ["friendly", "morning"]);

var johnFriendly = john.presentation.bind(john, "friendly");
johnFriendly("morning");

// Quiz App
(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  Question.prototype.displayQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ": " + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function(ans, callback) {
    var sc;
    if (ans === this.correct) {
      console.log("Correct answer!");
      sc = callback(true);
    } else {
      console.log("Wrong answer. Try again :)");
      sc = callback(false);
    }
    this.displayScore(sc);
  };

  Question.prototype.displayScore = function(score) {
    console.log("Your current score is : " + score);
    console.log("---------------------------------");
  };

  var q1 = new Question(
    "Is JavaScript the coolest programming language in the world?",
    ["Yes", "No"],
    0
  );

  var q2 = new Question(
    "What is the name of this course's teacher?",
    ["John", "Micheal", "Jonas"],
    2
  );

  var q3 = new Question(
    "What does best describe coding?",
    ["Boring", "Hard", "Fun", "Tediuos"],
    2
  );

  var questions = [q1, q2, q3];
  function score() {
    var sc = 0;
    return function(correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }
  var keepScore = score();
  function nextQuestion() {
    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = prompt("Please select the correct answer.");

    if (answer !== "exit") {
      questions[n].checkAnswer(parseInt(answer), keepScore);
      nextQuestion();
    }
  }
  nextQuestion();
})();
