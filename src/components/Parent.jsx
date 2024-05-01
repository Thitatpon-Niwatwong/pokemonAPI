import React from "react";
import Child from "./Child";

const Parent = () => {
  const people = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Alice", age: 25 },
    { id: 3, name: "Bob", age: 35 },
  ];

  return (
    <div>
      <Child people={people} />
    </div>
  );
};

export default Parent;
