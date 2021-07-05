# bookcatalogue
A simple REST design (convertible to graphQL on a special route) service to power the different features on screens.

## Features
Below are the features of Food Ordering Service Application at this point

- User can Signup <br>
- User can Login <br>
- User can view featured books <br>
- User can add books to cart <br>
- User can view all books <br>
- User can like/dislike a book <br>
- User can add ratings to book <br>
- User can view paginated books <br>
- User can search books by their author <br>
- User can view specific book information <br>
- User can upload books <br>


## Installation
1. Clone this repository into your local machine:
```
https://github.com/marusoft/bookcatalogue
```
2. Navigate into the cloned repository in your machine:
```
cd bookcatalogue
```
3. Install dependencies by running.
```
npm install
```
4. Create a .env file in the root directory and setup your database credentials and token key. Check `.env.example` for instruction.

5. Start the development application by running
```
npm run start:dev
```
6. Setup database `migration` and `seeding`
```
npm run migrate
npm run seed
```

6. Install `postman` to test all endpoints

## Testing
- run test using 
```
npm run test    
```

## API-ENDPOINTS

#### Authentication

| URI                       | HTTP Method | Description       |
| -------------------------------- | ----------- | -------------------- |
| <code>/api/v1/auth/signup</code> | `POST`      | Create an account    |
| <code>/api/v1/auth/login</code>  | `POST`      | Log-in to account    |


#### API Routes

| URI                                             | HTTP Method | Description                      |
| ----------------------------------------------- | ----------- | -------------------------------- |
| <code>/api/v1/uploads</code>                    | `POST`      | Uploads books                    |
| <code>/api/v1/books</code>                      | `GET`       | Get All Books in Database        |
| <code>/api/v1/book/{id}</code>                  | `GET`       | Get A Specific Book              |
| <code>/api/v1/carts</code>                      | `POST`      | Add book to cart                 |
| <code>/api/v1/addtocart</code>                  | `POST`      | Update Cart                      |
| <code>/api/v1/rating</code>                     | `POST`      | Add ratings                      |
| <code>api/v1/ratings</code>                     | `POST`      | Add ratings                      |
| <code>/api/v1/reactions</code>                  | `POST`      | Add like/dislike to books        |
| <code>/api/v1/search</code>                     | `GET`       | Search books by authors          |
| <code>/api/v1/featuredbook</code>               | `GET`       | View featured books              |


## IMPROVEMENTS
More integration testing could have been written.
Error logging could be better for production based code.
More validations could have been considered as well depending on several edge/ use cases.
