/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import Typography from '../Typography'

import CartItem from 'design-systems/Atoms/CartItem'
import { SalesTypes } from './interrfcae'
import DataNotFound from 'design-systems/Molecules/DataNotFound'

const SalesList: React.FC<SalesTypes> = ({ heading, items, Icons, className }) => {
  return (
    <div
      className={`flex  w-full min-w-[260px] flex-col justify-between rounded-md border px-4 py-6  dark:border-neutral-light-700   md:px-6 ${className} `}
    >
      <div className="flex items-center justify-between">
        <div>
          <Typography
            className="leading-none tracking-tight !text-left !font-semibold text-black dark:text-white"
            size="h6"
            variant="regular"
          >
            {heading}
          </Typography>
        </div>
      </div>

      <div className="flex-grow">
        {items?.length === 0 || !items ? (
          <DataNotFound className="h-[100%]">No data found</DataNotFound>
        ) : (
          <>
            {items?.map(item => (
              <CartItem
                discription={item.email}
                image={item.image}
                imageClass="!rounded-full"
                imageClassWrp="h-2 w-2 md:h-12 md:w-12 !rounded-full"
                isPrice={true}
                key={item.email}
                price={item.price}
                title={item.name}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default SalesList
