import Slug from 'slug';

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Books',
      [
        {
          slug: Slug(`${'Becoming'} ${Date.now()}`),
          author: 'Michelle Obama',
          title: 'Becoming',
          description: 'This is a great book',
          bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
          imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190192/lcic5q5taefb0ptlpbtf.jpg',
           year_released: '2016',
          publisher_info: 'Publisher',
          date_released: '2016',
          quantity: 23,
          amount: 10,
          featured: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            slug: Slug(`${'Big Magic'} ${Date.now()}`),
            author: 'Elizabeth Gilbert',
            title: 'Big Magic',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190192/agtkscscwgccab0ft3rp.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 23,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'Blue Ocean Strategy'} ${Date.now()}`),
            author: 'W. Chan Kim',
            title: 'Blue Ocean Strategy',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/purp14o31fxfa5bvhx69.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 20,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'Built to Last'} ${Date.now()}`),
            author: 'Jim Collins',
            title: 'Built to Last',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190192/fjwhz9mpot8s2nv6obmg.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 20,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'Effective Python'} ${Date.now()}`),
            author: 'Bret Slatkin',
            title: 'Effective Python',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/yc1tqldtlfs7rnddurgo.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 20,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'Fifth Avenue Style'} ${Date.now()}`),
            author: 'Howard Slatkin',
            title: 'Fifth Avenue Style',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/hwj2x6gr4sfgecqspmkj.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'From Blood and Ash'} ${Date.now()}`),
            author: 'Jennifer L. Amentrout',
            title: 'From Blood and Ash',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/nypwuylgdl3hvydcbywh.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'The Hard Thing About Hard Things'} ${Date.now()}`),
            author: 'Ben Horowitz',
            title: 'The Hard Thing About Hard Things',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/dd7snxgu5pic3dxy4ixc.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'La Voz Del Conocimiento'} ${Date.now()}`),
            author: 'Don Miguel Ruiz',
            title: 'La Voz Del Conocimiento',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/mbcthpon5lavfjtib7nv.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'My sister, the serial Killer'} ${Date.now()}`),
            author: 'Oyinka Braithwaite',
            title: 'My sister, the serial Killer',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190192/ux8sufc0isnjxhiju93d.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 10,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'Obsidian'} ${Date.now()}`),
            author: 'Jennifer L. Amentrout',
            title: 'Obsidian',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/mbydawuwblxhvo2oafrt.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 13,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'The Signature of all things'} ${Date.now()}`),
            author: 'Elizabeth Gilbert',
            title: 'The Signature of all things',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/ojaxvdvs8lytjal6inpw.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 16,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'The Effective Engineer'} ${Date.now()}`),
            author: 'Edmond Lau',
            title: 'The Effective Engineer',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/ulaeuukpx1uu30vvfom1.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 12,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'The Four Arguments'} ${Date.now()}`),
            author: 'Don Miguel Ruiz',
            title: 'The Four Arguments',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/lmnsy6xshcvjbckqj4ly.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 16,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${"The Innovator's dilemma"} ${Date.now()}`),
            author: 'Clayton Christensen',
            title: "The Innovator's dilemma",
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/xa84odqatz1mgfezfvno.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 21,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'The Lean Startup'} ${Date.now()}`),
            author: 'Eric Ries',
            title: 'The Lean Startup',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190192/cj5oq4sg6tk8xx7hbkp9.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 18,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'The Startup Way'} ${Date.now()}`),
            author: 'Eric Ries',
            title: 'The Startup Way',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/qwaopib0b7hwcuvuvrjm.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 16,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'Treasure'} ${Date.now()}`),
            author: 'Oyinkan Braithwaite',
            title: 'Treasure',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/kwsalfkqxylpzitd6rdj.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 12,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'What you do is who you are'} ${Date.now()}`),
            author: 'Ben Horowitz',
            title: 'What you do is who you are',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/b1svxrk7s0b12litop3q.jpg',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 15,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            slug: Slug(`${'How to win friends'} ${Date.now()}`),
            author: 'One Author',
            title: 'How to win friends',
            description: 'This is a great book',
            bookContent: 'This is the bookContent of this book and it is so great that you have to read up this book',
            imgUrl: 'https://res.cloudinary.com/oseun/image/upload/v1619190191/mfgkpxkyxy9nrp2bgbcx.webp',
             year_released: '2016',
            publisher_info: 'Publisher',
            date_released: '2016',
            quantity: 30,
            amount: 15,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
      ],
  
      {},
    ),
    
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Books', null, {})
  };