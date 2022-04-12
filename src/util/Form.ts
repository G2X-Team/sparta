import type { FormActionData, FormErrors } from '../interfaces/Properties';

/**
 * Gets the form action data from the form.
 *
 * @param name name of the input
 * @param errors error to be analyzed
 * @param actionData action data to be analyzed
 * @param ignoreActionData value of the input
 * @return the error message
 */
export const getFormError = (
    name: string,
    errors: FormErrors,
    actionData?: FormActionData,
    ignoreActionData?: boolean
): string => {
    // get field error if applicable
    const fieldError: string = actionData?.fieldErrors?.[name] || '';

    // check if there is a field error and if there is no change between current and previous values
    if (fieldError.length && !ignoreActionData) {
        return fieldError;
    }

    // get general error if applicable
    const generalError: string = errors?.[name]?.message || '';

    // check if there is a general error
    if (generalError.length) {
        return generalError;
    }

    return '';
};
