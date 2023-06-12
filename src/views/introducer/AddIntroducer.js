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
import { Flag, Mail, MapPin, PhoneCall, User } from 'react-feather'
import '../../assets/scss/custom.scss'
import BreadCrumbs from '../../@core/components/breadcrumbs'
import Select from 'react-select'
import { addIntroducer, introducersListApi, introducersTypeApi } from '../../redux/introducers/slice';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Third Party Components
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2';
import CustomSpinner from '../../@core/components/customSpinner';

const MySwal = withReactContent(Swal)

const AddIntroducer = () => {
    const [professionList, setProfessionList] = useState([]);
    const { typeList, isSuccess, status } = useSelector((store) => store.introducer);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(introducersTypeApi());
    }, [dispatch])

    useEffect(() => {
        if (typeList) {
            let temp = [];
            temp = typeList.map(e => { return { value: e.id, label: e.role } })
            setProfessionList([...temp])
        }
    }, [typeList]);

    const SuccessSwal = () => MySwal.fire({
        title: 'Success!',
        text: 'Introducer created successfully!',
        icon: 'success',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            history.push('/introducers');
            dispatch(introducersListApi({ page: 1, limit: 10, search: '' }));
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
            <BreadCrumbs breadCrumbTitle='Add Introducer' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbParent2={{ name: "Introducers", route: "/introducers" }} breadCrumbActive='Add Introducer' />
            <Card className='p-3 mt-2'>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobileNo: '',
                        address: '',
                        state: '',
                        city: '',
                        country: '',
                        zipcode: '',
                        // location: '',
                        introducerType: '',
                        // longitude: '',
                        // latitude: ''
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().required("First name is required"),
                        lastName: Yup.string().required("Last name is required"),
                        email: Yup.string().email("Please enter valid email address").required("Email is required"),
                        address: Yup.string().required("Address is required"),
                        state: Yup.string().required("State is required"),
                        city: Yup.string().required("City is required"),
                        country: Yup.string().required("Country is required"),
                        zipcode: Yup.string().required("Zipcode is required"),
                        mobileNo: Yup.string().required("Mobile number is required").max(16, "Mobile Number must be less than 16 characters"),
                        // longitude: Yup.string().required("Location is required").nullable(),
                        introducerType: Yup.string().required("Introducer type is required")
                    })}
                    onSubmit={(values) => {
                        const data = {
                            ...values,
                            // latitude: '34'
                        }
                        dispatch(addIntroducer({ data: data }));
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
                                    <Label className='form-label' for='mobileNo'>
                                        Mobile No.
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <PhoneCall size={15} />
                                        </InputGroupText>
                                        <Field role="input" className="form-control" type='number' id='mobileNo' placeholder='Mobile No.' name="mobileNo"
                                            onChange={(e) => setFieldValue("mobileNo", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.mobileNo && touched.mobileNo ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.mobileNo}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='address'>
                                        Address
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <MapPin size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" id='address' placeholder='Address' name="address"
                                            onChange={(e) => setFieldValue("address", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.address && touched.address ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.address}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='state'>
                                        State
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <MapPin size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" id='state' placeholder='State' name="state"
                                            onChange={(e) => setFieldValue("state", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.state && touched.state ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.state}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='city'>
                                        City
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                                <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                            </svg>
                                        </InputGroupText>
                                        <Field className="form-control" id='city' placeholder='City' name="city"
                                            onChange={(e) => setFieldValue("city", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.city && touched.city ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.city}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='country'>
                                        Country
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Flag size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" id='country' placeholder='Country' name="country"
                                            onChange={(e) => setFieldValue("country", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.country && touched.country ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.country}</p>
                                    ) : null}
                                </div>
                                <div className='mb-1 w-50'>
                                    <Label className='form-label' for='zipcode'>
                                        Zip Code
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <MapPin size={15} />
                                        </InputGroupText>
                                        <Field className="form-control" id='zipcode' placeholder='Zipcode' name="zipcode"
                                            onChange={(e) => setFieldValue("zipcode", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.zipcode && touched.zipcode ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.zipcode}</p>
                                    ) : null}
                                </div>
                                {/* <div className='mb-1 w-50'>
                                    <Label className='form-label' for='location'>
                                        Location
                                    </Label>
                                    <InputGroup>
                                        <InputGroupText>
                                            <MapPin size={15} />
                                        </InputGroupText>
                                        <Field type="text" className="form-control" id='location' placeholder='Location' name="longitude"
                                            onChange={(e) => setFieldValue("longitude", e.target.value)}
                                        />
                                    </InputGroup>
                                    {errors.longitude && touched.longitude ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.longitude}</p>
                                    ) : null}
                                </div> */}
                                <div className='mb-1 w-50 profession'>
                                    <Label className='form-label'>Golf Profession</Label>
                                    <Select
                                        placeholder="Select Profession"
                                        name="introducerType"
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={professionList}
                                        isClearable={false}
                                        onChange={(e) => setFieldValue("introducerType", e.value)}
                                    />
                                    {errors.introducerType && touched.introducerType ? (
                                        <p className={"text-danger mb-0 error-form"}>{errors.introducerType}</p>
                                    ) : null}
                                </div>
                                <div className='d-flex'>
                                    <Button className='me-1' color='primary' type='submit'>
                                        Submit
                                    </Button>
                                    <Button color='secondary' type='button' outline onClick={() => history.push('/introducers')}>
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

export default AddIntroducer