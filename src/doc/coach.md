# Coach API spec

## Get Cocah

Endpoint : GET /api/coaches

Query Parameter :

- name : string search to name
- email : string search to email
- page : bumber, default 1
- perPage : bumber, default 10

Response body (Success):

```json
{
  "data": [
    {
      "email": "coach1@mail.com",
      "name": "coach1",
      "role": "COACH",
      "image": null,
      "isActive": true
    },
    {
      "email": "coach2@mail.com",
      "name": "coach2",
      "role": "COACH",
      "image": null,
      "isActive": true
    }
  ],
  "paging": {
    "page": 1,
    "perPage": 10,
    "size": 2
  }
}
```

## Create Coach

Endpoint : POST /api/coaches

Request body :

```json
{
  "email": "coach1@mail.com",
  "name": "coach1",
  "password": "P@ssw0rd"
}
```

Response body (Success) :

```json
{
  "data": {
    "id": 1,
    "email": "coach1@mail.com",
    "name": "coach1",
    "role": "COACH",
    "image": null,
    "isActive": true
  }
}
```

## Update Coach

Endpoint : PUT /api/coaches/[id]

Request body :

```json
{
  "email": "coach1@mail.com",
  "name": "coach1 edit"
}
```

Response body (Success) :

```json
{
  "data": {
    "id": 1,
    "email": "coach1@mail.com",
    "name": "coach1 edit",
    "role": "COACH",
    "image": null,
    "isActive": true
  }
}
```
