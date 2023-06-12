// ** Third Party Components
import { Bar } from 'react-chartjs-2'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { selectThemeColors } from '@utils'
import ReactSelect from 'react-select'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { YearlyCountIntroducer } from '../../redux/introducers/slice'
import CustomSpinner from '../../@core/components/customSpinner'
import '../../assets/scss/custom.scss'
import '../../@core/scss/base/themes/dark-layout.scss'

const ChartjsBarChart = ({ success, gridLineColor, labelColor }) => {
  const [year, setYear] = useState();

  const dispatch = useDispatch();
  const { yearlyData, dashboard, status } = useSelector((store) => ({
    yearlyData: store?.introducer?.YearlyIntroducer,
    dashboard: store?.auth?.dashboard?.totalIntroducerYearlyCount,
    status: store?.introducer?.status
  }));

  let limit = null;

  if (yearlyData !== null) {
    const maxArr = Math.max(...yearlyData)
    limit = Math.ceil(maxArr / 5) * 5
  }

  let range = null;
  if (!!dashboard) {
    const maxArr = Math.max(...dashboard)
    range = Math.ceil(maxArr / 5) * 5
  }

  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max: limit !== null && limit + 5 || range + 5,
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor
        },
        ticks: {
          stepSize: 5,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  // ** Chart data
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: success,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: yearlyData || dashboard
      }
    ]
  }

  useEffect(() => {
    if (!!year) {
      dispatch(YearlyCountIntroducer({ year: year }))
    }
  }, [year]);

  let years = []
  for (let i = moment().year(); i >= 2000; i--) {
    years.push({ label: i, value: i })
  }

  return (
    <>
      {status === 'loading' && <CustomSpinner />}
      <Card>
        <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
          <CardTitle tag='h4'>Yearly Introducer</CardTitle>
          <div className='d-flex align-items-center'>
            <ReactSelect
              defaultValue={years[0]}
              placeholder="Year"
              name="introducerType"
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              options={years}
              onChange={e => setYear(e.value)}
            />
          </div>
        </CardHeader>
        <CardBody>
          <div style={{ height: '400px' }}>
            <Bar data={data} options={options} height={400} />
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default ChartjsBarChart
