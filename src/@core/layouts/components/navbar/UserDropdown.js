// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { User, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { loginProfile } from '../../../../redux/auth/slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const UserDropdown = () => {
  const { ProfileData } = useSelector((store) => (store.auth))
  const { userData } = useSelector((store) => (store.introducer))
  const [imgUrl, setImgUrl] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedIn = () => {
    return localStorage.getItem('access') ? true : false
  }

  useEffect(() => {
    loggedIn() &&
      dispatch(loginProfile())
  }, [])

  const MySwal = withReactContent(Swal)

  const logout = async () => {
    return MySwal.fire({
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        history.push('./login')
      }
    })
  }

  useEffect(() => {
    setImgUrl(userData?.image)
  }, [userData]);

  useEffect(() => {
    setImg(ProfileData?.image)
  }, [ProfileData]);

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{ProfileData?.firstName !== undefined ? `${ProfileData?.firstName} ${ProfileData?.lastName}` : null}</span>
          <span className='user-status'>{ProfileData?.role?.role}</span>
        </div>
        <Avatar img={img || imgUrl} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem className='w-100' onClick={() => logout()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
