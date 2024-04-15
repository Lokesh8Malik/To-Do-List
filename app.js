const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname+'/views/partials'));

app.set('view engine','hbs');
let todos = ["Coding","Moving","Cycling"]
app.get('/',(req,res)=>{
    res.render('index',{
        todos
    })
})

app.get('/addtask',(req,res)=>{
    let {task} = req.query;
    todos.push(task);
    res.redirect('/');
})

app.get('/increase',(req,res)=>{
    let {task} = req.query;
    let indx = todos.indexOf(task);
    if (indx > 0)
            [todos[indx - 1], todos[indx]] = [todos[indx], todos[indx - 1]];
    res.redirect('/');
})

app.get('/decrease',(req,res)=>{
    let {task} = req.query;
    let indx = todos.indexOf(task);
    if (indx >= 0 && indx < todos.length-1)
            [todos[indx + 1], todos[indx]] = [todos[indx], todos[indx + 1]];
    res.redirect('/');
})

app.get('/delete',(req,res)=>{
    let {task} = req.query;
    // let index = todos.indexOf(task);
    // [todos[index+1],todos[index]]=[todos[index],todos[index+1]];

    todos = todos.filter((d)=>d!=task);
    res.redirect('/');
})






app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})