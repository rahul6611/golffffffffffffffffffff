// ** React Imports
import { Fragment, useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Deom Charts
import BarChart from './ChartjsBarChart'
import UserChart from './UserChart'
import UserChartBasedOnIntroducer from './UserChartBasedOnIntroducer'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ChartJS = () => {
  // ** Context, Hooks & Vars
  const { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    lineChartDanger = '#ff4961'

  const admin = localStorage.getItem("isAdmin") === "true" ? true : false;

  return (
    <Fragment>
      <Row className='match-height'>
        {admin && <>
          <Col xl='6' sm='12'>
            <BarChart success={lineChartDanger} labelColor={labelColor} gridLineColor={gridLineColor} />
          </Col>
          <Col xl='6' sm='12'>
            <UserChart success={lineChartDanger} labelColor={labelColor} gridLineColor={gridLineColor} />
          </Col>
        </>}
        {!admin &&
          <Col xl='6' sm='12'>
            <UserChartBasedOnIntroducer success={lineChartDanger} labelColor={labelColor} gridLineColor={gridLineColor} />
          </Col>
        }
      </Row>
    </Fragment>
  )
}

export default ChartJS
