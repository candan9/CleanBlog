const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')
const Post = require('./models/Post')

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

//Connect MONGODB
mongoose.connect('mongodb://localhost/cleanblog-test-db',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
//ROUT
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
