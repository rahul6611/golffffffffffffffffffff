// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, Label, InputGroup, InputGroupText } from 'reactstrap'

// ** Third Party Components
import * as Yup from 'yup'
import Swal from 'sweetalert2'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'
import { Formik } from 'formik'
import { Lock } from 'react-feather'
import { resetPassword } from '../../redux/auth/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const SecurityTabContent = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const isSuccess = useSelector((store) => store.auth.isSuccess);

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
        }
    })

    useEffect(() => {
        if (isSuccess) {
            SuccessSwal()
        }
    }, [isSuccess])

    return (
        <Fragment>
            <Card className='change-password'>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Change Password</CardTitle>
                </CardHeader>
                <CardBody className='pt-1'>
                    <Formik
                        initialValues={{
                            password: '',
                            newPassword: '',
                            conformPassword: ''
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string().required("Current password is required"),
                            newPassword: Yup.string().required("New password is required"),
                            conformPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
                        })}
                        onSubmit={(values) => {
                            dispatch(resetPassword({ data: values }));
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleSubmit,
                            handleReset,
                            setFieldValue,
                            handleChange
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col className='mb-1'>
                                        <Label className='form-label' htmlFor='currentpass'>Current Password</Label>
                                        <InputGroup className='w-50'>
                                            <InputGroupText>
                                                <Lock size={15} />
                                            </InputGroupText>
                                            <InputPasswordToggle
                                                className="input-group-merge form-control p-0"
                                                id='currentpass'
                                                placeholder='Enter Current Password'
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                        {errors.password && touched.password ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.password}</p>
                                        ) : null}
                                    </Col>
                                    <div className='mb-1'>
                                        <Label className='form-label' htmlFor='newpass'>New Password</Label>
                                        <InputGroup className='w-50'>
                                            <InputGroupText>
                                                <Lock size={15} />
                                            </InputGroupText>
                                            <InputPasswordToggle
                                                className="input-group-merge form-control p-0"
                                                id='newpass'
                                                placeholder='Enter New Password'
                                                name="newPassword"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                        {errors.newPassword && touched.newPassword ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.newPassword}</p>
                                        ) : null}
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' htmlFor='confirmpass'>Confirm Password</Label>
                                        <InputGroup className='w-50'>
                                            <InputGroupText>
                                                <Lock size={15} />
                                            </InputGroupText>
                                            <InputPasswordToggle
                                                className="input-group-merge form-control p-0"
                                                id='confirmpass'
                                                placeholder='Enter Confirm Password'
                                                name="conformPassword"
                                                value={values.conformPassword}
                                                onChange={handleChange}
                                            />
                                        </InputGroup>
                                        {errors.conformPassword && touched.conformPassword ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.conformPassword}</p>
                                        ) : null}
                                    </div>
                                    <div className='d-flex mt-1'>
                                        <Button className='btn btn-danger me-1' type='submit' >
                                            Save Password
                                        </Button>
                                        <Button color="danger" onClick={() => history.push('./home')}
                                            outline>
                                            Cancel
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
            </Card>
            {/* <TwoFactorAuth />
      <CreateApiKey />
      <ApiKeysList />
      <RecentDevices /> */}
        </Fragment>
    )
}

export default SecurityTabContent
