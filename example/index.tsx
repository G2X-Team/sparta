import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, TextInput, Text, Checkbox, Radio, Switch, Group, ButtonGroup, Dropdown, Option, Card, Header, Footer } from '../.';

const App = () => {
  return (
    <div>
      <Button>Something</Button>
      <br />
      <br />
      <TextInput />
      <br />
      <br />
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
      <br />
      <Dropdown>
        <Button>
          <Button>Coolio</Button>
        </Button>
        <Option>What</Option>
        <Option>What</Option>
        <Option>What</Option>
      </Dropdown>
      <br />
      <Card style={{height: 200, width: 300}}>
        <Header>
            <Text header={2} bold>Custom Card</Text>
        </Header>
        <Text bold color="gray">What is this?</Text>
        <Text margins>This is a glorified div that supports headers and footers</Text>
        <Footer style={{borderTop: "1px solid lightgray"}}>
            <Text italic style={{marginTop: 10}}>per request :)</Text>
        </Footer>
    </Card>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
