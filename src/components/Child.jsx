import React from "react";

const Child = (props) => {
  const people = props.people;

  return (
    <div>
      <h2>People List:</h2>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            <span>Name: {person.name}</span>
            <span>Age: {person.age}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Child;
