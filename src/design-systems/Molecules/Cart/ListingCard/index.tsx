import { BsTagFill } from 'react-icons/bs'
import { AiFillCopy, AiFillHeart, AiFillThunderbolt, AiOutlineCheck, AiOutlineEye, AiOutlineSwap } from 'react-icons/ai'
import { TbGavel } from 'react-icons/tb'
import { FaBurn, FaEthereum } from 'react-icons/fa'
import Image from 'design-systems/Atoms/Image'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { ListingCardProps } from './interface'

import Typography from 'design-systems/Atoms/Typography'
import Button from 'design-systems/Atoms/Button'
import { removeEmptyKey } from 'utils/helpers'
import cartApiInstance from 'api-services/CartApiServices'
import { AuthContext } from 'contexts/AuthContext'
import Spinner from 'design-systems/Atoms/Spinner'
import { WatchListApiService } from 'api-services'
import Link from 'next/link'

const filter = {
  LISTINGS: 'listing',
  PURCHASES: 'purchases',
  WATCHING: 'watching',
  BIDS: 'bids',
  FOLLOWINGS: 'following',
  MINTS: 'mints',
  LIKES: 'likes',
  BURNS: 'burns',
  SALES: 'sales',
  TRANSFER: 'transfer',
} as const
const ListCart: React.FC<ListingCardProps> = ({
  state,
  cartData,
  itemId,
  showAddToCartButton,
  showDeleteButton,
  onDelete,
}) => {
  const { state: AuthState, dispatch } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const deleteFromWatchlistMutation = useMutation(
    () => WatchListApiService.deleteWatchlistDetails({ collectionId: cartData.collectionId || '' }),
    {
      onSuccess: () => {
        toast.success('Item deleted from watchlist')
        queryClient.invalidateQueries(['watchlist'])
      },
      onError: err => {
        toast.error((err as AxiosError<any>).response?.data.msg)
      },
    }
  )

  const addToCartMutation = useMutation(
    (id: number) =>
      cartApiInstance.addCart(
        removeEmptyKey({
          userId: AuthState.data.user.id,
          cartSessionId: AuthState.data.sessionId,
          productId: id,
          quantity: 1,
        })
      ),
    {
      onSuccess: res => {
        toast.success('Added to cart')
        if (!AuthState.data.token && !AuthState.data.sessionId) {
          dispatch?.({ type: 'SET_SESSIONID', value: res.data.cartSessionId })
        }
        queryClient.invalidateQueries([
          'cart-data',
          AuthState.data.token ? AuthState.data.user.id : '',
          AuthState.data.sessionId,
        ])
      },

      onError: err => {
        toast.error((err as AxiosError<any>).response?.data.msg)
      },
    }
  )
  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-md border border-neutral-700 p-3 transition duration-300 ease-in-out hover:border-neutral-600 dark:border-neutral-light-600 dark:hover:border-[#e1e1e12e] sm:p-6 md:flex-row">
      <div className="relative w-full">
        <div className="absolute left-[-5px] top-[-10px] z-10 flex h-[26px]  w-[26px] items-center justify-center rounded-full bg-black dark:bg-white">
          {state && state === filter.LISTINGS ? (
            <BsTagFill className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.BIDS ? (
            <TbGavel className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.BURNS ? (
            <FaBurn className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.FOLLOWINGS ? (
            <AiOutlineCheck className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.LIKES ? (
            <AiFillHeart className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.MINTS ? (
            <AiFillCopy className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.PURCHASES ? (
            <FaEthereum className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.SALES ? (
            <AiFillThunderbolt className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.TRANSFER ? (
            <AiOutlineSwap className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
          {state && state === filter.WATCHING ? (
            <AiOutlineEye className="text-white dark:text-custom-light-10" size={16} />
          ) : null}
        </div>

        <div className=" flex items-center justify-start gap-3">
          <div>
            <Image
              ImageclassName={'object-cover'}
              alt="Cart Image"
              className="!h-[80px] !w-[80px] overflow-hidden rounded-[10px] object-cover"
              height={80}
              src={cartData.image}
              width={80}
            />
          </div>
          <div className="flex flex-col items-start gap-1   ">
            <Link href={`/assets/${itemId}/details`}>
              <Typography className="text-left !font-semibold dark:text-white" size="h6" variant="regular">
                {cartData.store} #{cartData.listingId ? cartData.listingId : ''}
              </Typography>
            </Link>
            <Typography
              className="flex w-full items-center !font-medium text-neutral-400 dark:!text-neutral-light-300 "
              size="paragraph"
              variant="regular"
            >
              by
              {!cartData.mintedByImage && (
                <div className="mx-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#4ade80] to-[#60a5fa] "></div>
              )}
              {cartData.mintedByImage && (
                <div>
                  <Image
                    alt={cartData.mintedBy}
                    className=" mx-1  !h-[16px]  !w-[16px] overflow-hidden rounded-full"
                    height={16}
                    src={cartData.mintedByImage as string}
                    width={16}
                  />
                </div>
              )}
              <Typography className="!font-medium capitalize text-black" size="paragraph" variant="regular">
                <Link href={`/users/${cartData?.userId}`}>{cartData.mintedBy}</Link>
              </Typography>
            </Typography>
            <Typography
              className="!font-medium text-neutral-400 dark:!text-neutral-light-300"
              size="paragraph"
              variant="regular"
            >
              {cartData.date}, {cartData.time}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        {showDeleteButton && (
          <Button
            className="transition-hover h-10 rounded-md !bg-red-500 px-4 font-inter text-[14px] font-semibold text-white active:scale-95 active:!shadow-none dark:!bg-white dark:text-black"
            onClick={e => {
              e.preventDefault
              deleteFromWatchlistMutation.mutate()
            }}
          >
            {deleteFromWatchlistMutation.isLoading ? (
              <>
                <Spinner className="h-1/2 w-auto stroke-white dark:!stroke-neutral-950" />
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        )}
        {showAddToCartButton && (
          <Button
            className="transition-hover h-10 rounded-md !bg-black px-4 font-inter text-[14px] font-semibold text-white active:scale-95 active:!shadow-none dark:!bg-white dark:text-black "
            onClick={e => {
              e.preventDefault
              addToCartMutation.mutate(itemId as number)
            }}
          >
            {addToCartMutation.isLoading ? (
              <>
                <Spinner className="h-1/2 w-auto stroke-white dark:!stroke-neutral-950" />
              </>
            ) : (
              <>Add to cart</>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
export default ListCart
