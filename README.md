# Product Manager API – Keploy API Fellowship Project

A full-stack CRUD application built with **Node.js**, **Express**, and **MySQL** for managing products. Includes a simple HTML frontend for easy interaction and testing, and full automated testing with Jest and Supertest.

---
![alt text](generated-image.png)

---

## 🚀 Features

- RESTful API with Create, Read, Update, Delete (CRUD) endpoints for products
- MySQL database integration
- MVC folder structure for clean code organization
- Simple frontend (`public/index.html`) to interact with the API
- **Automated tests:** Unit, integration, and API tests
- Code coverage reporting
- AI-powered test generation with zero manual coding
- Record-replay functionality for real-world scenarios
- eBPF instrumentation for language-agnostic testing
- Combined test coverage from traditional and AI tests
- Chrome extension for web API testing
- Cross-platform development (Windows + WSL2)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (mysql2)
- **Testing:** Jest (test runner & coverage), Supertest (API endpoint testing)
- **Other:** dotenv (environment variables), body-parser, cors
---

🤖 Keploy AI-Powered API Testing
- Comprehensive explanation of what Keploy is and its capabilities
- Setup requirements for Windows/WSL2 users
- Step-by-step recording and testing instructions
- Configuration management via keploy.yml

🔄 CI/CD Pipeline Integration
- GitHub Actions workflow for automated Keploy testing
- Pipeline configuration examples
- Multi-environment support

📊 Enhanced Test Coverage
- Combined coverage from Jest + Keploy tests
- Coverage reporting and metrics
- Multiple testing framework integration

🌐 API Documentation
- OpenAPI/Swagger integration details
- Automatic schema export functionality
- Documentation-driven testing approach

🐳 Docker & Environment Setup
- WSL2 Docker configuration for Windows users
- Cross-platform compatibility notes
- Container-based deployment options

---

## 🧩 API Integrated

This project exposes and tests a custom REST API for product management, including:

| Method | Endpoint                   | Description                |
|--------|----------------------------|----------------------------|
| GET    | /api/products              | Get all products           |
| GET    | /api/products/:id          | Get a product by ID        |
| POST   | /api/products              | Create a new product       |
| PUT    | /api/products/:id          | Update a product by ID     |
| DELETE | /api/products/:id          | Delete a product by ID     |

---

## 🚦 Getting Started

### 1. Clone the Repository

git clone https://github.com/stealthinator45/product-manager-api.git
cd product-manager-api



### 2. Install Dependencies

npm install



### 3. Set Up the Database

- Start MySQL and run the scripts in the `sql/` folder:

SOURCE sql/create_db.sql;
USE keploy_api_db;
SOURCE sql/create_table.sql;
SOURCE sql/seed_data.sql;



### 4. Configure Database Connection

- Copy `.env.example` to `.env` and fill in your MySQL credentials.

Example:
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=keploy_api_db



### 5. Start the Server

npm start



- You should see:  
  `Server is running on port 3000.`  
  `Successfully connected to the database.`

---

## 🧪 How to Run Tests

- **All tests (with coverage):**
npm test


- **Unit tests only:**
npm run test:unit


- **Integration tests only:**
npm run test:integration


- **API tests only:**
npm run test:api


---

## 🧰 Testing Frameworks/Tools Used

- **Jest** – test runner, assertions, and coverage
- **Supertest** – HTTP assertions for API endpoints
- Troubleshooting section for common WSL2/Docker/MySQL issues
- Environment requirements with specific version constraints
- Learning resources linking to official Keploy documentation
- Project structure showing Keploy test directories
- Configuration examples for database connectivity

---

## 🌐 Using the Frontend

- Open [http://localhost:3000/public/index.html](http://localhost:3000/public/index.html) in your browser.
- Use the form to add, edit, or delete products.
- All products are displayed in the table.

---

## 📊 Test Coverage

> **Screenshot:**  
> ![alt text](image-4.png)
>
> _After running `npm test`, open `coverage/lcov-report/index.html` to see the full coverage report. Add a screenshot of the summary table here._

---
<img width="721" alt="keploy-test-report" src="https://github.com/user-attachments/assets/86ecb1c2-6be3-4eec-a0d8-ae8545df871c" />


## 📂 Project Structure

![alt text](generated-image-1.png)

---

## 📄 License

This project is for educational/demo purposes as part of the Keploy API Fellowship.

---

## 🙌 Author

**Piyush Kumar Tiwari**  
[GitHub](https://github.com/stealthinator45) | [LinkedIn](https://www.linkedin.com/in/piyush-kumar-tiwari-a6a800256/)

---

## 💡 Notes

- Use **Node.js v18.x** for best compatibility (Node.js v20+ is not supported by `mysql2`).
- Ensure your MySQL server is running and accessible.
- For test DB, you can manually create and seed it, or let the tests use your existing data.
- For production, use environment variables for sensitive data and add more robust error handling and validation.
- Contributions welcome!
