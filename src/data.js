import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  Twitter,
} from '@material-ui/icons';

export const sliderItems = [
  {
    id: 1,
    img: './assets/hero-1.png',
    title: 'SUMMER SALE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'f5fafd',
  },
  {
    id: 2,
    img: './assets/hero-2.png',
    title: 'AUTUMN COLLECTION',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fcf1ed',
  },
  {
    id: 3,
    img: './assets/hero-3.png',
    title: 'LOUNGEWEAR LOVE',
    desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    bg: 'fbf0f4',
  },
];

export const categories = [
  {
    id: 1,
    img: './assets/category-1.webp',
    title: 'SHIRT STYLE!',
    category: 'women',
  },
  {
    id: 2,
    img: './assets/category-2.jpeg',
    title: 'LOUNGEWEAR LOVE',
    category: 'coat',
  },
  {
    id: 3,
    img: './assets/category-3.jpeg',
    title: 'LIGHT JACKETS',
    category: 'jeans',
  },
];

export const popularProducts = [
  {
    id: 1,
    img: 'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
  },
  {
    id: 2,
    img: 'https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388',
  },
  {
    id: 3,
    img: 'https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png',
  },
  {
    id: 4,
    img: 'https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png',
  },
  {
    id: 5,
    img: 'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
  },
  {
    id: 6,
    img: 'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
  },
  {
    id: 7,
    img: 'https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png',
  },
  {
    id: 8,
    img: 'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
  },
];

export const social = [
  {
    id: 1,
    color: '3B5999',
    icon: <Facebook style={{ fontSize: '2rem' }} />,
  },
  {
    id: 2,
    color: 'E4405F',
    icon: <Instagram style={{ fontSize: '2rem' }} />,
  },
  {
    id: 3,
    color: '55ACEE',
    icon: <Twitter style={{ fontSize: '2rem' }} />,
  },
  {
    id: 4,
    color: 'E60023',
    icon: <Pinterest style={{ fontSize: '2rem' }} />,
  },
  {
    id: 5,
    color: '0A66C2',
    icon: <LinkedIn style={{ fontSize: '2rem' }} />,
  },
];

export const links = [
  {
    id: 1,
    url: '/',
    text: 'Home',
  },
  {
    id: 2,
    url: '/cart',
    text: 'Cart',
  },
  {
    id: 3,
    url: '/',
    text: 'Man Fashion',
  },
  {
    id: 4,
    url: '/',
    text: 'Woman Fashion',
  },
  {
    id: 5,
    url: '/',
    text: 'Accessories',
  },
  {
    id: 6,
    url: '/',
    text: 'My Account',
  },
  {
    id: 7,
    url: '/',
    text: 'Order Tracking',
  },
  {
    id: 8,
    url: '/',
    text: 'Wishlist',
  },
  {
    id: 9,
    url: '/',
    text: 'WishList',
  },
  {
    id: 10,
    url: '/',
    text: 'Terms',
  },
];

export const products = [
  {
    id: 1,
    title: 'Prada Shirt',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam id urna at pharetra. Integer vitae sem ultrices, pretium erat ut, tincidunt lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus quis nisl iaculis interdum. Sed eleifend, nisi ut luctus porta, elit elit tristique turpis, sit amet interdum velit velit sed tortor. Nulla facilisi. Suspendisse bibendum nisi sit amet est tincidunt convallis. Sed tincidunt convallis ex vel vulputate.',
    img: 'https://firebasestorage.googleapis.com/v0/b/eshop-4647b.appspot.com/o/1648310039884UCS319_1YOT_F010O_S_182_SLF.png?alt=media&token=537f2e2d-f186-46bf-81a0-a5de18510fbd',
    categories: [
      'men',
      'shirt'
    ],
    size: [
      'M',
      'L',
      'S',
      'XL',
      'XXL'
    ],
    color: [
      'black',
      'red',
      'blue',
      'pink',
      'orange'
    ],
    price: 170,
    inStock: true,
    slug: 'prada-shirt',
  },
  {
    id: 2,
    title: 'Jacket',
    slug: 'jacket',
    desc: 'Duis sodales lectus eget porttitor tincidunt. Sed neque diam, sodales in efficitur sed, congue non odio. Cras nunc metus, facilisis a bibendum vitae, malesuada non lacus. Nullam quis odio sagittis, malesuada nulla a, interdum turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean aliquet dolor neque, congue porta turpis ullamcorper sed. Aenean eu diam est. In vitae auctor diam. Duis congue, mauris sed dapibus placerat, diam sem tincidunt ex, vitae ullamcorper nibh mauris non metus. Cras at orci metus. Nullam in commodo metus.',
    img: 'https://firebasestorage.googleapis.com/v0/b/eshop-4647b.appspot.com/o/1648310182164Women-Jacket-PNG-High-Quality-Image.png?alt=media&token=f87514f6-b43e-4031-9baf-757304b65d08',
    categories: [
      'women',
      'coat'
    ],
    size: [
      'M',
      'L',
      'XL'
    ],
    color: [
      'black',
      'red',
      'brown'
    ],
    price: 200,
    inStock: true,
  },
  {
    id: 3,
    title: 'Cap',
    slug: 'cap',
    desc: 'Ut in massa aliquam, mattis eros eget, imperdiet felis. Morbi sit amet ex id metus ultricies gravida. Vestibulum ornare varius felis, vel aliquam ex condimentum id. Maecenas faucibus est viverra feugiat congue. Proin eget ligula viverra orci accumsan laoreet ut porttitor tellus. Fusce eu euismod lacus. Quisque tempor dignissim sapien, sit amet sagittis tellus consequat vulputate. Duis euismod sem at hendrerit porttitor.',
    img: 'https://firebasestorage.googleapis.com/v0/b/eshop-4647b.appspot.com/o/1648310321344Rocket-Vintage-Chill-Cap_66374_1_lg.png?alt=media&token=2e32c5b4-c000-4fb1-a8f8-5ba2d382f947',
    categories: [
      'men',
      'women'
    ],
    size: [
      'M',
      'XL'
    ],
    color: [
      'red',
      'blue',
      'black'
    ],
    price: 55,
    inStock: true,
  },
  {
    id: 4,
    title: 'Designer Bag',
    slug: 'designer-bag',
    desc: 'Suspendisse bibendum, ligula sed viverra tempus, justo tortor interdum dui, nec aliquam urna nisi maximus enim. Vestibulum consequat neque vel ex lobortis fermentum. Praesent sapien velit, facilisis convallis tellus maximus, tristique elementum elit. Integer non augue posuere, lacinia ante eget, semper diam. Pellentesque vel rutrum mauris. Maecenas eu tortor ac sapien dictum vestibulum. Aenean pharetra eros turpis, sed tincidunt dui iaculis ut. Mauris feugiat felis ultricies consequat condimentum. Praesent vel facilisis ante, eget volutpat tortor. Pellentesque congue ligula varius leo sollicitudin consectetur.',
    img: 'https://firebasestorage.googleapis.com/v0/b/eshop-4647b.appspot.com/o/1648310499363Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png?alt=media&token=92713d57-d0e0-4a0d-a605-004907f7e0ac',
    categories: [
      'women'
    ],
    size: [
      'M',
      'L',
      'S',
      'XL',
      'XXL'
    ],
    color: [
      'blue',
      'green',
      'yellow',
      'red',
      'black'
    ],
    price: 860,
    inStock: true,
  },
  {
    id: 5,
    title: 'Gown',
    slug: 'gown',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam id urna at pharetra. Integer vitae sem ultrices, pretium erat ut, tincidunt lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lacus quis nisl iaculis interdum. Sed eleifend, nisi ut luctus porta, elit elit tristique turpis, sit amet interdum velit velit sed tortor. Nulla facilisi. Suspendisse bibendum nisi sit amet est tincidunt convallis. Sed tincidunt convallis ex vel vulputate.',
    img: 'https://firebasestorage.googleapis.com/v0/b/eshop-4647b.appspot.com/o/16483108205681170x1470_BS_2016_05_132_front.png?alt=media&token=aa89136c-ea9e-4672-bba4-d263132151f2',
    categories: [
      'women',
      'gown'
    ],
    size: [
      'S',
      'M',
      'L',
      'XL'
    ],
    color: [
      'green',
      'blue',
      'pink'
    ],
    price: 197,
    inStock: true,
  },
  {
    id: 6,
    title: 'T-shirt',
    slug: 't-shirt',
    desc: 'Nam ultrices vitae nunc vitae luctus. Curabitur ultrices lorem neque, id tincidunt erat tempor sit amet. Duis consequat, neque nec varius sodales, urna lacus convallis elit, id commodo metus leo in lectus.  Aenean eget orci lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur viverra lectus vulputate, tempus augue in, condimentum augue. Nunc neque lectus, rhoncus eget erat vitae, luctus auctor felis. Donec at enim erat. Donec vel purus ipsum. Fusce consectetur tortor fermentum ligula dictum, vitae vestibulum dolor posuere.',
    img: 'https://firebasestorage.googleapis.com/v0/b/eshop-4647b.appspot.com/o/1648310682505Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=bf815a5e-f47d-4877-b2b7-b09c07651115',
    categories: [
      'men',
      't-shirt',
      'jean'
    ],
    size: [
      'M',
      'L',
      'S',
      'XL',
      'XXL'
    ],
    color: [
      'peach',
      'pink',
      'black',
      'blue'
    ],
    price: 100,
    inStock: true,
  },
];
