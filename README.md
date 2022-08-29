##SIMON JOSEPH - Okra Assessment

The project scrapes, formats, parses and persists a customer's information from the DOM.
It also exposes APIs to query the saved information.

## Installations and prerequisites

Make sure you have these installed on your system before you run the project. Although only `docker` is needed, to run in `docker` container. Where no version is specified, latest is fine to use.
- `Node`
- `Docker`

**NOTE**: When running locally, make sure you add your environment variables into your `.env` file located in the root of the project.
Please populate your `.env` file with the following variables
- `OTP=12345`
- `BASE_URL=https://bankof.okra.ng`
- `DATABASE_HOST=okra-takehome.nopar.mongodb.net`
- `DATABASE_NAME=myFirstDatabase`
- `DATABASE_USERNAME=okra_takehome`
- `DATABASE_PASSWORD=bHrZclVaxWkjwdM7`
- `PORT=3000`
<br>
## Running the project
The project can be run through `docker` (You must have `docker` installed in your environment) and on your local machine (`Node `must be installed).

The commands should be run sequentially

**Docker**
```
//setting up container
docker-compose build
docker-compose up

//tearing down container 
docker-compose down 
docker rm -f $(docker ps -a -q)
``` 

**Your local machine**
```
npm install
npm start
```
<br>

## Consuming the APIs
- Create a `Bank`
```
curl -X POST -H "Content-Type: application/json" -d '{ "name": "Zenith Bank" }' http://localhost:3000/api/v1/banks

```
Response:
```
{
  "name":"Zenith Bank",
  "id":"630c0c1ed1a40a100ab7e2c1",
  "dateCreated":"2022-08-29T00:45:18.256Z"
}
```
<br><br>

- Scrape data from `DOM`<br>
**NOTE**: Before you scrape the `DOM` you must have a `bankId` and also a registered customer's `email` and `password`
```
curl -X POST -H "Content-Type: application/json" -d '{"bankId":"630c0c1ed1a40a100ab7e2c1","customerEmail":"john@doe.com","customerPassword":"password"}'http://localhost:3000/api/v1/scrape

```
Response:
```
{
    "customer": {
        "id": "630c111560ae015791d6b9da",
        "address": "4708 Samuel Severin St. Lagos, Nigeria",
        "bvn": "95XXXXX3825",
        "dateCreated": "2022-08-29T00:59:06.596Z",
        "email": "john@doe.com",
        "firstName": "Peter",
        "lastName": "Paul",
        "phoneNumber": "07923319686",
        "bank": {
            "name": "Zenith Bank",
            "dateCreated": "2022-08-29T00:45:18.256Z"
        }
    },
    "accounts": [
        {
            "id": "630c111560ae015791d6b9db",
            "availableBalance": 365142.3,
            "ledgerBalance": 897972.11,
            "currency": "₦",
            "type": "SAVINGS",
            "numberOfTransactions": 288,
            "dateCreated": "2022-08-29T00:59:06.609Z",
            "recentTransactions": [
             {
                    "id": "630c111560ae015791d6b9dd",
                    "type": "CREDIT",
                    "clearedDate": "2022-08-23T18:34:55.790Z",
                    "description": "payment transaction at Schumm - Gleason using card ending with ***(...6126) for MDL 438.60 in account ***10149205",
                    "amount": 350.37,
                    "beneficiary": "1471592888",
                    "sender": "0553131213",
                    "dateCreated": "2022-08-29T01:01:03.839Z"
                },
                ...
                ]
        },
        ...
    ]
}
```
<br><br>

- Get `customer` details
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/v1/customers/<customerId>

```
Response:
```
{
    "dateCreated": "2022-08-28T22:16:31.257Z",
    "id": "630be942537c90ffb4325f62",
    "bvn": "95XXXXX3825",
    "firstName": "Peter",
    "lastName": "Paul",
    "address": "4708 Samuel Severin St. Lagos, Nigeria",
    "bank": {
        "dateCreated": "2022-08-28T21:23:28.768Z",
        "name": "Zenith Bank",
        "id": null
    },
    "auth": {
        "dateCreated": "2022-08-28T22:16:29.318Z",
        "loginTime": "2022-08-28T22:16:29.318Z",
        "otp": "12345",
        "id": "630be942537c90ffb4325f61",
        "email": "simonjoseph750aws@gmail.com"
    },
    "phoneNumber": "07923319686"
}
```
<br><br>

- Get `Accounts` by customer id
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/v1/accounts/<customerId>

```
Response:
```
[
  {
        "dateCreated": "2022-08-28T22:16:31.267Z",
        "customer": {
            "dateCreated": "2022-08-28T22:16:31.257Z",
            "bvn": "95146523825",
            "firstName": "Peter",
            "lastName": "Paul",
            "address": "4708 Samuel Severin St. Lagos, Nigeria",
            "bank": {
                "dateCreated": "2022-08-28T21:23:28.768Z",
                "name": "Zenith Bank",
                "id": null
            },
            "auth": {
                "dateCreated": "2022-08-28T22:16:29.318Z",
                "loginTime": "2022-08-28T22:16:29.318Z",
                "otp": "12345",
                "id": "630be942537c90ffb4325f61",
                "email": "simonjoseph750aws@gmail.com"
            },
            "phoneNumber": "07923319686"
        },
        "availableBalance": 365142.3,
        "ledgerBalance": 897972.11,
        "currency": "₦",
        "numberOfTransactions": 10,
        "type": "SAVINGS"
    },
    ...
]
```


## Deployment and hosting
- Hosted on Heroku, via CircleCI
- API base URL can be found here : https://okra-assessment.herokuapp.com/api/v1


## Implementation Details

- I went with a heavy OOP approach, by way of interfaces, generics and inheritance.
## Schema Diagram
![Schema diagram](https://i.ibb.co/t3vVYsq/Screenshot-2022-08-28-at-12-05-49-AM.png)

## Project Assumptions

- A customer must belong to one bank
- Login credentials must be obtained before scraping the `DOM`
## Extenal libraries used

- `class-validator` - This was used to facilitate request body validations on the fly.
- `Puppeteer` - This provides a high-level API to control Chrome.
- `Mongodb` - This is a MongoDB Node.js driver used to communicate with the MongoDb database

##Documentation
Documentation can be found [here](https://okra-assessment.herokuapp.com/api)












