import React from 'react'
import { clsx } from 'clsx'

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
}

type SortState<T> = { key: string; order: 'asc' | 'desc' } | null

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data to display.'
}: DataTableProps<T>) {
  const [selected, setSelected] = React.useState<Set<number>>(new Set())
  const [sort, setSort] = React.useState<SortState<T>>(null)

  const sorted = React.useMemo(() => {
    if (!sort) return data
    const col = columns.find(c => c.key === sort.key)
    if (!col) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[col.dataIndex]
      const vb = b[col.dataIndex]
      if (va == null) return -1
      if (vb == null) return 1
      if (va < vb) return sort.order === 'asc' ? -1 : 1
      if (va > vb) return sort.order === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [data, columns, sort])

  const toggle = (idx: number) => {
    const next = new Set(selected)
    if (next.has(idx)) next.delete(idx)
    else next.add(idx)
    setSelected(next)
    if (onRowSelect) {
      onRowSelect(Array.from(next).map(i => sorted[i]))
    }
  }

  const toggleAll = () => {
    if (selected.size === sorted.length) {
      setSelected(new Set())
      onRowSelect?.([])
    } else {
      const all = new Set(sorted.map((_, i) => i))
      setSelected(all)
      onRowSelect?.(sorted)
    }
  }

  const headerClick = (col: Column<T>) => {
    if (!col.sortable) return
    setSort(prev => {
      if (!prev || prev.key !== col.key) return { key: col.key, order: 'asc' }
      return { key: col.key, order: prev.order === 'asc' ? 'desc' : 'asc' }
    })
  }

  return (
    <div className="relative overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
      {loading && (
        <div
          className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-10"
          aria-live="polite"
        >
          <span className="animate-pulse">Loading…</span>
        </div>
      )}
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-background-one">
          <tr>
            {selectable && (
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  onChange={toggleAll}
                  checked={selected.size === sorted.length && sorted.length > 0}
                  ref={(el) => {
                    if (el)
                      el.indeterminate =
                        selected.size > 0 && selected.size < sorted.length;
                  }}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={clsx(
                  "p-3 text-left font-medium select-none",
                  col.sortable && "cursor-pointer"
                )}
                onClick={() => headerClick(col)}
                aria-sort={
                  sort?.key === col.key
                    ? sort.order === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                <div className="inline-flex items-center gap-1">
                  {col.title}
                  {col.sortable && (
                    <span aria-hidden className="text-xs">
                      {sort?.key === col.key
                        ? sort.order === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 && !loading ? (
            <tr>
              <td
                className="p-6 text-center text-gray-500"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-background-background dark:even:bg-background-input bg-background-background"
              >
                {selectable && (
                  <td className="p-3">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${i + 1}`}
                      checked={selected.has(i)}
                      onChange={() => toggle(i)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-3 whitespace-nowrap">
                    {col.render
                      ? col.render(row[col.dataIndex], row)
                      : String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
