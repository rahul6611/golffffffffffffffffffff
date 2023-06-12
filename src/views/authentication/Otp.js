// ** React Imports
import { Link, useHistory } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, Form, Label, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import logo from '../../assets/images/logo/black-logo.png'
import text from '../../assets/images/logo/logo-text.png'
import '../../assets/scss/custom.scss'
import { Field, Formik } from 'formik'
import '../../@core/components/customSpinner/loader.scss'

// 3rd Party Imports
import * as Yup from 'yup';
import { clearForgotPassword, verifyOTPforEndUser } from '../../redux/auth/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const ResetPasswordBasic = () => {

    const { code, status } = useSelector((store) => ({
        code: store.auth.responseCode,
        status: store.auth.status
    }))

    const email = localStorage.getItem("email");

    const dispatch = useDispatch();
    const history = useHistory();

    const verifyOtp = (values) => {
        dispatch(verifyOTPforEndUser({ otp: values.otp, email }));
    }

    useEffect(() => {
        code === 200 && history.push('/reset-password');
    }, [code]);

    return (
        <div className='auth-wrapper auth-basic px-2'>
            <div className='auth-inner my-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo align-items-center' to='/' onClick={e => e.preventDefault()}>
                            <div className='logo-img'></div>
                            <div className='logo-text'></div>
                        </Link>
                        <CardTitle tag='h4' className='mb-1 text-center'>
                            Enter OTP
                        </CardTitle>
                        {/* <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText> */}
                        <Formik
                            initialValues={{
                                otp: '',
                            }}
                            validationSchema={Yup.object().shape({
                                otp: Yup.string().required("OTP is required")
                            })}
                            onSubmit={(values) => verifyOtp(values)}>
                            {({
                                values,
                                errors,
                                touched,
                                handleSubmit,
                                handleReset,
                                setFieldValue,
                                handleChange
                            }) => (
                                <Form className='auth-reset-password-form mt-2'
                                    onSubmit={handleSubmit}
                                    onReset={handleReset}>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='new-password'>
                                            OTP
                                        </Label>
                                        <Field
                                            type='number'
                                            className="form-control"
                                            id='otp'
                                            placeholder='123456'
                                            name="otp"
                                            onChange={(e) => setFieldValue("otp", e.target.value)}
                                        />
                                        {errors.otp && touched.otp ? (
                                            <p className={"text-danger mb-0 error-form"}>{errors.otp}</p>
                                        ) : null}
                                    </div>
                                    <div className="position-relative">
                                        <Button color='primary' type='submit' block className={status === 'loading' ? 'LoadingContainer1' : ''}>
                                            Submit
                                        </Button>
                                        {status === 'loading' &&
                                            <div className="LoadingBox1">
                                                <span className="Loading1"></span>
                                            </div>}
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <p className='text-center mt-2'>
                            <Link to='/login'>
                                <ChevronLeft className='rotate-rtl me-25' size={14} />
                                <span className='align-middle'>Back to login</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ResetPasswordBasic
