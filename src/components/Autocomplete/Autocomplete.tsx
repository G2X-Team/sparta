/* eslint-disable require-jsdoc */
import React from 'react';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import './Autocomplete.css';

interface Option {
    getDisplayLabel: () => string;
    getSearchString?: () => string;
    getIcon?: () => JSX.Element;
    renderTile?: () => JSX.Element;
}

export interface Props {
    placeholder: string;
    options: Option[];
    required?: boolean;
}

/**
 * Autocomplete component that allows the users to select from a list of options
 *
 * @param props - Set of properties to configure the autocomplete
 * @return Autocomplete component
 */
export const Autocomplete: React.FC<Props> = (props) => {
    return <SearchInput {...props} />;
};

/**
 * Autocomplete component that allows the users to select from a list of options
 *
 * @param props - Set of properties to configure the autocomplete
 * @return Autocomplete component
 */
export const SearchInput: React.FC<{ required?: boolean }> = ({ required }) => {
    return (
        <div
            style={{
                display: 'flex',
                width: 300,
                padding: 10,
                border: '1px solid grey',
                borderRadius: 5,
            }}
        >
            <input
                required={required}
                type="search"
                placeholder="Pokemon"
                className="autocomplete-input"
                style={{ flexGrow: 1 }}
            />
            <IconButton />
        </div>
    );
};

export const IconButton: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const IconComponent = isOpen ? BsCaretUpFill : BsCaretDownFill;

    return (
        <button className="transparent-button" onClick={() => setIsOpen(!isOpen)}>
            <IconComponent />
        </button>
    );
};
