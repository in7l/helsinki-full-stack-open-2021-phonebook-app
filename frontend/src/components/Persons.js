import Person from './Person';

const Persons = ({ persons, deletePersonById }) => (
  <div>
    {persons.map(person =>
      <Person
        key={person.name}
        person={person}
        deletePerson={() => deletePersonById(person.id)}
        />
    )}
  </div>
);

export default Persons;
