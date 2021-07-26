const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const [, , password, name, number] = process.argv;

if (name && typeof number === 'undefined') {
  console.log('Please provide the number as an argument: node mongo.js <password> <name> <number>');
  process.exit(1);
}

const create = Boolean(name && number);

const url =
  `mongodb+srv://fullstack:${password}@cluster0.daooz.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true });

const personSchema = mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (create) {
  const person = new Person({
    name,
    number
  });

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close();
  })
} else {
  // Print all existing models.
  console.log('phonebook:');

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  })
}
