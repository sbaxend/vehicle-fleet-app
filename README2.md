_Duration: 2 Week Sprint_


This is an application to manage and to store information about vehicles you own or control. User will be able to keep track of routinely maintenance and parts installed. User will also be able to make a wishlist of things they want to do for each vehicle. 

I solved this by making a scope document and throughly thought out what I wanted to do for the project. I made a estimated schedule 
Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it? 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam at massa in faucibus. Etiam volutpat, risus non mollis convallis, velit nisi pulvinar mi, eu faucibus orci nisi eget nibh. Integer a velit pretium, volutpat arcu eleifend, fringilla elit. Cras erat sapien, convallis venenatis tellus vitae, feugiat dictum felis.

Suspendisse euismod volutpat aliquet. Maecenas vulputate mauris in pellentesque facilisis. Phasellus varius malesuada semper. Cras sollicitudin diam mollis maximus aliquam.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [MaterialUI](https://mui.com/material-ui/getting-started/installation/) default install, styled components, and icons.
- [SweetAlert2](https://sweetalert2.github.io/#download)

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.


1. Create a database named `prime_app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`

4. Material UI Installation `npm install @mui/material @emotion/react @emotion/styled`
                            `npm install @mui/material @mui/styled-engine-sc styled-components`
                            `npm install @mui/icons-material`

5. SweetAlert2 Intallation `npm install sweetalert2`
6. Run `npm run server` in your terminal
7. Run `npm run client` in your terminal
8. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. User will register for their new profile and then login
2. Once logged in, user will be brought the the user page/ Home to see their fleet of vehicles (there will be none if you just made a profile)
3. User can start by adding a vehicle by pressing the add button and the user will be brought to the add page.
4. Once user has added a vehicle a notification should appear if done correctly. User can now navigate back home to view their fleet.
5. User can now click on any vehicle they added to be brought to the that specefic cars details page
6. User can change car info by pressing edit button or starting adding history to the history table below. User can also delete vehicle if user chooses to do so. 
7. User can select the wishlist tab to switch tables from the history table. user can add future desires they want to add to their vehicle.


## Built With

Node.js
React
Redux
Express
Material UI
SweetAlert2
Javascript
HTML


## License
[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)
