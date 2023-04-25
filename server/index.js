require('dotenv').config()
const {sequelize} = require('./Util/database')
const PORT = 4005
const {User} = require('./Models/user')
const {Post} = require('./Models/post')
const express = require('express')
const cors= require('cors')


const {register,login} = require('./Controllers/auth')
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require('./Controllers/posts')
const {isAuthenticated} =require('./Middleware/isAuthenticated')

const app = express()
User.hasMany(Post)
Post.belongsTo(User)

app.use(express.json())
app.use(cors())


app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)
app.get('/userposts/:userId', getCurrentUserPosts)

app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)

app.delete('/posts/:id',isAuthenticated, deletePost)



sequelize.sync()
.then(() => {
    app.listen(3000, ()=> {console.log(`Server is running on port ${PORT}`);})
})