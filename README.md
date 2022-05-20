# URL SHORTENING API

## Description

A URL shortening API service, so that users may have custom URLs to their long URLs.

- This service allows a user to share a long URL as a short URL so it's easier to copy/paste in emails.

- Allows a user to customize the short URL so that they can recall what URL it is referencing or give it a cool name

- This service allows a user to see a report of their short URLs, when it was created and how many times it was clicked.



The following components and tools are used in this API:

- [NodeJs]
- [ExpressJs]
- [MongoDB]

## Pre-requisites

The following is required to run the service locally:


## Start up

The following command can be used to run the application locally.

```bash
npm install
```

```bash
npm run dev
```

## Database Setup

A folder called App and a file called db.js should be created to hold the mongodb address.
Example of the content is:
```
    module.exports = {
    // DB: 'mongodb://localhost:27017/shortner'
  };
```

## Testing

The project consists of  end-to-end tests. end-to-end (e2e) tests are for testing HTTP requests and interfaces, to ensure that validation and service implementation is working as expected.

```Install the following dependencies
npm install --save should

npm install --save supertest
```

```
npm install --save jest
```

To run  tests:
```
npm run test
```

## Documentation

The documentation of services created is shown below:

- The API allows a user to submit a URL to with or without a shortcode proposed, and receive automatically allocated unique shortcode in response if no shortcode was provided.
Screenshot 2022-05-20 at 19.14.31.png

```
{BASE_URL}/v1
    body request:
    {
        "longUrl": "http.short.com",
        "shortUrl":"we3q"
    }
```

- A user can access a /<shortcode> endpoint and be redirected to the URL associated with that shortcode, if it exists.
- All shortcodes can contain digits, upper case letters, and lowercase letters. It is case in-sensitive.
- Automatically allocated shortcodes are exactly 6 characters long.
- User submitted shortcodes must be at least 4 characters long.
```
{BASE_URL}/v1/:shortCode
    
```

- A user can access a /<shortcode>/stats endpoint in order to see when the shortcode was registered, when it was last accessed, and how many times it was accessed.
```
{BASE_URL}/v1/:shortCode/stats
``` 
