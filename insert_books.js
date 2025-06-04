// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);

    
    });
    console.log("\n----------------- ");
    console.log("the books by adventure are : ")
    const genrebook = await collection.find({genre : "Adventure"}).toArray();
    genrebook.forEach((books,indexs) => {
        console.log(`${indexs + 1}. "${books.title}" by ${books.author} (${books.published_year})`);
    });

    console.log("\n----------------- ");
    console.log("the books published after 1888 : ")
    const yearbooks = await collection.find({published_year: {$gt: 1888}}).toArray();
    yearbooks.forEach((books,indexs) => {
        console.log(`${indexs + 1}. "${books.title}" by ${books.author} (${books.published_year})`);
    });

    console.log("\n----------------- ");
    console.log("the books published by Herman Melville : ")
    const authorbooks = await collection.find({author: "Herman Melville"}).toArray();
    authorbooks.forEach((books,indexs) => {
        console.log(`${indexs + 1}. "${books.title}" by ${books.author} (${books.published_year})`);
    });

    console.log("\n----------------- ");
    console.log("updating the price of a book : ")
    collection.updateOne({published_year: 1847 }, {$set : {price : 20}});
    const pricebooks = await collection.find({published_year: 1847}).toArray();
    pricebooks.forEach((books,indexs) => {
        console.log(`${indexs + 1}. "${books.title}" new price is: ${books.price}`);
    });
    collection.deleteOne({title: 'The Alchemist'});
    
    console.log("\n----------------- ");
    console.log("books in stock and produced after 2010: ")
    const stockbooks = await collection.find({$and : [{in_stock : true},{published_year:{$gte: 1988}}]}).toArray();
    stockbooks.forEach((books,indexs) => {
        console.log(`${indexs + 1}. "${books.title}" by ${books.author} (${books.published_year})`);
    });

    console.log("\n----------------- ");
    console.log("giving the title ,the author and the price : ")
    const projectionbooks = await collection.find({},{projection: {title: 1, author:1, price: 1, _id:0}}).toArray();
    console.log(projectionbooks);

    console.log("\n----------------- ");
    console.log("sorting the bookes by price by ascending order : ")
    const ascebooks = await collection.find().sort({price:1}).toArray();
    const descebooks = await collection.find().sort({price: -1}).toArray();
    console.log(ascebooks);

    console.log("\n----------------- ");
    console.log("sorting the bookes by price by descending order : ");
    console.log(descebooks);

    const pageNumber = 1;
    console.log("\n----------------- ");
    console.log("Use the `limit` and `skip` methods to implement pagination (5 books per page)");
    const pagebooks = await collection.find().skip((pageNumber - 1) * 5).limit(5).toArray();
    pagebooks.forEach((books, indexs) => {
      console.log(`${indexs + 1}. "${books.title}" by ${books.author} (${books.published_year})`);
    });

    const avgprice = await collection.aggregate([{$match : {genre: 'Fiction'}},{$group: {_id: null, avarengeprice:{$avg: '$price'}}}]).toArray();
    console.log("the averange price is ", avgprice[0]?.avarengeprice);
    
    console.log("\nthe author with the most books");
    const topauthor = await collection.aggregate([{$group: {_id: "$author", bookcount: {$sum : 1}}},{$limit: 1}]).toArray();
    if (topauthor.length > 0) {
      console.log(`Author with most books: ${topauthor[0]._id}(${topauthor[0].bookcount} books)`);
    }else {
      console.log("No authors found.");
    } 

    const booksByDecade = await collection.aggregate([
        {
          $project: {
            decade: {
              $multiply: [
                { $floor: { $divide: ["$published_year", 10] } },
                10
              ]
            }
          }
        },
        {
          $group: {
            _id: "$decade",
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 } 
        }
      ]).toArray();

      booksByDecade.forEach(group => {
        console.log(`Decade: ${group._id}s — ${group.count} books`);
      });
      const query = { author: "Paulo Coelho", published_year: 1987 };

      const explainWithoutIndex = await collection.find(query).explain("executionStats");
      console.log("Without compound index:", explainWithoutIndex.executionStats);

      const explainWithIndex = await collection.find(query).explain("executionStats");
      console.log("With compound index:", explainWithIndex.executionStats);



  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 