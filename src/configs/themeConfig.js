// You can customize the template with the help of this file

import '../assets/scss/custom.scss'
import logo from '../../src/assets/images/logo/text-black.png'
import dopelogo from '../../src/assets/images/logo/black-logo.png'
import whitelogo from '../../src/assets/images/logo/white-logo.png'

//Template config options
const themeConfig = {
  app: {
    appName: <img src={logo} className="side-logo" alt='side-logo' />,
    appLogoImage: <img src={dopelogo} alt='logo' />
  },
  layout: {
    isRTL: false,
    skin: JSON.parse(localStorage.getItem("skin")), // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    contentWidth: 'boxed', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'static' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
