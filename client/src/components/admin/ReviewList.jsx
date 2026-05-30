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

import { FaTrash } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import {
    getReviews,
    deleteReview
} from "../../actions/productActions";

import {
    clearError,
    clearReviewDeleted
} from "../../slices/productSlice";

import { toast } from "react-toastify";

const ReviewList = () => {

    const dispatch = useDispatch()

    const [productId, setProductId] = useState("")
    const [searchId, setSearchId] = useState("")

    const [globalFilter, setGlobalFilter] = useState('')

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteReviewId, setDeleteReviewId] = useState(null)
    const [deleteReviewUser, setDeleteReviewUser] = useState("")
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    const {
        reviews = [],
        loading = false,
        error,
        isReviewDeleted
    } = useSelector(state => state.productState)

    function submitHandler(e) {
        e.preventDefault()
        if (searchId.trim() === "") {
            return toast.error("Please Enter Product ID")
        }
        setProductId(searchId)
        dispatch(getReviews(searchId))
    }

    function deleteReviewHandler(id, userName) {
        setDeleteReviewId(id)
        setDeleteReviewUser(userName)
        setShowDeleteModal(true)
    }

    function confirmDeleteReview() {
        dispatch(deleteReview(productId, deleteReviewId))
        setShowDeleteModal(false)
        setDeleteReviewId(null)
    }

    function cancelDeleteReview() {
        setShowDeleteModal(false)
        setDeleteReviewId(null)
        setDeleteReviewUser("")
    }

    useEffect(() => {
        if (isReviewDeleted) {
            toast.success("Review Deleted Successfully")
            dispatch(clearReviewDeleted())
            dispatch(getReviews(productId))
        }
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }
    }, [dispatch, error, isReviewDeleted, productId])

    const data = useMemo(() =>
        reviews?.map(review => ({
            id: review._id,
            rating: review.rating,
            user: review.name,
            comment: review.comment
        })) ?? [],
        [reviews]
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
            header: 'Rating',
            accessorKey: 'rating',
        },
        {
            header: 'User',
            accessorKey: 'user',
        },
        {
            header: 'Comment',
            accessorKey: 'comment',
            cell: info => (
                <span style={{ wordBreak: 'break-word', fontSize: '13px' }}>
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            enableGlobalFilter: false,
            cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div
                        onClick={() =>
                            deleteReviewHandler(row.original.id, row.original.user)
                        }
                    >
                        <FaTrash
                            style={{
                                color: 'red',
                                cursor: 'pointer',
                                fontSize: '18px'
                            }}
                        />
                    </div>
                </div>
            )
        }
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
    const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1
    const to = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <Fragment>

            <MetaData title={'Review List'} />

            <div className="admin-layout">

                <Sidebar />

                <div className="admin-content">

                    <h1 className="my-4">Review List</h1>

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

                                {/* LEFT - entries */}
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

                                {/* CENTER - Product ID search */}
                                <form
                                    onSubmit={submitHandler}
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        flexWrap: 'wrap',
                                        alignItems: 'center'
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter Product ID"
                                        value={searchId}
                                        onChange={(e) => setSearchId(e.target.value)}
                                        style={{
                                            border: '1px solid #ccc',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            width: '100%',
                                            maxWidth: '220px'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Search
                                    </button>
                                </form>

                                {/* RIGHT - global filter */}
                                <input
                                    type="text"
                                    placeholder="Search Review..."
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
                                            <tr
                                                key={headerGroup.id}
                                                style={{ backgroundColor: '#030303', color: '#fff' }}
                                            >
                                                {headerGroup.headers.map(header => (
                                                    <th
                                                        key={header.id}
                                                        style={{
                                                            padding: '12px',
                                                            textAlign: 'left',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    >
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
                                                <td
                                                    colSpan={5}
                                                    style={{ textAlign: 'center', padding: '20px' }}
                                                >
                                                    No Reviews Found
                                                </td>
                                            </tr>
                                        ) : (
                                            table.getRowModel().rows.map((row, index) => (
                                                <tr
                                                    key={row.id}
                                                    style={{
                                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f9fafb',
                                                        borderBottom: '1px solid #eee'
                                                    }}
                                                >
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

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                    padding: '1rem'
                }}>

                    <div style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        maxWidth: '420px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>

                        <div style={{
                            padding: '15px 20px',
                            borderBottom: '1px solid #eee',
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>
                            Delete Review
                        </div>

                        <div style={{
                            padding: '20px',
                            fontSize: '15px',
                            color: '#555'
                        }}>
                            Are you sure you want to delete <b>{deleteReviewUser}</b>'s review?
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            padding: '15px 20px',
                            borderTop: '1px solid #eee'
                        }}>
                            <button
                                onClick={cancelDeleteReview}
                                style={{
                                    border: '1px solid #ccc',
                                    background: '#fff',
                                    padding: '8px 18px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteReview}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    backgroundColor: '#cb0c13',
                                    color: '#fff',
                                    border: 'none'
                                }}
                            >
                                Delete
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </Fragment>
    )
}

export default ReviewList