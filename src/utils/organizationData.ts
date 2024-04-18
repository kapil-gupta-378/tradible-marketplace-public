import { OrganizationsDataTypes } from 'interfaces'

export const OrganizationsData: OrganizationsDataTypes[] = [
  {
    id: '1',
    name: 'The boring incubator',
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    createdBy: 'OllieDarby',
    users: [
      {
        id: '1',
        image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
        name: 'OllieDarby',
        role: 'Personal',
      },
      {
        id: '2',
        image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
        name: 'Webllisto',
        role: 'Personal',
      },
    ],
  },
  {
    id: '2',
    name: 'The boring incubator',
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    createdBy: 'Webllisto',
    users: [
      {
        id: '1',
        image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
        name: 'OllieDarby',
        role: 'Personal',
      },
      {
        id: '2',
        image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
        name: 'Webllisto',
        role: 'Personal',
      },
    ],
  },
]
