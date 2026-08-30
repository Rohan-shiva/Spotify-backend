# Spotify Backend

Backend API for a Spotify-like music application. The project handles user authentication, artist accounts, music uploads, and albums.

## Tech Stack

<div align="left">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45" height="45" alt="Node.js" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="45" height="45" alt="Express.js" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="45" height="45" alt="MongoDB" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="45" height="45" alt="JavaScript" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="45" height="45" alt="npm" />

</div>

| Technology     | Used For                |
| -------------- | ----------------------- |
| **Node.js**    | JavaScript runtime      |
| **Express.js** | Backend REST API        |
| **MongoDB**    | Database                |
| **Mongoose**   | MongoDB object modeling |
| **JWT**        | Authentication          |
| **bcryptjs**   | Password hashing        |
| **Multer**     | File uploads            |
| **ImageKit**   | Music file storage      |
| **dotenv**     | Environment variables   |
| **Nodemon**    | Development server      |


## Features

* User registration and login
* Artist and user roles
* JWT based authentication
* Password hashing using bcrypt
* Artist-only music uploads
* Upload music files to ImageKit
* Create albums
* Get available music
* Get albums
* Get album details
* MongoDB for storing users, music and album data

## Project Structure

```text
Spotify-backend/
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
│
└── src/
    ├── app.js
    │
    ├── DB/
    │   └── db.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   └── music.controller.js
    │
    ├── middlewares/
    │   └── auth.middleware.js
    │
    ├── models/
    │   ├── user.model.js
    │   ├── music.model.js
    │   └── album.model.js
    │
    ├── routers/
    │   ├── auth.routes.js
    │   └── music.routes.js
    │
    └── services/
        └── storage.service.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rohan-shiva/Spotify-backend.git
cd Spotify-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Do not push the `.env` file to GitHub.

### 4. Run the server

For development:

```bash
npm run dev
```

The server runs on:

```text
http://localhost:3000
```

## API Routes

### Authentication

#### Register

```http
POST /api/auth/register
```

Example:

```json
{
  "username": "rohan",
  "email": "rohan@example.com",
  "password": "password123",
  "role": "user"
}
```

The available roles are:

```text
user
artist
```

If no role is provided, the default role is `user`.

#### Login

```http
POST /api/auth/login
```

You can login using either username or email.

Example:

```json
{
  "username": "rohan",
  "password": "password123"
}
```

After login, a JWT token is stored in a cookie.

#### Logout

```http
POST /api/auth/logout
```

This clears the authentication cookie.

---

## Music

### Upload Music

Only artists can upload music.

```http
POST /api/music/upload
```

Use `multipart/form-data`.

Fields:

```text
title
music
```

Example:

```text
title: My Song
music: song.mp3
```

The uploaded music file is sent to ImageKit and the returned URL is stored in MongoDB.

### Get Music

```http
GET /api/music/
```

This route is available for authenticated users.

---

## Albums

### Create Album

Only artists can create albums.

```http
POST /api/music/album
```

Example:

```json
{
  "title": "My Album",
  "musics": [
    "MUSIC_ID_1",
    "MUSIC_ID_2"
  ]
}
```

### Get Albums

```http
GET /api/music/albums
```

Returns the available albums along with artist information.

### Get Album by ID

```http
GET /api/music/albums/:albumId
```

Example:

```http
GET /api/music/albums/65f123456789abcdef123456
```

---

## Authentication

The project uses JWT for authentication.

After login, the JWT is stored in a cookie named:

```text
token
```

There are separate middleware checks for users and artists.

Artists can:

* Upload music
* Create albums

Users can:

* View music
* View albums
* View album details

## Database Models

### User

```text
username
email
password
role
```

Passwords are hashed using bcrypt before being stored.

### Music

```text
uri
title
artist
```

The artist field references a User.

### Album

```text
title
musics
artist
```

The `musics` field contains references to music documents.

## File Upload

Music uploads are handled using Multer.

The upload flow is:

```text
Client
   ↓
Multer
   ↓
ImageKit
   ↓
Music URL
   ↓
MongoDB
```

The ImageKit URL is stored in the music document.

## API Summary

| Method | Route                        | Access        |
| ------ | ---------------------------- | ------------- |
| POST   | `/api/auth/register`         | Public        |
| POST   | `/api/auth/login`            | Public        |
| POST   | `/api/auth/logout`           | Authenticated |
| POST   | `/api/music/upload`          | Artist        |
| POST   | `/api/music/album`           | Artist        |
| GET    | `/api/music/`                | User          |
| GET    | `/api/music/albums`          | User          |
| GET    | `/api/music/albums/:albumId` | User          |

## Future Improvements

Some things I plan to add/improve:

* Playlists
* Search functionality
* Likes/favorites
* Better music pagination
* Album cover uploads
* API validation
* Automated tests
* Better error handling
* Docker support
* Deployment

## Author

Rohan

