export const TestData = {
  urls: {
    base: 'https://automation-interview.vercel.app/',
  },

  sizes: {
    xs: 'XS',
    ml: 'ML',
  },

  expectedCounts: {
    productsAfterFilter: 3,
    distinctItemsInCart: 2,
    totalItemsInCart: 4,
    blueQtyAfterUpdate: 3,
    emptySubtotal: 0,
  },

  products: {
    blue: 'Blue T-Shirt',
    black: 'Black T-shirt with white stripes',
  },

  pricing: {
    blue: 9.0,
    black: 14.9,
  },

  quantities: {
    blueFinal: 3,
    blackFinal: 1,
    blueIncreaseClicks: 2,
  },
} as const;
