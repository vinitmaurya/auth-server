const express = require('express')

const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb+srv://vinit:pwdvinit@eventsdb.occbe.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db,err =>{
    if(err){
        console.error('Error!'+err)
    }else{
        console.log('connected to mongodb')
    }
},{useNewUrlParser: true, useUnifiedTopology: true})

router.get('/',(req,res)=>{
    res.send("from api route")
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
            res.status(200).send(registeredUser)
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
                    res.status(200).send(user)
                }
            }
        }
    })
})

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
          }
    ]

    res.json(events)
})
router.get('/special',(req,res)=>{
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
          }
    ]

    res.json(special)
})

module.exports = router