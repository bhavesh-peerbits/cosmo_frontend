import { useState } from 'react';
import { Button, Search, Slider, Theme } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import logo from './logo.svg';
import 'style/app.scss';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Theme theme="g100">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!0 1</p>
          <Add />
          <div className="p-10 bg-primary space-y-5">
            <Slider
              value={50}
              min={30}
              max={100}
              step={1}
              stepMultiplier={10}
              onChange={value => setCount(value.value)}
            />
            <Search labelText="ciao" placeholder="sm" size="lg" id="search-1" />
            <Button onClick={() => setCount(c => c + 1)}>count is: {count}</Button>
          </div>
        </header>
      </div>
    </Theme>
  );
}

export default App;
