const express = require('express')
const app= express()

//routes
app.get('/',(req,res)=>{
    res.sendend('Hellow')
})

app.get('/blog',(req,res)=>{
    res.send("hello motherfucker Rumi")
})

app.listen(3000,()=>{
    console.log('Node API is running on port 3000')
})