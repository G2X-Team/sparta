import { FC, HTMLAttributes, ChangeEventHandler, useRef, CSSProperties } from 'react';
import React, { useState, useEffect } from 'react';
import './Select.css';

import type { Apollo } from '../../interfaces/Apollo';
import type { RenderAll } from '../../interfaces/Overload';
import type { ComponentOrientation, ComponentAlignment } from '../../interfaces/Properties';

import { Icon } from '../Icon/Icon';
import { Option } from '../Option/Option';
import Menu from './components/Menu';
import { gaurdApolloName } from '../../util/ErrorHandling';
import { Text } from '../Text/Text';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

export interface ISelect
    extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>,
        Apollo<'Select'> {
    /** Label, required for accessibility purposes */
    label: string;
    /** List of options */
    options: Array<string>;
    /** input name */
    name?: string;
    /** default value of input */
    defaultValue?: string;
    /** determines whether input is required */
    required?: boolean;
    /** determines whether the input needs to be valid */
    valid?: boolean;
    /** Determines where the menu will appear from */
    anchor?: ComponentOrientation;
    /** Determines menu alignment, when orientation is left or right */
    alignment?: ComponentAlignment;
    /** Determines placeholder text */
    placeholder?: string;
    /** Triggers when there is a value change */
    onChange?: (value: string) => void;
}

/**
 * Select Input
 *
 * @return Select Input
 */
export const Select: FC<ISelect> = ({
    'data-apollo': dataApollo = 'Select',
    className = '',
    defaultValue,
    anchor = 'bottom',
    alignment = 'start',
    label,
    valid,
    onChange,
    required,
    options,
    ...props
}) => {
    gaurdApolloName({ 'data-apollo': dataApollo }, 'Select');

    // ref
    const inputRef = useRef<HTMLInputElement>(null);

    // state
    const [change, setChange] = useState<string | undefined>(defaultValue || '');
    const [value, setValue] = useState(defaultValue || '');
    const [open, toggleOpen] = useState(false);
    const [display, toggleDisplay] = useState(false);
    const [effect, toggleEffect] = useState(false);

    // effect hook that keeps track of open
    useEffect(() => {
        if (open !== display) {
            if (display) {
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), 300);
            } else {
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }
    }, [open]);

    useEffect(() => {
        if (change) {
            setValue(change);
            if (onChange) onChange(change);
        }
    }, [change]);

    /**
     * Handles input change
     *
     * @param event input event
     */
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
        if (!open) toggleOpen(true); // ensure menu is open
        // ensure change is cleared
        if (change?.length || change?.length === 0) setChange(undefined);

        setValue(event.target.value);
    };

    /**
     * Returns render-ready Select component
     *
     * @return Select component
     */
    const renderSelect: RenderAll = () => {
        // get filtered results
        const filtered = options.filter((option: string) =>
            option.toLowerCase().includes(value.toLocaleLowerCase())
        );

        const menu: JSX.Element = (
            <Menu
                toggleOpen={toggleOpen}
                display={display}
                alignment={alignment}
                anchor={anchor}
                effect={effect}
                inputRef={inputRef}
                label={`${label}${required ? ' *' : ''}`}
            >
                {filtered.length ? (
                    filtered.map((option, index) => (
                        <Option key={index + 1} onClick={() => setChange(option)}>
                            {option}
                        </Option>
                    ))
                ) : (
                    <Option key={0}>No options found</Option>
                )}
            </Menu>
        );

        return (
            <>
                {(anchor === 'top' || anchor === 'left') && display ? menu : null}
                <span data-apollo-id="select-button">
                    <input
                        {...props}
                        value={value}
                        ref={inputRef}
                        defaultValue={defaultValue}
                        type="text"
                        onClick={() => toggleOpen(true)}
                        onChange={handleChange}
                    />
                    <Icon
                        name="keyboard_arrow_down"
                        color="#6C8189"
                        style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                </span>
                {(anchor === 'bottom' || anchor === 'right') && display ? menu : null}
            </>
        );
    };

    return (
        <label className={`apollo ${className}`} data-apollo={dataApollo}>
            <Text style={labelStyle}>{label}</Text>
            {renderSelect()}
            <ErrorMessage id={`${label}-error`} active={required && change === undefined}>
                Please select a valid option
            </ErrorMessage>
        </label>
    );
};

const labelStyle: CSSProperties = {
    color: '#10333F',
    fontSize: 14,
    paddingBottom: 6,
};
