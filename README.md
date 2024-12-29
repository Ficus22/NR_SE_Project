# NR_SE
Node &amp; React and Software Engineering project

Maiaroca = Maïa

Ficus22 = Esteban (he doesn't have node)

PiAirCarre = Pierre REYNAUD

Rayanekerr = Rayane KERROUCHE 


# Project Initialization Guide

## Step 1: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
2. Initialize a new Node.js project
    ```bash
    npm init -y
3. Install the required dependencies
    ```bash
    npm install express sequelize mysql2 dotenv bcrypt jsonwebtoken morgan swagger-ui-express csv-writer pdfkit
4. Install development dependencies (optional)
    ```bash
    npm install --save-dev nodemon
5. Create a .env file in the backend directory and configure your environment variables : 
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=3000
6. Start the development server
    ```bash
    npm run dev

## Step 2 : Frontend Setup
1. Navigate to the frontend directory
    ```bash
    cd frontend

2. Initialize a new React app
    ```bash
    npx create-react-app .

3. Install the required dependencies
    ```bash
    npm install axios react-router-dom react-toastify @heroicons/react chart.js react-chartjs-2 ag-grid-react ag-grid-community highcharts highcharts-react-official
4. Start the frontend development server
    ```bash
    npm start

# Running the Project
Ensure both backend and frontend servers are running:

Backend: http://localhost:3000
Frontend: http://localhost:3001
Test the API endpoints using Postman or Swagger UI.
Here’s a fair and concise write-up for the README file based on your team's contributions:

---

## Branching Strategy
For this project, we initially started our development on the develop branch. As we progressed, we decided to switch and consolidate all our work onto the main branch, which now serves as the primary branch for the project.

However, we have chosen to keep the develop branch intact as a reference. This branch contains the earlier stages of development and can be used to review the progress and decisions made during the initial phase of the project. It serves as a support branch in case there's a need to trace back or evaluate past implementations.

### Project Responsibilities

#### **Rayane (Backend Development Lead & Project Coordinator)**
- **Database Design and Integration**:
  - Defined the MySQL schema for articles and users.
  - Implemented Sequelize models (`Article.js` and `User.js`) to match the schema.
  - Ensured database synchronization and connectivity with Sequelize.
- **API Development**:
  - Developed and tested all article-related endpoints:
    - `GET /api/articles`: Retrieve all articles.
    - `POST /api/articles`: Add a new article.
    - `PUT /api/articles/:id`: Update an article.
    - `DELETE /api/articles/:id`: Delete an article.
    - `GET /api/articles/alerts`: Retrieve articles below the stock threshold.
  - Built authentication and authorization middleware (`authMiddleware.js`).
  - Created user authentication routes (`/api/users/login` and `/api/users/register`).
- **Testing & Documentation**:
  - Wrote Postman test cases for all API routes.
  - Created Swagger documentation for backend endpoints.

#### **Pierre (Frontend Development Lead)**
- **Frontend Implementation**:
  - Developed core React components:
    - **Dashboard**: Displayed stock statistics and charts using Chart.js.
    - **Article Management**: Built forms for adding, updating, and deleting articles.
  - Styled the UI using Tailwind CSS for a clean, responsive design.
- **Backend Integration**:
  - Integrated all CRUD operations with the backend API.
  - Implemented error handling for failed API calls.
- **Data Visualization**:
  - Added bar charts for stock visualization.
  - Highlighted articles below the stock threshold with visual indicators.

#### **Maia (Full-Stack Support & Testing Lead)**
- **Backend Support**:
  - Assisted with user authentication routes (`/login`, `/register`).
  - Ensured middleware functionality for protected routes.
- **Frontend Enhancements**:
  - Improved UX by adding navigation and dropdowns for easier management.
  - Debugged UI issues and ensured cross-device responsiveness.
- **Documentation & Deployment**:
  - Prepared Postman collections for testing.
  - Helped document API routes and wrote a setup guide for running the project locally.

---

### Acknowledgment
Rayane played a key role in leading the backend development and overall project coordination. Pierre contributed significantly to the frontend, while Maia supported both ends and ensured the system’s robustness through testing and debugging. 

## Web page overview :
First we have the login page.

![img_1.png](img_1.png)

If it is your first time, you can create your account by clicking on Sign up here.

![img_2.png](img_2.png)

When you have created your account you can now go back on the login page.

![img_3.png](img_3.png)

After logging in, you can see the Dashboard.

![img_4.png](img_4.png)

Here you can already see how many articles need to be refilled.
If you go down you have also a histogram to illustrate.

![img_5.png](img_5.png)

And at the bottom of the page there is the article list.
![img_6.png](img_6.png)

There are different observations about the articles, including the quantity and the threshold.
If the quantity fall under the threshold, the line become red and the article switch to alert.
You can sort the line by name, category or quantity.

![img_7.png](img_7.png)

Finally, you can create new articles.

![img_8.png](img_8.png)

You can update it.

![img_9.png](img_9.png)

ANd you can delete it (for the example I kept only 4 articles and delete the rest).

![img_10.png](img_10.png)







### Key word of the project : 
Inventory Management System (IMS)
Small Business
Node.js
React
CRUD (Create, Read, Update, Delete)
Real-Time Tracking
Low Stock Alerts
Reporting
User-Friendly Interface
Data Privacy
Security
Scalability
Usability
Cloud Platform
Stock Level Monitoring
Inventory CRUD
Notification Systems
Data Export
Graphical and Tabular Reports
System Uptime
Internet Access
Compatibility
