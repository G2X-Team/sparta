import React, { HTMLAttributes, ReactNode, useState, useEffect } from 'react';
import './Group.css';

import { findAll, FoundChild, FoundChildren } from '../../util/findAll'

import { Radio } from '../Radio/Radio';
import { Checkbox } from '../Checkbox/Checkbox';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Group must contain element between tags */
    children: ReactNode;
    /** Identifies the group's selection */
    name: string;
    /** Type of inputs this group will focus on */
    type: "radio" | "checkbox";
    /** Method that impacts onChange */
    onGroupChange?: (groupValue: string[] | string) => void;
}

/** 
 * Component that will represent values derived from radios and checkboxes and pass them
 * as parameters to its repsective on change function
 */
export const Group = ({children, name, type, onGroupChange, ...props}: Props) => {
    // define group value
    const [value, setValue] = useState<string | string[]>("");

    // every time there is a state change, invoke the onGroupChange method if it exists
    useEffect(() => {
        onGroupChange && onGroupChange(value);
    })

    /**
     * Renders all inputs determinant on the specific type
     */
    const renderInputs = (): ReactNode[] => {
        // determine what component we are looking for
        const input: ReactNode = type === "radio" ? Radio : Checkbox;

        // get all instances of the input
        const components: FoundChildren = findAll(children, [input]);

        // get all inputs
        const inputs: FoundChild[] = formatRadios(components.Radio);

        // return inputs as ReactNodes
        return inputs.map((input: FoundChild) => input.component);
    }

    /**
     * Formats all Radio components for final rendering
     * 
     * @param radios all raw radio components
     * @return reformated radio objects
     */
    const formatRadios = (radios: FoundChild[]): FoundChild[] => {
        /**
         * Updates value and fires original onChange method
         * 
         * @param radio radio component
         */
        const radioOnChange = (radio: any) => {
            setValue(radio.props.value);
            radio?.props?.onChange && radio?.props?.onChange();
        }

        // get group name to later assign to all Radios
        const groupName: string = name;

        return radios.map((radio: FoundChild) => {
            // abstracts the radio component for cleaner code
            const component: JSX.Element = radio.component;
            
            // gets all non conflicting radio props
            const {onChange, name, checked, ...radioProps} = component.props;

            return {
                component: (
                    <Radio 
                        {...radioProps}
                        name={groupName}
                        key={Math.random()}
                        checked={component.props.value === value}
                        onChange={() => radioOnChange(component)} 
                    />
                ),
                index: radio.index
            }
        })
    }

    return (
        <div {...props}>
            {renderInputs()}
        </div>
    )
}