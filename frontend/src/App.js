import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ notification, setNotification ] = useState({
    message: null,
    isError: false
  });

  useEffect(() => {
    personService.getAll()
      .then(allPersons => {
        setPersons(allPersons);
      })
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const setFadingNotification = (message, isError = false, timeout = 5000) => {
    setNotification({
      message,
      isError
    });

    setTimeout(() => {
      setNotification({
        message: null,
        isError: false
      });
    }, timeout);
  }

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    };

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setFadingNotification(`Added ${returnedPerson.name}`);
      });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const personsToDisplay = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const deletePersonById = (id) => {
    const person = persons.find(p => p.id === id);
    const deleteConfirmed = window.confirm(`Delete ${person.name} ?`);

    if (deleteConfirmed === false) {
      return;
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
  };

  const updatePhoneNumber = (personId) => {
    const person = persons.find(p => p.id === personId);
    const updateConfirmed = window.confirm(
      `${person.name} is already added to the phonebook, `
      + 'replace the old number with a new one?'
    );

    if (updateConfirmed === false) {
      return;
    }

    const updatedPerson = {
      ...person,
      number: newNumber
    };

    personService
      .update(personId, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map(
          p => p.id !== returnedPerson.id ? p : returnedPerson
        ));
        setNewName('');
        setNewNumber('');
        setFadingNotification(`Changed the number of ${returnedPerson.name}`);
      })
      .catch((error) => {
        setFadingNotification(`The person '${updatedPerson.name}' was already deleted from server`, true);
      })
  };

  const addOrUpdatePerson = (event) => {
    event.preventDefault();

    const person = persons.find(person => person.name === newName);
    if (person) {
      updatePhoneNumber(person.id);
    } else {
      addPerson();
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError} />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addOrUpdatePerson={addOrUpdatePerson}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} deletePersonById={deletePersonById} />
    </div>
  );
};

export default App;
