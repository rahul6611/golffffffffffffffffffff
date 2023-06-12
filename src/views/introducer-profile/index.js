import React, { useEffect } from "react";

// ** Reactstrap
import { Col, Row } from "reactstrap";

// ** Components
import Profile from "../profile/Profile";
import ProfileTable from "../profile/ProfileTable";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import CustomSpinner from "../../@core/components/customSpinner";
import { clearReload } from "../../redux/endusers/slice";


// ** Staff Profile
const IntroducerProfile = () => {

    const { status, reload } = useSelector((store) => ({
        status: store.introducer.status,
        reload: store.introducer.reload
    }))
    const dispatch = useDispatch();

    useEffect(() => {
        if (reload == null) {
            dispatch(clearReload())
        }
    }, [reload])

    return (
        <>
            {status === "loading" && <CustomSpinner />}
            <div className="mb-2">
                <BreadCrumbs breadCrumbTitle='Introducer Profile' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbParent2={{ name: "Introducers", route: "/introducers" }} breadCrumbActive='Introducer Profile' />
            </div>
            <Row>
                <Col xl="4" lg="5" md="12" className="mb-xl-0 mb-2">
                    <Profile />
                </Col>
                <Col xl="8" lg="7" md="12">
                    <ProfileTable />
                </Col>
            </Row>
        </>
    );
};

export default IntroducerProfile;
