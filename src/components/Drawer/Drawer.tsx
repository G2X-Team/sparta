import React, { HTMLAttributes, ReactNode, useEffect, useState, useRef } from 'react';
import FormatChildren from '../../util/FormatChildren';
import './Drawer.css';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import Option from './overload/Option';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Type of drawer that will be used. `absolute` assumes the drawer is in front of everything
     * and will use a backdrop. `persistent` will have a relative width and can push other
     * elements to the side on expansion.`permanent` Just an element with its own overflow.
     */
    type?: 'absolute' | 'persistent' | 'permanent';
    /**
     * When `type="absolute"`, the values `"left"`, `"right"`, `"bottom"`, and `"top"` determine
     * the anchoring point for the drawer. When `type="persistent"` OR `type="permanent"`, the
     * values will determine where the border separating the content will appear
     */
    orientation?: 'left' | 'right' | 'top' | 'bottom' | 'vertical' | 'horizontal';
    /** Executes a method when the **open** prop is going from `true` to `false` */
    onClose?: () => void;
    /** Determines the time in milliseconds it will take to open/close, won't do anything when
     * `permanent`
     */
    transition?: number;
    /** Method that changes **open** variable */
    toggleOpen?: () => void;
    /** Determines whether the drawer is visible or not, won't do anything when `permanent` */
    open?: boolean;
    /** Determines to what height or width the drawer will extend to */
    dimension?: string | number;
}

/**
 * A drawer represents a container that slides out or stationary to an anchored area of a
 * page. An anchor can be left, right, top, or bottom.
 *
 * @return Drawer Component
 */
export const Drawer: React.FC<Props> = ({
    children,
    className,
    type = 'absolute',
    orientation = 'left',
    open = false,
    transition = 300,
    dimension = 300,
    onClose,
    toggleOpen,
    style,
    ...props
}: Props): JSX.Element => {
    // ref
    const drawer = useRef<HTMLDivElement>(null);

    // state variables
    const [display, toggleDisplay] = useState(type === 'permanent' || open);
    const [effect, toggleEffect] = useState(type === 'permanent' || open);
    const [modifiedDimension, setModifiedDimension] = useState('width');

    // make a useEffect to determine what transition will be used, acts as on init
    useEffect(() => {
        if (orientation === 'bottom' || orientation === 'top') {
            setModifiedDimension('height');
        } else {
            setModifiedDimension('width');
        }
    }, [orientation]);

    // toggle a useEffect that focses on the display element
    useEffect(() => {
        // check whenever display and open are out of sync
        if (open !== display) {
            if (display) {
                // not open, it nee
                toggleEffect(false);
                setTimeout(() => toggleDisplay(false), transition + 100);
                onClose && onClose();
            } else {
                toggleDisplay(true);
                setTimeout(() => toggleEffect(true), 100);
            }
        }
    }, [open]);

    /**
     * Finds all target components and renders them in final drawer component
     *
     * @return render ready drawer component
     */
    const renderDrawer = (): ReactNode => {
        // gets all found children
        const formatted = new FormatChildren({ children }, [Header, Footer, Option]);

        // format header and footer
        const [headers, footers] = formatted.extractMultiple([Header, Footer]);

        // check that there is only one header and footer max
        if (headers.length > 1) throw new Error('Drawer can only have one Header component');
        if (footers.length > 1) throw new Error('Drawer can only have one Footer component');

        // get the header/footer if it exists and assign it into a variable
        const [header] = headers;
        const [footer] = footers;

        // define the conatiner style
        const containerStyle = {
            [orientation]: 0,
            [modifiedDimension]: type === 'permanent' || effect ? dimension : 0,
            transition: `${modifiedDimension} ${transition}ms`,
            ...style,
        };

        // define drawer style
        const drawerStyle = {
            [modifiedDimension]: dimension,
            ...style,
        };

        return (
            <div
                style={containerStyle}
                className={`
                    apollo-component-library-drawer-component 
                    ${className} ${orientation} ${type}
                `}
            >
                <div {...props} ref={drawer} style={drawerStyle}>
                    {header}
                    <div className="apollo-component-library-drawer-component-body">
                        {formatted.getAll()}
                    </div>
                    {footer}
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {type === 'permanent' || display ? (
                <div className={`apollo-component-library-drawer-component-container ${type}`}>
                    <div>
                        {renderDrawer()}
                        {type === 'absolute' ? (
                            <div
                                onClick={toggleOpen}
                                className={`apollo-component-library-drawer-component-backdrop 
                                    ${type}`}
                                style={{ opacity: effect ? 1 : 0 }}
                            />
                        ) : null}
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
};
