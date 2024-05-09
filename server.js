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

//Update Tasks

app.put('/tasks/:id' , (req,res)=>{
    const task_id = parseInt(req.params.id);
    const {title , description , status} = req.body;

     const task_to_update = tasks.find(task => task.id ===task_id);
     if(!task_to_update){
        return res.status(404).json({error: 'Task not found'});

     }


     task_to_update.title = title || task_to_update.title;
     task_to_update.description = description || task_to_update;
     task_to_update.status = status || task_to_update.status;

     res.json(task_to_update);

})

app.listen(3000,()=>{
    console.log('Node API is running on port 3000')
});