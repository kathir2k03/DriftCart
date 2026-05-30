import { Fragment, useEffect, useMemo, useState } from 'react'
import MetaData from '../layouts/MetaData'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { userOrders as userOrderAction } from '../../actions/orderActions'
import { Link } from 'react-router-dom'

function UserOrders() {

    const dispatch = useDispatch()
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const { userOrders = [] } = useSelector(state => state.orderState)

    useEffect(() => {
        dispatch(userOrderAction())
    }, [dispatch])

    const data = useMemo(() => userOrders?.map(order => ({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `₹${order.totalPrice}`,
        status: order.orderStatus,
    })) ?? [], [userOrders])

    const columns = useMemo(() => [
        {
            header: 'Order ID',
            accessorKey: 'id',
            cell: info => (
                <span className='font-mono text-xs text-gray-600'>
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'No of Items',
            accessorKey: 'numOfItems',
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: info => {
                const status = info.getValue()
                const colors = {
                    Delivered: { background: '#d1fae5', color: '#065f46' },
                    Processing: { background: '#FFF1F2', color: '#92400e' },
                    Shipped: { background: '#dbeafe', color: '#1e40af' },
                    Cancelled: { background: '#fee2e2', color: '#991b1b' },
                }
                const s = colors[status] ?? { background: '#f3f4f6', color: '#374151' }
                return (
                    <span style={{ ...s, padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {status}
                    </span>
                )
            }
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            enableGlobalFilter: false,
            cell: ({ row }) => (
                <Link to={`/order/${row.original.id}`}>
                    <button style={{ backgroundColor: '#CB0C13', border: '1px solid #CB0C13', color: '#E9E9E9', fontSize: '12px', fontWeight: '500', padding: '5px 14px', borderRadius: '4px', cursor: 'pointer' }}>
                        View
                    </button>
                </Link>
            )
        },
    ], [])

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination,
        },
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })


    const { pageIndex, pageSize } = table.getState().pagination

    const totalRows = table.getFilteredRowModel().rows.length

    const from = totalRows === 0
        ? 0
        : pageIndex * pageSize + 1

    const to = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <Fragment>
            <MetaData title={'My Orders'} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px' }}>

                <h1 className="my-5">My Orders</h1>

                <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #d1d5db', overflow: 'hidden' }}>

                    {/* ── Top Controls ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                flexWrap: 'wrap',
                                fontSize: '14px',
                                color: '#4b5563'
                            }}
                        >
                            <span>Show</span>

                            <select
                                value={pageSize}
                                onChange={e =>
                                    setPagination(prev => ({
                                        ...prev,
                                        pageSize: Number(e.target.value),
                                        pageIndex: 0,
                                    }))
                                }
                                style={{
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '14px',
                                    color: '#374151',
                                    backgroundColor: '#fff',
                                    minWidth: '70px'
                                }}
                            >
                                {[5, 10, 25, 50].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>

                            <span>entries</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#4b5563' }}>
                            <span>Search:</span>
                            <input
                                type='text'
                                value={globalFilter ?? ''}
                                onChange={e => {
                                    setGlobalFilter(e.target.value)
                                    table.setPageIndex(0)
                                }}
                                placeholder='Order ID, status...'
                                style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '4px 12px', fontSize: '14px', color: '#374151', width: '200px', outline: 'none' }}
                            />
                        </div>

                    </div>

                    {/* ── Table ── */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>

                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} style={{ backgroundColor: '#131921' }}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff', whiteSpace: 'nowrap' }}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody>
                                {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af', fontSize: '14px' }}>
                                            No orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    table.getRowModel().rows.map((row, index) => (
                                        <tr
                                            key={row.id}
                                            style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb', borderBottom: '1px solid #e5e7eb', cursor: 'default' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9fafb'}
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} style={{ padding: '10px 16px', fontSize: '13px', color: '#374151', verticalAlign: 'middle' }}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* ── Bottom Controls ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>

                        <p style={{ fontSize: '14px', color: '#6b7280' }}>
                            Showing <strong>{from}</strong> to <strong>{to}</strong> of <strong>{totalRows}</strong> entries
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                style={{ padding: '6px 12px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#fff', color: '#374151', cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed', opacity: table.getCanPreviousPage() ? 1 : 0.4 }}
                            >
                                Previous
                            </button>

                            {Array.from({ length: table.getPageCount() }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => table.setPageIndex(i)}
                                    style={{ padding: '6px 12px', fontSize: '13px', border: '1px solid', borderRadius: '4px', cursor: 'pointer', backgroundColor: table.getState().pagination.pageIndex === i ? '#CB0C13' : '#fff', borderColor: table.getState().pagination.pageIndex === i ? '#CB0C13' : '#d1d5db', color: table.getState().pagination.pageIndex === i ? '#E9E9E9' : '#374151', fontWeight: table.getState().pagination.pageIndex === i ? '600' : '400' }}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                style={{ padding: '6px 12px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#fff', color: '#374151', cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed', opacity: table.getCanNextPage() ? 1 : 0.4 }}
                            >
                                Next
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default UserOrders