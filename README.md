# Mini E-commerce Application - Setup Guide & Technical Overview

## Architecture Overview

This is a full-stack e-commerce application with role-based access control (Admin/User) featuring product management, cart functionality, and order processing.

### System Flow
```
Frontend (React/Vite) ↔ REST API ↔ Spring Boot Backend ↔ H2 Database
```

## Tech Stack

### Backend
- **Framework**: Spring Boot (Java 21+)
- **Database**: H2-Database
- **Security**: JWT Authentication with BCrypt password hashing
- **Architecture**: RESTful API with layered architecture
- **Build Tool**: Maven

### Frontend
- **Framework**: React with Vite
- **Styling**: tailwind
- **State Management**: localStorage for cart
- **HTTP Client**: Fetch API
- **Bundler**: Vite

## Prerequisites

Before running the application, ensure you have installed:

1. **Java Development Kit (JDK) 21 or higher**
   ```bash
   java -version
   ```

2. **Node.js 18+ and npm**
   ```bash
   node --version
   npm --version
   ```
3. **Git** (for cloning the repository)
   ```bash
   git --version
   ```

## Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Medom5/mini-ecommerce.git
cd mini-ecommerce
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend/ecommerce
```
#### Install Dependencies and Run Backend
```bash
# Using Maven Wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# Or using system Maven
mvn clean install
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup

#### Navigate to Frontend Directory (in new terminal)
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Start Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Test Users & Application Flow

### Pre-configured Test Accounts

#### Admin User
- **Username**: `admin@example.com`
- **Password**: `123`
- **Role**: ADMIN

#### Regular User
- **Username**: `user@example.com`
- **Password**: `123`
- **Role**: USER

### Testing Flow

#### As Admin User:
1. **Login**: Navigate to `/login` and use admin credentials
2. **Add Products**: Go to `/admin/products` to add new products
3. **View Orders**: Check `/admin/orders` to see all customer orders
4. **Monitor Stock**: Visit `/admin/low-stock` to see products with stock < 5

#### As Regular User:
1. **Register/Login**: Create account or login with user credentials
2. **Browse Catalog**: View products on home page (`/`)
3. **Add to Cart**: Click "Add to Cart" on desired products
4. **Manage Cart**: Visit `/cart` to review and modify quantities
5. **Place Order**: Submit order to complete purchase

### Application Routes
- `/` - Product catalog (home page)
- `/login` - User authentication
- `/register` - New user registration
- `/cart` - Shopping cart management
- `/admin/products` - Product management (Admin only)
- `/admin/orders` - Order management (Admin only)
- `/admin/low-stock` - Low stock monitoring (Admin only)

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Product Endpoints
- `GET /products` - Get all products (public)
- `POST /products` - Add new product (Admin only)

### Order Endpoints
- `POST /orders` - Place order (Authenticated users)
- `GET /admin/orders` - View all orders (Admin only)

### Admin Endpoints
- `GET /admin/low-stock` - View low stock items (stock < 5)

## Application Flow

### User Journey
1. **Registration/Login**: Users register or login through auth forms
2. **Browse Catalog**: View products with stock information and "Out of Stock" badges
3. **Cart Management**: Add products to cart (stored in localStorage)
4. **Place Order**: Submit order which decrements stock atomically
5. **Order Confirmation**: Receive order confirmation

### Admin Journey
1. **Login**: Admin authentication
2. **Product Management**: Add new products with name, price, and stock
3. **Order Management**: View all customer orders with totals
4. **Inventory Management**: Monitor low stock items (stock < 5)

### Data Flow
```
User Action → Frontend → API Request → Backend Controller → Service Layer → Repository → Database
                ↓
            Response ← JSON Response ← Business Logic ← Data Access ← H2-Database
```

## Project Structure

### Backend Structure
```
backend/ecommerce/src/main/java/com/miniecommerce/ecommerce/
├── controller/          # REST API endpoints
│   ├── AuthController.java
│   ├── OrderController.java
│   └── ProductController.java
├── dto/                # Data Transfer Objects
├── exceptions/         # Custom exceptions and global handler
├── model/             # JPA entities
│   ├── User.java
│   ├── Product.java
│   ├── Order.java
│   └── OrderItem.java
├── repository/        # Data access layer
├── security/         # JWT and security configuration
├── service/          # Business logic layer
└── MiniEcommerceApplication.java
```

### Frontend Structure
```
frontend/src/
├── Pages/
│   ├── LoginPage.jsx          # User authentication
│   ├── RegisterPage.jsx       # User registration
│   ├── ProductCatalog.jsx     # Product browsing
│   ├── CartPage.jsx           # Cart management
│   ├── AdminAddProduct.jsx    # Product management
│   ├── AdminOrders.jsx        # Order management
│   └── LowStockPage.jsx       # Inventory management
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
```

## Authentication & Security

- **JWT Tokens**: Stateless authentication with configurable expiration
- **Password Hashing**: BCrypt for secure password storage
- **Role-based Access**: Admin vs User permissions

## Data Storage

- **Backend**: H2 with JPA/Hibernate ORM
- **Frontend**: localStorage for cart persistence
- **Session Management**: JWT tokens for authentication state

## Testing the Application

### Test User Registration
```bash
curl -X POST http://localhost:8080/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "usertest@example.com",
  "password": "password123",
  "role": "USER"
}'
```
### Test Admin Registration
```bash
curl -X POST http://localhost:8080/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "admintest@example.com",
  "password": "password123",
  "role": "ADMIN"
}'
```

### Test User Login
```bash
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"usertest@example.com","password":"password123"}'
```

### Test Product Creation (Admin)
```bash
curl -X POST http://localhost:8080/admin/products \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"name":"Test Product","price":29.99,"stock":10}'
```

## Features Implemented

### Core Requirements
- User registration and authentication
- Product catalog with stock management
- Shopping cart functionality
- Order placement with stock decrementing
- Admin product management
- Admin order viewing
- Low stock monitoring
- Out of stock badges

### Technical Features
- JWT Authentication
- Role-based access control
- RESTful API design
- Responsive frontend
- Local cart persistence
- Error handling
- Input validation
---

**Developed as part of Mini-Ecommerce Full-Stack Challenge**

*This application demonstrates modern full-stack development practices with Spring Boot and React.*
