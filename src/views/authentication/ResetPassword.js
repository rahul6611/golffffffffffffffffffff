// ** React Imports
import { Link, useHistory } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import logo from '../../assets/images/logo/black-logo.png'
import text from '../../assets/images/logo/logo-text.png'
import '../../assets/scss/custom.scss'
import { Formik } from 'formik'
import '../../@core/components/customSpinner/loader.scss'

// 3rd Party Imports
import * as Yup from 'yup';
import { forgetpasswordforEnduser } from '../../redux/auth/slice'
import { useDispatch, useSelector } from 'react-redux'

const ResetPasswordBasic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector((store) => store.auth.status);

  const forgetPassword = (values) => {
    console.log(values);
    dispatch(forgetpasswordforEnduser({ data: { password: values.password } }));
    history.push('./login')
  }

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
              Reset Password 🔒
            </CardTitle>
            {/* <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText> */}
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string().required("New Password is required"),
                confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], 'Passwords must match')
              })}
              onSubmit={(values) => forgetPassword(values)}>
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
                  onReset={handleReset}
                >
                  <div className='mb-1'>
                    <Label className='form-label' for='new-password'>
                      New Password
                    </Label>
                    <InputPassword className='input-group-merge' id='new-password' name="password" onChange={handleChange} autoFocus />
                    {errors.password && touched.password ? (
                      <p className={"text-danger mb-0 error-form"}>{errors.password}</p>
                    ) : null}
                  </div>
                  <div className='mb-1'>
                    <Label className='form-label' for='confirm-password'>
                      Confirm Password
                    </Label>
                    <InputPassword className='input-group-merge' id='confirm-password' name="confirmPassword" onChange={handleChange} />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className={"text-danger mb-0 error-form"}>{errors.confirmPassword}</p>
                    ) : null}
                  </div>
                  <div className="position-relative">
                    <Button color='primary' type='submit' block className={status === 'loading' ? 'LoadingContainer1' : ''}>
                      Set New Password
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
    </div >
  )
}

export default ResetPasswordBasic
