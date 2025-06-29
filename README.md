# SalesTrack Pro 📈

A **cloud-based sales analytics dashboard** built using modern full-stack technologies. SalesTrack Pro allows businesses to upload sales data securely, analyze key performance indicators, and visualize trends through dynamic charts. Built with Node.js, PostgreSQL, and hosted entirely on AWS infrastructure, this project demonstrates real-world backend, cloud, and dashboard development skills.

---

## ✨ Live Demo

🏠 **Frontend Dashboard:** [http://43.204.29.113](http://43.204.29.113)

---

## 🧰 Tech Stack

**Backend:**
- Node.js + Express.js
- PostgreSQL (AWS RDS)
- Multer + AWS SDK (S3 file uploads)
- JWT-based Authentication

**Frontend:**
- HTML/CSS + JavaScript
- Chart.js (Bar, Line, Doughnut charts)

**Cloud & Deployment:**
- EC2 (Ubuntu Server)
- PM2 + NGINX
- AWS RDS for database
- AWS S3 for file storage

---

## 📊 Features

- 🔐 **JWT Auth**: Secure login and protected API access
- 📂 **CSV Upload**: Upload sales CSV to S3 and auto-import into PostgreSQL
- 📈 **Top KPIs**: View total sales by reps, region-wise breakdown, monthly revenue
- 📏 **Data Visualization**: Clean, minimal Chart.js dashboard
- ☁️ **Cloud-Hosted**: Fully deployed on AWS EC2 with persistent database + secure file storage

---

## 🔢 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload CSV file |
| `GET`  | `/api/kpi/top-reps` | Get top sales reps |
| `GET`  | `/api/kpi/monthly` | Monthly revenue data |
| `GET`  | `/api/kpi/regions` | Region-wise breakdown |

> Use JWT token in headers: `Authorization: Bearer <token>`

---

## 🚀 Setup & Deployment

### 1. Clone Repo
```bash
git clone https://github.com/Ankita-624/salestrack-pro.git
cd salestrack-pro
```
### 2. Install Dependencies
```
npm install
```
### 3. Configure Environment
```
Create .env file:
PORT=5000
DB_HOST=your_rds_endpoint
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=your_secret
```
### 4. Run Locally
```
node server.js
```
### 5. Deploy to EC2 (production)
```
pm2 start server.js
```

👤 Author
```
Ankita
Backend Developer · AWS Cloud Trainee · Open Source Contributor
```


🚀 Recruiter Note
```
This project was designed end-to-end by me to showcase my backend engineering and AWS cloud infrastructure capabilities. It includes secure JWT authentication, CSV upload and processing, PostgreSQL database integration, S3 file storage, and a clean dashboard UI. Everything is cloud-hosted on EC2 and demonstrates production-level engineering. Happy to walk you through the system or contribute to your team!
```
