##
Firstly take a clone from the main branch and after installation run the following command

`npm install`
##


##
All your packages should be installed now.

Now setup your db, go to .env file and paste the mongodb url of your local database in front
of the variable `DB_URL`.
Now run 
`node server.js`.
You should get a message saying connection established after this
##

##
With the project running now let me explain the structure of the project

There are 3 folders model, controller, and routes

1. The model folder has one file userModel.js which has the schema of the user model
and creates the collection in the db.

2. The controller file has various functions for register, login, and getting data by id.
All the logic is in the controller file and are proprely logged and error handelling has been done.

3. The routes folder has one file called routes.js which has the following routes
Rate limiting has been applied to all the routes

First route is for registering the users, second is for login and generating a token
and third is to get a name on basisi of id

`router.post('/register',apiLimiter, controller.register)`
`router.post('/login', controller.login)`
`router.get('/users/:id',apiLimiter, controller.hasAccess , controller.getUserById)`

4. There is another folder called tests, which has a file controller.test.js which has tests
To run them type `npm test` in the command prompt


##



##
In addition to those there is a server.js file as well
The main endpoint to all routes is defined there 
`app.use('/api', routes)`.

So when you are accessing the API have /api after localhost:4000

Also in server.js there is one route which is public but can be only accessed if the user-agent is `Dart`.

##