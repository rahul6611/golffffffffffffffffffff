// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button } from 'reactstrap'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Styles
import '@styles/base/pages/page-misc.scss'
import logo from '../assets/images/logo/black-logo.png';
import whitelogo from '../assets/images/logo/white-logo.png';
import logotext from '../assets/images/logo/text-black.png';
import logotextwhite from '../assets/images/logo/text-white.png';
import '../assets/scss/custom.scss'

const Error = () => {
  // ** Hooks
  const { skin } = useSkin()

  const mode = JSON.parse(localStorage.getItem('skin'));

  const illustration = skin === 'dark' ? 'error-dark.svg' : 'error.svg',
    source = require(`@src/assets/images/logo/black-logo.png`).default
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo d-flex align-items-center' href='/'>
      {mode === 'light' && <img src={logo} className='error-logo' />}
      {mode === 'light' && <img src={logotext} className='error-text' />}
      {mode === 'dark' && <img src={whitelogo} className='error-logo' />}
      {mode === 'dark' && <img src={logotextwhite} className='error-text' />}
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Page Not Found 🕵🏻‍♀️</h2>
          <p className='mb-2'>Oops! 😖 The requested URL was not found on this server.</p>
          <Button tag={Link} to='/' color='primary' className='btn-sm-block mb-2'>
            Back to home
          </Button>
          {/* <img className='img-fluid' src={source} alt='Not authorized page' /> */}
        </div>
      </div>
    </div>
  )
}
export default Error
