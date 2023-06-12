import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { CardTitle, CardText, Form, Label, Input, Button, Card, CardBody } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import logo from '../../assets/images/logo/black-logo.png'
import { Formik } from 'formik'
import text from '../../assets/images/logo/logo-text.png'
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/slice";
import * as Yup from 'yup'
import '../../assets/scss/custom.scss'
import { useEffect } from 'react'
import '../../@core/components/customSpinner/loader.scss'

const LoginCover = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loginData, status } = useSelector((store) => store.auth);

  useEffect(() => {
    if (loginData && localStorage.access) {
      history.push("/home")
    }
  }, [history, loginData]);

  return (
    <>
      <div className='auth-wrapper auth-basic'>
        <div className='auth-inner my-2'>
          <Card className='mb-0'>
            <CardBody>
              <Link className='brand-logo align-items-center d-flex justify-content-center mt-1 mb-2' to='/' onClick={e => e.preventDefault()}>
                {/* <img src={logo} alt='logo' className="dope-logo" />
                <img src={text} alt='logo' className="logo-text" /> */}
                <div className='logo-img'></div>
                <div className='logo-text'></div>
              </Link>
              <CardTitle tag='h4' className='mb-1'>
                Welcome to DOPE-golf! 👋
              </CardTitle>
              <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .required("Email is required")
                    .email("Please enter valid email address"),
                  password: Yup.string()
                    .required("Password is required")
                })}
                onSubmit={(values) => {
                  dispatch(login(values))
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit
                }) => (
                  <>
                    <Form className='auth-login-form mt-2' onSubmit={handleSubmit}>
                      <div className='mb-1'>
                        <Label className='form-label' for='email'>
                          Email
                        </Label>
                        <Input name='email' type='email' value={values.email} id='email' onChange={handleChange} placeholder='john@example.com' autoFocus />
                        {errors.email && touched.email ? (
                          <p className={"text-danger mb-0 error-form"}>
                            {errors.email}
                          </p>
                        ) : null}
                      </div>
                      <div className='mb-1'>
                        <div className='d-flex justify-content-between'>
                          <Label className='form-label' for='password'>
                            Password
                          </Label>
                        </div>
                        <InputPasswordToggle name="password" onChange={handleChange} className='input-group-merge form-control' id='password' />
                        <div className='d-flex justify-content-between align-items-center'>
                          {errors.password && touched.password ? (
                            <p className={"text-danger mb-0 error-form"}>
                              {errors.password}
                            </p>
                          ) : null}
                          <Link to='/forgot-password' className='ms-auto error-form'>Forgot Password?</Link>
                        </div>
                      </div>
                      <div className="position-relative">
                        <Button color='primary' type='submit' block className={status === 'loading' ? 'LoadingContainer1' : ''}>
                          Sign in
                        </Button>
                        {status === 'loading' &&
                          <div className="LoadingBox1">
                            <span className="Loading1"></span>
                          </div>}
                      </div>
                    </Form>
                  </>)}
              </Formik>

            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default LoginCover
