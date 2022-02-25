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
    // Header Style Props//
    /** Defines the color of the cell text */
    cellTextColor?: CSS.Property.Color;
    /** Defines the case of the cell text */
    cellTextTransform?: CSS.Property.TextTransform;
    /** Defines the weight of the cell text */
    cellTextFontWeight?: CSS.Property.FontWeight;
    // Header Style Props//
    /** Defines the color of the header text */
    headerTextColor?: CSS.Property.Color;
    /** Defines the case of the header text */
    headerTextTransform?: CSS.Property.TextTransform;
    /** Defines the weight of the header text */
    headerTextFontWeight?: CSS.Property.FontWeight;
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
        { id: 12, name: 'zebra', Age: 30 },
        { id: 2, name: 'Name2', Age: 30 },
        { id: 3, name: 'Name3', Age: 30 },
        { id: 4, name: 'Name4', Age: 30 },
        { id: 5, name: 'Name5', Age: 30 },
        { id: 6, name: 'Name6', Age: 30 },
        { id: 7, name: 'Name7', Age: 30 },
        { id: 8, name: 'Name8', Age: 30 },
        { id: 9, name: 'Name9', Age: 30 },
        { id: 10, name: 'Name10', Age: 30 },
        { id: 11, name: 'Name11', Age: 30 },
        { id: 1, name: 'Ahmed', Age: 30 },
        { id: 13, name: 'Name13', Age: 30 },
        { id: 14, name: 'Name14', Age: 30 },
        { id: 15, name: 'Name15', Age: 30 },
        { id: 16, name: 'Name16', Age: 30 },
        { id: 17, name: 'Name17', Age: 30 },
        { id: 18, name: 'Name18', Age: 30 },
    ],
    colNames = ['id', 'name', 'Age'],
    pageNum = 0,
    pageSize = 15,
    width = '100%',
    height = '100%',
    cellTextColor = 'black',
    cellTextTransform = 'capitalize',
    cellTextFontWeight = 'normal',
    headerTextColor = 'white',
    headerTextTransform = 'uppercase',
    headerTextFontWeight = 'bolder',
}) => {
    const [page, setPage] = useState(pageNum);
    const [sorted, setsorted] = useState(data);

    /** Function to navigate back to the last page */
    const onBack = (): void => {
        setPage(page - 1 > -1 ? page - 1 : page);
    };

    /** Function to navigate back to the next page */
    const onNext = (): void => {
        setPage(page + 1 < data.length / pageSize ? page + 1 : page);
    };

    /** Function to sort ascending order */
    const ascOrder = (): void => {
        setsorted(
            sorted.sort((a: any, b: any) => {
                return a > b ? 1 : -1;
            })
        );
    };

    /** Function to sort descending order */
    const descOrder = (): void => {
        setsorted(
            sorted.sort((a: any, b: any) => {
                return a < b ? 1 : -1;
            })
        );
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
                            {colNames.map((headerItem: any, index: number) => {
                                <th key={index}>
                                    <span
                                        style={{
                                            color: headerTextColor,
                                            textTransform: headerTextTransform,
                                            fontWeight: headerTextFontWeight,
                                        }}
                                    >
                                        {headerItem.toUpperCase()}
                                    </span>
                                    <button title={headerItem + 'ASC'} onClick={ascOrder}>
                                        ↑
                                    </button>
                                    <button title={headerItem + 'DESC'} onClick={descOrder}>
                                        ↓
                                    </button>
                                </th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(data.slice(pageSize * page, pageSize * page + pageSize)).map(
                            (obj, index) => (
                                <tr key={index}>
                                    {Object.values(obj).map((value, index2) => (
                                        <td
                                            style={{
                                                color: cellTextColor,
                                                textTransform: cellTextTransform,
                                                fontWeight: cellTextFontWeight,
                                            }}
                                            key={index2}
                                        >
                                            {' '}
                                            {value}{' '}
                                        </td>
                                    ))}
                                </tr>
                            )
                        )}
                    </tbody>
                    <tfoot className="apollo-component-library-table-component-footer">
                        <div>
                            <button style={btnStyle} onClick={onBack}>
                                Back
                            </button>
                            <label style={{ padding: '0 1em' }}>{page + 1}</label>
                            <button style={btnStyle} onClick={onNext}>
                                Next
                            </button>
                        </div>
                    </tfoot>
                </table>
            )}
        </div>
    );
};
