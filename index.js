const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();
const router = express.Router();
app.use(express.json());
app.use(router);

const signupSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    age: Number,
});

   const RegUser = mongoose.model('User', signupSchema);

//    signup Part

router.post("/signup",async (req, res) => {
    const {name, email, Password, age} = req.body;

    if(!name || !email || !Password){
        return res.status(400).send("Name, Email And Password are required")
    };

    const existUser = await RegUser.find({email})
    if(existUser.length > 0){
        return res.send("Already exist, try with another email!")
    }

    const User = new RegUser({
        name, email, Password, age
    });
    User.save();
    res.status(200).send("All Right");
});

// Singin Part

router.post("/singin", async (req, res) => {
    const {email,Password} = req.body;

    if(!email || !Password){
        return res.status(400).send("Email And Password are required")
    };
   
    const existUser = await RegUser.find({email})

    res.status(200).send("existUser");
});




mongoose.connect('mongodb+srv://basicData:lUp1vtGUZjhVz2Gm@cluster0.bh4tq.mongodb.net/UserData?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Data Connected!'));



//   lUp1vtGUZjhVz2Gm


app.listen(5000, () => {
    console.log('Server is runting')
})