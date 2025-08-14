## 1.Develop a comparative analysis between a RESTful API and a GraphQL API for a given dataset.
### Data Fetching
### REST 
        Clients make request to multiple predefined endpoints.
        This approach leads to overfetching and underfetching.
### GraphQL 
        Clients make request to single endpoint requesting only specific field.
        This eliminates overfetching and underfetching.

### EndPoints
### REST 
        It uses multiple endpoints, each representing a specific resources.
### GraphQL 
        Operates through single endpoint where all queries and mutations are sent.


### Schema
### REST 
        It does not force to have a strict schema.
        Though defining a schema is often a good practice.
### GraphQL 
        It requires and enforces strong type schema that define the available data and its structure.

### Error Handling
### REST 
        It relies on standard HTTP status codes to indicate success or failure of request.
### GraphQL 
        It returns status 200 for all responses with error details
        included within response payload.


### Flexibility
### REST 
        It is less flexible as clients receive fixed data structure from each point.
### GraphQL 
        It is more flexible that enables client to get specific data as per the demand.

### Complexity
### REST 
        It is generally easier to get started with.
### GraphQL 
        It has steeper learning curve.
        Offers significant advantage for complex, data-intensive applications.