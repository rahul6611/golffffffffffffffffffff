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

// 3rd Party Imports
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { sendOTPforEndUser } from '../../redux/auth/slice'
import { useEffect } from 'react'

const ForgotPasswordBasic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSuccess, status } = useSelector((store) => ({
    isSuccess: store.auth.isSuccess,
    status: store.auth.status
  }))

  const sendOtp = (values) => {
    { dispatch(sendOTPforEndUser({ data: values })) };
  }

  useEffect(() => {
    if (isSuccess) {
      history.push('./otp')
    }
  }, [isSuccess])


  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo align-items-center' to='/' onClick={e => e.preventDefault()}>
              {/* <img src={logo} alt='logo' className="dope-logo" />
              <img src={text} alt='logo' className="logo-text" /> */}
              <div className='logo-img'></div>
              <div className='logo-text'></div>
            </Link>
            <CardTitle tag='h4' className='mb-1 text-center'>
              Forgot Password? 🔒
            </CardTitle>
            {/* <CardText className='mb-2'>
              Enter your email and we'll send you instructions to reset your password
            </CardText> */}
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().required("Email is required").email("Please enter valid email address")
              })}
              onSubmit={(values) => sendOtp(values)}>
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleReset,
                setFieldValue,
                handleChange
              }) => (
                <Form className='auth-forgot-password-form mt-2'
                  onSubmit={handleSubmit}
                  onReset={handleReset}>
                  <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                      Email
                    </Label>
                    <Field className="form-control" id='login-email' name="email" placeholder='john@example.com' autoFocus onChange={(e) => setFieldValue("email", e.target.value)} />
                    {errors.email && touched.email ? (
                      <p className={"text-danger mb-0 error-form"}>{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="position-relative">
                    <Button type='submit' color='primary' block className={status === 'loading' ? 'LoadingContainer1' : ''}>
                      Send reset link
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

export default ForgotPasswordBasic
