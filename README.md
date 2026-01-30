# WebSwap ⚡

**Give a link. Get a link.**

WebSwap is a fun web application that lets you discover amazing websites from around the internet. Submit a cool website you love, and get a random website back in return! It's like a roulette wheel for the web.

## 🌟 Features

- **Discover Random Websites**: Spin the wheel to get a random website from the community collection
- **Contribute Links**: Share your favorite websites with the community
- **Admin Dashboard**: Manage submitted links with basic authentication
- **Duplicate Prevention**: Automatically prevents duplicate domains from being added
- **URL Validation**: Checks if URLs are valid and reachable before adding them
- **Rate Limiting**: Prevents spam and abuse with intelligent rate limiting
- **SQLite Database**: Lightweight, file-based database for easy deployment
- **RESTful API**: Clean API endpoints for integration

## 🛠️ Tech Stack

- **Backend**: Node.js, Express 5.x
- **Database**: SQLite3
- **Validation**: Zod
- **Security**: express-basic-auth, express-rate-limit
- **Frontend**: Vanilla HTML, CSS, JavaScript

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/md-saqib001/Web-Swap.git
   cd Web-Swap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your configuration:
   ```env
   # Database directory (default: 'database')
   DB_DIR=database
   
   # Optional: Full path to database file (overrides DB_DIR)
   # DB_PATH=/path/to/your/database.db
   
   # Admin password for /admin dashboard
   ADMIN_PASSWORD=your_secure_password_here
   
   # Optional: Server port (default: 3000)
   # PORT=3000
   ```

4. **Initialize the database**
   ```bash
   npm run db:reset
   ```
   
   This command will:
   - Create the database tables
   - Seed initial data (curated list of cool websites)
   - Display the current database contents

## 🎮 Usage

### Development Mode
Run with auto-restart on file changes:
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start at `http://localhost:3000` (or your configured PORT).

## 🌐 API Documentation

### Public Endpoints

#### Get Random Link
```http
GET /api/random
```

**Response** (200 OK):
```json
{
  "id": 1,
  "url": "https://example.com"
}
```

**Rate Limit**: 100 requests per 15 minutes

---

#### Add New Link
```http
POST /api/links
Content-Type: application/json

{
  "url": "https://cool-site.com"
}
```

**Response** (200 OK):

For new links:
```json
{
  "message": "Link added successfully!",
  "id": 42,
  "url": "https://cool-site.com",
  "isDuplicate": false
}
```

For duplicate domains:
```json
{
  "message": "Link accepted! (Duplicate domain)",
  "id": 1,
  "url": "https://cool-site.com",
  "isDuplicate": true
}
```

**Rate Limit**: 5 requests per 5 minutes

**Validations**:
- URL must be valid and start with `http://` or `https://`
- URL must be reachable (HEAD request check)
- Duplicate domains are rejected (but return success for UX)

---

### Admin Endpoints

All admin endpoints require Basic Authentication:
- **Username**: `admin`
- **Password**: Set in `.env` as `ADMIN_PASSWORD`

#### Admin Dashboard
```http
GET /admin
Authorization: Basic <credentials>
```

Displays HTML interface for managing links.

#### Get All Links (Admin)
```http
GET /api/admin/links
Authorization: Basic <credentials>
```

#### Delete Link (Admin)
```http
DELETE /api/admin/links/:id
Authorization: Basic <credentials>
```

## 📁 Project Structure

```
Web-Swap/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection configuration
│   ├── controllers/
│   │   ├── linkControllers.js # Logic for link operations
│   │   └── adminControllers.js # Admin operations
│   ├── routes/
│   │   ├── linkRoutes.js      # Public API routes
│   │   └── adminRoutes.js     # Admin routes
│   ├── middleware/
│   │   ├── auth.js            # Authentication middleware
│   │   └── rateLimit.js       # Rate limiting configuration
│   ├── scripts/
│   │   ├── createTable.js     # Database table creation
│   │   ├── seed.js            # Seed initial data
│   │   └── logTable.js        # Display database contents
│   ├── views/
│   │   └── admin.html         # Admin dashboard view
│   └── server.js              # Express server entry point
├── public/
│   ├── index.html             # Main application page
│   ├── script.js              # Client-side JavaScript
│   ├── style.css              # Main styles
│   ├── admin.js               # Admin dashboard JS
│   └── admin.css              # Admin styles
├── data/
│   └── data.js                # Seed data (curated websites)
├── .env.example               # Environment variable template
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## 🗄️ Database Scripts

### Reset Database
Creates tables, seeds data, and displays contents:
```bash
npm run db:reset
```

This runs three scripts in sequence:
1. `createTable.js` - Creates the `links` table
2. `seed.js` - Populates initial data from `data/data.js`
3. `logTable.js` - Shows all database records

### Database Schema

**links** table:
| Column | Type    | Constraints |
|--------|---------|-------------|
| id     | INTEGER | PRIMARY KEY, AUTOINCREMENT |
| url    | TEXT    | NOT NULL |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Test your changes thoroughly
- Update documentation if needed
- Keep commits focused and descriptive

## 🔒 Security Considerations

- **Admin Password**: Always use a strong password in production
- **Rate Limiting**: Configured to prevent abuse
- **URL Validation**: All submitted URLs are validated and tested for availability
- **Basic Auth**: Admin endpoints are protected with HTTP Basic Authentication

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Saqib**

## 🙏 Acknowledgments

- All the amazing websites in the seed data
- The open-source community for the excellent tools and libraries

## 🐛 Bug Reports

Found a bug? Please open an issue at: https://github.com/md-saqib001/Web-Swap/issues

## 📚 Learn More

This project is perfect for learning:
- **Backend Development**: Express.js, routing, middleware
- **Database Operations**: SQLite, CRUD operations
- **API Design**: RESTful endpoints, validation
- **Security**: Authentication, rate limiting
- **Frontend Integration**: Fetch API, DOM manipulation

---

**Happy Web Swapping! 🎲✨**
