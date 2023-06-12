// ** Table Columns
import React, { useEffect, useState } from "react";

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import { Eye, File, FileText, Grid, Share } from "react-feather";

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";

// scss
import "../../assets/scss/custom.scss";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { clearReload, deleteIntroducerApi, endUserListApi } from "../../redux/endusers/slice";
import withReactContent from 'sweetalert2-react-content'
import { updateIntroducerApi } from "../../redux/endusers/slice";
import CustomSpinner from "../../@core/components/customSpinner";
import moment from "moment";
import CustomTable from "../../@core/components/table/CustomTable";

const GolfPlayers = () => {

    const dispatch = useDispatch();
    let { data, reload, status, count } = useSelector((store) => ({
        data: store.enduser.tableData,
        reload: store.enduser.reload,
        status: store.enduser.status,
        count: store.enduser.totalCount
    }));

    const [search, setSearch] = useState(null);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const admin = localStorage.getItem("isAdmin") === "true" ? true : false

    useEffect(() => {
        if (reload !== null) {
            dispatch(endUserListApi({ page: currentPage, limit: perPage, search }));
        }
    }, [reload]);

    useEffect(() => {
        if (reload == null) {
            dispatch(clearReload())
        }
    }, [])

    useEffect(() => {
        setCurrentPage(1)
        if (search !== null) {
            dispatch(endUserListApi({ page: 1, limit: perPage, search }));
        }
    }, [search]);

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

    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(data[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach(item => {
            let ctr = 0
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

        const filename = 'export.csv'

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', filename)
        link.click()
    }

    const DataRows = () => (
        <>
            {(data?.results || []).map((row, index) => (
                <tr key={index}>
                    <td>
                        <div className="avatar-shadow py-1">
                            {(data?.page - 1) * data?.limit + index + 1}
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
                    </td>
                    <td>
                        <div className="d-flex align-items-center gap-1">
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
                            <Link to={`/end-users/${row._id}`}>
                                <Eye color="gray" size={15} />
                            </Link>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );

    const handlePerPageChange = (page) => {
        setPerPage(page);
        setCurrentPage(1);
        dispatch(endUserListApi({ page: 1, limit: page, search }));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(endUserListApi({ page: pageNumber, limit: perPage, search }));
    };

    return (
        <>
            {status === "loading" && <CustomSpinner />}
            <Row className="justify-content-between align-items-center mb-2">
                <Col md='6'>
                    <Breadcrumbs breadCrumbTitle='Golf Players' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbActive='Players' />
                </Col>
                <Col md='6' className="d-flex justify-content-end">
                    <div className='d-flex mt-md-0 mt-1'>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color='secondary' caret outline>
                                <Share size={15} />
                                <span className='align-middle ms-50'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                                    <FileText size={15} />
                                    <span className='align-middle ms-50'>CSV</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <Grid size={15} />
                                    <span className='align-middle ms-50'>Excel</span>
                                </DropdownItem>
                                <DropdownItem className='w-100'>
                                    <File size={15} />
                                    <span className='align-middle ms-50'>PDF</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        {!admin && <Button tag={Link} to='/addplayer' className="btn btn-danger ms-2">Add Player</Button>}
                    </div>
                </Col>
            </Row>
            <Card>
                <CardHeader className="d-block">
                    <CardTitle tag="h4">Golf Players List</CardTitle>
                </CardHeader>
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
        </>
    );
};

export default GolfPlayers;
