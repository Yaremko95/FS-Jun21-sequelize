

## HOW TO START ? 


Before starting everything you should have all entities defined by you.

You do this , by defining tables. [src/utils/create-tables.js]


Then create routes 

- POST -> INSERT INTO
- DELETE -> DELETE FROM
- PUT -> UPDATE TABLE
- GET -> SELECT (optionally you are filtering with WHERE)



## JOINS 

 - If relationship is one to many

 ref :https://www.postgresqltutorial.com/postgresql-inner-join/

 'Many one' has relation about  'one'

 For example books and authors, author has many books.

 So 'many one' is the book.
 
Every book has author id on it.(Check src/utils/create-tables.js line 22)


```
 book = {
    name:'Book Name',
    author : 2 <- this is foreign key refers to author tables one row
 }
 
```
