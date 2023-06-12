import React, { useEffect, useState } from "react";

// ** Reactstrap
import { Card, CardHeader } from "reactstrap";

// ** 3rd Party Library
import { clearEndUser, endUserBasedOnIntroducerApi } from "../../redux/endusers/slice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { updateIntroducerApi, deleteIntroducerApi } from "../../redux/introducers/slice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CustomSpinner from "../../@core/components/customSpinner";
import moment from "moment";
import CustomTable from "../../@core/components/table/CustomTable";

const ProfileTable = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const data = useSelector((store) => store.enduser.endUserData);
    const { reload, status } = useSelector((store) => store.enduser);
    const count = useSelector((store) => store.enduser.totalCount)
    const [search, setSearch] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (reload !== null) {
            dispatch(endUserBasedOnIntroducerApi({ id, page: currentPage, limit: perPage, search }));
        }
    }, [reload]);

    useEffect(() => {
        setCurrentPage(1)
        if (search !== null) {
            dispatch(endUserBasedOnIntroducerApi({ id, page: 1, limit: perPage, search }));
        }
    }, [search]);

    useEffect(() => {
        return () => {
            dispatch(clearEndUser())
        }
    }, [id])

    const activeHandler = (e, row) => {
        dispatch(updateIntroducerApi({ active: e.target.checked, id: row._id }));
    }

    const MySwal = withReactContent(Swal)

    const deleteHandler = (row) => {
        return MySwal.fire({
            title: 'Delete Player',
            text: "Are you sure you want to delete this player?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteIntroducerApi(row._id));
            }
        })
    }

    const ColumnHeaders = () => (
        <>
            <th>No.</th>
            <th>Player</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Action</th>
        </>
    );

    const DataRows = () => (
        <>
            {(data[0]?.results || []).map((row, index) => (
                <tr key={index}>
                    <td>
                        <div className="avatar-shadow py-1">
                            {(data[0]?.page - 1) * data[0]?.limit + index + 1}
                        </div>
                    </td>
                    <td>
                        <div className="d-flex align-items-center gap-1">
                            <img src={row.image} className='dataImage' />
                            <div>
                                <p className="mb-0">
                                    {`${row.firstName} ${row.lastName}`}
                                </p>
                                {row.email}
                            </div>
                        </div>
                    </td>
                    <td>
                        {moment(row.createdAt).format('D MMM YYYY')}
                    </td>
                    <td>
                        <div>
                            <div className="custom-control custom-switch form-check form-switch">
                                <input
                                    type="checkbox"
                                    checked={row.isActive}
                                    className="form-check-input status-switch"
                                    role="switch" id="flexSwitchCheckDefault"
                                    onChange={(e) => activeHandler(e, row)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexSwitchCheckDefault"
                                ></label>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="d-flex">
                            <div className="cursor-pointer" onClick={() => deleteHandler(row)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="red"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );

    const handlePerPageChange = (page) => {
        setPerPage(page);
        setCurrentPage(1);
        dispatch(endUserBasedOnIntroducerApi({ id, page: currentPage, limit: page, search }));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(endUserBasedOnIntroducerApi({ id, page: pageNumber, limit: perPage, search }));
    };

    return (
        <div>
            {status === "loading" && <CustomSpinner />}
            {/* End Users */}
            <Card className='player-table'>
                <CardHeader className="card-head fw-bold">Golf Players List</CardHeader>
                <div className="react-dataTable name-width">
                    <CustomTable
                        columnHeaders={<ColumnHeaders />}
                        dataRows={<DataRows />}
                        totalCount={count || 0}
                        pageNumber={currentPage}
                        perPage={perPage}
                        isPerPageChange={true}
                        getSearchValue={setSearch}
                        isSearch={true}
                        handlePageChange={handlePageChange}
                        handlePerPageChangeValue={handlePerPageChange}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ProfileTable;
