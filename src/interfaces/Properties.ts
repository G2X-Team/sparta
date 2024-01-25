import type { BaseSyntheticEvent, ReactNode } from 'react';

/** Component Property types */
export type StyleVariant = 'default' | 'secondary' | 'tertiary' | 'important';
export type ComponentVerticalOrientation = 'top' | 'bottom';
export type ComponentHorizontalOrientation = 'left' | 'right';
export type ComponentOrientation = ComponentVerticalOrientation | ComponentHorizontalOrientation;
export type ComponentGeneralOrientation = 'horizontal' | 'vertical';
export type ComponentSize = 'small' | 'medium' | 'large';
export type ComponentAlignment = 'start' | 'center' | 'end';
export type ComponentPosition = 'static' | 'absolute' | 'fixed';
export type ComponentWrap = (component: ReactNode) => ReactNode;

/** Table Data */
export type TableData = ReactNode[][] | { [key: string]: ReactNode }[];
export type DataRenderer<T = ReactNode> = (data: T) => ReactNode;
export type RowHandler<T = any> = (data: T) => ReactNode;

/* Form Types */

// input data
/** Form data that you can expect from client-side toggle inputs within a group */
export type FormGroupData = { radio?: string; checkbox?: string[] };
/** Form data that you can expect from client-side text inputs */
export type FormTextData = { text?: string };
/**
 * Form data that you can expect from client-side standalone toggle inputs (radio, checkbox,
 * siwtch)
 */
export type FormToggleData = { checked?: boolean };

/**
 * A generalized object representing all values, is used as the default data representation for
 * validators
 */
export type FormInputData = FormGroupData & FormToggleData & FormTextData;

/** Object containing all input data by `name` */
export type FormData = {
    [fieldName: string]: FormInputData;
};

/** Data containing all input errors by name */
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
export type FormSubmitHandler = (data?: FormData, event?: BaseSyntheticEvent) => void;

/**
 * Method that allows user to see all error messages when there is an invalid submission
 *
 * @param errors error messages collected from all inputs
 */
export type FormErrorHandler = (errors?: FormErrors) => void;

/** Function to be used for Sparta input validation purposes */
export type FormValidator<T = FormInputData> = (inputData: T) => string | null;

/** Preferred structure for Action Data given by Remix */
export type FormActionData = {
    formError?: string;
    fieldErrors?: {
        [fieldName: string]: string | undefined;
    };
    fields?: {
        [fieldName: string]: any;
    };
};
