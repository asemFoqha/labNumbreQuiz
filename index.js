const express = require("express");
const url = require("url");
const session = require("express-session");
const bp = require("body-parser");

const app = express();
app.set("view engine", "pug");

const questions = [
  "3, 1, 4, 1, 5",
  "1, 1, 2, 3, 5",
  "1, 4, 9, 16, 25",
  "2, 3, 5, 7, 11",
  "1, 2, 4, 16",
];
const answers = [9, 8, 36, 13, 32];

app.use(
  session({
    secret: "user",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(express.json());

app.use(bp.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.redirect("/one");
});

app.get("/result", (req, res) => {
  res.render("result", { score: getScore(req) });
});

app.get("/one", (req, res) => {
  req.session.score = 0;
  req.session.q1 = Number.NEGATIVE_INFINITY;
  req.session.q2 = Number.NEGATIVE_INFINITY;
  req.session.q3 = Number.NEGATIVE_INFINITY;
  req.session.q4 = Number.NEGATIVE_INFINITY;
  req.session.q5 = Number.NEGATIVE_INFINITY;
  //   let score = getScore();
  //   res.cookie("score", score);
  return res.render("question1", {
    score: getScore(req),
    question: questions[0],
  });
});

app.get("/two", (req, res) => {
  return res.render("question2", {
    score: getScore(req),
    question: questions[1],
  });
});

app.get("/three", (req, res) => {
  return res.render("question3", {
    score: getScore(req),
    question: questions[2],
  });
});

app.get("/four", (req, res) => {
  return res.render("question4", {
    score: getScore(req),
    question: questions[3],
  });
});

app.get("/five", (req, res) => {
  return res.render("question5", {
    score: getScore(req),
    question: questions[4],
  });
});

app.get("/result", (req, res) => {
  return res.render("result", {
    score: getScore(req),
  });
});

app.post("/first", (req, res) => {
  req.session.q1 = +req.body.answer;
  return res.redirect("/two");
});

app.post("/second", (req, res) => {
  req.session.q2 = +req.body.answer;
  return res.redirect("/three");
});

app.post("/third", (req, res) => {
  req.session.q3 = +req.body.answer;
  return res.redirect("/four");
});

app.post("/forth", (req, res) => {
  req.session.q4 = +req.body.answer;
  return res.redirect("/five");
});

app.post("/res", (req, res) => {
  req.session.q5 = +req.body.answer;
  return res.redirect("/result");
});

const getScore = (req) => {
  let score = 0;
  for (let i = 0; i < 5; i++) {
    if (req.session["q" + (i + 1)] == answers[i]) {
      score++;
    }
  }
  return score;
};
//read the port from the server
const port = process.env.PORT || 3000;
app.listen(port);
