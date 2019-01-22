# GatorTrader
A selling/buying web application for San Francisco State University Students. It is a team project in Software Engineering class. The project has been carried out by following the best practices of SWE life cycles from scrumming to code-reviewing and implementing check-points.

The project has 5 milestones and each milestone is documented. 

Project Run instructions :

1. create database in Postgres using below command:
     CREATE DATABASE databasename;
     
     my example - CREATE DATABASE sesec01team02;
     
2. update url with your database name and port in .env file
 
     my example for .env file --> DATABASE_URL=postgres://postgres:12345@localhost:5432/sesec01team02
     
     where sesec01team02 is database name and 5432 is database default port number for everyone.
     
3. npm install

4. npm start
       
       
To test the database connection - Start your application and browse to localhost:3000/tests. Refresh the page a few times. Page refresh should create new entries.
