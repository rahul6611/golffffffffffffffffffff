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
import { introducersListApi, deleteIntroducerApi, updateIntroducerApi } from "../../redux/introducers/slice";
import withReactContent from 'sweetalert2-react-content'
import CustomSpinner from "../../@core/components/customSpinner";
import moment from "moment";
import CustomTable from "../../@core/components/table/CustomTable";

const Introducers = () => {

  const dispatch = useDispatch();
  const data = useSelector((store) => store.introducer.tableData);
  const { reload, status } = useSelector((store) => store.introducer);
  const count = useSelector((store) => store.introducer.totalCount);
  const [search, setSearch] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (reload !== null) {
      dispatch(introducersListApi({ page: currentPage, limit: perPage, search }));
    }
  }, [reload]);

  useEffect(() => {
    setCurrentPage(1)
    if (search !== null) {
      dispatch(introducersListApi({ page: 1, limit: perPage, search }));
    }
  }, [search]);

  const activeHandler = (e, row) => {
    dispatch(updateIntroducerApi({ active: e.target.checked, id: row.id }));
  }

  const MySwal = withReactContent(Swal)

  const deleteHandler = (row) => {
    return MySwal.fire({
      title: 'Delete Introducer',
      text: "Are you sure you want to delete this introducer?",
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
        dispatch(deleteIntroducerApi(row.id));
      }
    })
  }

  const ColumnHeaders = () => (
    <>
      <th>No.</th>
      <th>Name</th>
      <th>Address</th>
      <th>Mobile No.</th>
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
    const keys = Object.keys(data?.results)

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
              {(data.page - 1) * data?.limit + index + 1}
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
            {row.address}
          </td>
          <td>
            {row.mobileNo}
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
              <div className="ms-1">
                <Link to={`/introducers/${row.id}`}>
                  <Eye color="gray" size={15} />
                </Link>
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
    dispatch(introducersListApi({ page: 1, limit: page, search }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(introducersListApi({ page: pageNumber, limit: perPage, search }));
  };

  return (
    <>
      {status === "loading" && <CustomSpinner />}
      <Row className="justify-content-between align-items-center mb-2">
        <Col md='6'>
          <Breadcrumbs breadCrumbTitle='Introducers' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbActive='Introducers' />
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
            <Button tag={Link} to='/addintroducer' className="btn btn-danger ms-2">Add Introducer</Button>
          </div>
        </Col>
      </Row>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Introducers List</CardTitle>
        </CardHeader>
        <div className="react-dataTable name-width">
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
            totalCount={count}
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

export default Introducers;
