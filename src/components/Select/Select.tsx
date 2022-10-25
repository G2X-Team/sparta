import { FC, HTMLAttributes, ChangeEventHandler, useRef, FocusEventHandler } from 'react';
import React, { useState, useEffect } from 'react';
import './Select.css';

import type * as CSS from 'csstype';
import type { Apollo } from '../../interfaces/Apollo';
import type { RenderAll } from '../../interfaces/Overload';
import type { ComponentOrientation, ComponentAlignment } from '../../interfaces/Properties';

import { Icon } from '../Icon/Icon';
import { Option } from '../Option/Option';
import Menu from './components/Menu';
import { gaurdApolloName } from '../../util/ErrorHandling';
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
    invalid?: boolean;
    /** Determines where the menu will appear from */
    anchor?: ComponentOrientation;
    /** Determines menu alignment, when orientation is left or right */
    alignment?: ComponentAlignment;
    /** Determines placeholder text */
    placeholder?: string;
    /** Triggers when there is a value change */
    onChange?: (value: string) => void;
    /** Determines max width of the menu */
    maxWidth?: CSS.Property.MaxWidth;
    /** Determines max height of the menu */
    maxHeight?: CSS.Property.MaxHeight;
    /** Determines whether input is disabled or not */
    disabled?: boolean;
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
    invalid,
    onChange,
    disabled,
    theme = 'primary',
    style,
    maxHeight,
    onFocus,
    maxWidth,
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
        let isMounted = true;
        if (isMounted && open !== display) {
            if (display) {
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), 300);
            } else {
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }

        return () => {
            isMounted = false;
        };
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
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!open) toggleOpen(true); // ensure menu is open
        // ensure change is cleared
        if (change?.length || change?.length === 0) setChange(undefined);

        setValue(event.target.value);
    };

    /**
     * Handles focus events
     *
     * @param event focus event
     */
    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
        event.target.select();
        if (onFocus) onFocus(event);
    };

    /**
     * Returns render-ready Select component
     *
     * @return Select component
     */
    const renderSelect: RenderAll = () => {
        // get filtered results
        const filtered = options.filter((option: string) =>
            option.toLowerCase().includes(change !== value ? value.toLocaleLowerCase() : '')
        );

        const menu: JSX.Element = (
            <Menu
                toggleOpen={toggleOpen}
                display={display}
                alignment={alignment}
                anchor={anchor}
                effect={effect}
                inputRef={inputRef}
                label={`${label} Menu${required ? ' *' : ''}`}
                height={maxHeight}
                width={maxWidth}
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
                <span className={`input ${disabled ? 'disabledinput' : ''}`}>
                    <input
                        {...props}
                        disabled={disabled}
                        value={value}
                        ref={inputRef}
                        onFocus={handleFocus}
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
        <label
            className={`apollo ${className} ${theme} ${invalid ? 'invalid' : ''}`}
            data-apollo={dataApollo}
        >
            <div className="label">{label}</div>
            {renderSelect()}
            <ErrorMessage id={`${label}-error`} active={required && change === undefined}>
                Please select a valid option
            </ErrorMessage>
        </label>
    );
};
