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

    // SEARCH REVIEW
    function submitHandler(e) {
        e.preventDefault()

        if (searchId.trim() === "") {
            return toast.error("Please Enter Product ID")
        }

        setProductId(searchId)

        dispatch(getReviews(searchId))
    }

    // DELETE REVIEW
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

    // TABLE DATA
    const data = useMemo(() =>
        reviews?.map(review => ({
            id: review._id,
            rating: review.rating,
            user: review.name,
            comment: review.comment
        })) ?? [],
        [reviews]
    )

    // TABLE COLUMNS
    const columns = useMemo(() => [

        {
            header: 'ID',
            accessorKey: 'id',
            cell: info => (
                <span style={{ fontSize: '12px' }}>
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

    const from =
        totalRows === 0
            ? 0
            : pageIndex * pageSize + 1

    const to = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <Fragment>

            <MetaData title={'Review List'} />

            <div className="row">

                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">

                    <h1 className="my-4">Review List</h1>

                    {loading ? <Loader /> :

                        <div
                            style={{
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}
                        >

                            {/* TOP */}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                    padding: '15px',
                                    borderBottom: '1px solid #eee'
                                }}
                            >

                                {/* LEFT */}
                                <div>

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
                                    >

                                        {[5, 10, 25, 50].map(size => (

                                            <option key={size} value={size}>
                                                {size}
                                            </option>

                                        ))}

                                    </select>

                                    <span> entries</span>

                                </div>

                                {/* CENTER SEARCH */}
                                <form
                                    onSubmit={submitHandler}
                                    style={{
                                        display: 'flex',
                                        gap: '10px',
                                        flexWrap: 'wrap'
                                    }}
                                >

                                    <input
                                        type="text"
                                        placeholder="Enter Product ID"
                                        value={searchId}
                                        onChange={(e) =>
                                            setSearchId(e.target.value)
                                        }
                                        style={{
                                            border: '1px solid #ccc',
                                            padding: '7px 10px',
                                            borderRadius: '5px',
                                            minWidth: '250px'
                                        }}
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Search
                                    </button>

                                </form>

                                {/* RIGHT SEARCH */}
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
                                        padding: '7px 10px',
                                        borderRadius: '5px'
                                    }}
                                />

                            </div>

                            {/* TABLE */}
                            <div style={{ overflowX: 'auto' }}>

                                <table
                                    style={{
                                        width: '100%',
                                        borderCollapse: 'collapse'
                                    }}
                                >

                                    <thead>

                                        {table.getHeaderGroups().map(headerGroup => (

                                            <tr
                                                key={headerGroup.id}
                                                style={{
                                                    backgroundColor: '#232F3E',
                                                    color: '#fff'
                                                }}
                                            >

                                                {headerGroup.headers.map(header => (

                                                    <th
                                                        key={header.id}
                                                        style={{
                                                            padding: '12px',
                                                            textAlign: 'left'
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
                                                    style={{
                                                        textAlign: 'center',
                                                        padding: '20px'
                                                    }}
                                                >
                                                    No Reviews Found
                                                </td>

                                            </tr>

                                        ) : (

                                            table.getRowModel().rows.map((row, index) => (

                                                <tr
                                                    key={row.id}
                                                    style={{
                                                        backgroundColor:
                                                            index % 2 === 0
                                                                ? '#fff'
                                                                : '#f9fafb',
                                                        borderBottom: '1px solid #eee'
                                                    }}
                                                >

                                                    {row.getVisibleCells().map(cell => (

                                                        <td
                                                            key={cell.id}
                                                            style={{
                                                                padding: '12px'
                                                            }}
                                                        >

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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px'
                                }}
                            >

                                <p>
                                    Showing <b>{from}</b> to <b>{to}</b> of{' '}
                                    <b>{totalRows}</b> entries
                                </p>

                                <div style={{ display: 'flex', gap: '5px' }}>

                                    <button
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        Previous
                                    </button>

                                    <button
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Next
                                    </button>

                                </div>

                            </div>

                        </div>

                    }

                </div>

            </div>

            {/* DELETE MODAL */}
            {
                showDeleteModal && (

                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999
                        }}
                    >

                        <div
                            style={{
                                backgroundColor: '#fff',
                                width: '400px',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}
                        >

                            <div
                                style={{
                                    padding: '15px 20px',
                                    borderBottom: '1px solid #eee',
                                    fontWeight: '600'
                                }}
                            >
                                Delete Review
                            </div>

                            <div
                                style={{
                                    padding: '20px'
                                }}
                            >
                                Are you sure you want to delete <b>{deleteReviewUser}</b>'s review?
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '10px',
                                    padding: '15px 20px',
                                    borderTop: '1px solid #eee'
                                }}
                            >

                                <button
                                    onClick={cancelDeleteReview}
                                    style={{
                                        border: '1px solid #ccc',
                                        background: '#fff',
                                        padding: '8px 18px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmDeleteReview}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </Fragment>
    )
}

export default ReviewList