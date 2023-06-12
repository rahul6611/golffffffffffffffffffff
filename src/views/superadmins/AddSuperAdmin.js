// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// Formik
import { Form, Formik, Field } from "formik";

// Yup
import * as Yup from 'yup';

// ** Reactstrap Imports
import { selectThemeColors } from '@utils'
import { Label, Button, InputGroup, InputGroupText, Card, Row, Col } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import { Mail, User } from 'react-feather'
import '../../assets/scss/custom.scss'
import BreadCrumbs from '../../@core/components/breadcrumbs'

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Third Party Components
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2';
import { RegisterSuperAdminApi, superAdminsListApi } from '../../redux/auth/slice';
import CustomSpinner from '../../@core/components/customSpinner';

const MySwal = withReactContent(Swal)

const AddSuperAdmin = () => {
    const { isSuccess } = useSelector((store) => store.auth);
    const status = useSelector((store) => store.auth.status);
    const dispatch = useDispatch();
    const history = useHistory();

    const SuccessSwal = () => MySwal.fire({
        title: 'Success!',
        text: 'Admin created successfully!',
        icon: 'success',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            history.push('/admin');
            dispatch(superAdminsListApi({ page: 1, limit: 10, search: '' }))
        }
    })

    useEffect(() => {
        if (isSuccess) {
            SuccessSwal()
        }
    }, [isSuccess])


    return (
        <Fragment>
            {status === "loading" && <CustomSpinner />}
            <BreadCrumbs breadCrumbTitle='Add Admin' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbParent2={{ name: "Admin", route: "/admin" }} breadCrumbActive='Add Admin' />
            <Card className='p-3 mt-2'>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobileNo: null,
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().required("First name is required"),
                        lastName: Yup.string().required("Last name is required"),
                        email: Yup.string().email("Please enter valid email address").required("Email is required"),
                        mobileNo: Yup.string().required("Mobile number is required").nullable().max(16, "Mobile number must be less than 16 characters"),
                    })}
                    onSubmit={(values) => {
                        dispatch(RegisterSuperAdminApi({ data: values }));
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
                        <Form
                            onSubmit={handleSubmit}
                            onReset={handleReset}
                        >
                            <Row>
                                <Col className='mb-1 w-50'>
                                    <Label className='form-label' for='first-name'>
                                        First Name
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <User size={15} />
                                        </InputGroupText>
                                        <Field
                                            className="form-control"
                                            id='first-name'
                                            placeholder='First Name'
                                            name="firstName"
                                            onChange={(e) => setFieldValue("firstName", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.firstName && touched.firstName ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.firstName}</p>
                                    ) : null}
                                </Col>
                                <div className='mb-1 w-50'>
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
                                </div>
                                <div className='mb-1 w-50'>
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
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='mobile'>
                                        Mobile No.
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Mail size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" type='number' id='mobile' placeholder='Mobile No.' name="mobileNo"
                                            onChange={(e) => setFieldValue("mobileNo", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.mobileNo && touched.mobileNo ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.mobileNo}</p>
                                    ) : null}
                                </div>
                                <div className='d-flex'>
                                    <Button className='me-1' color='primary' type='submit'>
                                        Submit
                                    </Button>
                                    <Button color='secondary' type='button' outline onClick={() => history.push('/admin')}>
                                        Cancel
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Fragment >
    )
}

export default AddSuperAdmin