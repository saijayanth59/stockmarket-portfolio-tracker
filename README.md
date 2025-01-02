# Simple Portfolio Tracker Application

The objective is to build a **Simple Portfolio Tracker Application** that enables users to:

1. Add, view, edit, and delete stock holdings.
2. Track the total portfolio value based on real-time stock prices.
3. View a dashboard displaying key portfolio metrics such as:
   - Total value
   - Top-performing stock
   - Portfolio distribution

The solution integrates **real-time stock data**, **RESTful API design**, and features a responsive UI/UX. It also supports secure deployment for accessibility.

---

## Features and Additional Functionalities

### Core Features Implemented:

1. **Portfolio Management:**
   - Add, edit, and delete stock holdings.
   - Track portfolio value dynamically based on real-time stock prices.
2. **Dashboard:**
   - Displays top-performing stocks.
   - Provides portfolio distribution.
   - Highlights key metrics such as gainers and losers.
3. **Real-time Updates:**
   - Integrated real-time stock data using **WebSocket APIs from Finnhub**.
   - Portfolio values update dynamically.
4. **Multi-user Login:**
   - Each user has a personalized portfolio.
   - Secure authentication and session management.

### Additional Features:

1. **Watchlist:**
   - Users can create and manage a watchlist for stocks.
   - Real-time updates for the watchlist with CRUD operations.
2. **Stock Market News:**
   - Integration of the latest stock market news.
   - Helps users stay updated with trends and events.
3. **Graphs and Visualizations:**
   - Responsive graphs using **Recharts** to visualize historical data and portfolio trends.
   - Dashboard includes historical stock performance graphs.
4. **Microservices Architecture:**
   - **Main backend (Backend1):** Node.js with Express and MongoDB using MVC architecture.
   - **Auxiliary backend (Backend2):** FastAPI for fetching historical stock data via the yfinance library.

---

## Technology Stack

### Frontend:

- **Framework:** Next.js
- **Styling:** Tailwind CSS, ShadCN UI
- **Visualizations:** Recharts

### Backend:

- **Backend1 (Main Framework):** Node.js with Express
- **Database:** MongoDB
- **Architecture:** MVC (Model-View-Controller)
- **Backend2 (Microservice):** FastAPI for fetching historical stock data via the yfinance library

### Real-time Data Integration:

- **API:** Finnhub API (WebSocket.io for real-time updates)
- **Historical Data:** yfinance library via FastAPI backend

---

## Setup and Installation

### Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/saijayanth59/stockmarket-portfolio-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd stockmarket-portfolio-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   If any errors occur use --force due to nextjs recent upgrade to react19
   ```bash
   npm install --force
   ```
4. Create a `.env` file in the root directory and add the following keys:
   ```env
   NEXT_PUBLIC_HISTORY_API_URL=https://stock-history-api.onrender.com
   NEXT_PUBLIC_API_URL=https://stock-tracker-api.onrender.com/api
   NEXT_PUBLIC_API_FINHUB_KEY=...
   ```

- **`NEXT_PUBLIC_API_URL`**: The main backend for all app-related actions. Repository link [here](https://github.com/saijayanth59/stock_tracker_api).
- **`NEXT_PUBLIC_HISTORY_API_URL`**: Used to fetch historical stock data. Backend details are available [here](https://github.com/saijayanth59/stock-history-api).
- **`NEXT_PUBLIC_API_FINHUB_KEY`**: API key for accessing Finnhub data.

5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open the application in your browser at `http://localhost:3000`.

### Sample Credentials

- **Username:** `sai`
- **Password:** `gogreen`

### Steps to Try the Application:

1. Visit the **[Deployed Application Link](https://stockmarket-portfolio-tracker-7zmr.vercel.app/)**.
2. Use the sample credentials provided above to log in.
3. Explore the features:

---

## Deployment

### Links:

- **Frontend Deployment:** [Vercel](https://stockmarket-portfolio-tracker-7zmr.vercel.app/)
- **Backend1 (Main API):** [Render](https://stock-tracker-api.onrender.com/)
- **Backend2 (Historical Data API):** [Render](https://stock-history-api.onrender.com/)

---

## Images

For UI samples and screenshots, visit the **[Sample Images Documentation](/docs/images/)**.

---

## Video Demonstration

Watch the full application demo [here](https://drive.google.com/drive/folders/1mLCCn-DbRJrNobEZNj5NZL2Hs4ZDbkMU).
