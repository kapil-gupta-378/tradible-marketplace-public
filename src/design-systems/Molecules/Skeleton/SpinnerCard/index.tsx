import Spinner from 'design-systems/Atoms/Spinner'

export interface SpinnerCardProps {
  title?: string
  href?: string
  className?: string
}

const spinnerCardClassNames = [
  'flex cursor-pointer flex-col items-center gap-2xl',
  'border border-neutral-600 hover:border-neutral-600 !bg-netural-700',
  'dark:border-neutral-400 dark:hover:border-neutral-400',
  'mb-1 h-full Object-cover tems-center justify-center z-10 ',
].join(' ')

const SpinnerCard: React.FC<SpinnerCardProps> = ({ className }) => {
  return (
    <div className={`spinner-card  ${spinnerCardClassNames} ${className} !absolute`}>
      <Spinner className="text-netural-500 z-10 m-auto h-11 w-11 rounded-full  stroke-neutral-100 dark:stroke-neutral-light-100 " />
    </div>
  )
}

export default SpinnerCard
