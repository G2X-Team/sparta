import React, { HTMLAttributes, useEffect } from 'react';
import { findAll, FoundChildren } from '../../util/findAll';
import "./Icon.css";

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /** The icon name the user wants to render */
    name: string;
    /** Specification of an onClick method will convert icon into a button */
    onClick?: () => void;
    /** Color value that you want to assign to icon */
    color?: string;
    /** determines whether icon has disabled styling or not */
    disabled?: boolean;
    /** Determines preset style of icon */
    variant?: string;
}

/** Icon component that doubles as a button when necessary */
export const Icon = ({name, onClick, children, variant = "default", color = "black", disabled, style, ...props}: Props) => {
    // check on render if the component has hany children
    useEffect(() => {
        const iconChildren: FoundChildren = findAll(children, []);
        if (iconChildren.other.length > 0) throw new Error("Icon component cannot have children"); 
    }, []) 

    return (
        <i 
            {...props} 
            style={{color: disabled ? "gray" : color, ...style}} 
            className={`material-icons apollo-component-library-icon-component ${onClick && variant}`}
            onClick={onClick}
        >
            {name}
        </i>
    )
}