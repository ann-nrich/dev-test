### Backend Developer test

## Overview
Welcome to the Backend Developer Assessment. This test is designed to evaluate your skills in software development, problem-solving, and software design. 

## Project Description

You have been provided with a simple Node.js project: **Crypto Currency Transaction Processor**, that allows user to create and close cryptocurrency transactions. It uses CryptoCompare API service to get cryptocurrency prices and information.

## API Specifications

### 1. **Create Transaction**

- **Endpoint:** `POST /api/create-transaction`
- **Description:** Creates a new cryptocurrency transaction for the given coin symbol and saves the transaction to the database.

#### Request

- **URL:** `http://localhost:8085/api/create-transaction`
- **Method:** POST
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "coin": "ETH",          // The symbol of the cryptocurrency (e.g., BTC, ETH).
    "amount": "10",         // The amount of cryptocurrency being transacted.
    "date": "2024-10-06T11:08:43.641Z"  // ISO 8601 format date when the transaction occurs.
  }
  ```

#### Response

- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "transactionId": 1      // The ID of the newly created transaction.
  }
  ```

---

### 2. **Close Transaction**

- **Endpoint:** `POST /api/close-transaction`
- **Description:** Closes an open cryptocurrency transaction.

#### Request

- **URL:** `http://localhost:8085/api/close-transaction`
- **Method:** POST
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "transactionId": "1"    // The ID of the transaction to be closed.
  }
  ```

#### Response

- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "success": true         // Confirmation that the transaction has been successfully closed.
  }
  ```

## Database Tables

The application uses two main database tables: `coin` and `userTransaction`. Below is a description of each table and its requirements:

### 1. **`coin` Table**

- **Description** Stores information about different cryptocurrencies fetched from the CryptoCompare API.
- **Required** The coin info must be populated in order to create a transaction as its id should be used in userTransaction table

### 2. **`userTransaction` Table**
- **Description:** Stores user transaction data related to cryptocurrency purchases for a given coinId.

---

### Table Relationships:

- **`userTransaction.coinId`** references **`coin.id`**. Each transaction is associated with a specific coin.

### 3. **Transaction Watcher (Background Task)**

- **Description:** This is a background function (`transactionWatcherIfUsdValueBelowOpenRate`) that periodically checks if the current USD price of the coin in a transaction has dropped below the purchase price and automatically closes the transaction.

## Task Instructions

Your primary objective is to identify and resolve all the issues in the provided codebase. The existing code contains multiple errors, bad practices, and potential bugs. Your task is to analyze the code, pinpoint these issues, and implement solutions to enhance the application's quality and reliability.

### Objectives

1. **Identify and Fix Problems:**
   - **Security:** Ensure the code is secure against common vulnerabilities.
   - **DRY Principle:** Eliminate repetition by adhering to the "Don't Repeat Yourself" principle.
   - **Performance:** Optimize the code for better performance and efficiency.
   - **Readability:** Improve the clarity and understandability of the code.
   - **Maintainability:** Refactor the code to make it easier to maintain and extend.
   - **Database & Code Design:** Address any flaws in the database schema and overall code architecture.
   - **Naming Conventions:** Use consistent and meaningful names that make sense and adhere to industry standards.

2. **Refactor the Code:**
   - Rewrite portions of the code to address the identified issues.
   - Ensure the refactored code adheres to best practices and industry standards.

3. **Enable Transaction Watcher:**
   - The `transactionWatcherIfUsdValueBelowOpenRate` function is currently disabled. Once you have addressed the issues, found in its code, and ensure this function operates correctly.

### Requirements

- **Security:** Assume that user requests are valid and safe. You do not need to implement authentication or authorization. Treat user IDs as provided.
- **Database:** use SQLite. Do not switch to a different database system.
- **Packages:** Utilize only the packages already installed. Do not add new dependencies.
- **ORM:** No need to implement an Object-Relational Mapping (ORM). Continue using raw SQL queries.

### Deliverables

1. **Refactored Code:**
   - Provide the improved and functional code after addressing the issues.
   - If the application is not fully functional post-refactoring, ensure the code is clean and free of the identified problems.

2. **Issue Report:**
   - Compile a list of additional potential problems you discovered in the code that were not addressed or implemented in your refactoring.

## Evaluation Criteria

Your submission will be evaluated based on the following:

- **Problem Identification:** Ability to accurately identify security vulnerabilities, bad practices, and potential bugs.
- **Solution Implementation:** Effectiveness of the improvements made to the code.
- **Code Quality:** Adherence to best practices, readability, and maintainability of the refactored code.
- **Performance Optimization:** Enhancements that lead to more efficient and performant code.
- **Comprehensiveness:** Thoroughness in addressing all specified objectives and requirements.

## Getting Started

1. **Setup the Project:**
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the application:
     ```bash
     npm run dev
     ```
2. **Review the Code:**
   - Analyze the provided codebase to understand its structure and functionality thoroughly.
3. **Start Refactoring:**
   - Identify issues based on the objectives.
   - Implement fixes and improvements, ensuring it enhances the application's functionality, maintainability, and performance.

## Tips for Success

- **Thorough Analysis:** Carefully review each part of the code to uncover hidden pitfalls and bugs.
- **Step-by-Step Approach:** Tackle one issue at a time to maintain focus and ensure comprehensive fixes.
- **Think Production-Ready:** Consider how the application would perform in a real-world production environment.
- **Testing:** Test your changes to verify that they work as intended and do not introduce new issues.
- **Documentation:** Comment your code where necessary to explain complex logic or important decisions.
- **Create a List of Identified Issues:** As you analyze the code, create a list of all identified issues, including those you plan to address and any additional potential problems. You can submit this list alongside the refactored code for review.

Good luck! 🤗🍀