import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, TextInput } from '../.';

const App = () => {
  return (
    <div>
      <Button>Something</Button>
      <TextInput />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
