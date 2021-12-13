import React, { HTMLAttributes, SyntheticEvent, ReactNode, useState, useEffect } from 'react';
import FormattedChildren from '../../util/FormattedChildren';

import { Label } from '../Label/Label';
import { Group } from '../Group/Group';
import { TextInput } from '../TextInput/TextInput';
import { View } from '../View/View';
import { Switch } from '../Switch/Switch';

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
export const Form: React.FC<Props> = ({
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
     * Formats Switch components
     *
     * @param switchComponent unformatted switch components
     * @return formatted Switch Component
     */
    const formatSwitch = (switchComponent: JSX.Element): JSX.Element => {
        const {
            props: {
                checked: switchChecked,
                name: switchName,
                onChange: switchOnChange,
                required: switchRequired,
                children: switchChildren,
                ...switchProps
            },
        } = switchComponent;

        // set required if applicable
        if (switchRequired && !required[switchName]) {
            setRequired({
                ...required,
                [switchName]: `${switchName} is required, please toggle on.`,
            });
        }

        /**
         * Modifies switch on change
         */
        const modifiedOnChange = (): void => {
            setFormValue({ ...formValue, [switchName]: formValue[switchName] ? false : true });
            switchOnChange && switchOnChange();
        };

        return (
            <Switch {...switchProps} name={switchName} onChange={modifiedOnChange}>
                {switchChildren}
            </Switch>
        );
    };

    /**
     * Formats label component
     *
     * @param label unformatted label component
     * @return formatted label component
     */
    const formatLabel = (label: JSX.Element): JSX.Element => {
        // extract props
        const { props: labelProps } = label;
        const { children: labelChildren, value: labelValue } = labelProps;

        return (
            <Label key={labelValue} {...labelProps}>
                {renderAll(labelChildren)}
            </Label>
        );
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
        const {
            props: {
                validator: groupValidator,
                children: groupChildren,
                onChange: groupOnChange,
                name: groupName,
                required: groupRequired,
                ...groupProps
            },
        } = group;

        // set required if applicable
        if (groupRequired && !required[groupName]) {
            setRequired({
                ...required,
                [groupName]: `${groupName} is required, please select an option.`,
            });
        }

        /**
         * Modifies group's on change callback to modify the form value
         *
         * @param value group value
         */
        const modifiedOnChange = (value: string | string[]): void => {
            // check that its valid
            if (groupValidator) {
                const validity = groupRequired && value.length;
                const error = groupValidator(value);
                setValidMap({ ...validMap, [groupName]: validity && !error });

                if (error) errorMessages[groupName] = error;
                else delete errorMessages[groupName];
            } else {
                setValidMap({ ...validMap, [groupName]: true });
            }

            // update form value
            setFormValue({ ...formValue, [groupName]: value });
            groupOnChange && groupOnChange();
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
        const {
            props: {
                validator,
                required: textInputRequired,
                name: textInputName,
                onChange: textInputOnChange,
                ...textInputProps
            },
        } = textInput;

        // add to required map if required
        if (textInputRequired && !required[textInputName]) {
            setRequired({
                ...required,
                [textInputName]: `${textInputName} is a required field and cannot be empty.`,
            });
        }

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
                {...textInputProps}
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
        const formatted = new FormattedChildren(childrenProp, [
            Label,
            Group,
            TextInput,
            View,
            Switch,
        ]);

        // format all components
        formatted.format(Label, formatLabel);
        formatted.format(Group, formatGroup);
        formatted.format(TextInput, formatTextInput);
        formatted.format(View, formatView);
        formatted.format(Switch, formatSwitch);

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
