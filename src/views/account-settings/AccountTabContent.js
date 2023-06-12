// ** React Imports
import { Fragment, useCallback, useEffect, useState } from 'react'

// ** Third Party Components
import 'cleave.js/dist/addons/cleave-phone.us'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

// ** Reactstrap Imports
import { Row, Col, Button, Card, Form, Label, InputGroup, InputGroupText, CardHeader, CardTitle, CardBody, Input } from 'reactstrap'

// ** Utils
import { updateIntroducer, updateSuperAdminApi } from '../../redux/introducers/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Flag, Mail, MapPin, PhoneCall, User } from 'react-feather'
import { Formik, Field } from 'formik'
import withReactContent from 'sweetalert2-react-content'

// ** Demo Components
import DeleteAccount from './DeleteAccount'
import CustomSpinner from '../../@core/components/customSpinner'
import getCroppedImg from './cropImage'

// 3rd Party Libraries
import Cropper from 'react-easy-crop'

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { loginProfile } from '../../redux/auth/slice'

const MySwal = withReactContent(Swal)

const AccountTabs = () => {
    const { userData, status, isSuccess } = useSelector((store) => store.introducer);

    const [modal, setModal] = useState(null)

    const [logo, setLogo] = useState("");
    const [logoUrl, setLogoUrl] = useState(null);
    const [imgUrl, setImgUrl] = useState(null)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setImgUrl(userData.image)
    }, [userData])

    const [croppedImage, setCroppedImage] = useState(null)

    const logoChange = async (files) => {
        const fileGet = files[0];
        setLogo(fileGet);
        setLogoUrl(URL.createObjectURL(files[0]));
        setModal(true);
    };

    const SuccessSwal = () => MySwal.fire({
        title: 'Success!',
        text: 'Changes Saved successfully!',
        icon: 'success',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            history.push('./home')
            dispatch(loginProfile())
        }
    })

    const admin = localStorage.getItem("isAdmin") === "true" ? true : false;

    useEffect(() => {
        if (isSuccess) {
            SuccessSwal()
        }
    }, [isSuccess])

    const toggleModal = id => {
        if (modal !== id) {
            setModal(id)
        } else {
            setModal(null)
        }
    }

    return (
        <Fragment>
            {status === 'loading' && <CustomSpinner />}
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Profile Details</CardTitle>
                </CardHeader>
                <CardBody className='py-2 my-25'>
                    <Formik initialValues={{
                        image: `${userData.image}`,
                        firstName: `${userData.firstName}`,
                        lastName: `${userData.lastName}`,
                        mobileNo: `${userData.mobileNo}`,
                        address: `${userData.address}`,
                        state: `${userData.state}`,
                        city: `${userData.city}`,
                        country: `${userData.country}`,
                        zipcode: `${userData.zipcode}`,
                        location: `${userData?.location?.coordinates[0]}`
                    }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().required("First name is required"),
                            lastName: Yup.string().required("Last name is required"),
                            address: !admin ? Yup.string().required("Address is required") : '',
                            state: !admin ? Yup.string().required("State is required") : '',
                            city: !admin ? Yup.string().required("City is required") : '',
                            country: !admin ? Yup.string().required("Country is required") : '',
                            zipcode: !admin ? Yup.string().required("Zipcode is required").nullable() : '',
                            mobileNo: Yup.string().required("Mobile number is required"),
                            location: !admin ? Yup.string().required("Location is required") : ''
                        })}
                        onSubmit={(values) => {
                            const formData = new FormData();
                            formData.append("firstName", values.firstName);
                            formData.append("lastName", values.lastName);
                            formData.append("mobileNo", values.mobileNo);
                            formData.append("address", values.address);
                            formData.append("image", values.image);
                            formData.append("state", values.state);
                            formData.append("city", values.city);
                            formData.append("country", values.country);
                            formData.append("zipcode", values.zipcode);
                            formData.append("longitude", Number(values.location));
                            formData.append("latitude", Number(values.location));
                            // For Introducers and Players
                            { !admin && dispatch(updateIntroducer({ data: formData, id: userData.id })) };

                            // For Super Admins
                            { admin && dispatch(updateSuperAdminApi({ data: { firstName: values.firstName, lastName: values.lastName, email: userData.email, mobileNo: values.mobileNo ? Number(values.mobileNo) : null }, id: userData.id })) }
                        }} enableReinitialize>
                        {({
                            values,
                            dirty,
                            errors,
                            touched,
                            handleSubmit,
                            handleReset,
                            setFieldValue,
                        }) => 
                        (
                            <Form onSubmit={handleSubmit}
                            onReset={handleReset}>
                                <Row>
                                    {!admin && <div className='mb-2'>
                                        <Label className='form-label d-block' for='image'>
                                            Image
                                        </Label>
                                        <img className='rounded me-1' src={imgUrl} alt='Generic placeholder image' height='100' width='100' />
                                        <Button tag={Label} size='sm' color='primary' className='mb-0' onClick={() => setLogo("")}>
                                            Upload
                                            <Input value={""} type='file' name='image' onChange={(e) => {
                                                logoChange(e.target.files)
                                            }} hidden accept='image/*' />
                                        </Button>
                                        {errors.image && touched.image ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.image}</p>
                                        ) : null}
                                    </div>}
                                    <Col className='mb-1 w-50'>
                                        <Label className='form-label' htmlFor='first-name'>First Name</Label>
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
                                        <Label className='form-label' htmlFor='last-name'>Last Name</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                <User size={15} />
                                            </InputGroupText>
                                            <Field
                                                className="form-control"
                                                id='last-name'
                                                placeholder='Last Name'
                                                name="lastName"
                                                onChange={(e) => setFieldValue("lastName", e.target.value)}
                                            />
                                        </InputGroup>
                                        {errors.lastName && touched.lastName ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.lastName}</p>
                                        ) : null}
                                    </div>
                                    <div className='mb-1 w-50'>
                                        <Label className='form-label' htmlFor='email'>Email</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                <Mail size={15} />
                                            </InputGroupText>
                                            <Field
                                                className="form-control"
                                                id='email'
                                                placeholder='Email'
                                                name="email"
                                                value={userData.email}
                                                // onChange={(e) => setFieldValue("email", e.target.value)}
                                                disabled
                                            />
                                        </InputGroup>
                                        {errors.email && touched.email ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.email}</p>
                                        ) : null}
                                    </div>
                                    <div className='mb-1 w-50'>
                                        <Label className='form-label' htmlFor='contact'>Mobile No.</Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                <PhoneCall size={15} />
                                            </InputGroupText>
                                            <Field
                                                type="number"
                                                className="form-control"
                                                id='contact'
                                                placeholder='Mobile No.'
                                                name="mobileNo"
                                                onChange={(e) => setFieldValue("mobileNo", e.target.value)}
                                            />
                                        </InputGroup>
                                        {errors.mobileNo && touched.mobileNo ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.mobileNo}</p>
                                        ) : null}
                                    </div>
                                    {!admin && <>
                                        <div className='mb-1 w-50'>
                                            <Label className='form-label' htmlFor='address'>Address</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <MapPin size={15} />
                                                </InputGroupText>
                                                <Field
                                                    className="form-control"
                                                    id='address'
                                                    placeholder='Address'
                                                    name="address"
                                                    onChange={(e) => setFieldValue("address", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.address && touched.address ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.address}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 w-50'>
                                            <Label className='form-label' htmlFor='state'>State</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <MapPin size={15} />
                                                </InputGroupText>
                                                <Field
                                                    className="form-control"
                                                    id='state'
                                                    placeholder='State'
                                                    name="state"
                                                    onChange={(e) => setFieldValue("state", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.state && touched.state ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.state}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 w-50'>
                                            <Label className='form-label' htmlFor='city'>City</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                                        <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                                    </svg>
                                                </InputGroupText>
                                                <Field
                                                    className="form-control"
                                                    id='city'
                                                    placeholder='City'
                                                    name="city"
                                                    onChange={(e) => setFieldValue("city", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.city && touched.city ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.city}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 w-50'>
                                            <Label className='form-label' htmlFor='country'>Country</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <Flag size={15} />
                                                </InputGroupText>
                                                <Field
                                                    className="form-control"
                                                    id='country'
                                                    placeholder='Country'
                                                    name="country"
                                                    onChange={(e) => setFieldValue("country", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.country && touched.country ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.country}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 w-50'>
                                            <Label className='form-label' htmlFor='zipcode'>Zip Code</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <MapPin size={15} />
                                                </InputGroupText>
                                                <Field
                                                    className="form-control"
                                                    id='zipcode'
                                                    placeholder='Zipcode'
                                                    name="zipcode"
                                                    onChange={(e) => setFieldValue("zipcode", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.zipcode && touched.zipcode ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.zipcode}</p>
                                            ) : null}
                                        </div>
                                        <div className='mb-1 w-50'>
                                            <Label className='form-label' htmlFor='location'>location</Label>
                                            <InputGroup>
                                                <InputGroupText>
                                                    <MapPin size={15} />
                                                </InputGroupText>
                                                <Field
                                                    className="form-control"
                                                    id='location'
                                                    placeholder='location'
                                                    name="location"
                                                    onChange={(e) => setFieldValue("location", e.target.value)}
                                                />
                                            </InputGroup>
                                            {errors.location && touched.location ? (
                                                <p className={"text-danger mb-0 error-form"}>{errors.location}</p>
                                            ) : null}
                                        </div>
                                    </>}
                                    <div className='d-flex mt-1'>
                                        <Button className='btn btn-danger me-1' type='submit' disabled={!dirty}>
                                            Save Changes
                                        </Button>
                                        <Button color="danger" onClick={() => history.push('./home')}
                                            outline>
                                            Cancel
                                        </Button>
                                    </div>
                                </Row>
                                {modal && <ModalHandler setFieldValue={setFieldValue} setCroppedImage={setCroppedImage} modal={modal} toggleModal={toggleModal} setImgUrl={setImgUrl} logoUrl={logoUrl} />}
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
            {!admin && <DeleteAccount />}
        </Fragment >
    )
}

const ModalHandler = ({ setFieldValue, setCroppedImage, modal, toggleModal, setImgUrl, logoUrl }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const showCroppedImage = useCallback(async () => {
        try {
            toggleModal(!modal)
            const croppedImage = await getCroppedImg(
                logoUrl,
                croppedAreaPixels,
                rotation
            )
            setFieldValue('image', croppedImage.file);
            setCroppedImage(croppedImage.file)
            setImgUrl(croppedImage.url);
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])
    return (
        <div className={`theme-modal-danger danger`}>
            <Modal
                isOpen={modal}
                toggle={() => toggleModal(!modal)}
                className='modal-dialog-centered'
            >
                <ModalHeader toggle={() => toggleModal(!modal)}>Crop Image</ModalHeader>
                <ModalBody>
                    <div className='img-set'>
                        <Cropper
                            image={logoUrl}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={4 / 4}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' onClick={() => showCroppedImage()}>
                        Submit
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default AccountTabs

