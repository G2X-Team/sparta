import React, { HTMLAttributes, ReactNode, useState, useEffect } from 'react';
import FormattedChildren from '../../util/FormattedChildren';
import './Group.css';

import { Radio } from '../Radio/Radio';
import { Checkbox } from '../Checkbox/Checkbox';
import { View } from '../View/View';

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Group must contain element between tags */
    children: ReactNode;
    /** Identifies the group's selection */
    name: string;
    /** Type of inputs this group will focus on */
    type: 'radio' | 'checkbox';
    /** Method that impacts onChange */
    onChange?: (groupValue: string[] | string) => void;
    /** Determines whether inputs are disabled or not */
    disabled?: boolean;
    /** Validates group value and determines whether it is submission ready */
    validator?: (value: string | string[]) => string | null;
    /** Determines whether the group requires a selection */
    required?: boolean;
}

/**
 * Component that will represent values derived from radios and checkboxes and pass them
 * as parameters to its repsective on change function
 *
 * @return Group component
 */
export const Group: React.FC<Props> = ({
    children,
    name,
    type,
    disabled = false,
    onChange,
    ...props
}: Props): JSX.Element => {
    // define group value
    const [radioValues, setRadioValue] = useState('');
    const [checkboxValues, setCheckboxValue] = useState<string[]>([]);

    // for checkboxes we want instant access to whether a checkbox is checked or not
    const [isChecked, updateChecked] = useState<{ [key: string]: boolean }>({});

    // every time there is a state change, invoke the onChange method if it exists
    useEffect(() => {
        if (type === 'radio') {
            onChange && onChange(radioValues);
        } else {
            onChange && onChange(checkboxValues);
        }
    }, [checkboxValues, radioValues]);

    /**
     * Formats all Radio components for final rendering
     *
     * @param radio all raw radio components
     * @return reformated radio objects
     */
    const formatRadio = (radio: JSX.Element): JSX.Element => {
        // get props
        const { props } = radio;
        const {
            onChange: radioOnChange,
            name: radioName,
            checked: radioChecked,
            disabled: radioDisabled,
            value: radioValue,
            ...radioProps
        } = props;

        /**
         * Updates value and fires original onChange method
         */
        const onChange = (): void => {
            setRadioValue(radioValue);
            radioOnChange && radioOnChange();
        };

        return (
            <Radio
                {...radioProps}
                disabled={disabled || radioDisabled}
                name={name}
                key={Math.random()}
                checked={radioValues === radioValue}
                onChange={onChange}
            />
        );
    };

    /**
     * Formats all checkbox components for final rendering
     *
     * @param checkbox all raw checkbox components
     * @return reformated checkbox objects
     */
    const formatCheckbox = (checkbox: JSX.Element): JSX.Element => {
        const { props } = checkbox;

        // gets all non-conflicting checkbox props
        const {
            name: checkboxName,
            checked: checkboxChecked,
            disabled: checkboxDisabled,
            value: checkboxValue,
            onChange: checkboxOnChange,
            ...checkboxProps
        } = props;

        /**
         * Updates value and fires original onChange method
         */
        const onChange = (): void => {
            // add to values if it is checked, remove it if it isn't
            if (isChecked[checkboxValue]) {
                isChecked[checkboxValue] = false;
                setCheckboxValue(checkboxValues.filter((value: string) => value !== checkboxValue));
            } else {
                isChecked[checkboxValue] = true;
                setCheckboxValue([...checkboxValues, checkboxValue]);
            }

            // update checked checkboxes
            updateChecked(isChecked);

            // run the onChange method if it exists
            checkbox?.props?.onChange && checkbox?.props?.onChange();
        };

        return (
            <Checkbox
                {...checkboxProps}
                disabled={disabled || checkboxDisabled}
                name={name}
                key={Math.random()}
                checked={isChecked[checkboxValue]}
                onChange={onChange}
            />
        );
    };

    /**
     * Formats all View components for final rendering
     *
     * @param view all found views
     * @return formatted views
     */
    const formatView = (view: JSX.Element): JSX.Element => {
        const { props: viewProps } = view;
        const { children: viewChildren } = viewProps;

        return (
            <View {...viewProps} key={Math.random()}>
                {renderAll(viewChildren)}
            </View>
        );
    };

    /**
     * Renders all inputs determinant on the specific type
     *
     * @param childrenProp implements children view when available
     * @return rendered components
     */
    const renderAll = (childrenProp: ReactNode): ReactNode[] => {
        // determine what component we are looking for
        const Input: React.FC<any> = type === 'radio' ? Radio : Checkbox;

        // get all instances of the input
        const formatted = new FormattedChildren(childrenProp, [Input, View]);

        // get all inputs
        formatted.format(Input, type === 'radio' ? formatRadio : formatCheckbox);
        formatted.format(View, formatView);

        return formatted.getAll();
    };

    return <div {...props}>{renderAll(children)}</div>;
};
