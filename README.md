# ShipManagement

This repository contains the code for a ShipManagement app that allows users to perform CRUD operations using a REST API built with .NET and React-ts. The project uses a JSON file as a mock database and performs CRUD operations via the backend. Relevant data can then be seen in the frontend UI.
## Installation and Usage
### Prerequisites

Before running the project, you will need to have Docker installed on your machine. You can find installation instructions for Docker here.

Additionally, make sure that ports 443 and 8080 are available on your machine.
## Running the Application with Docker

To run the application, navigate to the ShipManagement/ShipAPI directory in a terminal or command prompt and run the following command:

```
docker-compose up
```

This will start the application and make it available at http://localhost:8080/.

## Running the Backend Locally
To run the backend locally, navigate to the ShipManagement directory in a terminal or command prompt and run the following command:
```
dotnet run --project ShipAPI/ShipAPI.csproj
```
This will start the backend and make it available at https://localhost:7097/. Note that the frontend will still need to be built and run separately using npm run dev as described below.

## Running the Frontend Locally

The frontend files can be found in the ShipManagement/ShipAPI/ClientApp directory. To run the frontend in development mode, navigate to this directory in a terminal or command prompt and run the following command:

```
npm run dev
```

### Running Unit Tests

The project includes Vitest for unit testing. To run the tests, navigate to the ShipManagement/ShipAPI directory in a terminal or command prompt and run the following command:

```
npm run test
```

You can also run a specific test by providing the test name as an argument:

```
npm run test {testName}
```

If you omit the test name, all tests will be performed.

## Credits

This project was created by Hakan Aksuman.
