import CoreAPIService from './CoreAPIService'
import { NotificationSetting, NotificationSettingData } from './interface'

import { API_ENDPOINTS, BASE_API_URL } from 'utils'

const {
  PRIVATE: { SETTING_NOTIFICATIONS },
} = API_ENDPOINTS

// ******  TODO: 'Settings Notifiction Services'********

class SettingNotificationsService {
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.SETTINGS_NOTIFICATIONS_API_URL)
  }

  getNotifications = async () => {
    const endpoint = `${SETTING_NOTIFICATIONS}`
    return this.services.get<NotificationSetting>(endpoint)
  }

  postNotifications = async (data: {}) => {
    const endpoint = `${SETTING_NOTIFICATIONS}`
    return this.services.post<NotificationSetting>(endpoint, data)
  }
}

export default new SettingNotificationsService()
