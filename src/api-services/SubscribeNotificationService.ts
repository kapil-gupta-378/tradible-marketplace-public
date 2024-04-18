import CoreAPIService from './CoreAPIService'

import { API_ENDPOINTS, BASE_API_URL } from 'utils'

const {
  PRIVATE: { SUBSCRIBE_NOTIFICATION },
} = API_ENDPOINTS
// ******  TODO: 'SEARCH SERVICES'********
class SubscribeNotificationService {
  static postNotification(subscription: any, notification: any) {
    throw new Error('Method not implemented.')
  }
  private services: CoreAPIService

  constructor() {
    this.services = new CoreAPIService(BASE_API_URL.NOTIFICATION_API_URL)
  }

  postNotification = async (subscription: any, notification: any) => {
    const endpoint = `${SUBSCRIBE_NOTIFICATION}`
    const payload = {
      webPushNotification: {
        endpoint: subscription.endpoint,
        expirationTime: null,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      },
      title: notification.title,
      body: notification.body,
    }
    return this.services.post(endpoint, payload)
  }
}

export default SubscribeNotificationService
