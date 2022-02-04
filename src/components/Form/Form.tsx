import type { HTMLAttributes, FC } from 'react';
import React, { SyntheticEvent, ReactNode, useState, useEffect } from 'react';
import FormatChildren from '../../util/FormatChildren';

import Label from './overload/Label';
import Group from './overload/Group';
import TextInput from './overload/TextInput';
import View from './overload/View';
import Switch from './overload/Switch';

export interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> {
    /** if the submission occurs with invalid inputs, it will call the on fail instead*/
    onFail?: (errors: string[]) => void;
    /** on submit call back method */
    onSubmit?: (
        event: SyntheticEvent,
        value: { [input: string]: string | string[] | boolean }
    ) => void;
    // on change method updates form object
    onChange?: (value: { [input: string]: string | string[] | boolean }) => void;
}

/**
 * Component that keeps track of all its children's inputs with validation baked in
 *
 * @return Form component
 */
export const Form: FC<Props> = ({
    onFail = (errors) => window.alert(...errors),
    onSubmit,
    children,
    onChange,
    ...props
}: Props) => {
    // state
    const [formValue, setFormValue] = useState<{ [input: string]: string | string[] | boolean }>(
        {}
    );
    const [validMap, setValidMap] = useState<{ [input: string]: boolean }>({});
    const [errorMessages, setErrorMessages] = useState<{ [input: string]: string }>({});
    const [required, setRequired] = useState<{ [input: string]: string }>({});

    // activate on change when form value changes
    useEffect(() => {
        onChange && onChange(formValue);
        setRequired(required);
    }, [formValue]);

    /**
     * Renders all children formatted accordingly
     *
     * @param childrenProp children provided by parent component
     * @return formatted react
     */
    const renderAll = (childrenProp: ReactNode): JSX.Element[] => {
        // restructure props and add pass through functionality
        const parentProps = {
            parentRequired: required,
            setParentRequired: setRequired,
            children: childrenProp,
            formValue,
            setFormValue,
            validMap,
            setValidMap,
            errorMessages,
            setErrorMessages,
            renderAll,
        };

        // get all formatted children
        const formatted = new FormatChildren(parentProps, {
            Label,
            Group,
            TextInput,
            View,
            Switch,
        });

        return formatted.getAll();
    };

    /**
     * Modified on submit method that executes on submit when all conditions are met
     *
     * @param event form on submit method
     */
    const formOnSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();

        // check if all inputs are valid
        const errors: string[] = [];
        // find if there are required fields not yet in valid map
        Object.keys(required).forEach((input: string) => {
            if (validMap[input] === undefined || !formValue[input]) {
                errors.push(required[input]);
            }
        });

        if (errors.length > 0) {
            onFail(errors);
        } else {
            Object.keys(validMap).forEach((input: string) => {
                if (!validMap[input]) {
                    errors.push(errorMessages[input]);
                }
            });

            if (errors.length > 0) {
                onFail(errors);
            } else {
                // if everything checks out, run the on submit callback
                onSubmit && onSubmit(event, formValue);
            }
        }
    };

    return (
        <form {...props} onSubmit={(event: SyntheticEvent) => formOnSubmit(event)}>
            {renderAll(children)}
        </form>
    );
};
