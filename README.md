# csc648-fa18-Team02

Project Run instructions :

1. create database in Postgres using below command:
     CREATE DATABASE databasename;
     
     my example - CREATE DATABASE sesec01team02;
     
2. update url with your database name and port in .env file
 
     my example for .env file --> DATABASE_URL=postgres://gayatripise@localhost:5432/sesec01team02
     
     where sesec01team02 is database name and 5432 is database default port number for everyone.
     
3. npm install

4. npm start
       
       
To test the database connection - Start your application and browse to localhost:3000/tests. Refresh the page a few times. Page refresh should create new entries.
