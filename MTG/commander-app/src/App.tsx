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
        <MyButton />

      </header>
    </div>
  );
}

function MyButton() {
  return(
    <button>
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
