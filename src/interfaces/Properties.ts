import type { ReactNode } from 'react';

/** Component Property types */
export type StyleVariant = 'default' | 'secondary';
export type ComponentVerticalOrientation = 'top' | 'bottom';
export type ComponentHorizontalOrientation = 'left' | 'right';
export type ComponentOrientation = ComponentVerticalOrientation | ComponentHorizontalOrientation;
export type ComponentGeneralOrientation = 'horizontal' | 'vertical';
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentAlignment = 'start' | 'center' | 'end';
export type ComponentPosition = 'static' | 'absolute' | 'fixed';
export type ComponentWrap = (component: ReactNode) => ReactNode;

/**
 * Function used to format children. When in `parentProps`, this method will perpatuate the
 * original RenderAll component
 */
export type ComponentRenderAll = (children?: ReactNode) => JSX.Element[];

/* Form Types */

// input data
export type FormGroupData = { radio?: string; checkbox?: string[] };
export type FormTextData = { text?: string };
export type FormToggleData = { checked?: boolean };

// global input type
export type FormInputData = FormGroupData & FormToggleData & FormTextData;

// parameter data
export type FormData = {
    [fieldName: string]: FormInputData;
};

// form error data
export type FormErrors = {
    [fieldName: string]: {
        message?: string;
        ref?: any;
        type?: string;
    };
};

// submission handlers

/**
 * Method that allows user to view collected form data represented as an object when handling
 * valid submissions
 *
 * @param data information collected from all form inputs
 */
export type FormSubmitHandler = (data: FormData) => void;

/**
 * Method that allows user to see all error messages when there is an invalid submission
 *
 * @param errors error messages collected from all inputs
 */
export type FormErrorHandler = (errors: FormErrors) => void;

// validator
export type FormValidator<T = FormInputData> = (inputData: T) => string | null;

export type FormActionData = {
    formError?: string;
    fieldErrors?: {
        [fieldName: string]: string | undefined;
    };
    fields?: {
        [fieldName: string]: any;
    };
};
