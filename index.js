const express = require('express'); // require express
const app = express(); // create express app
const mongoose = require('mongoose'); // require mongoose
const path = require('path')  // require path

const Chat = require('./models/chat.js'); // import chat.js 
const { format } = require('util');

app.set("views", path.join(__dirname, 'views')); // set views for ejs
app.set("view engine", "ejs"); // set views engine

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css")));

app.use(express.urlencoded({ extended: true })); // to use urlencoded data
app.use(express.json()); // to use json data in direct form

main().catch(err => console.log(err)); // calling main function

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} // mongoose connection

const port = 3000;

app.get('/', (req, res) => {
    res.send('GET request');
});

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save()
        .then((res) => {
            console.log("Data Saved");
        })
        .catch((e) => {
            console.log(e);
        })
    console.log(newChat);
    res.redirect("/chats");
});

app.listen(port, (req, res) => {
    console.log('Server running on PORT');
});