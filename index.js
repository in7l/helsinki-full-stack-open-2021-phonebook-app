const express = require('express');

const app = express();

const persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

app.get('/info', (req, res) => {
  const currentDate = new Date();
  const dateString = currentDate.toString();

  res.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  res.write(`<p>${dateString}</p>`)
  res.end();
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:personId', (req, res) => {
  const personId = Number(req.params.personId);
  const person = persons.find((p) => p.id === personId);
  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
