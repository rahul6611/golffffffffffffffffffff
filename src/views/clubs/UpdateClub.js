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
  Input,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { MessageSquare, User } from "react-feather";
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
  clearClubProfile,
  clubProfileApi,
  updateClubApi,
} from "../../redux/clubs/slice";
import CustomSpinner from "../../@core/components/customSpinner";
import ReactSelect from "react-select";

const MySwal = withReactContent(Swal);

const updateClub = () => {
  let clubData = useSelector((store) => store.club.clubProfiles);
  const status = useSelector((store) => store.club.status);
  const reload = useSelector((store) => store.club.reload);

  const shaftflex = [
    { value: "Reguler", label: "Reguler" },
    { value: "Stiff", label: "Stiff" },
    { value: "Extra Stiff", label: "Extra Stiff" },
    { value: "Senior", label: "Senior" },
    { value: "Ladies", label: "Ladies" },
  ];

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState(null);

  const logoChange = (files, setFieldValue) => {
    const fileGet = files[0];
    setFieldValue("clubImage", fileGet);
    setImgUrl(URL.createObjectURL(files[0]));
  };

  useEffect(() => {
    dispatch(clubProfileApi({ id }));
    return () => {
      dispatch(clearClubProfile());
    };
  }, [reload]);

  useEffect(() => {
    setImgUrl(clubData.clubImage);
  }, [clubData]);

  console.log(clubData?.clubRange);

  return (
    <>
      {status === "loading" && <CustomSpinner />}
      <BreadCrumbs
        breadCrumbTitle="Update Club"
        breadCrumbParent={{ name: "Home", route: "/home" }}
        breadCrumbParent2={{ name: "Clubs", route: "/clubs" }}
        breadCrumbActive="Update Club"
      />
      <Card className="p-3 mt-2">
        <Formik
          initialValues={{
            clubName: clubData.clubName,
            // clubRange: clubData.clubRange,
            // shaftLength: clubData.shaftLength,
            // shaftFlex: { label: clubData.shaftFlex, value: clubData.shaftFlex },
            description: clubData.description,
            clubImage: clubData.clubImage,
          }}
          validationSchema={Yup.object().shape({
            clubName: Yup.string().required("Name is required"),
            // clubRange: Yup.string().required("Range is required").matches(/^[0-9\.\-\/]+$/g,'Please enter a valid range'),
            // shaftLength: Yup.string().required("Shaft length is required"),
            description: Yup.string().required("Description is required"),
            clubImage: Yup.mixed().required("Image is required").nullable(),
          })}
          onSubmit={(values) => {
            const formData = new FormData();
            formData.append("clubName", values.clubName);
            // formData.append("clubRange", values.clubRange);
            // formData.append("shaftLength", values.shaftLength);
            formData.append("description", values.description);
            // formData.append("shaftFlex", values.shaftFlex.value);
            formData.append("clubImage", values.clubImage);
            MySwal.fire({
              title: "Success!",
              text: "Club Updated successfully!",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/clubs");
              }
            });
            dispatch(updateClubApi({ data: formData, id }));
          }}
          enableReinitialize
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
                <div className="mb-2">
                  <Label className="form-label d-block" for="image">
                    Image
                  </Label>
                  <img
                    className="rounded me-1"
                    src={imgUrl}
                    alt="Generic placeholder image"
                    height="100"
                    width="100"
                  />
                  <Button
                    tag={Label}
                    size="sm"
                    color="primary"
                    className="mb-0"
                  >
                    Upload
                    <Input
                      type="file"
                      onChange={(e) => {
                        logoChange(e.target.files, setFieldValue);
                      }}
                      hidden
                      accept="image/*"
                    />
                  </Button>
                </div>
                <div className="w-100">
                  <Col className="mb-1 w-50">
                    <Label className="form-label" for="name">
                      Name
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <User size={15} />
                      </InputGroupText>
                      <Field
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        name="clubName"
                        onChange={(e) =>
                          setFieldValue("clubName", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.clubName && touched.clubName ? (
                      <p className={"text-danger mb-0 error-form"}>
                        {errors.clubName}
                      </p>
                    ) : null}
                  </Col>
                </div>
                {/* <div className="mb-1 w-50">
                  <Label className="form-label" for="range">
                    Range
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
                      className="form-control"
                      id="range"
                      placeholder="Range"
                      name="clubRange"
                      onChange={(e) =>
                        setFieldValue("clubRange", e.target.value)
                      }
                    />
                  </InputGroup>
                  {errors.clubRange && touched.clubRange ? (
                    <p className={"text-danger mb-0 error-form"}>
                      {errors.clubRange}
                    </p>
                  ) : null}
                </div>
                <div className="mb-1 w-50">
                  <Label className="form-label" for="shaftlength">
                    Shaft Length
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
                      id="shaftlength"
                      placeholder="Shaft length"
                      name="shaftLength"
                      onChange={(e) =>
                        setFieldValue("shaftLength", e.target.value)
                      }
                    />
                  </InputGroup>
                  {errors.shaftLength && touched.shaftLength ? (
                    <p className={"text-danger mb-0 error-form"}>
                      {errors.shaftLength}
                    </p>
                  ) : null}
                </div>
                <div className="mb-1 w-50">
                  <Label className="form-label" for="shaftflex">
                    Shaft Flex
                  </Label>
                  <ReactSelect
                    className="react-select"
                    classNamePrefix="select"
                    value={values.shaftFlex}
                    options={shaftflex}
                    id="shaftflex"
                    placeholder="Select shaft flex"
                    name="shaftFlex"
                    onChange={(e) => setFieldValue("shaftFlex", e)}
                  />
                  {errors.shaftflex && touched.shaftflex ? (
                    <p className={"text-danger mb-0 error-form"}>
                      {errors.shaftflex}
                    </p>
                  ) : null}
                </div> */}
                <div className="w-100">
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="description">
                      Description
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <MessageSquare size={15} />
                      </InputGroupText>
                      <Field
                        component="textarea"
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        name="description"
                        onChange={(e) =>
                          setFieldValue("description", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.description && touched.description ? (
                      <p className={"text-danger mb-0 error-form"}>
                        {errors.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                    disabled={!dirty}
                  >
                    Submit
                  </Button>
                  <Button
                    color="secondary"
                    type="button"
                    outline
                    onClick={() => history.push("/clubs") && setData(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default updateClub;
