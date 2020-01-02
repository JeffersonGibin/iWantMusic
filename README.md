# iWantMusic

![](https://github.com/JeffersonGibin/iWantMusic/workflows/iWantMusic/badge.svg)
![npm version](https://img.shields.io/npm/v/npm?label=npm%20version)

The project was developed to participate in the selection process at iFood, you can find more details [here](https://github.com/ifood/ifood-backend-advanced-test).

## Simple Steps to Start Project
1. Clone the repository **`iwantmusic`**.
2. Make sure you have **`docker`** and **`docker-compose`** installed on your machine.
3. Access the repository (**`iwantmusic`**) through your O.S terminal.
4. Open the file **`docker-compose.yaml`** in the editor of your choice and add the API credentials.

```shell
SPOTIFY_CLIENT_ID=
SPOTIFY_SECRET_ID=
WEATHER_APP_ID=
```
5. Run the following command to start the application in the docker container. **`sudo docker-make up --build`**.

## You may need :)

* API - http://localhost:4000/
* API DOCS - http://localhost:4000/api-docs/

## Files and Folders Structure

* **`Cache:`**  To ensure resilience in a symbolic way, a .json file was used as the application cache for situations where APIs fail to deliver content.
* **`Constansts:`** contains messages and constant values for business rules.
* **`Controller:`** responsible for controlling the route requests.
* **`Repository:`** application data layer.
* **`Service:`** business rule of the application.
* **`Utils:`**  utility functions and helpers like formating.
* **`app.js:`** import the necessary libraries and control the application.
* **`Notify:`** application notification layer.
* **`route.js:`** application routes.
* **`server.js:`** imports the application and starts the server.

## Business rule used

* If temperature (celcius) is above 30 degrees, suggest tracks for party
* In case temperature is between 15 and 30 degrees, suggest pop music tracks
* If it's a bit chilly (between 10 and 14 degrees), suggest rock music tracks
* Otherwise, if it's freezing outside, suggests classical music tracks


## Technologies used

- Node.js (express, axios, cors, helmet and swagger-ui-express)
- Docker
- Github actions
