// hooks/usePushNotificationSubscription.ts

import { useMutation } from 'react-query'

import { SubscribeNotificationService } from 'api-services'

async function subscribeToPushNotifications(subscriptionData: any) {
  try {
    const response = await SubscribeNotificationService.postNotification(
      subscriptionData.subscription,
      subscriptionData.notification
    )
    return response
  } catch (error) {
    console.error('Subscription failed:', error)
    throw error
  }
}

export function usePushNotificationSubscription() {
  const mutation = useMutation(subscribeToPushNotifications)

  const subscribe = async (subscriptionData: any) => {
    try {
      const response = await mutation.mutateAsync(subscriptionData)
      return response
    } catch (error) {
      console.error('Subscription failed:', error)
    }
  }

  return { subscribe, ...mutation }
}
