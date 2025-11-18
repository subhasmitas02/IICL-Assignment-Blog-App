# IICL Assignment - Blog App

This is a full-stack blog management application. Its an assignment given by IICL.

The project is divided into two main parts:
1.  **Backend:** A Node.js/Express RESTful API built with Prisma for database management.
2.  **Frontend:** A React (Vite) admin UI styled with Tailwind CSS for managing blog posts.

---

| Live Demo | Link |
|--------|------|
| **Frontend (Vercel)** | https://iicl-assignment-blog-app.vercel.app |
| **Backend API (Render)** | https://blog-api-2zav.onrender.com |

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express, Prisma, SQLite (for local dev), PostgreSQL (for production)
* **Frontend:** React (Vite), React Router, Axios
* **Styling:** Tailwind CSS
* **Security:** Helmet, express-rate-limit, express-validator
* **Deployment:** Render (Backend), Vercel (Frontend)

---

## ✨ Features

This project successfully implements all 4 levels of the hiring challenge.

### Level 1: Backend API (Blog CRUD)
* [✅] Full RESTful API for Blog post entity (`id`, `title`, `content`, `author`, `createdAt`, `updatedAt`).
* [✅] **`POST /api/blogs`**: Create a new post.
* [✅] **`GET /api/blogs`**: Get all posts.
* [✅] **`GET /api/blogs/:id`**: Get a single post by its ID.
* [✅] **`PUT /api/blogs/:id`**: Update an existing post.
* [✅] **`DELETE /api/blogs/:id`**: Delete a post.
* [✅] **(Bonus)** Pagination is implemented for the `GET /api/blogs` endpoint.

### Level 2: Frontend Admin UI
* [✅] A clean, responsive admin UI built with React and styled with Tailwind CSS.
* [✅] **Blog List View:** Fetches and displays all posts from the API.
* [✅] **View Single Post:** A dedicated page to view the full content of a single post.
* [✅] **Create/Edit Form:** A single, reusable `BlogForm` component is used for both creating new posts and editing existing ones.
* [✅] **Delete Confirmation:** A `window.confirm` dialog prevents accidental deletion.
* [✅] **(Bonus)** Loading and error states are handled during API requests.

### Level 3: Cloud Deployment
* [✅] The full application is deployed to the cloud.
* [✅] The **Backend** (Node.js/Express) is deployed on **Render**.
* [✅] The **Frontend** (React/Vite) is deployed on **Vercel**.
* [✅] The frontend is correctly configured to communicate with the deployed backend API.

### Level 4: Security Enhancements
* [✅] **Input Validation:** All incoming data on `POST` and `PUT` routes is validated server-side using `express-validator`.
* [✅] **Error Handling:** A global error handler provides consistent JSON error responses.
* [✅] **API Protection:** Basic API rate limiting is implemented with `express-rate-limit`.
* [✅] **Secure Headers:** `helmet` is used to protect against common web vulnerabilities.
* [✅] **CORS:** The backend is configured with a strict CORS policy to only allow requests from the deployed frontend.

---

## 📂 Project Structure