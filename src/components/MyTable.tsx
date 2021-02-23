import React from 'react'
import { Table, TableCaption, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react';
import { useTable, useSortBy } from "react-table"
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';


interface MyTableProps {
    title: String;
    columns: any;
    data: any;
}

export const MyTable: React.FC<MyTableProps> = ({ title, columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy)
    return (
        <Table {...getTableProps()} mt={15} variant="simple">
            <TableCaption fontSize={20} color="orange" placement="top">{title}</TableCaption>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                isNumeric={column.isNumeric}
                            >
                                {column.render("Header")}
                                {column.isSorted ? (
                                    column.isSortedDesc ? (
                                        <TriangleDownIcon aria-label="sorted descending" />
                                    ) : (
                                        <TriangleUpIcon aria-label="sorted ascending" />
                                    )
                                ) : null}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                cell.column.Header === "Url" ? (<Td {...cell.getCellProps()}>
                                <Link href={cell.value} isExternal color="orange">Link</Link>
                                </Td>) : (<Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                    {cell.render("Cell")}
                                </Td>)
                            ))}
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    );
}