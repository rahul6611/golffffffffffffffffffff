// ** React Imports
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

const VerticalNavMenuLink = ({ item, activeItem, setActiveItem, currentActiveItem }) => {
  const admin = JSON.parse(localStorage.getItem("isAdmin"));
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink
  // ** Hooks
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    // console.log('current', currentActiveItem);
    // console.log('item', activeItem);
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
    }
    // else if (activeItem !== null && currentActiveItem === null) {
    //   setActiveItem('no')
    // }
  }, [location]);

  const hiddenAdminId = ["players"]
  const hiddenNormalId = ["golf-players", "introducers", "superadmins"]

  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        hidden: admin && hiddenAdminId.includes(item.id) || !admin && hiddenNormalId.includes(item.id),
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        hidden
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
            href: item.navLink || '/'
          }
          : {
            to: item.navLink || '/',
            isActive: match => {
              if (!match) {
                return false
              }

              if (match.url && match.url !== '' && match.url === item.navLink) {
                currentActiveItem = item.navLink
              }
            }
          })}
        onClick={e => {
          if (item.navLink.length === 0 || item.navLink === '#' || item.disabled === true) {
            e.preventDefault()
          }
        }}
      >
        {item.icon}
        <span className='menu-item text-truncate'>{t(item.title)}</span>
        {item.badge && item.badgeText ? (
          <Badge className='ms-auto me-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  )
}

export default VerticalNavMenuLink
