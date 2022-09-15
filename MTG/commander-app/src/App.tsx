import React from 'react';
import logo from './logo.svg';
import './App.css';

type User = {
  name: string;
  description: string;
}

let user: User = {
  name: "Jeff",
  description: "A cool guy"
}

const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form action="http://localhost:5000/signup" method="POST">
          <input type="text" name="fullname" placeholder="fullname"></input>
          <input type="text" name="username" placeholder="username"></input>
          <input type="text" name="password" placeholder="password"></input>
          <MyButton />
        </form>
      </header>
    </div>
  );
}

function MyButton() {
  return(
    <button type="submit">
      <p>Begin</p>
    </button>
  );
}

function ListFood()
{
  const test = products.map(product =>
    <h1>{product.title}</h1>
  );

  return (
    <>{test}</>
    );
}

export default App;
