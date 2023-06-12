// // ** React Imports
// import { Fragment, useEffect } from 'react'

// // ** Custom Components
// import NavbarUser from './NavbarUser'

// // ** Third Party Components
// import { Sun, Moon } from 'react-feather'

// // ** Reactstrap Imports
// import { NavItem, NavLink } from 'reactstrap'

// const ThemeNavbar = props => {
//   // ** Props
//   const { skin, setSkin } = props



//   // ** Function to toggle Theme (Light/Dark)
//   const ThemeToggler = () => {
//     if (skin === 'dark') {
//       return <Sun className='ficon' onClick={() => setSkin('light')} />
//     } else {
//       return <Moon className='ficon' onClick={() => setSkin('dark')} />
//     }
//   }

//   return (
//     <Fragment>
//       <div className='bookmark-wrapper d-flex align-items-center'>
//         <NavItem className='d-block'>
//           <NavLink className='nav-link-style'>
//             <ThemeToggler />
//           </NavLink>
//         </NavItem>
//       </div>
//       <NavbarUser skin={skin} setSkin={setSkin} />
//     </Fragment>
//   )
// }

// export default ThemeNavbar

// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
// import NavbarUser from './NavbarUser'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

// ** React Imports
// import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'

const ThemeNavbar = props => {
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        <div className='bookmark-wrapper d-flex align-items-center'>
          <NavItem className='d-block'>
            <NavLink className='nav-link-style'>
              <ThemeToggler />
            </NavLink>
          </NavItem>
        </div>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar

