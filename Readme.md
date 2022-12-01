# Todo App as a Single Page Application
The SPA with 5 pages (routes):

- A Homepage to ask Signup or Signin to the application,
- Register page for users to register to be able to use the app,
- Login page for users to authenticated in the app to access private pages,
- A Dashboard page which shows authenticated/registered user todos and actions
- Notfound page

### Getting Started

To get started you can simply clone the repo and install the dependencies in the root folder

| Steps   |with [NPM](https://www.npmjs.com/) |
| ------- | --------------------------------- | 
| Install |`npm install`                      |
| Run     |`npm run dev`                      |

##### Global State Flow

- auth: stores authentication states
- todo: stores todo states
#### Api Calls

1. Post - Register User

```
`../api/users`,

```

2. Post - Login User

```
`../api/auth`,

```

3. Get - Get todo tags

```
`../api/tags`,

```

4. Get/Post/Put/Delete Todos (Add/Update/Complete/Uncomplete/Delete/Get)

```
`../api/todos`,

```

##### NOTE: Local Storage

JWT token for authentication is stored in the local storage of the browser and added to header of the request by setAuthToken function.