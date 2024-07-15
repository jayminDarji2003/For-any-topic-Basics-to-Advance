# Ejs : template engine

## working with ejs

```
npm install ejs
```

Ejs-express docs : https://github.com/mde/ejs/wiki/Using-EJS-with-Express

## NOTES TO REMEMBER

<h3>

- Folder name must be -> views
  <br>

- In side views file extension must be -> .ejs

</h3>

## send file

```
app.get('/', (req, res) => {
    res.render("index");
})
```

## send data to file

```
app.get('/blog/:slug', (req, res) => {
    let title = "addidas what and when?";
    let description = "it's a great brand."
    res.render("blogpost", { title: title, description: description })
})

```

## here you can access data in ejs file

```
<h1>Blog title : <%= title %></h1>
<h2>Blog description : <%= description %></h2>
```

## You can create a different component and include in index file

```
  <%- include("navbar"); %>
```
