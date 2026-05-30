import { Fragment, useEffect, useMemo, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
} from "@tanstack/react-table";

import { FaEdit, FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { adminOrders, deleteOrder } from "../../actions/orderActions";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const OrderList = () => {

    const dispatch = useDispatch()

    const { adminOrders: orders = [], loading = true, error, isOrderDeleted } =
        useSelector(state => state.orderState)

    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

    function deleteNewOrder(id) {
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (isOrderDeleted) {
            toast.success("Order Deleted Successfully")
            dispatch(clearOrderDeleted())
            dispatch(adminOrders())
        }
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
        dispatch(adminOrders())
    }, [dispatch, error, isOrderDeleted])

    const data = useMemo(() =>
        orders?.map(order => ({
            id: order._id,
            itemsQty: order.orderItems?.length,
            amount: `₹${order.totalPrice}`,
            status: order.orderStatus
        })) ?? [],
        [orders]
    )

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: info => (
                <span style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Items',
            accessorKey: 'itemsQty',
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => (
                <span style={{
                    color: row.original.status === 'Delivered' ? 'green' : 'red',
                    fontWeight: 'bold'
                }}>
                    {row.original.status}
                </span>
            )
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            enableGlobalFilter: false,
            cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/admin/order/${row.original.id}`}>
                        <FaEdit style={{ color: '#0d6efd', cursor: 'pointer', fontSize: '18px' }} />
                    </Link>
                    <div onClick={() => deleteNewOrder(row.original.id)}>
                        <FaTrash style={{ color: 'red', cursor: 'pointer', fontSize: '18px' }} />
                    </div>
                </div>
            )
        }
    ], [])

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, pagination },
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const { pageIndex, pageSize } = table.getState().pagination
    const totalRows = table.getFilteredRowModel().rows.length
    const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
    const to = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <Fragment>

            <MetaData title={'Orders List'} />

            <div className="admin-layout">

                <Sidebar />

                <div className="admin-content">

                    <h1 className="my-4">Orders List</h1>

                    {loading ? <Loader /> : (

                        <div style={{
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>

                            {/* TOP BAR */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '15px',
                                borderBottom: '1px solid #eee'
                            }}>

                                <div style={{ whiteSpace: 'nowrap' }}>
                                    <span>Show </span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) =>
                                            setPagination(prev => ({
                                                ...prev,
                                                pageSize: Number(e.target.value),
                                                pageIndex: 0
                                            }))
                                        }
                                        style={{ margin: '0 4px' }}
                                    >
                                        {[5, 10, 25, 50].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                    <span> entries</span>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search Order..."
                                    value={globalFilter ?? ''}
                                    onChange={(e) => {
                                        setGlobalFilter(e.target.value)
                                        table.setPageIndex(0)
                                    }}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        width: '100%',
                                        maxWidth: '220px'
                                    }}
                                />

                            </div>

                            {/* TABLE */}
                            <div style={{ overflowX: 'auto', width: '100%' }}>

                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    minWidth: '500px'
                                }}>

                                    <thead>
                                        {table.getHeaderGroups().map(headerGroup => (
                                            <tr key={headerGroup.id}
                                                style={{ backgroundColor: '#030303', color: '#fff' }}>
                                                {headerGroup.headers.map(header => (
                                                    <th key={header.id}
                                                        style={{ padding: '12px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>

                                    <tbody>
                                        {table.getRowModel().rows.length === 0 ? (
                                            <tr>
                                                <td colSpan={5}
                                                    style={{ textAlign: 'center', padding: '20px' }}>
                                                    No Orders Found
                                                </td>
                                            </tr>
                                        ) : (
                                            table.getRowModel().rows.map((row, index) => (
                                                <tr key={row.id}
                                                    style={{
                                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
                                                        borderBottom: '1px solid #eee'
                                                    }}>
                                                    {row.getVisibleCells().map(cell => (
                                                        <td key={cell.id} style={{ padding: '12px' }}>
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                </table>

                            </div>

                            {/* PAGINATION */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '10px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '15px'
                            }}>

                                <p style={{ margin: 0, fontSize: '14px' }}>
                                    Showing <b>{from}</b> to <b>{to}</b> of{' '}
                                    <b>{totalRows}</b> entries
                                </p>

                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <button
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                        style={{
                                            padding: '5px 14px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
                                            background: table.getCanPreviousPage() ? '#fff' : '#f3f3f3'
                                        }}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                        style={{
                                            padding: '5px 14px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
                                            background: table.getCanNextPage() ? '#fff' : '#f3f3f3'
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </Fragment>
    )
}

export default OrderList