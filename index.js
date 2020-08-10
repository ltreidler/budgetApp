const express = require('express');

const app = express();

require('./routes/authRoutes')(app);
require('./services/passport');

app.get('/', (req,res) => {
    res.send('Thanks!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);