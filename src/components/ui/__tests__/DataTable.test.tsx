import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { DataTable, Column } from '../DataTable'

type Row = { id: number; name: string; age: number }
const rows: Row[] = [
  { id: 1, name: 'C', age: 30 },
  { id: 2, name: 'A', age: 20 },
  { id: 3, name: 'B', age: 25 }
]
const cols: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
]

describe('DataTable', () => {
  it('sorts by column when header clicked', () => {
    render(<DataTable<Row> data={rows} columns={cols} />)
    const header = screen.getByText('Name')
    fireEvent.click(header)
    const cells = screen.getAllByRole('cell')
    // First row first cell should be 'A' after sorting asc
    expect(cells[0]).toHaveTextContent('A')
  })

  it('selects rows and calls callback', () => {
    const spy = vi.fn()
    render(<DataTable<Row> data={rows} columns={cols} selectable onRowSelect={spy} />)
    const row1 = screen.getByLabelText('Select row 1')
    fireEvent.click(row1)
    expect(spy).toHaveBeenCalledWith([rows[0]])
  })
})
