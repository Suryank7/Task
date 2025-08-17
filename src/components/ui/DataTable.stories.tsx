import type { Meta, StoryObj } from '@storybook/react'
import { DataTable, type Column } from './DataTable'
import React from 'react'

type User = { id: number; name: string; email: string; age: number }

const meta: Meta<typeof DataTable<User>> = {
  title: 'UI/DataTable',
  component: DataTable<User>,
  argTypes: {},
  parameters: {
    controls: { exclude: ['columns', 'onRowSelect'] }
  }
}
export default meta
type Story = StoryObj<typeof DataTable<User>>

const data: User[] = [
  { id: 1, name: 'Aarya', email: 'aarya@example.com', age: 22 },
  { id: 2, name: 'Bhavesh', email: 'bhavesh@example.com', age: 19 },
  { id: 3, name: 'Chirag', email: 'chirag@example.com', age: 25 },
  {id: 4, name: "Mayank", email: "Mayank@example.com", age: 27 },
  { id: 5, name: "Sundar", email: "Sundar@example.com", age: 21 },
  { id: 6, name: "Chetan", email: "Chetan@example.com", age: 23 },

]

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
]

export const Basic: Story = {
  args: { data, columns }
}

export const Selectable: Story = {
  args: { data, columns, selectable: true }
}

export const Loading: Story = {
  args: { data, columns, loading: true }
}

export const Empty: Story = {
  args: { data: [], columns }
}
