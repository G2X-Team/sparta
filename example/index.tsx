import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, TextInput, Text, Checkbox, Radio, Switch } from '../.';

const App = () => {
  return (
    <div>
      <Button>Something</Button>
      <TextInput />
      <Text bold header={1}>Hello There</Text>
      <Radio>What's good</Radio>
      <Checkbox>Bruh</Checkbox>
      <Switch variant="secondary">Bruh</Switch>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
