# fe-interview-backend

This repository contains a local mock backend server for the brightwheel frontend coding challenge, as well as an empty React app using `create-react-app` which you can use as a starting point if you like.

## Getting started

Install project dependencies

```
yarn install
```

Start the frontend and the mock backend together

```
yarn start:mock
```

Or start the backend by itself

```
yarn start:api
```

This will create a locally hosted backend that you can access at `http://localhost:3001`

### Data models

```typescript
interface Product {
    type: 'product';
    id: string;
    starred: boolean;
    name: string;
    productCategory: string;
    previewText: string;
    image?: string;
}

interface Address {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
}

interface Place {
    type: 'place';
    id: string;
    starred: boolean;
    name: string;
    address: Address;
}

interface Taxonomy {
    family: string;
    scientificName: string;
}

interface Animal = {
    type: 'animal';
    id: string;
    starred: boolean;
    taxonomy: Taxonomy;
    name: string;
    image?: string;
}
```

### Filter

Use `.` to access deep properties

```
GET /search?id=animal.5
GET /search?taxonomy.family=dog
```

Add `_like` to filter (RegExp supported)

```
GET /search?name_like=cat
```

### Full-text search

Add `q`

```
GET /search?q=fish
```

### Paginate

Use `_page` and optionally `_limit` to paginate returned data.

In the `Link` header you'll get `first`, `prev`, `next` and `last` links.

```
GET /search?_page=7
GET /search?_page=7&_limit=20
```

By default all matching results are returned
