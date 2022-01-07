/* eslint-disable require-jsdoc */
import React from 'react';
import { IconType } from 'react-icons';
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs';
import './Autocomplete.css';

interface Option {
    getDisplayLabel: () => string;
    getSearchString?: () => string;
    getIcon?: () => JSX.Element | string;
    getDisplayContent?: () => JSX.Element;
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
    {
        getDisplayLabel: () => 'Bulbasaur',
        getIcon: () =>
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    {
        getDisplayLabel: () => 'Charmander',
        getIcon: () =>
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    },
    {
        getDisplayLabel: () => 'Squirtle',
        getIcon: () =>
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    },
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

    return (
        <div onClick={toggle} className="dropdown-option-wrapper">
            <DropdownOptionIcon option={option} />
            <DropdownOptionContent option={option} />
        </div>
    );
};

export const DropdownOptionIcon: React.FC<{ option: Option }> = ({ option }) => {
    if (!option.getIcon) {
        return null;
    }
    const icon = option.getIcon();
    if (typeof icon === 'string') {
        return (
            <div className="dropdown-option-icon">
                <img src={icon} style={{ maxHeight: 50 }} />
            </div>
        );
    }

    return <div className="dropdown-option-icon">{option.getIcon()}</div>;
};

export const DropdownOptionContent: React.FC<{ option: Option }> = ({ option }) => {
    if (option.getDisplayContent) {
        return option.getDisplayContent();
    }

    return <div className="dropdown-option-content">{option.getDisplayLabel()}</div>;
};
