import type { Dispatch, SetStateAction, FC } from 'react';
import React from 'react';
import { Button } from '../../Button/Button';
import { Section } from '../../Section/Section';
import { Text } from '../../Text/Text';

interface ITableNav {
    paginate?: number;
    start: number;
    setStart: Dispatch<SetStateAction<number>>;
    dataLength: number;
}

/**
 * This is the component in charge of navigating through rows when there is a pagination
 * limit
 *
 * @return table navigation when pagination is available
 */
export const TableNav: FC<ITableNav> = ({ paginate, start, setStart, dataLength }) => {
    return paginate ? (
        <Section alignItems="center" justifyContent="space-between">
            <Button disabled={!start} variant="tertiary" onClick={() => setStart(start - paginate)}>
                Previous
            </Button>
            <Text>
                Page {start / paginate + 1} of {Math.ceil(dataLength / paginate)}
            </Text>
            <Button
                variant="tertiary"
                disabled={start + paginate >= dataLength}
                onClick={() => setStart(start + paginate)}
            >
                Next
            </Button>
        </Section>
    ) : null;
};
