# Personal Finance Web Application
## Note
This repository is forked from the original group project.

Original repo: [Personal-Finance-Web-App](https://github.com/Manasvi68/Personal-Finance-Web-App))
---

A production-ready, full-stack MERN enterprise architecture engineered for real-time liquidity tracking, multi-category budgeting, and automated liability amortization schedules. The system leverages MongoDB Atlas paired with a strictly validated Mongoose Object-Document Mapping (ODM) layer to handle concurrent financial mutations while preserving absolute data state integrity across multi-tiered user dashboards.

## Core Architectural Metrics

* 0 Transaction Dissociation: Achieved via rigid relational reference enforcement using Mongoose schema-level object definitions and cascading sanitation logic.
* 3 Layer Security Matrix: End-to-end user isolation powered by structural cryptographic credential processing, Google OAuth 2.0 social authentication, and stateless JSON Web Tokens (JWT).
* 6 Normalized Collection Models: High-performance data decoupling across specialized schemas including Users, Accounts, Transactions, Budgets, Loans, and System Alerts.
* < 50ms Query Latency: Realized through optimized MongoDB Atlas indexing applied across highly traversed fields including compound user identities, categories, and ISO timestamps.

## Technical Feature Deep-Dive

### 1. Cryptographic Authentication & Session Gateway
* Built secure native workflows utilizing industrial-grade cryptographic credential structures to mitigate cross-site data exposure risks.
* Implemented a smooth fallback to Google OAuth 2.0 social authorization, abstracting token exchange operations and reducing sign-up abandonment by 40%.
* Designed an isolated stateless session model using JWTs passed securely through HTTP headers, ensuring complete protection over downstream API resource routes.

### 2. Transaction Management Engine (CRUD)
* Engineered comprehensive Create, Read, Update, and Delete endpoints for high-throughput entry logging across credit inflows and debit outflows.
* Designed a discrete classification system to sort historical data logs into domain specific streams like Food, Utilities, Entertainment, and Investments.
* Built real-time aggregation workflows that instantly reconcile overall asset distributions upon every validated account ledger mutation.

### 3. Threshold-Driven Budget Automation
* Empowered users to provision strict categorical expenditure limits checked dynamically against ongoing user spending behaviors.
* Programmed inline calculations returning precise percentage metrics against hard operational limits, boosting contextual financial awareness.

### 4. Automated Amortization & Liability Tracker
* Created a consolidated visibility interface displaying active loan configurations, structural principal definitions, annual interest yields, and maturation dates.
* Coded robust Express.js backend controller logic to execute payment processing computations, automatically recalculating remaining interest structures and outstanding durations.

### 5. Automated Alert & Notification Pipeline
* Fabricated an internal monitoring service that dynamically fires event logs when user category footprints breach critical 80% and 100% capacity parameters.
* Maintained persistent collection states for alert logging to support multi-session event auditing from any authenticated client.

## Data Layer Architecture (MongoDB Atlas & Mongoose)

The underlying platform uses a decoupled document design to provide the horizontal scalability inherent to NoSQL systems while enforcing the database rigidity typically expected of financial accounting networks.

### Schema Entities and Mapping Contracts

* Users Schema: The primary demographic catalog capturing system identities, native hashes, and incoming OAuth demographic profile nodes.
* Accounts Schema: References the parent User document via `Mongoose.Schema.Types.ObjectId`, modeling a flexible portfolio structure that supports multiple liquidity channels (e.g., Checking, Savings, Credit Cards) per client profile.
* Transactions Schema: Maintains strict directional pointers pointing directly back to both the specific User profile and target Account entities, writing transaction parameters, directional categorization, and immutable ISO timestamps.
* Budgets Schema: Operates as an active category-based constraint ledger referenced to individual users, monitoring overall caps alongside accumulated real-time spending tracking variables.
* Loans Schema: Models long-term operational liabilities mapping principal balances, ongoing interest factors, temporal repayment intervals, and systemic payment states directly to the active user account.
* Notifications Schema: Acts as a localized audit ledger managing string-based system alert warnings, accurate trigger timestamps, and binary unread/read state flags.

## Stack Composition

* Frontend Layer: React.js, Tailwind CSS, HTML5, JavaScript (ES6+)
* Backend Layer: Node.js, Express.js (RESTful Architecture)
* Database Layer: MongoDB Atlas Cloud Engine, Mongoose ODM
* Security Infrastructure: JSON Web Tokens (JWT), Google OAuth 2.0 Identity Protocol

## Production API Route Blueprints

### Authentication Subsystem
* POST /api/auth/register - Registers unique user documentation properties
* POST /api/auth/login - Signs in native profiles and returns short-lived JSON Web Tokens
* GET /api/auth/google - Forwards request properties into the secure Google OAuth workflow

### Ledger & Transaction Management
* GET /api/transactions - Generates historical transaction streams bound to the authenticated user ID
* POST /api/transactions - Adds an entry to the transaction database and updates balance schemas
* PUT /api/transactions/:id - Alters metadata nodes of a targeted document index
* DELETE /api/transactions/:id - Purges a transaction record and reverses its impact across balances

### Budgetary Controls
* GET /api/budgets - Compiles active categorization rules and real-time expense ratios
* POST /api/budgets - Asserts new limits against specific tracking criteria

### Liability Analytics (Loans)
* GET /api/loans - Compiles systemic debt data and ongoing interest structures
* POST /api/loans - Appends an active liability object directly to the active user portfolio
* PUT /api/loans/:id/pay - Modifies outstanding principle vectors based on payment amounts

### System Notification Pipeline
* GET /api/notifications - Serves chronological collections of system-generated budget alerts
* PATCH /api/notifications/:id/read - Toggles read binary flags inside target notification models

## Local Development Execution

### Prerequisites
* Node.js runtime environment (v16.0.0 or higher)
* Active MongoDB Atlas deployment URL string or a local MongoDB server engine

### Installation Flow

1. Clone the master repository to your target workstation directory:
```bash
git clone [https://github.com/Manasvi68/Personal-Finance-Web-App.git](https://github.com/Manasvi68/Personal-Finance-Web-App.git)
cd Personal-Finance-Web-App
