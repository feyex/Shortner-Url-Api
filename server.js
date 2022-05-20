const express = require('Express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
config = require('./App/db');
// require('./Modules/Models/url');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Unable to connect to the database'+ err)}
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const urlRoute = require('./Modules/Routes/urlRoute'); 

// api routes
app.use('/v1', urlRoute);

// start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});