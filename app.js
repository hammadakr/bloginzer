require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = process.env.PORT || 8001;

const Blog = require('./models/blog');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

mongoose
    .connect(process.env.MONGO_URL)
    .then(e => console.log('MongoDb connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));