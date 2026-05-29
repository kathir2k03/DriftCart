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

import {
    getUsers,
    deleteUser
} from "../../actions/userActions";

import {
    clearError,
    clearUserDeleted
} from "../../slices/UserSlice";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserList = () => {

    const dispatch = useDispatch()

    const {
        users = [],
        loading = true,
        error,
        isUserDeleted
    } = useSelector(state => state.userState)

    const [globalFilter, setGlobalFilter] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState(null)
    const [deleteUserName, setDeleteUserName] = useState('')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

    // DELETE USER
function deleteUserHandler(id, name) {
    setDeleteUserId(id)
    setDeleteUserName(name)
    setShowDeleteModal(true)
}

function confirmDeleteUser() {
    dispatch(deleteUser(deleteUserId))
    setShowDeleteModal(false)
    setDeleteUserId(null)
    setDeleteUserName('')
}
function cancelDeleteUser() {
    setShowDeleteModal(false)
    setDeleteUserId(null)
    setDeleteUserName('')
}

    useEffect(() => {

        if (isUserDeleted) {

            toast.success("User Deleted Successfully")

            dispatch(clearUserDeleted())

            dispatch(getUsers())
        }

        if (error) {

            toast.error(error)

            dispatch(clearError())
        }

        dispatch(getUsers())

    }, [dispatch, error, isUserDeleted])

    // TABLE DATA
    const data = useMemo(() =>
        users?.map(user => ({
            id: user?._id,
            name: user?.name,
            email: user?.email,
            role: user?.role
        })) ?? [],
        [users]
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
            header: 'Name',
            accessorKey: 'name',
        },

        {
            header: 'Email',
            accessorKey: 'email',
        },

        {
            header: 'Role',
            accessorKey: 'role',
        },

        {
            header: 'Actions',
            accessorKey: 'actions',
            enableGlobalFilter: false,

            cell: ({ row }) => (

                <div style={{ display: 'flex', gap: '10px' }}>

                    <Link to={`/admin/user/${row.original.id}`}>

                        <FaEdit
                            style={{
                                color: '#0d6efd',
                                cursor: 'pointer',
                                fontSize: '18px'
                            }}
                        />

                    </Link>

                    <div onClick={() => deleteUserHandler(row.original.id, row.original.name)}>

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

            <MetaData title={'User List'} />

            <div className="row">

                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">

                    <h1 className="my-4">User List</h1>

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
                                    padding: '15px',
                                    borderBottom: '1px solid #eee'
                                }}
                            >

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

                                <input
                                    type="text"
                                    placeholder="Search user?..."
                                    value={globalFilter ?? ''}
                                    onChange={(e) => {
                                        setGlobalFilter(e.target.value)
                                        table.setPageIndex(0)
                                    }}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '5px 10px',
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
                                                    backgroundColor: '#030303',
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
                                                    No Users Found
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
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
            >

                {/* HEADER */}
                <div
                    style={{
                        padding: '15px 20px',
                        borderBottom: '1px solid #eee',
                        fontSize: '18px',
                        fontWeight: '600'
                    }}
                >
                    Delete User
                </div>

                {/* BODY */}
                <div
                    style={{
                        padding: '20px',
                        fontSize: '15px',
                        color: '#555'
                    }}
                >
                    Are you sure you want to delete <b>{deleteUserName}</b> ?
                </div>

                {/* FOOTER */}
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
                        onClick={cancelDeleteUser}
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
                        onClick={confirmDeleteUser}
                        className="btn-danger"
                        style={{
                            padding: '8px 18px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
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

export default UserList