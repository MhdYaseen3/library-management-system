# library-management-system

this is a library manaagement API backeend for the management of user and books

# Routes and endpoints


## /users

GET : used to get the list of users in the system
POST : create new user

## /users{id}
GET : get user by id
PUT : update user by id
DELETE : delete user by id {check if user have collected any book } && {ab=ny fine do exist}

## /users/subscrption details
GET : get user subsctption details by id
     >> date of subscrption
     >> valid till?
     >>fine if any?

## /books
GET: get all books in the sytem
POST : add new book to the system

## /books/{id}
GET:get book by id 
PUT: update a book by its id
DELETE : delete a book by id

## /books/issued
GET : get all issued books

## /books/issued/withfine
GET: get all the book with their fine amount

## subscption type 
     >>basic (3)
     >>standard (6)
     >>premium (12)

>> if the user missses the renewal date, then user should be collected with $100rs
>> if the user misses his subscrption , then user expected ti pay $100rs
>> if teh user both misses , then collected amount should be $200

## commands 
npm init
npm i express
npm i nodemon -save-dev
to restore node module and package-lock.json
