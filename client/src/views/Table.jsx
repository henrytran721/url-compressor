import React, { useState } from 'react';
import '../sass/table.scss';

const Table = ({TableInfo}) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Compressed Link</th>
                    <th>Redirect Link</th>
                    <th>Click Counter</th>            
                </tr>
                </thead>
                <tbody>
            {TableInfo.length ? TableInfo.map((entry, index) => {
                return (
                    <tr key={index}>
                    <td>
                        {entry.shortUrl}
                    </td>
                    <td>
                        {entry.originalUrl}
                    </td>
                    <td>
                        {entry.clickCount}
                    </td>
                </tr>
                )
            }) : ''}
            </tbody>
        </table>
        </div>
    )
}

export default Table;