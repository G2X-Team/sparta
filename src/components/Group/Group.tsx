import React, { HTMLAttributes, ReactNode, useState, useEffect } from 'react';
import './Group.css';

import { findAll, FoundChild, FoundChildren, getComponents } from '../../util/findAll';

import { Radio } from '../Radio/Radio';
import { Checkbox } from '../Checkbox/Checkbox';
import { View } from '../View/View';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Group must contain element between tags */
    children: ReactNode;
    /** Identifies the group's selection */
    name: string;
    /** Type of inputs this group will focus on */
    type: 'radio' | 'checkbox';
    /** Method that impacts onChange */
    onGroupChange?: (groupValue: string[] | string) => void;
    /** Determines whether inputs are disabled or not */
    disabled?: boolean;
}

/**
 * Component that will represent values derived from radios and checkboxes and pass them
 * as parameters to its repsective on change function
 *
 * @return Group component
 */
export const Group = ({
    children,
    name,
    type,
    disabled = false,
    onGroupChange,
    ...props
}: Props): JSX.Element => {
    // define group value
    const [radioValue, setRadioValue] = useState('');
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

    // for checkboxes we want instant access to whether a checkbox is checked or not
    const [isChecked, updateChecked] = useState<{ [key: string]: boolean }>({});

    // every time there is a state change, invoke the onGroupChange method if it exists
    useEffect(() => {
        if (type === 'radio') {
            onGroupChange && onGroupChange(radioValue);
        } else {
            onGroupChange && onGroupChange(checkboxValue);
        }
    });

    /**
     * Renders all inputs determinant on the specific type
     *
     * @param viewChildren implements children view when available
     * @return rendered components
     */
    const renderAll = (viewChildren: ReactNode): ReactNode[] => {
        // determine what component we are looking for
        const input: ReactNode = type === 'radio' ? Radio : Checkbox;
        const inputType: string = type.slice(0, 1).toUpperCase() + type.slice(1);

        // get all instances of the input
        const components: FoundChildren = findAll(viewChildren, [input, View]);

        // get all inputs
        components[inputType] =
            type === 'radio'
                ? formatRadios(components.Radio)
                : formatCheckboxes(components.Checkbox);

        // gets all views
        components.View = formatViews(components?.View);

        return getComponents(components);
    };

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
        const radioOnChange = (radio: JSX.Element): void => {
            setRadioValue(radio.props.value);
            radio?.props?.onChange && radio?.props?.onChange();
        };

        // get group name to later assign to all Radios
        return radios.map((radio: FoundChild) => {
            // abstracts the radio component for cleaner code
            const { component } = radio;
            const { props } = component;

            // gets all non-conflicting radio props
            const {
                onChange,
                name: radioName,
                checked,
                disabled: radioDisabled,
                ...radioProps
            } = props;

            return {
                component: (
                    <Radio
                        {...radioProps}
                        disabled={disabled || radioDisabled}
                        name={name}
                        key={Math.random()}
                        checked={component.props.value === radioValue}
                        onChange={() => radioOnChange(component)}
                    />
                ),
                index: radio.index,
            };
        });
    };

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
        const checkboxOnChange = (checkbox: JSX.Element): void => {
            // add to values if it is checked, remove it if it isn't
            if (isChecked[checkbox.props.value]) {
                isChecked[checkbox.props.value] = false;
                setCheckboxValue(
                    checkboxValue.filter((value: string) => value !== checkbox.props.value)
                );
            } else {
                isChecked[checkbox.props.value] = true;
                setCheckboxValue([...checkboxValue, checkbox.props.value]);
            }

            // update checked checkboxes
            updateChecked(isChecked);

            // run the onChange method if it exists
            checkbox?.props?.onChange && checkbox?.props?.onChange();
        };

        return checkboxes.map((checkbox: FoundChild) => {
            // abstracts the checkbox component for cleaner code
            const { component } = checkbox;
            const { props } = component;

            // gets all non-conflicting checkbox props
            const {
                onChange,
                name: checkboxName,
                checked,
                disabled: checkboxDisabled,
                ...checkboxProps
            } = props;

            return {
                component: (
                    <Checkbox
                        {...checkboxProps}
                        disabled={disabled || checkboxDisabled}
                        name={name}
                        key={Math.random()}
                        checked={isChecked[component.props.value]}
                        onChange={() => checkboxOnChange(component)}
                    />
                ),
                index: checkbox.index,
            };
        });
    };

    /**
     * Formats all View components for final rendering
     *
     * @param views all found views
     * @return formatted views
     */
    const formatViews = (views: FoundChild[]): FoundChild[] => {
        return views?.map((view: FoundChild) => {
            // abstract the component for cleaner code
            const { component } = view;

            return {
                component: (
                    <View {...component.props} key={Math.random()}>
                        {renderAll(component.props.children)}
                    </View>
                ),
                index: view.index,
            };
        });
    };

    return <div {...props}>{renderAll(children)}</div>;
};
