/* eslint-disable require-jsdoc */
import React from 'react';
import { IconType } from 'react-icons';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import './Autocomplete.css';

interface Option {
    getDisplayLabel: () => string;
    getSubtitle?: () => string;
    getSearchString?: () => string;
    getIcon?: () => JSX.Element;
    renderTile?: () => JSX.Element;
}

export interface Props {
    placeholder: string;
    options: Option[];
    onSelect: (option: Option) => void;
    required?: boolean;
    icons?: {
        open: IconType;
        closed: IconType;
        clear: IconType;
    };
}

interface InternalProps extends Props {
    isOpen: boolean;
    toggle: () => void;
    searchString: string;
    setSearchString: (searchString: string) => void;
}

interface DropdownOptionProps {
    option: Option;
    toggle: () => void;
}

const pokemons = [
    { getDisplayLabel: () => 'Bulbasaur' },
    { getDisplayLabel: () => 'Charmander' },
    { getDisplayLabel: () => 'Squirtle' },
];

/**
 * Autocomplete component that allows the users to select from a list of options
 *
 * @param props - Set of properties to configure the autocomplete
 * @return Autocomplete component
 */
export const Autocomplete: React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchString, setSearchString] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState<Option>();
    const internalProps = {
        ...props,
        options: pokemons,
        isOpen,
        toggle: () => setIsOpen(!isOpen),
        searchString,
        setSearchString,
    };

    return (
        <div className="autocomplete-root">
            <SearchInput {...internalProps} />
            <DropdownList {...internalProps} />
        </div>
    );
};

/**
 * Autocomplete component that allows the users to select from a list of options
 *
 * @param props - Set of properties to configure the autocomplete
 * @return Autocomplete component
 */
export const SearchInput: React.FC<InternalProps> = (props) => {
    return (
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Pokemon"
                className="search-input"
                onChange={(e) => props.setSearchString(e.target.value)}
            />
            <SearchButton {...props} />
        </div>
    );
};

export const SearchButton: React.FC<InternalProps> = ({ isOpen, toggle }) => {
    const IconComponent = isOpen ? BsCaretUpFill : BsCaretDownFill;

    return (
        <button className="search-button" onClick={toggle}>
            <IconComponent />
        </button>
    );
};

export const DropdownList: React.FC<InternalProps> = ({ isOpen, toggle, options }) => {
    if (!isOpen) {
        return null;
    }
    console.log(options);
    return (
        <div className="dropdown-wrapper">
            {options.map((option) => (
                <DropdownOption key={option.getDisplayLabel()} option={option} toggle={toggle} />
            ))}
        </div>
    );
};

export const DropdownOption: React.FC<DropdownOptionProps> = ({ option, toggle }) => {
    if (option.renderTile) {
        return option.renderTile();
    }

    console.log(option.getDisplayLabel());
    return <div onClick={toggle}>{option.getDisplayLabel()}</div>;
};
