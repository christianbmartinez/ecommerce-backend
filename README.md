[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![alt text](https://github.com/christianbmartinez/ecommerce-backend/blob/main/ecommercebackend.jpg)

# Ecommerce Backend

An ecommerce backend built with node, sequelize, mysql2, express, and nodemon.

### Table of Contents

**[User Story](#user-story)**<br>
**[Acceptance Criteria](#acceptance-criteria)**<br>
**[Installation Instructions](#installation)**<br>
**[Usage Instructions](#usage)**<br>
**[License](#license)**<br>
**[Contributing](#contributing)**<br>
**[Questions](#questions)**<br>

# User Story

- AS A manager at an internet retail company
- I WANT a back end for my e-commerce website that uses the latest technologies
- SO THAT my company can compete with other e-commerce companies

# Acceptance Criteria

- GIVEN a functional Express.js API
- WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
- THEN I am able to connect to a database using Sequelize
- WHEN I enter schema and seed commands
- THEN a development database is created and is seeded with test data
- WHEN I enter the command to invoke the application
- THEN my server is started and the Sequelize models are synced to the MySQL database
- WHEN I open API GET routes in Insomnia Core for categories, products, or tags
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
- THEN I am able to successfully create, update, and delete data in my database

# Installation

`git clone https://github.com/christianbmartinez/ecommerce-backend.git`

# Usage

First, install all dependencies:

```
npm install
```

Next, create a .env file in the root directory and insert your db config:

```
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='Your Password'
```

Assuming you have mysql setup, run this command and enter your password:

```
mysql -u root -p
```

Then you need to initiate the db/schema:

```
source db/schema.sql
```

Exit the mysql cli and run the seed script:

```
npm run seed
```

Finally, you can run the application:

```
npm start
```

Download [insomnia](https://insomnia.rest/download) to view and test endpoints

# License

This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.

# Contributing

Contributing is welcomed! Please submit a pull request.

# Questions

Feel free to [email](mailto:hello@christianbmartinez.com?subject=[GitHub]%20Ecommerce%20Backend) me with any questions or view [my github profile](https://github.com/christianbmartinez)

[View submission video](https://drive.google.com/file/d/1AUc_vrXPaeOHd3yEtFrUf2ebZXJfRPop/view?usp=sharing)
