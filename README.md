# Company Directory App - Exercise

This project serves as a comprehensive example of a React application that interfaces with a mock backend server. It showcases a dynamic company directory where users can search, view, and update company information. The application is built using React and TypeScript, demonstrating best practices in modern web development.

## Getting Started

To get the application up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (v12 or higher recommended)
- NPM package manager

### Installation

1. Clone the repository to your local machine.

2. Install the necessary dependencies:

```
$ npm install
```

### Running the application

To start both the frontend application and the mock backend server simultaneously, run:

```
$ npm run start:mock
```

Alternatively, to start only the backend server:

```
$ npm run start:api
```

The frontend application will be available at `http://localhost:3000`, and the backend server can be accessed at `http://localhost:3001`.

## Features

- **Search Functionality:** Users can search for companies by name or other attributes.
- **Dynamic Updates:** Users can star or unstar companies, with changes persisting during the session.

## Data Models

The application uses a simple data model for companies, including fields such as name, description, and address. Here is a brief overview of the model:

```typescript
interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
}
interface Company {
  id: string;
  starred: boolean;
  name: string;
  description: string;
  address: Address;
  image?: string;
}
```

## Backend API

The mock backend supports several routes for interacting with the company data:

- `GET /search/:id`: Get details of a specific company.
- `PATCH /search/:id`: Update the starred status of a company.
- Additional routes for creating and deleting companies are also supported.
