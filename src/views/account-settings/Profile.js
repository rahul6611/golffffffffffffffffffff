// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import AccountTabContent from './AccountTabContent'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearProfile, superAdminProfileApi } from '../../redux/introducers/slice'
import Tabs from './Tabs'
import SecurityTabContent from './SecurityTabContent'
import CustomSpinner from '../../@core/components/customSpinner'

const Profile = () => {
    const dispatch = useDispatch();

    const { reload, status } = useSelector((store) => store.introducer)
    const { process, ProfileData } = useSelector((store) => store.auth)

    useEffect(() => {
        ProfileData?.id !== undefined &&
            dispatch(superAdminProfileApi(ProfileData?.id))
    }, [reload, ProfileData])

    useEffect(() => {
        return () => {
            dispatch(clearProfile());
        }
    }, [reload])

    // ** State
    const [activeTab, setActiveTab] = useState('1')

    const toggleTab = tab => {
        setActiveTab(tab)
    }

    return (
        <Fragment>
            {(status === 'loading' || process === 'loading') && <CustomSpinner />}
            <Breadcrumbs breadCrumbTitle='Account Settings' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbActive='Account Settings' />
            <div id='user-profile' className='mt-2'>
                <Row>
                    <Col xs={12}>
                        <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId='1'>
                                <AccountTabContent />
                            </TabPane>
                            <TabPane tabId='2'>
                                <SecurityTabContent />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        </Fragment >
    )
}

export default Profile
