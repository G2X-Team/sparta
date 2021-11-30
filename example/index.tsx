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
  Icon,
  Label,
  Form
} from '../.';

const App = () => {
  const [open, toggleOpen] = React.useState(false);
  const [modal, toggleModal] = React.useState(false);

    /**
     * Checks if the password matches the validator requirements
     *
     * @param value value in the input
     * @return object describing validaty and errors
     */
    const passwordValidator = (value: string): string | null => {
        if (value.length < 8) return 'Password must be 8 characters';

        return null;
    };
  
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
		<br />
        <Label value="This is a text input">
        	<TextInput placeholder="Text Input"/>
        </Label>

        <Form
        onSubmit={(event, value) => window.alert('Success!')}
        onChange={(value) => console.log(value)}
    >
        <Text header={1} bold margins>
            Survey
        </Text>
        <Label value="Full Name">
            <TextInput name="full-name" required placeholder="John Smith" />
        </Label>
        <br />
        <Label value="Survey Password" hint="Please enter given 8 character password.">
            <TextInput
                password
                required
                name="password"
                placeholder="********"
                validator={passwordValidator}
            />
        </Label>
        <br />
        <br />
        <Label value="What video(s) did you watch for class?">
            <Group name="movie" type="checkbox" required>
                <Checkbox value="the-night-before-christmas">The Night Before Christmas</Checkbox>
                <br />
                <Checkbox value="jack-frost">Jack Frost</Checkbox>
                <br />
                <Checkbox value="frosty-the-snowman">Frosty the Snowman</Checkbox>
                <br />
            </Group>
        </Label>
        <br />
        <br />
        <Label value="Please rate the class from 1-5">
            <Group name="rating" type="radio" required>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
            </Group>
        </Label>
        <br />
        <Switch name="do-again">What you like to do this again?</Switch>
        <br />
        <Button>Submit</Button>
    </Form>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
