const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');  // it says : uses ejs template engine

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/blog/:slug', (req, res) => {
    let title = "addidas what and when?";
    let description = "it's a great brand."
    res.render("blogpost", { title: title, description: description })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})