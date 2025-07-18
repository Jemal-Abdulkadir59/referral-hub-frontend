'use client'
// Next Imports
import dynamic from 'next/dynamic'

// Component Imports
import AccountSettings from '../../../views/account-settings'
import withAuth from '@/components/withAuth'

const AccountTab = dynamic(() => import('../../../views/account-settings/account'))
const NotificationsTab = dynamic(() => import('../../../views/account-settings/notifications'))
const ConnectionsTab = dynamic(() => import('../../../views/account-settings/connections'))

// Vars
const tabContentList = () => ({
  account: <AccountTab />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />
})

const AccountSettingsPage = () => {
  return <AccountSettings tabContentList={tabContentList()} />
}

export default withAuth(AccountSettingsPage, 'data_clerk')
