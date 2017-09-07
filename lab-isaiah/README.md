# Lab13-Isaiah

### Configuration
  * `.gitignore`
  * `.eslintrc.json`
  * `.eslintignore`
  * `package.json`
  * `README.md` (this file)

### Feature Tasks:
* Completed creating an HTTP Server using `express`.
* Completed creating  a resource **model** of a toy that uses `mongoose.Schema` and `mongoose.model`
* Used the `body-parser` express middleware to parse the `req` body on `POST` and `PUT` requests
* Used the npm `debug` module to log the functions and methods that are being used in this application (Very useful but need to work on getting more efficient with this.)
* Used the express `Router` to create a route for doing **RESTFUL CRUD** operations against this _model_

### Server Endpoints:
* Completed Server Endpoints as required. Includes `POST` `GET`, `PUT`, and `DELETE`.
* Successful run through via the following **HTTPie** commands:
  ```
    1. http POST :3000/api/toy name=HULK desc=KING
    2. http GET :3000/api/toy
    3. http GET :3000/api/toy/59b15ca851d53903c96d2295
    4. http PUT :3000/api/toy/59b15ca851d53903c96d2295 name='tardis' desc='space time'
    5. http GET :3000/api/toy/
    6. http DELETE :3000/api/toy/59b15ca851d53903c96d2295
    7. http GET :3000/api/toy/    
  ```

### Tests:
* Created the majority of the tests but need to tweek a few of the test for `GET`, `PUT`, and `DELETE`. Also want to work on coming up with more tests. Need to continue to develop this skill.

### Bonus:
* Completed. To test run http GET on the command line without adding a `\_id` as the endpoint. See \#2 of the ***HTTPie commands*** listed above.
