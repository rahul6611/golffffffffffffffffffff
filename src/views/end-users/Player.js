import React, { useEffect } from "react";

// ** Reactstrap
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from "reactstrap";

// ** Components
import Profile from "./Profile";
import ClubsBag from './ClubsBag'
// ** Redux
import { useSelector } from "react-redux";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import CustomSpinner from "../../@core/components/customSpinner";
import { File, FileText, Grid, Share } from "react-feather";

// ** Staff Profile
const StaffProfile = () => {

    const { status } = useSelector((store) => ({
        status: store.introducer.status,
        reload: store.introducer.reload
    }))

    const admin = localStorage.getItem("isAdmin") === "true" ? true : false;

    return (
        <>
            {status === "loading" && <CustomSpinner />}
            <div className="mb-2">
                {admin ? <BreadCrumbs breadCrumbTitle='Player Profile' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbParent2={{ name: "Players", route: "/golf-players" }} breadCrumbActive='Player Profile' /> : <BreadCrumbs breadCrumbTitle='Player Profile' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbParent2={{ name: "Players", route: "/end-users" }} breadCrumbActive='Player Profile' />}
            </div>
            <Row>
                <Col xl="4" lg="4" md="12" className="mb-xl-0 mb-2">
                    <Profile />
                </Col>
                <Col xl="8" lg="8" md="12">
                    <ClubsBag />
                </Col>
            </Row>
        </>
    );
};

export default StaffProfile;
