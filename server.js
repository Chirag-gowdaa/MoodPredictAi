import express from "express";
import bodyParser from "body-parser";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage instead of MongoDB
let rantMessages = [];
let chillNotes = [];
let gossipNotes = [];
let studyPlans = [];

app.get('/', (req, res) => {
    res.render('front.ejs');
});

app.post('/angry', (req, res) => {
    res.render('angry.ejs');
});

app.post('/chill', (req, res) => {
    res.render('chill.ejs');
});

app.post('/study', (req, res) => {
    res.render('study.ejs', { goals: studyPlans });
});

app.post('/normal', (req, res) => {
    res.render('normal.ejs');
});

const opt = ["angry", "chill", "study", "normal"];

app.post('/random', (req, res) => {
    let n = Math.floor(Math.random() * opt.length);
    if (opt[n] === "study") {
        res.render('study.ejs', { goals: studyPlans });
    } else {
        res.render(`${opt[n]}.ejs`);
    }
});

// Handle Rant Submission
app.post('/submit-rant', (req, res) => {
    const rantText = req.body.rant;
    if (rantText && rantText.trim() !== "") {
        rantMessages.push(rantText.trim());
    }
    res.redirect('/');
});

// Handle Chill Note Submission
app.post('/submit-note', (req, res) => {
    const chillText = req.body.note;
    if (chillText && chillText.trim() !== "") {
        chillNotes.push(chillText.trim());
    }
    res.redirect('/');
});

// Handle Gossip Submission
app.post('/submit-gossip', (req, res) => {
    const gossipText = req.body.gossip;
    if (gossipText && gossipText.trim() !== "") {
        gossipNotes.push(gossipText.trim());
    }
    res.redirect('/');
});

// Handle Study Goal Submission
app.post('/submit-study', (req, res) => {
    const text = req.body.goal;
    if (text && text.trim() !== "") {
        studyPlans.push(text.trim());
    }
    res.render('study.ejs', { goals: studyPlans });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
