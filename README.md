# orm-ecommerce

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Visuals](#visuals)
4. [License](#license)

## Description
[Video Walkthrough](https://drive.google.com/file/d/1ponnkLk59a53OkXTijNQUV9tyzGjjJTE/view)
[GitHub Repository](https://github.com/Zachattack221/orm-ecommerce)


## Installation
Run 'npm i' within the console, located at the root level of the directory. This will pull in the necessary node modules/packages.

Following the package install, run "mysql -u root" to open sequel terminal, then enter "SOURCE db/schema.sql" to establish our database in use (ecommerce_db). From this point please "exit" sequel shell. 

Once database is created, enter "npm run seed" within the terminal to seed the content from the seeds folder.

Lastly, enter "npm run start" in the console. This will open a port at localhost:3001, accessible when 'localhost:3001' searched in browser, or when opened via Insomnia as demonstrated in the video link provided.

## Visuals
Categories
![Categories](./Images/GetAllCategories.png)
Products
![Products](./Images/GetAllProducts.png)
Tags
![Tags](./Images/GetAllTags.png)

## License
This application is licensed with the MIT License.