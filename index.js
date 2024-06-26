const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post("/notifications", (req, res) => {
    // extract validationToken query param
    const validationToken = req.query.validationToken;

    // console.log({validationToken});
    console.log(JSON.stringify(req.body));

    // res content type of text/plain.
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(validationToken);
    }
);

app.post("/event-grid-notifications", (req, res) => {
  const events = req.body;
  const validationEvent = events.find((e) => e.eventType === 'Microsoft.EventGrid.SubscriptionValidationEvent')

  const {validationCode} = validationEvent?.data || {};

  // console.log({validationToken});
  console.log(JSON.stringify(req.body));

  // res content type of text/plain.
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send({validationResponse: validationCode});
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Notifications service listening at http://localhost:${PORT}`)
})