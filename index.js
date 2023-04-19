const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');

// Create express app
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Welcome to the Task Manager app. APIs available at /api');
});

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const PORT = process.env.PORT || 8000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      'Server is successfully running and app is listening on port ' + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
