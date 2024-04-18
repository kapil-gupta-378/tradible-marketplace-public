const installEvent = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  self.addEventListener('install', () => {
  });
};
installEvent();

const activateEvent = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  self.addEventListener('activate', () => {
  });
};
activateEvent();

self.addEventListener('push', async (event) => {
  if (event.data) {
    const data = event.data.json();
    const title = data.title;
    const body = data.message;
    const icon = 'some-icon.png';
    const notificationOptions = {
      body: body,
      tag: 'simple-push-notification-example',
      icon: icon,
    };

    const permission = await self.registration.showNotification(title, notificationOptions);

    if (permission === 'granted') {
      return new self.Notification(title, notificationOptions);
    }
  }
});


