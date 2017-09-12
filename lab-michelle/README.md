# API using Express _and MongoDB_

## Description
We get to use Mongo DB!
This API allows you to define and GET/PUT/POST/DELETE a toy object that has a name, description, and unique ID. Additionally, you can store that toy within the object that represents memory. Basically, we are practicing writing a router from scratch, instead of using Express - meaning we explicitly define what happens when we POST/PUT/GET/DELETE to this API.

## Getting Started
```
Download from GitHub
npm i
```

## Mongo DB
You will also need to install Mongo DB & mongoose (included in the dependencies), so our data can live in a happy little database.

## Endpoints & Request/Responses
Our endpoint is: /api/toy/

Sample request:
```
POST http://localhost:3000/api/toy?name='barney' desc="purple dino"
```

Sample response:
```
{"name":"barney","desc":"purple dino","_id":"c84d19fd-2e41-4050-9fac-1f1882fa6e76"}
```

HTTP Methods Available:
POST http://localhost:3000/api/toy
_Allows you to post a toy with a name and a description to a json file which will be stored in /data/toy._
_Success status code of 201_

GET http://localhost:3000/api/toy
_Allows you to get a toy by unique id # from it's saved json file in /data/toy_
_Success status code of 200_

PUT http://localhost:3000/api/toy
_Allows you to update a toy's json file which will be stored in /data/toy or create a new one._
_Success status code of 204_

DELETE http://localhost:3000/api/toy
_Allows you to delete the toy & it's json file from /data/toy._
_Success status code of 204_


## Resources I Used:
+ Today's lab notes
+ Mongoose docs
+ The Googz
+ [This article](https://coursework.vschool.io/mongoose-crud/)
