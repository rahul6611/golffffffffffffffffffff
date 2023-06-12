// ** React Imports
import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";

// react dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
import { Mail, User } from "react-feather";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import "../../assets/scss/custom.scss";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Third Party Components
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  endUserBasedOnIntroducerApi,
  endUserRegisterByIntroducerApi,
} from "../../redux/endusers/slice";
import CustomSpinner from "../../@core/components/customSpinner";
import {
  activeClubsListApi,
  clearClubList,
  clearClubReload,
} from "../../redux/clubs/slice";

const MySwal = withReactContent(Swal);

const AddIntroducer = () => {
  const { isSuccess } = useSelector((store) => ({
    isSuccess: store.enduser.isSuccess,
  }));
  const { tableData, reload, process } = useSelector((store) => store.club);
  const { ProfileData } = useSelector((store) => store.auth);
  const { status } = useSelector((store) => store.enduser);
  const dispatch = useDispatch();
  const history = useHistory();

  const [clubs, setClubs] = useState([]);
  const [clubsList, setClubsList] = useState([]);

  const getActive = (id) => {
    const a = clubs?.map((item) => item?.Club);
    return a?.includes(id);
  };

  // a little function to help us with reordering the result

  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const [items, setItems] = useState(getItems(1));

  const grid = 1;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    padding: grid,
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(items, result.source.index, result.destination.index);

    setItems(items);
  };

  const checkHandler = (e, row, setFieldValue, values) => {
    if (e.target.checked === true) {
      const newClub = {
        Club: row.id,
        BallSpeed: null,
        InitialBackspin: null,
        InitialTrajectory: null,
        SpinAxis: null,
      };
      setClubs([...clubs, newClub]);
      setClubsList((prev) => [...prev, row]);
      setFieldValue("clubs", [...clubs, newClub]);
    } else {
      const selectedClubs = clubs.filter((a) => a?.Club !== row.id);
      const selectedClubsList = clubsList.filter((a) => a !== row);
      setClubs([...selectedClubs]);
      setClubsList([...selectedClubsList]);
      setFieldValue("clubs", [...selectedClubs]);
    }
  };

  const SuccessSwal = () =>
    MySwal.fire({
      title: "Success!",
      text: "Player created successfully!",
      icon: "success",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/end-users");
        dispatch(endUserBasedOnIntroducerApi({ id: ProfileData.id }));
      }
    });

  const clubHandler = (type, value, clubId, setFieldValue) => {
    const obj = {};
    obj[type] = value;
    const i = clubs.findIndex((a) => a.Club === clubId);
    clubs[i] = { ...clubs[i], ...obj };
    setFieldValue("clubs", clubs);
  };

  const itemChecked = (id) => {
    clubs?.map((item) => item?.Club).lastIndexOf(id) >= 0;
  };

  useEffect(() => {
    if (isSuccess) {
      SuccessSwal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (reload !== null) {
      dispatch(activeClubsListApi({ page: 1, limit: 20, search: "" }));
    }
  }, [reload]);

  useEffect(() => {
    if (reload === null) {
      dispatch(clearClubReload());
      dispatch(clearClubList());
    }
  }, []);

  return (
    <Fragment>
      {(status === "loading" || process === "loading") && <CustomSpinner />}
      <BreadCrumbs
        breadCrumbTitle="Add Player"
        breadCrumbParent={{ name: "Home", route: "/home" }}
        breadCrumbParent2={{ name: "Players", route: "/end-users" }}
        breadCrumbActive="Add player"
      />
      <Card className="p-3 mt-2">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            Handicap: "",
            clubs: [],
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string()
              .email("Please enter valid email address")
              .required("Email is required"),
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
                    "Initial trajectory is required"
                  ),
                  SpinAxis: Yup.string().required("Spin axis is required"),
                })
              )
              .min(1),
          })}
          onSubmit={(values) => {
            dispatch(endUserRegisterByIntroducerApi({ data: values }));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleReset,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Row>
                <Col lg={6}>
                  <div className="mb-1">
                    <Label className="form-label" for="first-name">
                      First Name
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <User size={15} />
                      </InputGroupText>
                      <Field
                        className="form-control"
                        id="first-name"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) =>
                          setFieldValue("firstName", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.firstName && touched.firstName ? (
                      <p className={"text-danger mb-0 error-form"}>
                        {errors.firstName}
                      </p>
                    ) : null}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1">
                    <Label className="form-label" for="last-name">
                      Last Name
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <User size={15} />
                      </InputGroupText>
                      <Field
                        className="form-control"
                        id="last-name"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={(e) =>
                          setFieldValue("lastName", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.lastName && touched.lastName ? (
                      <p className={"text-danger mb-0 error-form"}>
                        {errors.lastName}
                      </p>
                    ) : null}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1">
                    <Label className="form-label" for="email">
                      Email
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <Mail size={15} />
                      </InputGroupText>
                      <Field
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => setFieldValue("email", e.target.value)}
                      />
                    </InputGroup>
                    {errors.email && touched.email ? (
                      <p className={"text-danger mb-0 error-form"}>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1">
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
                </Col>
                <hr className="mt-1" />
                <h4 className="mb-0 mt-1 mb-1">Clubs</h4>
                <div className="d-flex gap-1 flex-wrap">
                  {(tableData?.results || []).map((row, index) => (
                    <>
                      {/* <Col lg={3} key={index}> */}
                      <div
                        className={
                          getActive(row?.id)
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
                            checked={itemChecked(row?.id)}
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
                                {row?.clubName}
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
                {clubsList.length > 0 && <hr className="mt-2 mb-0" />}
                {clubsList.length > 0 && (
                  <h4 className="mb-0 mt-2">Selected Club List</h4>
                )}
                {clubsList.map((row, indexData) => (
                  <Col lg={6} key={indexData}>
                    <DragDropContext
                      onDragEnd={(result) => onDragEnd(result)}
                      key={indexData}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                          >
                            {items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}
                                  >
                                    <div className="d-flex gap-1 flex-wrap">
                                      <div className="d-flex align-items-center gap-1 club-card select-club mt-2 w-100 overflow-hidden">
                                        <div className="w-100">
                                          <label
                                            classame="form-check-label w-100 label-text"
                                            style={{
                                              width: "100%",
                                              overflow: "hidden",
                                            }}
                                          >
                                            <div className="d-flex align-items-center gap-1 w-100">
                                              {/* <img src={row?.clubImage} className='club-image rounded-circle' height={50} width={50} /> */}
                                              <div className="w-100">
                                                <p className="mb-0 club-name mb-1">
                                                  {row?.clubName}
                                                </p>
                                              </div>
                                            </div>
                                          </label>
                                          <Row>
                                            {
                                              <>
                                                <Col lg={3}>
                                                  <div className="mb-1">
                                                    <Label
                                                      className="form-label"
                                                      for="ballSpeed"
                                                    >
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
                                                          values.clubs[
                                                            indexData
                                                          ]?.BallSpeed === null
                                                            ? ""
                                                            : values.clubs[
                                                                indexData
                                                              ]?.BallSpeed
                                                        }
                                                        name="BallSpeed"
                                                        // defaultValue='0'
                                                        onChange={(e) =>
                                                          clubHandler(
                                                            "BallSpeed",
                                                            e.target.value,
                                                            row.id,
                                                            setFieldValue
                                                          )
                                                        }
                                                        // onChange={(e) => setFieldValue("BallSpeed", e.target.value)}
                                                      />
                                                    </InputGroup>
                                                    {errors.clubs?.[indexData]
                                                      ?.BallSpeed ? (
                                                      <p
                                                        className={
                                                          "text-danger mb-0 error-form"
                                                        }
                                                      >
                                                        {
                                                          "BallSpeed is required"
                                                        }
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
                                                          values.clubs[
                                                            indexData
                                                          ]
                                                            ?.InitialTrajectory ===
                                                          null
                                                            ? ""
                                                            : values.clubs[
                                                                indexData
                                                              ]
                                                                ?.InitialTrajectory
                                                        }
                                                        // defaultValue='0'
                                                        onChange={(e) =>
                                                          clubHandler(
                                                            "InitialTrajectory",
                                                            e.target.value,
                                                            row.id,
                                                            setFieldValue
                                                          )
                                                        }
                                                        // onChange={(e) => setFieldValue("InitialTrajectory", e.target.value)}
                                                      />
                                                    </InputGroup>
                                                    {errors.clubs?.[indexData]
                                                      ?.InitialTrajectory ? (
                                                      <p
                                                        className={
                                                          "text-danger mb-0 error-form"
                                                        }
                                                      >
                                                        {
                                                          "InitialTrajectory is required"
                                                        }
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
                                                          values.clubs[
                                                            indexData
                                                          ]?.InitialBackspin ===
                                                          null
                                                            ? ""
                                                            : values.clubs[
                                                                indexData
                                                              ]?.InitialBackspin
                                                        }
                                                        // defaultValue='0'
                                                        onChange={(e) =>
                                                          clubHandler(
                                                            "InitialBackspin",
                                                            e.target.value,
                                                            row.id,
                                                            setFieldValue
                                                          )
                                                        }
                                                        // onChange={(e) => setFieldValue("InitialBackspin", e.target.value)}
                                                      />
                                                    </InputGroup>
                                                    {errors.clubs?.[indexData]
                                                      ?.InitialBackspin ? (
                                                      <p
                                                        className={
                                                          "text-danger mb-0 error-form"
                                                        }
                                                      >
                                                        {
                                                          "InitialBackspin is required"
                                                        }
                                                      </p>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                                <Col lg={3}>
                                                  <div className="mb-1">
                                                    <Label
                                                      className="form-label"
                                                      for="SpinAxis"
                                                    >
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
                                                            row.id,
                                                            setFieldValue
                                                          )
                                                        }
                                                        value={
                                                          values.clubs[
                                                            indexData
                                                          ]?.SpinAxis === null
                                                            ? ""
                                                            : values.clubs[
                                                                indexData
                                                              ]?.SpinAxis
                                                        }
                                                        // defaultValue='0'
                                                        // onChange={(e) => setFieldValue("SpinAxis", e.target.value)}
                                                      />
                                                    </InputGroup>
                                                    {errors.clubs?.[indexData]
                                                      ?.SpinAxis ? (
                                                      <p
                                                        className={
                                                          "text-danger mb-0 error-form"
                                                        }
                                                      >
                                                        {"SpinAxis is required"}
                                                      </p>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                              </>
                                            }
                                          </Row>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </Col>
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
              {/* <Col lg={6}>
                                    <Row>
                                        <h4 className='mb-0'>Select Club</h4>
                                        {(tableData?.results || []).map((row, index) => (
                                            <>
                                                <Col lg={6} key={index}>
                                                    <div className='d-flex align-items-center gap-1 club-card mt-1 cursor-pointer w-100 overflow-hidden'>
                                                        <div className="form-check cursor-pointer">
                                                            <Field className="form-check-input cursor-pointer" type="checkbox" value="" checked={clubs.lastIndexOf(row.id) >= 0 ? true : false} id={index} onClick={(e) => checkHandler(e, row, setFieldValue, setErrors, errors)} />
                                                        </div>
                                                        <label classame="form-check-label w-100 label-text overflow-hidden" style={{ width: "100%", overflow: "hidden" }} htmlFor={index}>
                                                            <div className="d-flex align-items-center gap-1 cursor-pointer w-100 overflow-hidden">
                                                                <img src={row.clubImage} className='club-image rounded-circle' height={50} width={50} />
                                                                <div className='w-100 overflow-hidden'>
                                                                    <p className='mb-0'>
                                                                        {row?.clubName}
                                                                    </p>
                                                                    <p className='text-truncate mb-0 club-description'>
                                                                        {row?.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </Col>
                                            </>
                                        ))}
                                        {errors.clubs ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.clubs}</p>
                                        ) : null}
                                    </Row> */}
              {/* {(clubs.length < 1 && errors.firstName) && <p className='text-danger mb-0 error-form mt-1'>There should be atleast one club selected</p>} */}
              {/* </Col> */}
              {/* <div className='mb-1'>
                                    <Label className='form-label' for='last-name'>
                                        Last Name
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <User size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" id='last-name' placeholder='Last Name' name="lastName"
                                            onChange={(e) => setFieldValue("lastName", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.lastName && touched.lastName ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.lastName}</p>
                                    ) : null}
                                </div> */}
              {/* <div className='mb-1'>
                                    <Label className='form-label' for='email'>
                                        Email
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Mail size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" type='email' id='email' placeholder='Email' name="email"
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.email && touched.email ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.email}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1'>
                                    <Label className='form-label' for='ballSpeed'>
                                        Ball Speed
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                                                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                            </svg>
                                        </InputGroupText>
                                        <Field type="number" className="form-control" id='ballSpeed' placeholder='Ball Speed' name="BallSpeed"
                                            onChange={(e) => setFieldValue("BallSpeed", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.BallSpeed && touched.BallSpeed ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.BallSpeed}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='initialTrajectory'>
                                        Initial Trajectory
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                                                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                            </svg>
                                        </InputGroupText>
                                        <Field type="number" className="form-control" id='initialTrajectory' placeholder='Initial Trajectory' name="InitialTrajectory"
                                            onChange={(e) => setFieldValue("InitialTrajectory", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.InitialTrajectory && touched.InitialTrajectory ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.InitialTrajectory}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='initialBackspin'>
                                        Initial Backspin
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                                                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                            </svg>
                                        </InputGroupText>
                                        <Field type="number" className="form-control" id='state' placeholder='Initial Backspin' name="InitialBackspin"
                                            onChange={(e) => setFieldValue("InitialBackspin", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.InitialBackspin && touched.InitialBackspin ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.InitialBackspin}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='spinAxis'>
                                        Spin Axis
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                                                <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                                            </svg>
                                        </InputGroupText>
                                        <Field type="number" className="form-control" id='spinAxis' placeholder='Spin Axis' name="SpinAxis"
                                            onChange={(e) => setFieldValue("SpinAxis", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.SpinAxis && touched.SpinAxis ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.SpinAxis}</p>
                                    ) : null}
                                </div> */}
              {/* <div className='d-flex'>
                                    <Button className='me-1' color='primary' type='submit'>
                                        Submit
                                    </Button>
                                    <Button color='secondary' type='button' outline onClick={() => history.push('/end-users')}>
                                        Cancel
                                    </Button>
                                </div> */}
            </Form>
          )}
        </Formik>
      </Card>
    </Fragment>
  );
};

export default AddIntroducer;
