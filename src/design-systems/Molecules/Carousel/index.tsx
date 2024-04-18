/* eslint-disable no-console */
'use client'
import Carousel from 'react-multi-carousel'

import { CarouselProps } from './interface'
import 'react-multi-carousel/lib/styles.css'
import { useOverlayContext } from 'contexts/OverlayContext'

const CardCarousel: React.FC<CarouselProps> = ({
  className = '',
  activeSlide = () => {},
  cols = 4,
  withArrows = true,
  withIndicators = true,
  elements = [],
  removeArrowOnDeviceType = [],
  itemClass = '',
  mobileCols,
  tabletCols,
  landscapeCols,
  smallTabletCols,
  smallMobileCols,
  slidesToSlide = 1,
  afterChangeFunction = '',
  isBanner = false,
}) => {
  const useCartOverlay = useOverlayContext()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: cols,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1026 },
      items: cols,
    },
    tablet: {
      breakpoint: { max: 1026, min: 980 },
      items: cols == 1 ? 1 : tabletCols ? tabletCols : 2,
    },
    smallTablet: {
      breakpoint: { max: 980, min: 768 },
      items: cols == 1 ? 1 : smallTabletCols ? smallTabletCols : tabletCols ? tabletCols : 2,
    },
    landscape: {
      breakpoint: { max: 768, min: 650 },
      items: cols == 1 ? 1 : landscapeCols ? landscapeCols : 2,
      slidesToSlide: mobileCols ? mobileCols : 1,
    },
    largeMobie: {
      breakpoint: { max: 650, min: 481 },
      items: cols == 1 ? 1 : smallMobileCols ? smallMobileCols : landscapeCols ? landscapeCols : 2,
      slidesToSlide: mobileCols ? mobileCols : 1,
    },
    mobile: {
      breakpoint: { max: 480, min: 376 },
      items: mobileCols ? mobileCols : 1,
      slidesToSlide: mobileCols ? mobileCols : 1,
    },
    smallMobile: {
      breakpoint: { max: 375, min: 0 },
      items: 1,
      slidesToSlide: mobileCols ? mobileCols : 1,
    },
  }

  const classNames = ['relative ', className].join(' ')
  const itemClasses = ['', itemClass].join(' ')

  const IsBannerActive = (previousSlide: number, isBanner: boolean) => {
    if (isBanner) {
      afterChangeFunction(previousSlide)
    }
  }

  return (
    <div className={classNames}>
      <Carousel
        afterChange={(previousSlide, state) => {
          activeSlide(previousSlide, state), IsBannerActive(previousSlide, isBanner)
        }}
        arrows={withArrows}
        autoPlay={false}
        autoPlaySpeed={5000}
        className="gd-carousel"
        containerClass={`!static ${!useCartOverlay?.overlayVisible ? '' : '!mr-1'}`}
        dotListClass="indicator_wrp"
        draggable={true}
        infinite={false}
        itemClass={itemClasses}
        removeArrowOnDeviceType={removeArrowOnDeviceType}
        responsive={responsive}
        showDots={withIndicators}
        slidesToSlide={slidesToSlide}
        swipeable={true}
      >
        {elements &&
          elements.map((element, i) => (
            <div className="h-full w-full pb-[16px]" key={i}>
              {element}
            </div>
          ))}
      </Carousel>
    </div>
  )
}
export default CardCarousel
