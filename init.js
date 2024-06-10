const mongoose = require('mongoose');

const Chat = require('./models/chat.js'); // import chat.js 

main().catch(err => console.log(err)); // calling main function

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
} // mongoose connection

Chat.insertMany([
    {
        from: "By",
        to: "Hi",
        msg: "Hello",
        created_at: new Date()
    },
    {
        from: "Ho",
        to: "Jo",
        msg: "Hello",
        created_at: new Date()
    }
]).then((res) => {
    console.log("Data saved");
})