# Dream car API
## build a library of your dream cars and their specs

### Create an account
create an account by sending a post request to ___/signup with the following information in a JSON:
1. username
2. password

The JSON should look like this:

{
    "username": "*your username*"
    "password": "*your password*"
}

### Log In 
to log in send a Post request ___/login with the following in a JSON:
1. Username
2. Password

The JSON should look like this:

{
    "username": "*your username*"
    "password": "*your password*"
}

### add cars to your garage
add a car to your garage by sending a put request to ___/users/garage while logged in with a JSON like:

{
    cars: [*id of the car you want*, *id of the car you want*]
}



### get a list of all cars
Send a get request to ___/cars to retrieve a JSON of all cars

### add cars
add cars to the database by sending a post request to ___/cars with the following information in a JSON:
1. Make
2. Model
3. model year (specific year of your dream car)
4. number of doors (2 doors, 4 doors, 5 doors AKA hatchback)
5. Horsepower!

**Note this requires an admin account**

the JSON should be formatted like:

{
    make: Chevy,
    model: C8 Z07,
    model_year: 2022,
    number_of_doors: 2,
    horsepower: 670,
}

### update a car
To update a car in the database send a put request to ___/cars/*carId* with a JSON of the elements you wish to change **note you must have an admin account**

Example:

{
    "horsepower": 350
}

### delete a car
To delete a car in the database send a delete request to ___/cars/*CarId* **Note this requires an admin account**