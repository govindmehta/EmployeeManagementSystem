# Employee Management System

A full-stack Employee Management System built with modern web technologies.

## 🚀 Tech Stack

### Frontend
- **React** - UI library for building user interfaces
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and quality

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework
- **Prisma** - Modern ORM for database management
- **PostgreSQL** - Relational database (Neon)
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
EmployeeManagementSystem/
├── frontend/          # React frontend application
│   ├── src/          # Source files
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
└── backend/          # Backend application
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (or use a cloud provider like Neon)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     DATABASE_URL="your_postgresql_connection_string"
     JWT_SECRET="your_secret_key"
     PORT=3000
     ```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev
```

5. (Optional) Seed the database:
```bash
node userSeed.js
```

6. Start the development server:
```bash
npm start
```

The backend server will run on port 3000 by default.

## 📝 Features

- Employee data management
- Modern and responsive UI
- Fast development experience with Vite
- Styled with Tailwind CSS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Govind Mehta**
- GitHub: [@govindmehta](https://github.com/govindmehta)

---

⭐ Star this repository if you find it helpful!