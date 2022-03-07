const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.listen(3000,()=>{
    console.log('LISTENING ON PORT 3000');
});

//configuring views
app.set('views',path.join(__dirname,'/views'));
//setting view engine
app.set('view engine','ejs');
//form data middleware to parse data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//for method overriding
app.use(methodOverride('_method'));

//uuid generator
const { v4: getId } = require('uuid'); 

//faking comment data
let comments = [
    {
        id:getId(),
        username:'Todd',
        comment: 'lol its so funnyy'
    },
    {
        id:getId(),
        username:'lotto',
        comment: 'hahaha what the fuckk'
    },
    {
        id:getId(),
        username:'tim',
        comment: 'didnt expected that lol ll'
    },
    {
        id:getId(),
        username:'john',
        comment: 'hehehe this is totally unexpected'
    }
]


//setting up index route
app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
});

//setting up create route
app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
});

app.post('/comments',(req,res)=>{
    let {username,comment} = req.body;
    comments.push({id:getId(),username:username,comment:comment});
    //redirect user to a different page(by default get request)
    res.redirect('/comments');
});

//setting up show route(details about specific comment)
app.get('/comments/:id',(req,res)=>{
    let {id} = req.params;
    let commentData = comments.find(c => c.id === id);
    res.render('comments/show',{commentData});
});

//setting up updating route
app.patch('/comments/:id',(req,res)=>{
    //console.log(req.body);
    //res.send('ALL good');
    const {id} = req.params;
    let foundComment = comments.find(c => c.id === id);
    newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

    //route for serving the form  to edit
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    let foundComment = comments.find(c => c.id === id);
    res.render('comments/edit',{foundComment});
});

//setting up Destroying route
app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    //let foundComment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id!== id);
    res.redirect('/comments');
});