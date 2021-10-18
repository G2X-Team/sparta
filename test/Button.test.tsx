import React from 'react'
import { Default as Button } from '../stories/Button.stories';
import * as ReactDOM from 'react-dom';

describe('button', () => {
    it("render without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>Click Me</Button>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
})