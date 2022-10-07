import React, { Dispatch, SetStateAction } from 'react';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import type { LastSort, TableMeta } from '../Table';

import { Text } from '../../Text/Text';
import { TableData } from '../../../interfaces/Properties';
import { Icon } from '../../Icon/Icon';

interface ITableHead extends HTMLAttributes<HTMLTableSectionElement> {
    lastSort: LastSort;
    setLastSort: Dispatch<SetStateAction<LastSort>>;
    data: TableData;
    setData: Dispatch<SetStateAction<TableData>>;
    tableMeta: TableMeta;
    label: string;
}

/**
 * Creates table head given appropriate table meta
 *
 * @return table head element capturing all header data
 */
const TableHead: FC<ITableHead> = ({
    tableMeta,
    label,
    data,
    setData,
    lastSort,
    setLastSort,
    ...props
}) => {
    /**
     * Renders table head appropriately
     *
     * @return table header cells
     */
    const renderAll = (): JSX.Element => {
        // first get table headers
        const headers: JSX.Element[] = [];
        tableMeta.columnOrder.forEach((key, index) => {
            const sortType = tableMeta?.canSort?.[key];
            const activeSort = lastSort?.[key];
            const align = tableMeta?.alignmentMap[key] ?? 'left';

            headers.push(
                <th
                    className={`${activeSort || ''} ${activeSort ? 'active' : 'inactive'} ${align}`}
                    scope="col"
                    key={`${label}-${index}-header`}
                >
                    {sortType ? (
                        <button
                            onClick={() =>
                                sort(sortType, key, data, setData, lastSort, setLastSort)
                            }
                        >
                            <Text>{tableMeta.headerRenderMap[key]}</Text>
                            <Icon name="keyboard_arrow_down" color="inherit" />
                        </button>
                    ) : (
                        <Text>{tableMeta.headerRenderMap[key]}</Text>
                    )}
                </th>
            );
        });

        return <tr>{headers}</tr>;
    };

    return <thead {...props}>{renderAll()}</thead>;
};

export default TableHead;

/**
 * Sorts data depending sort type if applicable
 *
 * @param sortType type of sort to occur
 * @param key key of data to sort by
 * @param data data to be sorted
 * @param setData data setter to commit sort
 * @param lastSort state of last sort
 * @param setLastSort setter to commit new last sort
 */
const sort = (
    sortType: string,
    key: string | number,
    data: TableData,
    setData: Dispatch<SetStateAction<TableData>>,
    lastSort: LastSort,
    setLastSort: Dispatch<SetStateAction<LastSort>>
): void => {
    if (!sortType) return;

    // set latest sort type
    const oldSort = lastSort?.[key] ?? 'up';
    if (!lastSort?.[key]) {
        setLastSort({ ...({ [key]: 'down' } as LastSort) });
    } else {
        if (lastSort?.[key] === 'up') setLastSort({ ...({ [key]: 'down' } as LastSort) });
        else setLastSort({ ...({ [key]: 'up' } as LastSort) });
    }

    let sorted: TableData;
    switch (sortType) {
        case 'string': // sorting rows by string
            sorted = data.sort((a: any, b: any) => {
                const aD = getDatum(a, key) as string;
                const bD = getDatum(b, key) as string;

                return oldSort === 'down' ? aD.localeCompare(bD) : bD.localeCompare(aD);
            });

            setData([...sorted] as TableData);
            break;
        case 'number': // sorting row by number
            sorted = data.sort((a: any, b: any) => {
                const aD = getDatum(a, key) as number;
                const bD = getDatum(b, key) as number;

                return oldSort === 'down' ? aD - bD : bD - aD;
            });

            setData([...sorted] as TableData);
            break;
        case 'date': // sorting row by date
            sorted = data.sort((a: any, b: any) => {
                const aD = new Date(getDatum(a, key) as string).getTime();
                const bD = new Date(getDatum(b, key) as string).getTime();

                return oldSort === 'down' ? aD - bD : bD - aD;
            });

            setData([...sorted] as TableData);
            break;
    }
};

/**
 * Given a row of data and a key, this method will return the corresponding datum applicable
 *
 * @param row row of data to extract datum from
 * @param key applicable key to exctract datum from data
 * @return datum
 */
const getDatum = (
    row: ReactNode[] | { [key: string]: ReactNode },
    key: string | number
): ReactNode => {
    if (Array.isArray(row)) {
        const col: number = key as number;
        return (row as ReactNode[])[col];
    } else {
        const col: string = key as string;
        return (row as { [key: string]: ReactNode })[col];
    }
};
