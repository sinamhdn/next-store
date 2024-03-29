import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'user1',
      email: 'user1@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user3',
      email: 'user3@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user4',
      email: 'user4@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user5',
      email: 'user5@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user6',
      email: 'user6@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user7',
      email: 'user7@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user8',
      email: 'user8@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user9',
      email: 'user9@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
    {
      name: 'user10',
      email: 'user10@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'First Item',
      // slug: 'first-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 69.99,
      brand: 'Fusce',
      rating: 3.0,
      numReviews: 10,
      countInStock: 13,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Second Item',
      // slug: 'second-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 699.99,
      brand: 'Pellentesque',
      rating: 3.4,
      numReviews: 15,
      countInStock: 12,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Third Item',
      // slug: 'third-item',
      category: 'Categoryb',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 59.99,
      brand: 'Pellentesque',
      rating: 4.3,
      numReviews: 35,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Forth Item',
      // slug: 'forth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 12.99,
      brand: 'Nam',
      rating: 4.1,
      numReviews: 5,
      countInStock: 10,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Fifth Item',
      // slug: 'fifth-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 99.99,
      brand: 'Fusce',
      rating: 3.7,
      numReviews: 49,
      countInStock: 14,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Sixth Item',
      // slug: 'sixth-item',
      category: 'Categoryb',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 49.99,
      brand: 'Nam',
      rating: 4.9,
      numReviews: 23,
      countInStock: 9,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Seventh Item',
      // slug: 'seventh-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 29.99,
      brand: 'Fusce',
      rating: 2.9,
      numReviews: 56,
      countInStock: 18,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Eighth Item',
      // slug: 'eight-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 124.99,
      brand: 'Etiam',
      rating: 1.9,
      numReviews: 2,
      countInStock: 6,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Ninth Item',
      // slug: 'ninth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 299.99,
      brand: 'Nam',
      rating: 4.9,
      numReviews: 17,
      countInStock: 5,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Tenth Item',
      // slug: 'tenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 499.99,
      brand: 'Cras',
      rating: 4.5,
      numReviews: 59,
      countInStock: 17,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Eleventh Item',
      // slug: 'eleventh-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 89.99,
      brand: 'Etiam',
      rating: 4.4,
      numReviews: 70,
      countInStock: 15,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twelfth Item',
      // slug: 'twelfth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 39.99,
      brand: 'Fusce',
      rating: 3.3,
      numReviews: 29,
      countInStock: 3,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Thirteenth Item',
      // slug: 'thirteenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 128.99,
      brand: 'Pellentesque',
      rating: 2.8,
      numReviews: 86,
      countInStock: 11,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Fourteenth Item',
      // slug: 'fourteenth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 139.99,
      brand: 'Fusce',
      rating: 4.6,
      numReviews: 22,
      countInStock: 18,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Fifteenth Item',
      // slug: 'fifteenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 559.99,
      brand: 'Etiam',
      rating: 5,
      numReviews: 55,
      countInStock: 9,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Sixteenth Item',
      // slug: 'sixteenth-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 229.99,
      brand: 'Etiam',
      rating: 1.5,
      numReviews: 94,
      countInStock: 1,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Seveteenth Item',
      // slug: 'seventeenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 479.99,
      brand: 'Cras',
      rating: 3.5,
      numReviews: 65,
      countInStock: 8,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Eighteenth Item',
      // slug: 'eighteenth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 79.99,
      brand: 'Cras',
      rating: 4.8,
      numReviews: 47,
      countInStock: 2,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Nineteenth Item',
      // slug: 'nineteenth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 68.99,
      brand: 'Pellentesque',
      rating: 4.1,
      numReviews: 78,
      countInStock: 10,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twentieth Item',
      // slug: 'twentieth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 62.99,
      brand: 'Fusce',
      rating: 4.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty first Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 66.99,
      brand: 'Fusce',
      rating: 4.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Second Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 152.99,
      brand: 'Fusce',
      rating: 2.1,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Third Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 622.99,
      brand: 'Fusce',
      rating: 3.2,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Fourth Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 44.99,
      brand: 'Fusce',
      rating: 4.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Fifth Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 62.99,
      brand: 'Fusce',
      rating: 1.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'First Item',
      // slug: 'first-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 69.99,
      brand: 'Fusce',
      rating: 3.0,
      numReviews: 10,
      countInStock: 13,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Second Item',
      // slug: 'second-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 699.99,
      brand: 'Pellentesque',
      rating: 3.4,
      numReviews: 15,
      countInStock: 12,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Third Item',
      // slug: 'third-item',
      category: 'Categoryb',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 59.99,
      brand: 'Pellentesque',
      rating: 4.3,
      numReviews: 35,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Forth Item',
      // slug: 'forth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 12.99,
      brand: 'Nam',
      rating: 4.1,
      numReviews: 5,
      countInStock: 10,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Fifth Item',
      // slug: 'fifth-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 99.99,
      brand: 'Fusce',
      rating: 3.7,
      numReviews: 49,
      countInStock: 14,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Sixth Item',
      // slug: 'sixth-item',
      category: 'Categoryb',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 49.99,
      brand: 'Nam',
      rating: 4.9,
      numReviews: 23,
      countInStock: 9,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Seventh Item',
      // slug: 'seventh-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 29.99,
      brand: 'Fusce',
      rating: 2.9,
      numReviews: 56,
      countInStock: 18,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Eighth Item',
      // slug: 'eight-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 124.99,
      brand: 'Etiam',
      rating: 1.9,
      numReviews: 2,
      countInStock: 6,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Ninth Item',
      // slug: 'ninth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 299.99,
      brand: 'Nam',
      rating: 4.9,
      numReviews: 17,
      countInStock: 5,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Tenth Item',
      // slug: 'tenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 499.99,
      brand: 'Cras',
      rating: 4.5,
      numReviews: 59,
      countInStock: 17,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Eleventh Item',
      // slug: 'eleventh-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 89.99,
      brand: 'Etiam',
      rating: 4.4,
      numReviews: 70,
      countInStock: 15,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twelfth Item',
      // slug: 'twelfth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 39.99,
      brand: 'Fusce',
      rating: 3.3,
      numReviews: 29,
      countInStock: 3,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Thirteenth Item',
      // slug: 'thirteenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 128.99,
      brand: 'Pellentesque',
      rating: 2.8,
      numReviews: 86,
      countInStock: 11,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Fourteenth Item',
      // slug: 'fourteenth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 139.99,
      brand: 'Fusce',
      rating: 4.6,
      numReviews: 22,
      countInStock: 18,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Fifteenth Item',
      // slug: 'fifteenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 559.99,
      brand: 'Etiam',
      rating: 5,
      numReviews: 55,
      countInStock: 9,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Sixteenth Item',
      // slug: 'sixteenth-item',
      category: 'Categoryc',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 229.99,
      brand: 'Etiam',
      rating: 1.5,
      numReviews: 94,
      countInStock: 1,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Seveteenth Item',
      // slug: 'seventeenth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 479.99,
      brand: 'Cras',
      rating: 3.5,
      numReviews: 65,
      countInStock: 8,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Eighteenth Item',
      // slug: 'eighteenth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 79.99,
      brand: 'Cras',
      rating: 4.8,
      numReviews: 47,
      countInStock: 2,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Nineteenth Item',
      // slug: 'nineteenth-item',
      category: 'Categoryd',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 68.99,
      brand: 'Pellentesque',
      rating: 4.1,
      numReviews: 78,
      countInStock: 10,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twentieth Item',
      // slug: 'twentieth-item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 62.99,
      brand: 'Fusce',
      rating: 4.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty first Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 66.99,
      brand: 'Fusce',
      rating: 4.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Second Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 152.99,
      brand: 'Fusce',
      rating: 2.1,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Third Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 622.99,
      brand: 'Fusce',
      rating: 3.2,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Fourth Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 44.99,
      brand: 'Fusce',
      rating: 4.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
    {
      name: 'Twenty Fifth Item',
      category: 'Categorya',
      image: '/images/dummy_915x915_2a2321_ffffff.webp',
      isFeatured: true,
      featuredImage: '/images/dummy_1500x400_ffffff_ff1744.webp',
      price: 62.99,
      brand: 'Fusce',
      rating: 1.5,
      numReviews: 77,
      countInStock: 20,
      description: 'In hac habitasse platea dictumst. Quisque augue sapien, rhoncus et pellentesque ut, maximus id risus.',
    },
  ],
};

export default data;
