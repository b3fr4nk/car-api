# Dream car API
## build a library of your dream cars and their specs

### Create an account
create an account by sending a post request to ___/signup with the following information in a JSON:
1. username
2. password

### add cars
add cars to your garage by sending a post request to ___/ with the following information in a JSON:
1. Make
2. Model
3. model year (specific year of your dream car)
4. number of doors (2 doors, 4 doors, 5 doors AKA hatchback)
5. Horsepower!

the JSON should be formatted like:

{
    make: Chevy,
    model: C8 Z07,
    model_year: 2022,
    number_of_doors: 2,
    horsepower: 670,
}

### update a car in your garage
While logged in send a put request to that car's ID, can be found by sending a get request with the make and model in a JSON. Change the 

### 