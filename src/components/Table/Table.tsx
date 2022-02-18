/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable require-jsdoc */
import type { HTMLAttributes, FC } from 'react';
import React, { useState } from 'react';
import * as CSS from 'csstype';
import './Table.css';

export interface Props extends HTMLAttributes<HTMLHRElement> {
    /** width of desired table */
    width?: CSS.Property.Width;
    /** height of table in pixels */
    height?: CSS.Property.Height;
    /** Defines how many rows to show per page */
    pageSize?: number;
    /** Defines number of page to start from */
    pageNum?: number;
    /** Defines the name of colloumns in the header */
    colNames?: [];
    /** Data in JSON to feed the table */
    data?: JSON[];
}
const btnStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
};
/**
 * Component that serves as an table for ease of templating
 *
 * @return Table component
 */
export const Table: FC<Props> = ({
    data = [
        { id: 1, name: 'AHmed', Age: 30 },
        { id: 1, name: 'Reza', Age: 30 },
        { id: 1, name: 'AHmed Reza', Age: 30 },
    ],
    colNames = ['id', 'name', 'Age'],
    pageNum = 0,
    pageSize = 10,
    width = '100%',
    height = '100%',
}) => {
    const [page, setPage] = useState(pageNum);

    // Function to navigate back to the last page
    const onBack = () => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    // Function to navigate back to the next page
    const onNext = () => {
        setPage(page + 1 < data.length / pageSize ? page + 1 : page);
    };
    return (
        <div className="apollo-component-library-table-component-container">
            {data.length > 0 && (
                <table
                    className="apollo-component-library-table-component"
                    cellSpacing="0"
                    style={{ width: width, height: height }}
                >
                    <thead className="header">
                        <tr>
                            {colNames.map(
                                (headerItem: string, index: React.Key | null | undefined) => (
                                    <th key={index}>{headerItem.toUpperCase()}</th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data.slice(pageSize * page, pageSize * page + pageSize)).map(
                            (obj, index) => (
                                <tr key={index}>
                                    {Object.values(obj).map((value, index2) => (
                                        <td key={index2}> {value} </td>
                                    ))}
                                </tr>
                            )
                        )}
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td className="apollo-component-library-table-component-footer">
                            <button style={btnStyle} onClick={onBack}>
                                Back
                            </button>
                            <label style={{ padding: '0 1em' }}>{page + 1}</label>
                            <button style={btnStyle} onClick={onNext}>
                                Next
                            </button>
                        </td>
                        <td></td>
                    </tfoot>
                </table>
            )}
        </div>
    );
};
