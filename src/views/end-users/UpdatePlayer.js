// ** React Imports
import { useEffect, useState } from "react";

// Formik
import { Form, Formik, Field } from "formik";

// Yup
import * as Yup from "yup";

// ** Reactstrap Imports
import {
  Label,
  Button,
  InputGroup,
  InputGroupText,
  Card,
  Row,
  Col,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import "../../assets/scss/custom.scss";
import BreadCrumbs from "../../@core/components/breadcrumbs";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

// Third Party Components
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  clearStatus,
  endUserProfile,
  endUserUpdateApi,
} from "../../redux/endusers/slice";
import CustomSpinner from "../../@core/components/customSpinner";
import { activeClubsListApi } from "../../redux/clubs/slice";

const MySwal = withReactContent(Swal);

const updatePlayer = () => {
  const { profile, status, updatePlayerData } = useSelector(
    (store) => store.enduser
  );
  const { tableData } = useSelector((store) => store.club);
  const [clubBox, setClubBox] = useState([]);
  const [clubTab, setClubTab] = useState([]);
  const [clubsList, setClubsList] = useState([]);

  const list = profile?.Clubs;

  const checkIDs = (id) => {
    if (
      clubsList?.findIndex(
        (item) =>
          (JSON.stringify(item?._id) || JSON.stringify(item?.id)) ===
          JSON.stringify(id)
      ) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(clearStatus());
    let dummyArray = [];
    (list || []).map((item, index) => {
      dummyArray.push(item?.Club);
    });
    setClubsList(dummyArray);
  }, [list]);

  useEffect(() => {
    if (clubsList?.length > 0) {
      let dummyArray = [];
      (tableData?.results || []).map((item, index) => {
        dummyArray.push({ isActive: checkIDs(item.id), data: item });
      });
      setClubTab(dummyArray);
    }
  }, [clubsList]);

  useEffect(() => {
    let dummy = [];
    profile?.Clubs?.map((item) => {
      dummy.push({
        Club: item?.Club?._id,
        BallSpeed: item?.BallSpeed,
        InitialBackspin: item?.InitialBackspin,
        InitialTrajectory: item?.InitialTrajectory,
        SpinAxis: item?.SpinAxis,
      });
    });
    setClubBox(dummy);
  }, [profile]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(endUserProfile({ id }));
    dispatch(activeClubsListApi({ page: 1, limit: 20, search: "" }));
  }, []);

  useEffect(() => {
    if (updatePlayerData?.sucess) {
      status === "succeeded" &&
        MySwal.fire({
          title: "Success!",
          text: "Player Updated successfully!",
          icon: "success",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/end-users");
          }
        });
    }
  }, [updatePlayerData]);

  const checkHandler = (e, row, setFieldValue) => {
    if (e.target.checked === true) {
      const newClub = {
        Club: row.data.id,
        BallSpeed: null,
        InitialBackspin: null,
        InitialTrajectory: null,
        SpinAxis: null,
      };
      setClubBox([...clubBox, newClub]);
      setClubsList((prev) => [...prev, row.data]);
      setFieldValue("clubs", [...clubBox, newClub]);
    } else {
      const selectedClubs = clubBox.filter((a) => a?.Club !== row.data.id);
      const selectedClubsList = clubsList.filter(
        (a) => (a.id || a._id) !== row.data.id
      );
      setClubBox([...selectedClubs]);
      setClubsList([...selectedClubsList]);
      setFieldValue("clubs", [...selectedClubs]);
    }
  };

  const clubHandler = (type, value, clubId, setFieldValue) => {
    const obj = {};
    obj[type] = value;
    const i = clubBox.findIndex((a) => a.Club === clubId);
    clubBox[i] = { ...clubBox[i], ...obj };
    setFieldValue("clubs", clubBox);
  };

  return (
    <>
      {status === "loading" && <CustomSpinner />}

      <BreadCrumbs
        breadCrumbTitle="Update Player"
        breadCrumbParent={{ name: "Home", route: "/home" }}
        breadCrumbParent2={{ name: "Players", route: "/end-users" }}
        breadCrumbActive="Update Player"
      />
      <Card className="p-3 mt-2">
        <Formik
          enableReinitialize
          initialValues={{
            Handicap: profile?.Handicap,
            clubs: clubBox,
          }}
          validationSchema={Yup.object().shape({
            Handicap: Yup.number()
              .min(0)
              .max(54)
              .required("Handicap is required"),
            clubs: Yup.array()
              .of(
                Yup.object().shape({
                  Club: Yup.string().required("Club is required"),
                  BallSpeed: Yup.string().required("Ball speed is required"),
                  InitialBackspin: Yup.string().required(
                    "Initial backspin is required"
                  ),
                  InitialTrajectory: Yup.string().required(
                    "Initialt trajectory is required"
                  ),
                  SpinAxis: Yup.string().required("Spin axis is required"),
                })
              )
              .min(1),
          })}
          onSubmit={(values) => {
            dispatch(endUserUpdateApi({ data: values, id: id }));
          }}
        >
          {({
            values,
            errors,
            touched,
            dirty,
            handleSubmit,
            handleReset,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Row>
                <div className="mb-1 w-50">
                  <Label className="form-label" for="Handicap">
                    Handicap
                  </Label>
                  <InputGroup>
                    <InputGroupText>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-123"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                      </svg>
                    </InputGroupText>
                    <Field
                      type="number"
                      max="54"
                      maxLength={54}
                      className="form-control"
                      id="Handicap"
                      placeholder="Handicap"
                      name="Handicap"
                      onChange={(e) =>
                        setFieldValue("Handicap", e.target.value)
                      }
                    />
                  </InputGroup>
                  {errors.Handicap && touched.Handicap ? (
                    <p className={"text-danger mb-0 error-form"}>
                      {errors.Handicap}
                    </p>
                  ) : null}
                </div>
                <h4 className="mb-0 mt-1 mb-1">Clubs</h4>
                <div className="d-flex gap-1 flex-wrap">
                  {(clubTab || []).map((row, index) => (
                    <>
                      <div
                        className={
                          checkIDs(row?.data?.id)
                            ? "chip rounded-pill d-flex align-items-center gap-1 club-card card-hover club-chip cursor-pointer overflow-hidden"
                            : "d-flex rounded-pill align-items-center gap-1 club-card card-hover club-chip cursor-pointer overflow-hidden"
                        }
                        key={index}
                      >
                        <div className="form-check cursor-pointer p-0 d-none">
                          <Field
                            className="form-check-input cursor-pointer d-none"
                            type="checkbox"
                            value=""
                            defaultChecked={checkIDs(row?.data?.id)}
                            checked={checkIDs(row?.data?.id)}
                            id={index}
                            onChange={(e) =>
                              checkHandler(e, row, setFieldValue, values)
                            }
                          />
                        </div>
                        <label
                          classame="form-check-label label-text overflow-hidden"
                          style={{ width: "100%", overflow: "hidden" }}
                          htmlFor={index}
                        >
                          <div
                            className={
                              "align-items-center gap-1 cursor-pointer w-100 overflow-hidden"
                            }
                          >
                            {/* <img src={row.clubImage} className='club-image rounded-circle' height={50} width={50} /> */}
                            <div className="w-100 overflow-hidden">
                              <p className="mb-0 dark-text-white">
                                {row?.data?.clubName}
                              </p>
                              {/* <p className='text-truncate mb-0 club-description'>
                                                                    {row?.description}
                                                                </p> */}
                            </div>
                          </div>
                        </label>
                      </div>
                      {/* </Col> */}
                    </>
                  ))}
                </div>

                {typeof errors.clubs === "string" ? (
                  <p className={"text-danger mb-0 mt-1 error-form"}>
                    {errors.clubs}
                  </p>
                ) : null}
              </Row>
              {clubsList.length > 0 && (<hr className="mt-1" />)}
              {clubsList.length > 0 && (
                <h4 className="mt-2">Selected Clubs</h4>)}
              <Row>
                {clubsList?.map((row, index) => (
                  <>
                    <div className="col-lg-6">
                      <div className="club-card p-2 mt-2">
                        <h4>
                          {row?.Club !== undefined
                            ? row?.Club?.clubName
                            : row?.clubName}
                        </h4>
                        {console.log(
                          "------values.clubs----",
                          values.clubs[index]?.BallSpeed === null
                            ? ""
                            : values.clubs[index]?.BallSpeed
                        )}
                        <Row>
                          <Col lg={3}>
                            <div className="mb-1">
                              <Label className="form-label" for="ballSpeed">
                                Ball Speed
                              </Label>
                              <InputGroup>
                                <InputGroupText>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-123"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                  </svg>
                                </InputGroupText>
                                <Field
                                  type="number"
                                  className="form-control"
                                  id="ballSpeed"
                                  placeholder="Ball Speed"
                                  value={
                                    values.clubs[index]?.BallSpeed === null
                                      ? ""
                                      : values.clubs[index]?.BallSpeed
                                  }
                                  name="BallSpeed"
                                  onChange={(e) =>
                                    clubHandler(
                                      "BallSpeed",
                                      e.target.value,
                                      row._id || row.id,
                                      setFieldValue
                                    )
                                  }
                                />
                              </InputGroup>
                              {errors.clubs?.[index]?.BallSpeed ? (
                                <p className={"text-danger mb-0 error-form"}>
                                  {"BallSpeed is required"}
                                </p>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-1">
                              <Label
                                className="form-label"
                                for="initialtrajectory"
                              >
                                Initial Trajectory
                              </Label>
                              <InputGroup>
                                <InputGroupText>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-123"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                  </svg>
                                </InputGroupText>
                                <Field
                                  type="number"
                                  className="form-control"
                                  id="initialtrajectory"
                                  placeholder="Initial Trajectory"
                                  name="InitialTrajectory"
                                  value={
                                    values.clubs[index]?.InitialTrajectory ===
                                      null
                                      ? ""
                                      : values.clubs[index]?.InitialTrajectory
                                  }
                                  onChange={(e) =>
                                    clubHandler(
                                      "InitialTrajectory",
                                      e.target.value,
                                      row._id || row.id,
                                      setFieldValue
                                    )
                                  }
                                />
                              </InputGroup>
                              {errors.clubs?.[index]?.InitialTrajectory ? (
                                <p className={"text-danger mb-0 error-form"}>
                                  {"InitialTrajectory is required"}
                                </p>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-1">
                              <Label
                                className="form-label"
                                for="InitialBackspin"
                              >
                                Initial Backspin
                              </Label>
                              <InputGroup>
                                <InputGroupText>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-123"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                  </svg>
                                </InputGroupText>
                                <Field
                                  type="number"
                                  className="form-control"
                                  id="InitialBackspin"
                                  placeholder="Initial Backspin"
                                  name="InitialBackspin"
                                  value={
                                    values.clubs[index]?.InitialBackspin ===
                                      null
                                      ? ""
                                      : values.clubs[index]?.InitialBackspin
                                  }
                                  onChange={(e) =>
                                    clubHandler(
                                      "InitialBackspin",
                                      e.target.value,
                                      row._id || row.id,
                                      setFieldValue
                                    )
                                  }
                                />
                              </InputGroup>
                              {errors.clubs?.[index]?.InitialBackspin ? (
                                <p className={"text-danger mb-0 error-form"}>
                                  {"InitialBackspin is required"}
                                </p>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={3}>
                            <div className="mb-1">
                              <Label className="form-label" for="SpinAxis">
                                Spin Axis
                              </Label>
                              <InputGroup>
                                <InputGroupText>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-123"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                  </svg>
                                </InputGroupText>
                                <Field
                                  type="number"
                                  className="form-control"
                                  id="SpinAxis"
                                  placeholder="Spin Axis"
                                  name="SpinAxis"
                                  onChange={(e) =>
                                    clubHandler(
                                      "SpinAxis",
                                      e.target.value,
                                      row._id || row.id,
                                      setFieldValue
                                    )
                                  }
                                  value={
                                    values.clubs[index]?.SpinAxis === null
                                      ? ""
                                      : values.clubs[index]?.SpinAxis
                                  }
                                />
                              </InputGroup>
                              {errors.clubs?.[index]?.SpinAxis ? (
                                <p className={"text-danger mb-0 error-form"}>
                                  {"SpinAxis is required"}
                                </p>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </>
                ))}
              </Row>

              <div className="d-flex mt-2">
                <Button className="me-1" color="primary" type="submit">
                  Submit
                </Button>
                <Button
                  color="secondary"
                  type="button"
                  outline
                  onClick={() => history.push("/end-users")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default updatePlayer;
