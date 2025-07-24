# 🗳️ Voting App MERN

This is a simple full-stack Voting Application built using the **MERN stack**. It includes user authentication, admin-controlled candidate management and creation, and secure voting functionality for registered users.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## 🚀 Features

### 👤 Voter

- Sign up & Log in
- Update password
- View profile
- Vote for a favorite candidate _(can vote only once)_

### 🛡️ Admin

- Log in using a secure `JWT_SECRET`
- Add, edit, and delete candidates
- Cannot vote

---

## 🧩 Project Structure

The app has two main folders:
/frontend → Next.js frontend
/Backend → Node.js + Express backend

---

## 🔧 Installation & Running Locally

Make sure you have **Node.js** and **MongoDB** installed.

1. Clone the repository:

```bash
git clone https://github.com/yourusername/voting-app-mern.git
cd voting-app-mern
```

2. Open two terminals, one for each folder.

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### Frontend (Node+Express)

```bash
cd Backend
npm install
npm run dev
```

⚠️ Don’t forget to create a .env file in the server directory and add :

```bash
PORT
MONGODB_LOCAL
JWT_SECRET
# Mongo Db Credentials
USERNAME
PASSWORD
MONGODB_URL
```
