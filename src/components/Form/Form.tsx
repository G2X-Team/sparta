import React, { HTMLAttributes, SyntheticEvent, ReactNode, useState, useEffect } from 'react';
import FormattedChildren from '../../util/FormattedChildren';

import { Label } from '../Label/Label';
import { Group } from '../Group/Group';
import { TextInput } from '../TextInput/TextInput';
import { View } from '../View/View';

export interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'> {
    /** if the submission occurs with invalid inputs, it will call the on fail instead*/
    onFail?: (errors: string[]) => void;
    /** on submit call back method */
    onSubmit?: (event: SyntheticEvent, value: { [input: string]: string | string[] }) => void;
    // on change method updates form object
    onChange?: (value: { [input: string]: string | string[] }) => void;
}

/**
 * Component that keeps track of all its children's inputs with validation baked in
 *
 * @return Form component
 */
export const Form: React.FC<Props> = ({
    onFail = (errors) => window.alert(...errors),
    onSubmit,
    children,
    onChange,
    ...props
}: Props) => {
    // state
    const [formValue, setFormValue] = useState<{ [input: string]: string | string[] }>({});
    const [validMap, setValidMap] = useState<{ [input: string]: boolean }>({});
    const [errorMessages, setErrorMessages] = useState<{ [input: string]: string }>({});

    // activate on change when form value changes
    useEffect(() => {
        onChange && onChange(formValue);
    }, [formValue]);

    /**
     * Formats label component
     *
     * @param label unformatted label component
     * @return formatted label component
     */
    const formatLabel = (label: JSX.Element): JSX.Element => {
        // extract props
        const { props: labelProps } = label;
        const { children: labelChildren } = labelProps;

        return <Label {...labelProps}>{renderAll(labelChildren)}</Label>;
    };

    /**
     * Format view component
     *
     * @param view unformatted view
     * @return formatted view
     */
    const formatView = (view: JSX.Element): JSX.Element => {
        // extract props
        const { props: viewProps } = view;
        const { children: viewChildren } = viewProps;

        return <View {...viewProps}>{viewChildren}</View>;
    };

    /**
     * Formats group component
     *
     * @param group unformatted group component
     * @return formatted group component
     */
    const formatGroup = (group: JSX.Element): JSX.Element => {
        // extract props
        const { props: groupProps } = group;
        const {
            children: groupChildren,
            onChange: groupOnChange,
            name: groupName,
            required: groupRequired,
        } = groupProps;

        /**
         * Modifies group's on change callback to modify the form value
         *
         * @param value group value
         */
        const modifiedOnChange = (value: string | string[]): void => {
            // check that its valid
            if (groupRequired && !value.length) validMap[groupName] = false;

            // update form value
            formValue[groupName] = value;
            groupOnChange && groupOnChange();

            setFormValue({ ...formValue, [groupName]: value });
        };

        return (
            <Group name={groupName} onChange={modifiedOnChange} {...groupProps}>
                {groupChildren}
            </Group>
        );
    };

    /**
     * Formatted text input
     *
     * @param textInput unformatted text input
     * @return formatted text input
     */
    const formatTextInput = (textInput: JSX.Element): JSX.Element => {
        // extract props
        const { props: textInputProps } = textInput;
        const {
            validator,
            required: textInputRequired,
            name: textInputName,
            onChange: textInputOnChange,
            ...textInputRest
        } = textInputProps;

        /**
         * Modifies on change to keep track of text input validity
         *
         * @param event form event
         */
        const modifiedOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
            // extract input value from event
            const {
                currentTarget: { value: inputValue },
            } = event;
            const trimmedValue = inputValue.trim();

            // update form value
            setFormValue({
                ...formValue,
                [textInputName]: inputValue.trim(),
            });

            const validity = textInputRequired ? trimmedValue.length > 0 : true;
            setValidMap({ ...validMap, [textInputName]: validity });

            // check if there is a validator
            if (validator) {
                // get validator values
                const error = validator(inputValue);
                setValidMap({ ...validMap, [textInputName]: validity && !error });
                if (error || !trimmedValue.length) {
                    errorMessages[textInputName] = trimmedValue.length
                        ? error
                        : `${textInputName} is a required value`;
                } else delete errorMessages[textInputName];

                // set modified state
                setErrorMessages(errorMessages);
            }

            // execute on change if it exists
            textInputOnChange && textInputOnChange(event);
        };

        return (
            <TextInput
                {...textInputRest}
                required={textInputRequired}
                valid={validMap[textInputName]}
                onChange={modifiedOnChange}
            />
        );
    };

    /**
     * Renders all children formatted accordingly
     *
     * @param childrenProp children provided by parent component
     * @return formatted react
     */
    const renderAll = (childrenProp: ReactNode): JSX.Element[] => {
        // get all formatted children
        const formatted = new FormattedChildren(childrenProp, [Label, Group, TextInput]);

        // format all components
        formatted.format(Label, formatLabel);
        formatted.format(Group, formatGroup);
        formatted.format(TextInput, formatTextInput);
        formatted.format(View, formatView);

        return formatted.getAll();
    };

    /**
     * Modified on submit method that executes on submit when all conditions are met
     *
     * @param event form on submit method
     */
    const formOnSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();

        // make variable thta checks if the form can be submitted
        let canBeSubmitted = true;

        // check if all inputs are valid
        Object.keys(validMap).forEach((input: string) => {
            if (!validMap[input]) {
                onFail(Object.keys(errorMessages).map((key: string) => errorMessages[key]));
                canBeSubmitted = false;
            }
        });

        // if everything checks out, run the on submit callback
        canBeSubmitted && onSubmit && onSubmit(event, formValue);
    };

    return (
        <form {...props} onSubmit={(event: SyntheticEvent) => formOnSubmit(event)}>
            {renderAll(children)}
        </form>
    );
};
