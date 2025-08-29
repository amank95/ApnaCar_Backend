# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates the user, and returns an authentication token along with the user data.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

## Notes
- The password is securely hashed before storing.
- The response includes a JWT token for authentication.
- All required fields must be provided, or a 400 error will be returned.

---

For further questions, see the code in `routes/user.routes.js` and `controllers/user.controller.js`.

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description
Authenticates a user and returns a JWT token if the credentials are valid. Also sets a cookie named `token` for session management.

## Request Body
Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)"
}
```

### Example

```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```
- **Cookie:**
  - `token`: JWT token for authentication

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Notes
- The password is checked using a secure hash comparison.
- The response includes a JWT token for authentication and sets a cookie named `token`.
- All required fields must be provided, or a 400 error will be returned.
- If credentials are invalid, a 401 error will be returned.


# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description
Returns the authenticated user's profile information. Requires a valid JWT token in the cookie or authorization header.

## Authentication
- Requires authentication via JWT token (sent as a cookie named `token` or in the `Authorization` header).

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
  ```

### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

## Notes
- Only authenticated users can access this endpoint.
- Returns the user object attached to the request by the authentication middleware.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description
Logs out the authenticated user by clearing the JWT token cookie and blacklisting the token.

## Authentication
- Requires authentication via JWT token (sent as a cookie named `token` or in the `Authorization` header).

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out"
  }
  ```

### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

## Notes
- The token is cleared from the cookie and added to a blacklist to prevent reuse.
- Only authenticated users can access this endpoint.

---

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captains/register`

## Description
Registers a new captain (driver) in the system. Validates input, hashes the password, creates the captain, and returns an authentication token along with captain data.

## Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 characters, required)",
  "vehicle": {
    "color": "string (min 3 characters, required)",
    "plate": "string (min 3 characters, required)",
    "capacity": "number (min 1, required)",
    "model": "string (optional)",
    "vehicleType": "string (car|motorcycle|auto, required)"
  }
}
```

### Example
```
{
  "fullname": {
    "firstname": "Aman",
    "lastname": "Kumar"
  },
  "email": "aman.captain@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "AB1234",
    "capacity": 4,
    "model": "Swift",
    "vehicleType": "car"
  }
}
```

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "captain": {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "Aman",
        "lastname": "Kumar"
      },
      "email": "aman.captain@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB1234",
        "capacity": 4,
        "model": "Swift",
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      // ...other errors
    ]
  }
  ```

## Notes
- The password is securely hashed before storing.
- The response includes a JWT token for authentication.
- All required fields must be provided, or a 400 error will be returned.

---
