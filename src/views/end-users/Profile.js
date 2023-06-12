import React, { useEffect } from "react";

// ** Reactstrap
import { Col, Row } from "reactstrap";

// ** 3rd Party Library
import { useParams } from "react-router-dom";

// ** Redux
import { useDispatch, useSelector } from "react-redux";

// SCSS
import "../../assets/scss/custom.scss";
import moment from "moment";
import {
  clearEndUserProfile,
  endUserProfile,
} from "../../redux/endusers/slice";
import clubImg from "../../assets/images/logo/golf.png";
import clubImgDark from "../../assets/images/logo/club.png";

// ** Profile
const Profile = () => {
  const { id } = useParams();
  const { reload, profile } = useSelector((store) => store.enduser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endUserProfile({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearEndUserProfile());
    };
  }, [reload]);

  const skin = JSON.parse(localStorage.getItem("skin"));

  return (
    <>
      <div className="page-left-section bg-white shadow rounded p-2">
        <Row>
          {/* Profile Info */}
          <Col lg="12" md="5">
            <div className="mb-1">
              <div className="profile-img mx-auto pb-1 d-flex align-items-center border-bottom">
                <img
                  src={profile?.image}
                  alt="profile"
                  className="rounded-circle img-view"
                  height="50"
                  width="50"
                />
                <div className="ms-1 d-flex justify-content-between align-items-center w-100">
                  <div>
                    <p className="mb-0 profile-card-name">
                      {profile?.firstName != undefined &&
                        `${profile?.firstName} ${profile?.lastName}`}
                    </p>
                    <p className="mb-0 profile-card-update">
                      Joined at{" "}
                      {moment(profile?.createdAt).format("D MMM YYYY")}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="avatar bg-lite-yahoo rounded m-0">
                      {skin === "light" ? (
                        <img src={clubImg} height={30} width={30} />
                      ) : (
                        <img src={clubImgDark} height={30} width={30} />
                      )}
                    </div>
                    <div className="ms-1">
                      <h5 className="lh-1">{profile?.Clubs?.length}</h5>
                      <p className="mb-0 lh-1">Total Clubs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <span>
                            <div className="pb-1 mb-1 rounded border-bottom">
                                <Row> */}
            {/* <Col xl="6">
                                        <div className="d-flex align-items-center mb-xl-0 mb-1"> */}
            {/* <div className="avatar bg-lite-yahoo rounded p-1 m-0">
                                                <Users size={20} color="red" />
                                            </div> */}
            {/* <div className="ms-1">
                                                <h5 className="lh-1">{profile[0]?.clubsbags?.clubs.length}</h5>
                                                <p className="mb-0 lh-1">Total Clubs</p>
                                            </div> */}
            {/* </div> */}
            {/* </Col>
                                    <Col xl="6">
                                        <div className="d-flex align-items-center mb-xl-0 mb-1">
                                            <div className="avatar bg-lite-yahoo rounded p-1 m-0">
                                                <Users size={20} color="red" />
                                            </div>
                                            <div className="ms-1">
                                                <h5 className="lh-1">{endUserCount?.TotalActiveEndUser}</h5>
                                                <p className="mb-0 lh-1">Active Players</p>
                                            </div>
                                        </div>
                                    </Col> */}
            {/* </Row>
                    </div>
                </span> */}
          </Col>
          {/* Basic Details */}
          <Col lg="12" md="7">
            <div className="mb-xl-3 mb-1 profile-card">
              <div>
                <div className="d-flex align-items-center flex-wrap mb-1">
                  <p className="fw-bold label-text mb-0">Email : </p>
                  <p className="mb-0">{profile?.email}</p>
                </div>
                <div className="d-flex align-items-center flex-wrap mb-1">
                  <p className="fw-bold label-text mb-0">Status :</p>
                  {profile?.isActive ? (
                    <span>
                      <div className="badge badge-light-success badge-pill mt-0 rounded">
                        Active
                      </div>
                    </span>
                  ) : (
                    <span>
                      <div className="badge badge-light-danger badge-pill mt-0 rounded">
                        Deactive
                      </div>
                    </span>
                  )}
                </div>
                {/* <div className="d-flex align-items-center flex-wrap mb-1">
                                    <p className="fw-bold label-text mb-0">
                                        Ball Speed :
                                    </p>
                                    <p className="mb-0">
                                        {profile[0]?.usermeasurement?.BallSpeed}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-wrap mb-1">
                                    <p className="fw-bold label-text mb-0">
                                        Initial Backspin :
                                    </p>
                                    <p className="mb-0">
                                        {profile[0]?.usermeasurement?.InitialBackspin}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center flex-wrap mb-1">
                                    <p className="fw-bold label-text mb-0">
                                        Initial Trajectory  :
                                    </p>
                                    <p className="mb-0"> {profile[0]?.usermeasurement?.InitialTrajectory}</p>
                                </div>
                                <div className="d-flex align-items-center flex-wrap mb-1">
                                    <p className="fw-bold label-text mb-0">
                                        Spin Axis :
                                    </p>
                                    <p className="mb-0">{profile[0]?.usermeasurement?.SpinAxis}</p>
                                </div> */}
                <div className="d-flex align-items-center flex-wrap mb-1">
                  <p className="fw-bold label-text mb-0">Handicap :</p>
                  <p className="mb-0">{profile?.Handicap}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* Footer */}
        {/* <div
                        className="text-lg-center text-md-left"
                        hidden={!Permission.includes(roleId)}
                    >
                        <Button
                            className="mr-1"
                            color="info"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => deleteHandle(data?.id)}
                            color="outline-danger"
                        >
                            Suspend
                        </Button>
                    </div> */}
        {/* Edit Staff User */}
        {/* <EditStaffUser
            id={id}
          /> */}
      </div>
    </>
  );
};

export default Profile;
