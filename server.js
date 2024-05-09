const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Memory
let tasks=[];

app.use(bodyParser.json());

//Create task
app.post('/tasks', (req,res)=>{
    const {title, description, status}= req.body;
    if (!title || !status) {
        return res.status(400).json({ error: 'Title and status are required.' });
      }

      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status
      };
      
      tasks.push(newTask);
      res.status(201).json(newTask);

});


//Read tasks
app.get('/tasks' , (req,res)=>{
    res.json(tasks);
});


app.listen(3000,()=>{
    console.log('Node API is running on port 3000')
});