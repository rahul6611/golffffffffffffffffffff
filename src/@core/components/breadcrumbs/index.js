// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'

// ** Reactstrap Imports
import {
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap'

const BreadCrumbs = props => {
  // ** Props
  const { breadCrumbTitle, breadCrumbParent, breadCrumbParent2, breadCrumbParent3, breadCrumbActive } = props

  return (
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {breadCrumbTitle ? <h2 className='content-header-title float-start mb-0'>{breadCrumbTitle}</h2> : ''}
            <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
              <Breadcrumb>
                <BreadcrumbItem tag='li' className='text-primary'>
                  <Link to={breadCrumbParent.route}>
                    {breadCrumbParent.name}
                  </Link>
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    <Link to={breadCrumbParent2.route}>
                      {breadCrumbParent2.name}
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    <Link to={breadCrumbParent3.route}>
                      {breadCrumbParent3.name}
                    </Link>
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag='li' active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
}
