# API Mock
A small web service based on [Next.js](https://nextjs.org/) with simple UI to mock web services. Might be useful in cases when a web service is still in development, but the desired endpoints schema is already known.

## Usage
To run the app, glone the repository, then run

`npm install && npm start`

Now navigate to http://localhost:3030/ui.
The app consists of two pages. The first page shows all mocks that are currently set up.

![Mocks list](images/mock-list.png)

This page provides CRUD operations on available mocks.

The second page is accessible when you either click "New mock" button or click edit button on selected mock.

![Mocks list](images/mock-setup.png)

## Limitations
For simplicity, following limitations apply
* Only json responses are supported.
* Mocks are stored in local json file.

In case the mock does not exist or disabled, service will return 404 status code.