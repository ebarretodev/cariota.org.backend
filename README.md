# cariota.org Backend

## Introduction to project

This project is about to API to run functions that comunicate with Tangle, it`s like a Wallet to provide instances to a car. [https://www.cariota.org/api/v1](https://www.cariota.org/api/v1/). This API uses a MongoDB to save informations from Users, Balances, and valus.Connect to devnet from TANGLE.

## Status

### `developing`

## Instructions

Clone the repository and in the project directory run:


### For developer use and edit

```
npm install
npm run dev
```


### For build purpose or simple usage

```
npm install
npm run build
```

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

For correctly tabuse you must create the datase olx and collections following the models on `/src/models/` and a ".env" file with directions for the database like  `DATABASE=mongodb://127.0.0.1:27017/cariota`

## Endpoints available

+ ### Test API [/]
  ### GET
  Route for only test communication purpose.
  + Response 200 (application/json):
    ```
    {"message":"Welcome to API.v1 to CarWallet Simulator."}
    ```

+

