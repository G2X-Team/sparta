/**
 * Function that will get date accounting for timezone
 *
 * @param date date to get timezone
 * @return date accounting for timezone
 */
export const getTimezoneDate = (date: string): Date => {
    return new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000);
};
