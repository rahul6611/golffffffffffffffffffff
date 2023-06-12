import '../../assets/scss/custom.scss'
import StatsVertical from '@components/widgets/stats/StatsVertical'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ChartJS from '../chart'
import CustomSpinner from '../../../src/@core/components/customSpinner'
import { dashboardCount, dashboardCountForIntroducer } from '../../redux/auth/slice'

// images
import clubImg from '../../assets/images/logo/club-info.png'
import playerwarning from '../../assets/images/logo/golfers-b.png'
import playerdanger from '../../assets/images/logo/golfer-danger.png'
import playersuccess from '../../assets/images/logo/golfer-successs.png'
import playerinfo from '../../assets/images/logo/golf-info.png'
import man from '../../assets/images/logo/setting.png'
import introducersuccess from '../../assets/images/logo/coach-success.png'
import introducerdanger from '../../assets/images/logo/coach-danger.png'
import introducerwarning from '../../assets/images/logo/coach-warning.png'

// SCSS
import '../../assets/scss/custom.scss'

const Home = () => {

  const { status, dashboard, dashboardForIntroducer } = useSelector((store) => (store.auth));

  const dispatch = useDispatch();
  const history = useHistory();

  const admin = localStorage.getItem("isAdmin") === "true" ? true : false;

  useEffect(() => {
    admin && dispatch(dashboardCount())
    !admin && dispatch(dashboardCountForIntroducer())
  }, [dispatch]);

  return (
    <>
      {status === "loading" && <CustomSpinner />}
      <div className='row justify-content-center dashboard-avatar'>
        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical onClick={() => history.push('./admin')} icon={<img src={man} width={25} height={25} />} statTitle='Total Admin' color='danger' stats={dashboard?.SubSuperAdminCount} />
        </div>}

        {admin && <div className='col-lg-4 mb-0 col-xl-3 col-sm-6' >
          <StatsVertical onClick={() => history.push('./introducers')} icon={<img src={introducersuccess} width={25} height={25} />} statTitle='Total Introducer' color='success' stats={dashboard?.totalIntroducer} />
        </div>}

        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical onClick={() => history.push('./golf-players')} icon={<img src={playerwarning} width={25} height={25} />} statTitle='Total Golf Player' color='warning' stats={dashboard?.totalUser} />
        </div>}

        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical onClick={() => history.push('./clubs')} icon={<img src={clubImg} height={25} width={25} />} statTitle='Total Club' color='info' stats={dashboard?.ClubCount} />
        </div>}

        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical icon={<img src={introducerdanger} width={25} height={25} />} statTitle='This Month Introducer' color='danger' stats={dashboard?.totalIntoducerCurrentMonth} />
        </div>}

        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical icon={<img src={playersuccess} width={25} height={25} />} statTitle='This Month Player' color='success' stats={dashboard?.totalUserCurrentMonth} />
        </div>}

        {!admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical onClick={() => history.push('./end-users')} icon={<img src={playerwarning} width={25} height={25} />} statTitle='Golf Player' color='warning' stats={dashboardForIntroducer?.enduserCountBasedOnIntroducer} />
        </div>}

        {!admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical onClick={() => history.push('./clubs')} icon={<img src={clubImg} height={25} width={25} />} statTitle='Total Club' color='info' stats={dashboardForIntroducer?.ClubCount} />
        </div>}

        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical icon={<img src={introducerwarning} width={25} height={25} />} statTitle='This Week Introducer' color='warning' stats={dashboard?.totalIntroducerCurrentWeek} />
        </div>}

        {admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical icon={<img src={playerinfo} width={25} height={25} />} statTitle='This Week Player' color='info' stats={dashboard?.totalUserCurrentWeek} />
        </div>}

        {!admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical icon={<img src={playerdanger} width={25} height={25} />} statTitle='This Month Player' color='danger' stats={dashboardForIntroducer?.totalUserCountMonthly} />
        </div>}

        {!admin && <div className='col-lg-4 col-xl-3  col-sm-6'>
          <StatsVertical icon={<img src={playersuccess} width={25} height={25} />} statTitle='This Week Player' color='success' stats={dashboardForIntroducer?.totalUserCountWeekly} />
        </div>}

      </div>
      <ChartJS />
    </>
  )
}

export default Home
