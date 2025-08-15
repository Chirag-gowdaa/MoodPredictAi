// import express from "express";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import { msg } from "./modules/rant.js";
// import { chillnote } from "./modules/rant.js";
// import { gosip } from "./modules/rant.js";
// import { plans } from "./modules/rant.js";
// import { render } from "ejs";
// const app = express();
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// mongoose.connect('mongodb://localhost:27017/moodboardDB');


// app.get('/', (req, res) => {
//     res.render('front.ejs');
// });
// app.post('/angry', (req, res) => {
//     res.render('angry.ejs');
// })
// app.post('/chill', (req, res) => {
//     res.render('chill.ejs');
// })
// app.post('/study', (req, res) => {
//     res.render('study.ejs');
// })
// app.post('/normal', (req, res) => {
//     res.render('normal.ejs');
// })
// const opt = ["angry", "chill", "study", "normal"];

// app.post('/random', (req, res) => {
//     let n = Math.floor(Math.random() * opt.length);
//     res.render(`${opt[n]}.ejs`);
// });

// app.post('/submit-rant', async (req, res) => {
//     const rantText = req.body.rant;
//     const newRant = new msg({ rantmsg: rantText });
//     await newRant.save();
//     res.redirect('/');
// })
// app.post('/submit-note', async (req, res) => {
//     const chillText = req.body.note;
//     const chillNote = new chillnote({ chillmsg: chillText });
//     await chillNote.save();
//     res.redirect('/');
// })
// app.post('/submit-gossip', async (req, res) => {
//     const gossipText = req.body.gossip;
//     const gossipNote = new gosip({ gossip: gossipText });
//     await gossipNote.save();
//     res.redirect('/');
// })
// app.post('/submit-study', async (req, res) => {
//     const text = req.body.goal;
//     const p = new plans({ plan: text });
//     await p.save();

//     const allGoals = await plans.find(); // fetch all saved plans
//     res.render('study.ejs', { goals: allGoals.map(g => g.plan) }); // pass only the plan text
// });


// app.listen(3000, () => {
//     console.log("Server connected successfully");
// })
// res.redirect('/');

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { msg, chillnote, gosip, plans } from "./modules/rant.js";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/moodboardDB');

app.get('/', (req, res) => {
    res.render('front.ejs');
});

app.post('/angry', (req, res) => {
    res.render('angry.ejs');
});

app.post('/chill', (req, res) => {
    res.render('chill.ejs');
});

app.post('/study', async (req, res) => {
    const allGoals = await plans.find();
    res.render('study.ejs', { goals: allGoals.map(g => g.plan) });
});

app.post('/normal', (req, res) => {
    res.render('normal.ejs');
});

const opt = ["angry", "chill", "study", "normal"];

app.post('/random', async(req, res) => {
    let n = Math.floor(Math.random() * opt.length);
    if(opt[n] === "study"){
        const allGoals = await plans.find();
        res.render('study.ejs', { goals: allGoals.map(g => g.plan) });
    }
    else
    res.render(`${opt[n]}.ejs`);
});

// Handle Rant Submission
app.post('/submit-rant', async (req, res) => {
    const rantText = req.body.rant;
    if (rantText && rantText.trim() !== "") {
        const newRant = new msg({ rantmsg: rantText });
        await newRant.save();
    }
    res.redirect('/'); // or render a message page if needed
});

// Handle Chill Note Submission
app.post('/submit-note', async (req, res) => {
    const chillText = req.body.note;
    if (chillText && chillText.trim() !== "") {
        const chillNote = new chillnote({ chillmsg: chillText });
        await chillNote.save();
    }
    res.redirect('/');
});

// Handle Gossip Submission
app.post('/submit-gossip', async (req, res) => {
    const gossipText = req.body.gossip;
    if (gossipText && gossipText.trim() !== "") {
        const gossipNote = new gosip({ gossip: gossipText });
        await gossipNote.save();
    }
    res.redirect('/');
});

// Handle Study Goal Submission
app.post('/submit-study', async (req, res) => {
    const text = req.body.goal;
    if (text && text.trim() !== "") {
        const p = new plans({ plan: text });
        await p.save();
    }
    const allGoals = await plans.find(); // fetch all saved plans
    res.render('study.ejs', { goals: allGoals.map(g => g.plan) });
});

app.listen(3000, () => {
    console.log("Server connected successfully");
});
