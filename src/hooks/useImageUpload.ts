import axios from 'axios'
import { toast } from 'react-toastify'

export const useImageUpload = () => {
  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData()
      formData.append('file', image)

      const awsObj = await axios.get<{ url: string; objectUrl: string }>(
        `https://msp1dokcic.execute-api.us-east-1.amazonaws.com/prod/getPreSignedUrl?fileName=${encodeURIComponent(
          Date.now() + '.' + image.name.split('.')[1]
        )}&contentType=${encodeURIComponent(image.type)}`
      )

      // const finalRes = await axios.put(awsObj.data.url, image, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })

      const finalRes = await fetch(awsObj.data.url, {
        body: image,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (finalRes.ok) {
        return awsObj.data.objectUrl
      } else {
        return ''
      }
    } catch (error) {
      // console.log(error)
      toast.error('Something went wrong.')
    }
  }

  return uploadImage
}
