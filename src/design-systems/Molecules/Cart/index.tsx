import { BsArrowRight } from 'react-icons/bs'

import CartItem from 'design-systems/Atoms/CartItem'
import Typography from 'design-systems/Atoms/Typography'
import { cartData } from 'utils'
import { cartDataTypes } from 'interfaces'

const Cart: React.FC = () => {
  return (
    <div className="cart_wrp flex h-full flex-col rounded-[10px] border-neutral-900 bg-white p-4 transition-all duration-300 ease-in-out dark:bg-custom-light-100 sm:max-h-[calc(100vh-14vh)] xlg:p-2 xlg:shadow-lg">
      <div className="mb-8 flex items-center justify-between px-2">
        <Typography className="dark:text-black" size="h3" variant="regular">
          Cart
        </Typography>
        <div className="flex items-center gap-4">
          <span className="font-inter text-sm font-medium text-neutral-500">Clear all</span>
          <button className="text-neutral-500">
            <BsArrowRight size={16} />
          </button>
        </div>
      </div>
      {cartData.length > 0 ? (
        <>
          <div className="cart-Item-list no-scrollbar flex w-full flex-grow flex-col overflow-hidden overflow-y-scroll">
            {cartData?.map((item: cartDataTypes, index: number) => (
              <CartItem
                discription={item.discription}
                image={item.image}
                key={index}
                price={item.price}
                title={item.title}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex h-14 w-full items-center justify-between rounded-[10px] bg-neutral-900 px-4">
              <Typography className="dark:text-white" size="h6" variant="regular">
                Total
              </Typography>
              <Typography className="dark:text-white" size="h6" variant="regular">
                £143.32s
              </Typography>
            </div>
            <button className="h-12 w-full rounded-lg bg-black">
              <Typography className="text-white dark:text-white" size="h4" variant="regular">
                Checkout
              </Typography>
            </button>
          </div>
        </>
      ) : (
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <div className="flex flex-col gap-2 text-center">
            <Typography size="h4" variant="regular">
              Empty Cart
            </Typography>
            <Typography className="font-medium text-neutral-300" size="h5" variant="regular">
              You do not selected anything yet
            </Typography>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
