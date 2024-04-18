'use client'
import { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

import { ImageBlockTypes } from './interface'

import Image from 'design-systems/Atoms/Image'

const ImageBlock: React.FC<ImageBlockTypes> = ({ className, imageGroup }) => {
  const [activeImage, setActiveImage] = useState<string | StaticImageData>(imageGroup ? imageGroup[0] : '')
  const handleImageClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: string | StaticImageData) => {
    setActiveImage(item)
  }

  useEffect(() => {
    setActiveImage(imageGroup ? imageGroup[0] : '')
    return () => {
      setActiveImage('')
    }
  }, [imageGroup])
  return (
    <div className="flex flex-col-reverse gap-8 xs:flex-col-reverse md:flex-row">
      <div className="xs-flex-row flex gap-8 md:flex-col ">
        {imageGroup &&
          imageGroup?.length > 1 &&
          imageGroup?.map((item: string | StaticImageData, index: number) => (
            <div key={index} onClick={event => handleImageClick(event, item)}>
              <Image
                ImageclassName="rounded-lg"
                alt="Image"
                className="rounded-lg border"
                height={88}
                src={item}
                width={88}
              />
            </div>
          ))}
      </div>
      {activeImage && (
        <Image
          ImageclassName="rounded-xl h-[601px] w-[602px]  object-contain"
          alt="Image"
          className=" rounded-xl "
          height={602}
          src={activeImage}
          width={601}
        />
      )}
    </div>
  )
}

export default ImageBlock
