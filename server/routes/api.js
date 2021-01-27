const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const db = "mongodb+srv://vinit:pwdvinit@eventsdb.occbe.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db,err =>{
    if(err){
        console.error('Error!'+err)
    }else{
        console.log('connected to mongodb')
    }
},{useNewUrlParser: true, useUnifiedTopology: true});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events',(req,res)=>{
  let events = [
      {
          "_id": "1",
          "name": "Auto Expo",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "2",
          "name": "Angular",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "3",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "4",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "5",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "6",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "7",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "8",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "9",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "10",
          "name": "Authentication",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
  ]

  res.json(events)
})
router.get('/special',verifyToken, (req,res)=>{
  let special = [
      {
          "_id": "1",
          "name": "Netflix",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "2",
          "name": "Legend",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "3",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "4",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "5",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "6",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "7",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "8",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "9",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
        {
          "_id": "10",
          "name": "Movie",
          "desciption": "Lorem ipsum",
          "date": "2019-10-10T17:00:00"
        },
  ]

  res.json(special)
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
          let payload = {subject:registeredUser._id}
          let token = jwt.sign(payload,'secretKey')

            res.status(200).send({token})
        }
    })
})

router.post('/login',(req,res)=>{
    let userData = req.body

    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error)
        } else{
            if(!user){
                res.status(401).send('Invalid email')
            }else{
                if(user.password != userData.password){
                    res.status(401).send('Invalid password')
                }else{
                  let payload = {subject:user._id}
                  let token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})



module.exports = router