import { BannerDataTypes, cartDataTypes } from 'interfaces'
import bannerImage1 from 'assets/images/tradible banner 01 image.png'
import bannerImage2 from 'assets/images/tradible banner 02 image.png'
import bannerImage3 from 'assets/images/tradible banner 03 image.png'
import bannerImage4 from 'assets/images/tradible banner 04 image.png'
import bannerImage5 from 'assets/images/tradible banner 05 image.png'

export const bannerCardData: BannerDataTypes[] = [
  {
    productId: '1',
    image: bannerImage1,
    heading: 'Your Card Trading Future Starts Here',
    subHeading:
      'Tradible is on a mission to redefine card collecting and trading. Join our vibrant community and experience a revolutionary approach to card trading that’s changing the game.',
    btnHeading: 'Explore Now',
    btnLink: '/explore/marketplace',
    bg_color: 'linear-gradient(51deg, #DD6375 0%, #D76082 21.16%, #A25CE4 53.26%, #7685EF 91.49%)',
  },
  {
    productId: '1',
    image: bannerImage2,
    heading: 'Trade Like A Pokémon Master - Catching Cards Is Only The Beginning',
    subHeading:
      "Join our vibrant Pokémon card trading community, where card swaps are more than just transactions – they're opportunities to connect with fellow trainers. Unleash the trading champion within you and watch as your collection evolves, one card at a time.",
    btnHeading: 'Explore Now',
    btnLink: '/explore/marketplace',
    bg_color: 'linear-gradient(110.49deg, #DAC848 18.16%, #4652D8 79.18%)',
  },
  {
    productId: '1',
    image: bannerImage3,
    heading: 'Lowest Fees, Maximum Thrills',
    subHeading:
      'Enjoy top-tier card trading with confidence, thanks to our industry-leading low fees, ensuring every transaction delivers maximum value.',
    btnHeading: 'Sign Up',
    btnLink: '/signup',
    bg_color: 'linear-gradient(106.5deg, #41C679 20.66%, #3466DC 76.84%)',
  },
  {
    productId: '1',
    image: bannerImage4,
    heading: 'Dive Into A Vibrant World Of Connections  ',
    subHeading:
      'Build meaningful relationships with fellow collectors and stores through dynamic user-to-user and user-to-store features. Discover, trade, and share your card passion with an equally passionate community.',
    btnHeading: 'Join Community',
    btnLink: '',
    bg_color: 'linear-gradient(112.62deg, #5E80F2 19.63%, #8648D6 68.92%)',
  },
  {
    productId: '1',
    image: bannerImage5,
    heading: 'Duelists Unite - Trade, Duel, Triumph',
    subHeading:
      'Calling all duelists! Our Yu-Gi-Oh! card trading platform is your ultimate destination for trading, dueling, and achieving victory. Join a community of passionate duelists and collectors as you trade cards, challenge opponents, and triumph over your rivals.',
    btnHeading: 'Explore Now',
    btnLink: '/explore/marketplace',
    bg_color: 'linear-gradient(73.71deg, #B42A11 20.9%, #611530 74.35%)',
  },
]

export const cartData: cartDataTypes[] = [
  {
    image: '',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
  {
    image: '',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
  {
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
  {
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
  {
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
  {
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
  {
    image: 'https://aristodogs-images.s3.amazonaws.com/964.png',
    title: 'Cart Item',
    discription: 'TheCardCollector',
    price: 123.22,
  },
]

export const exploreCardsData = [
  {
    productId: '1',
    image:
      'https://corgistudio.myfilebase.com/ipfs/QmatKLRdF87Qr6XZuQRVWkjymBH38dEv2eSbrE5bgkeA6J/80546afa73eb75a80c55b90e499c383c.png',
    name: 'Serena',
    set: 'Crown Zenith',
    price: '£122.12',
    rarity: 'Common',
    listings: '12',
    number: '100/151',
    collected: true,
    endTime: '',
  },
  {
    productId: '2',
    image:
      'https://corgistudio.myfilebase.com/ipfs/QmatKLRdF87Qr6XZuQRVWkjymBH38dEv2eSbrE5bgkeA6J/80546afa73eb75a80c55b90e499c383c.png',
    name: 'Charizard',
    set: 'Crown Zenith',
    price: '£122.12',
    rarity: 'Common',
    listings: '12',
    number: '101/151',
    collected: false,
    endTime: '',
  },
  {
    productId: '3',
    image:
      'https://corgistudio.myfilebase.com/ipfs/QmatKLRdF87Qr6XZuQRVWkjymBH38dEv2eSbrE5bgkeA6J/80546afa73eb75a80c55b90e499c383c.png',
    name: 'Blastoise',
    set: 'Crown Zenith',
    price: '£122.12',
    rarity: 'Common',
    listings: '12',
    number: '102/151',
    collected: true,
    endTime: '',
  },
  {
    productId: '4',
    image:
      'https://corgistudio.myfilebase.com/ipfs/QmatKLRdF87Qr6XZuQRVWkjymBH38dEv2eSbrE5bgkeA6J/80546afa73eb75a80c55b90e499c383c.png',
    name: 'Venusaur',
    set: 'Crown Zenith',
    price: '£122.12',
    rarity: 'Common',
    listings: '12',
    number: '103/151',
    collected: true,
    endTime: '',
  },
  {
    productId: '5',
    image:
      'https://corgistudio.myfilebase.com/ipfs/QmatKLRdF87Qr6XZuQRVWkjymBH38dEv2eSbrE5bgkeA6J/80546afa73eb75a80c55b90e499c383c.png',
    name: 'James',
    set: 'Crown Zenith',
    price: '£122.12',
    rarity: 'Common',
    listings: '12',
    number: '104/151',
    collected: false,
    endTime: '',
  },
]
