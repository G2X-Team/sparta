import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { 
  Button, 
  TextInput,
  Text,
  Checkbox,
  Radio,
  Switch,
  Group,
  ButtonGroup,
  Dropdown,
  Option,
  Card,
  Header,
  Footer,
  Drawer,
  Divider,
  Modal,
  Icon
} from '../.';

const App = () => {
  const [open, toggleOpen] = React.useState(false);
  const [modal, toggleModal] = React.useState(false);
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
      <br />
      <br />
      <Button onClick={() => toggleOpen(true)}>Click me</Button>
        <Drawer open={open} toggleOpen={() => toggleOpen(!open)}>
          <Header>
            <Text header={1} bold>Drawer</Text>
          </Header>
          <Option>This is your first option</Option>
          <Option>This is your second option</Option>
          <Divider />
          <Option>This is your third option</Option>
          <Footer>
            <Text color="gray" bold>This is an important text</Text>
          </Footer>
        </Drawer>
        <br />
        <br />
        <Button onClick={() => toggleModal(!open)}>Open Modal</Button>
        <Modal open={modal} toggleModal={() => toggleModal(!modal)}>
            <Header>
                <Text header={2} bold>This is a Modal</Text>
            </Header>
            <Text>This is a modal that shows dialogue.</Text>
            <Footer>
                <ButtonGroup>
                    <Button variant="secondary">Accept</Button>
                    <Button>Decline</Button>
                </ButtonGroup>
            </Footer>
        </Modal>
        <br />
        <br />
        <Icon name="keyboard_arrow_right"/>
        <br />
        <Icon onClick={() => console.log("Hello World")} name="keyboard_arrow_right"/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
