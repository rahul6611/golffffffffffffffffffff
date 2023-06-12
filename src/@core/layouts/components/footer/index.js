// ** Icons Import
import { Heart } from 'react-feather'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <Link to='/home' rel='noopener noreferrer'>
          DOPE GOLF
        </Link>
        <span className='d-none d-sm-inline-block'>, All rights Reserved</span>
      </span>
    </p>
  )
}

export default Footer
