## Documentation  
* My app allow you to work with the MongoDB database management system which is a NoSQL database management system  
* My app allow you to create custom data models *(schemas)* through the use of mongoose.js and use mongoose.js helper methods for interacting with our database persistence layer  

## Any resources that helped me complete this assignment:  
* http://mongoosejs.com/docs/documents.html  
* https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

## How could you get started' with my api on your own:  
      - How do you clone this project?
      First fork from my repository, then clone it into your folder, that will create a repository with the same name on your git hub, then create a branch.   
      - How do you start using this project?  
          1. You will need to have NodeJS installed on your machine.  
          2. You will need to install httpie for Mac users in one terminal window and use postman for Windows users or download curl.  
          3. Download mongodb.  
          4. Using the Windows command line point to the data model in your application and run the server using this command>"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath .\datat\db  
          5. Using a separate  Windows command line get mongoos runing by using the command >"C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"  
          6. Then start up nodemon in a separate terminal window.  


### Feature Tasks needed  
* create an HTTP Server using `express`  
* create a resource **model** of your choice that uses `mongoose.Schema` and `mongoose.model`  
* use the `body-parser` express middleware to parse the `req` body on `POST` and `PUT` requests  
* use the npm `debug` module to log the functions and methods that are being used in your application  
* use the express `Router` to create a route for doing **RESTFUL CRUD** operations against your _model_  

## HOW TO TEST POST IN TERMINAL:  
* Get the server runing using:
$nodemon in your terminal  
* in a separate terminal window for example past:
curl http POST :3000/api/toy name=barney desc='purple dino' Mac users  
curl POST :3000/api/toy name=barney desc='purple dino' windows users  
that should create a toy model with these key value pars into your database.    


## HOW TO TEST GET IN TERMINAL (using the params method not the query method):
* Get the server runing using:
$nodemon in your terminal  
* in a separate terminal window for example past:
curl http GET :3000/api/toy/f18a6d2b-753c-41f6-9c28-d2a7f0b41f21

```
HTTP/1.1 200 OK
Allow-Access-Control-Headers: *
Allow-Access-Control-Origin: *
Connection: keep-alive
Content-Length: 83
Content-Type: application/json; charset=utf-8
Date: Thu, 07 Sep 2017 00:56:30 GMT
ETag: W/"53-/F+/Fnqkruzo8LzxS6zEk+CGFEo"
X-Powered-By: Express

{
    "_id": "f18a6d2b-753c-41f6-9c28-d2a7f0b41f21",
    "desc": "purple dino",
    "name": "barney"
}
```

## HOW TO TEST A PUT IN TERMINAL:  
* Get the server runing using:
$nodemon in your terminal  
* in a separate terminal window for example past:

curl http PUT :3000/api/toy/f18a6d2b-753c-41f6-9c28-d2a7f0b41f21 name=said desc=human _id=f18a6d2b-753c-41f6-9c28-d2a7f0b41f21_

```
HTTP/1.1 204 No Content
Allow-Access-Control-Headers: *
Allow-Access-Control-Origin: *
Connection: keep-alive
Date: Thu, 07 Sep 2017 01:20:58 GMT
ETag: W/"a-bAsFyilMr4Ra1hIU5PyoyFRunpI"
X-Powered-By: Express
```

## HOW TO TEST DELETE IN TERMINAL:  

curl http DELETE :3000/api/toy/f18a6d2b-753c-41f6-9c28-d2a7f0b41f21 name=said desc=human _id=f18a6d2b-753c-41f6-9c28-d2a7f0b41f21_



# Packages and commands to remember:
  - In package.json's scripts, add- "start:debug": "DEBUG=http* nodemon server.js",
  - created an index.js and set it as the start point in package.json
  - added a cors.js file
  - npm install mongodb
  - npm install express - DONE
  - npm install (for node modules) -
  - npm install superagent -
  - npm install uuid -
  - npm install -D jest -
  - node server.js or just nodemon (depending on the day??)
    - rs (restart, if needed)
  - run start: watch -
  - npm run start:debug - then attempt a POST and this will tell you where you're wrong

  - npm run debugger -
  - npm install bluebird (sets this as a dependency in package.json) -

# Collaborators:
Madeline & Zack.
