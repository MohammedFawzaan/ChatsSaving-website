const express = require('express'); // require express
let a = 10;
const app = express(); // create express app
const mongoose = require('mongoose'); // require mongoose
const path = require('path')  // require path
const methodOverride = require('method-override');
const Chat = require('./models/chat.js'); // import chat.js 
const { format } = require('util');

app.set("views", path.join(__dirname, 'views')); // set views for ejs
app.set("view engine", "ejs"); // set views engine

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css")));

app.use(express.urlencoded({ extended: true })); // to use urlencoded data
app.use(express.json()); // to use json data in direct form

app.use(methodOverride('_method'));

main().catch(err => console.log(err)); // calling main function

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} // mongoose connection

const port = process.env.PORT || 8080;

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs", {Chat});
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
    // console.log(newChat);
    res.redirect("/chats");
});

app.get('/chats/:id/edit', async (req ,res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

app.put('/chats/:id', async (req, res) => {
    let {id} = req.params;
    let {msg} = req.body;
    let updatedchat = await Chat.findByIdAndUpdate(id, {msg: msg});
    console.log(updatedchat);
    res.redirect('/chats');
});

app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let chatdelete = await Chat.findByIdAndDelete(id);
    console.log(chatdelete);
    res.redirect('/chats');
});

app.listen(port, (req, res) => {
    console.log('Server running on PORT');
});