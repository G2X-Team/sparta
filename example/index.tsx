import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, TextInput, Text, Checkbox, Radio, Switch, Group, ButtonGroup, Dropdown, Option } from '../.';

const App = () => {
  return (
    <div>
      <Button>Something</Button>
      <TextInput />
      <Text bold header={1}>Hello There</Text>
      <Radio value="1">What's good</Radio>
      <Checkbox value="1">Bruh</Checkbox>
      <Switch variant="secondary">Bruh</Switch>
      <Group name="cool" type="radio" onGroupChange={(value) => console.log(value)}>
        <Radio value="1">What's good</Radio>
        <Radio value="2">What's good</Radio>
        <Radio value="3">What's good</Radio>
      </Group>
      <ButtonGroup size="small">
        <Button>Sup</Button>
        <Button>Sup</Button>
      </ButtonGroup>
      <Dropdown>
        <Button>
          <Button>Coolio</Button>
        </Button>
        <Option>What</Option>
        <Option>What</Option>
        <Option>What</Option>
      </Dropdown>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
