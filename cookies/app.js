const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Route to set a cookie
app.get('/user', (req, res) => {
    // Set a cookie named 'username' with value 'JohnDoe'
    res.cookie('jaymin', 'ghghghghghghghghghgghghghghghghghghgh', { maxAge: 900000, httpOnly: true });
    res.send('Cookie has been set');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
