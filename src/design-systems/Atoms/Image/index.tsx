import NextImage from 'next/image'

import Skeleton from '../Skeleton'

import { ImageElementProps } from './interface'

import useToggle from 'hooks/useToggle'
import SpinnerCard from 'design-systems/Molecules/Skeleton/SpinnerCard'

const Image: React.FC<ImageElementProps> = ({
  width,
  height,
  className = '',
  alt,
  src,
  isLoading = false,
  onClick,
  style,
  ImageclassName = '',
  imageLoading = true,
  loadingClassName,
}) => {
  const [isLoaded, , , turnOn] = useToggle()
  const classNames = [`relative flex h-full w-full justify-center `, className].join(' ')

  return (
    <div className="h-full w-full">
      {src !== 'null' ? (
        <div className="flex h-full w-full items-center justify-center">
          {isLoading ? (
            <div className="h-full w-full">
              <Skeleton isAnimatePulse className="h-full w-full" />
            </div>
          ) : (
            <div className={classNames}>
              {
                <NextImage
                  alt={alt}
                  className={ImageclassName}
                  height={height}
                  src={typeof src === 'string' && src.includes('http') ? src : typeof src === 'object' ? src : ''}
                  style={style}
                  width={width}
                  onClick={onClick}
                  onError={turnOn}
                  onLoadingComplete={turnOn}
                  draggable="false"
                />
              }

              {!isLoaded && imageLoading && (
                <SpinnerCard
                  className={`absolute left-0  right-0 top-0 w-auto bg-neutral-700  ${ImageclassName}  ${loadingClassName}`}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Image
