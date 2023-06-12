import React, { useEffect } from "react";

// ** Reactstrap
import { Card, CardHeader, CardTitle, Col, Row } from "reactstrap";

// ** 3rd Party Library

// ** Redux
import { useSelector } from "react-redux";

// SCSS
import "../../assets/scss/custom.scss";
import CustomSpinner from "../../@core/components/customSpinner";
import CustomTable from "../../@core/components/table/CustomTable";

// ** Profile
const ClubsBag = () => {
  const { profile, status } = useSelector((store) => store.enduser);

  const ColumnHeaders = () => (
    <>
      <th>No.</th>
      <th>Name</th>
      <th>Ball Speed</th>
      <th>Launch Angle</th>
      <th>Spin Rate</th>
      <th>Spin Axis</th>
    </>
  );

  const DataRows = () => (
    <>
      {(profile?.Clubs || []).map((row, index) => (
        <tr key={index}>
          <td>
            <p className="club-no">{index + 1}</p>
          </td>
          <td>
            <div className="d-flex align-items-center gap-1">
              <img src={row?.Club?.clubImage} className="dataImage" />
              <div>
                <p className="mb-0">{`${row?.Club?.clubName}`}</p>
                <p className="text-truncate mb-0 club-view-description">
                  {row?.Club?.description}
                </p>
              </div>
            </div>
          </td>
          <td>{row?.BallSpeed}</td>
          <td>{row?.InitialTrajectory}</td>
          <td>{row?.InitialBackspin}</td>
          <td>{row?.SpinAxis}</td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      {status === "loading" && <CustomSpinner />}
      {/* <div className="page-left-section bg-white shadow rounded p-1"> */}

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle tag="h4">Bag List</CardTitle>
        </CardHeader>
        <div className="react-dataTable name-width club-table">
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
          />
        </div>
      </Card>
      {/* </div> */}
    </>
  );
};

export default ClubsBag;
