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
    const [radioValue, setRadioValue] = useState("");
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

    // for checkboxes we want instant access to whether a checkbox is checked or not
    const [isChecked, updateChecked] = useState<{[key: string]: boolean}>({});

    // every time there is a state change, invoke the onGroupChange method if it exists
    useEffect(() => {
        if (type === "radio") {
            onGroupChange && onGroupChange(radioValue);
        } else {
            onGroupChange && onGroupChange(checkboxValue);
        }
    })

    /**
     * Renders all inputs determinant on the specific type
     */
    const renderAll = (): ReactNode[] => {
        // determine what component we are looking for
        const input: ReactNode = type === "radio" ? Radio : Checkbox;

        // get all instances of the input
        const components: FoundChildren = findAll(children, [input]);

        // get all inputs
        const inputs: FoundChild[] = type === "radio" 
            ? formatRadios(components.Radio)
            : formatCheckboxes(components.Checkbox)

        // store all components
        const all: ReactNode[] = [];

        // sort all components
        [...inputs, ...components.other].forEach((child: FoundChild) => all[child.index] = child.component);

        // return inputs as ReactNodes
        return all;
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
            setRadioValue(radio.props.value);
            radio?.props?.onChange && radio?.props?.onChange();
        }

        // get group name to later assign to all Radios
        const groupName: string = name;

        return radios.map((radio: FoundChild) => {
            // abstracts the radio component for cleaner code
            const component: JSX.Element = radio.component;
            
            // gets all non-conflicting radio props
            const {onChange, name, checked, ...radioProps} = component.props;

            return {
                component: (
                    <Radio 
                        {...radioProps}
                        name={groupName}
                        key={Math.random()}
                        checked={component.props.value === radioValue}
                        onChange={() => radioOnChange(component)} 
                    />
                ),
                index: radio.index
            }
        })
    }

    /**
     * Formats all checkbox components for final rendering
     * 
     * @param checkboxes all raw checkbox components
     * @return reformated checkbox objects
     */
     const formatCheckboxes = (checkboxes: FoundChild[]): FoundChild[] => {
        /**
         * Updates value and fires original onChange method
         * 
         * @param checkbox radio component
         */
         const checkboxOnChange = (checkbox: any) => {
            // add to values if it is checked, remove it if it isn't
            if (isChecked[checkbox.props.value]) {
                isChecked[checkbox.props.value] = false;
                setCheckboxValue(checkboxValue.filter((value: string) => value !== checkbox.props.value));
            } else {
                isChecked[checkbox.props.value] = true;
                setCheckboxValue([...checkboxValue, checkbox.props.value]);
            }

            // update checked checkboxes
            updateChecked(isChecked); 

            // run the onChange method if it exists
            checkbox?.props?.onChange && checkbox?.props?.onChange();
        }

        // get group name to later assign to all checkboxes
        const groupName: string = name;

        return checkboxes.map((checkbox: FoundChild) => {
            // abstracts the checkbox component for cleaner code
            const component: JSX.Element = checkbox.component;
            
            // gets all non-conflicting checkbox props
            const {onChange, name, checked, ...checkboxProps} = component.props;

            return {
                component: (
                    <Checkbox 
                        {...checkboxProps}
                        name={groupName}
                        key={Math.random()}
                        checked={isChecked[component.props.value]}
                        onChange={() => checkboxOnChange(component)} 
                    />
                ),
                index: checkbox.index
            }
        })
    }

    return (
        <div {...props}>
            {renderAll()}
        </div>
    )
}