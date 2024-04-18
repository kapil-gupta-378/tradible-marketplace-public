import React from 'react'
import Carousel from 'react-multi-carousel'

import 'react-multi-carousel/lib/styles.css'
import { useSellerContext } from 'contexts/SellerListContext'
import Image from 'design-systems/Atoms/Image'

const ListDetailImage: React.FC = () => {
  const { formik } = useSellerContext()
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  //   const CustomDot = ({ index, onClick, active }: DotProps) => {
  //     const images = imageList.map(item => (
  //       <div className="h-12 w-12 overflow-hidden rounded-lg" key={item}>
  //         <Image alt={item} className="h-full w-full" height={1000} key={item} src={item} width={1000} />
  //       </div>
  //     ))
  //     return (
  //       <button
  //         className={active ? 'mx-auto rounded-lg border-2 border-black' : ''}
  //         onClick={e => {
  //           onClick?.()
  //           e.preventDefault()
  //         }}
  //       >
  //         {index !== undefined && React.Children.toArray(images)[index]}
  //       </button>
  //     )
  //   }

  const imageList = formik.values.images

  return (
    <div className="relative w-[300px]">
      {imageList.length > 0 && (
        <Carousel
          //   customDot={<CustomDot active={undefined} index={undefined} onClick={undefined} />}
          arrows
          className="h-auto w-full overflow-hidden rounded-lg"
          dotListClass="gap-1 !my-4 !static"
          focusOnSelect
          itemClass=""
          partialVisible
          renderDotsOutside
          responsive={responsive}
          //   showDots
          //   centerMode
        >
          {imageList.map(item => (
            <div key={item} className="h-full">
              <Image alt={item} className="h-full w-full" height={1000} src={item} width={1000} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default ListDetailImage
