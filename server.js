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

      const new_task = {
        id: tasks.length + 1,
        title,
        description,
        status
      };
      
      tasks.push(new_task);
      res.status(201).json(new_task);

});


//Read tasks
app.get('/tasks' , (req,res)=>{
    res.json(tasks);
});

// Update Task
app.put('/tasks/:id', (req, res) => {
    const task_id = parseInt(req.params.id);
    const { title, description, status } = req.body;

    console.log('Updating task with ID:', task_id);
    console.log('New task data:', { title, description, status });

    // Find index of task in tasks array
    const task_index = tasks.findIndex(task => task.id === task_id);

    // If task not found, return 404 error
    if (task_index === -1) {
        console.log('Task not found');
        return res.status(404).json({ error: 'Task not found' });
    }

    // Update task with new data
    tasks[task_index].title = title || tasks[task_index].title;
    tasks[task_index].description = description || tasks[task_index].description;
    tasks[task_index].status = status || tasks[task_index].status;

    console.log('Task updated successfully');
    res.json({ message: 'Task updated successfully', task: tasks[task_index] });
});


// Delete Task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
});


app.listen(3000,()=>{
    console.log('Node API is running on port 3000')
});