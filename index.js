const express = require('express');

const app = express();

app.use(express.json());

let persons = [
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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const generateId = () => {
  const max = 10000;
  const id = getRandomInt(max);

  return id;
}

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

app.post('/api/persons', (req, res) => {
  const { body } = req;

  let error = null;

  if (!body.name) {
    error = 'name missing';
  } else if (!body.number) {
    error = 'number missing';
  }

  if (error) {
    return res.status(400).json({
      error
    });
  }

  const id = generateId();

  const person = {
    id,
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);

  res.status(201).json(person);
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

app.delete('/api/persons/:personId', (req, res) => {
  const personId = Number(req.params.personId);
  persons = persons.filter((p) => p.id !== personId);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
