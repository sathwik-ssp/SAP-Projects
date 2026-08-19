# O2C Credit Release Cockpit

A practice web application built to simulate a focused SAP Order-to-Cash (O2C) business scenario.

The application helps a Credit Manager review blocked Sales Orders, evaluate customer credit information, and make a Release/Hold decision.

---

## 1. Project Overview

### SAP Process

**O2C – Order to Cash**

### Practice Project

**O2C Practice 1 – Credit Release Cockpit**

### Business Role

**Credit Manager**

### Main Decision

> Should a blocked Sales Order be Released or Held?

---

## 2. Business Problem

In the Order-to-Cash process, Sales Orders may be blocked when a customer's credit situation does not satisfy the required business rules.

Credit Managers need to review information such as:

- Customer credit limit
- Current credit exposure
- Sales Order value
- Overdue receivables
- Customer payment history

Manual review of these details can delay order processing and fulfilment.

### Problem Statement

> Credit Managers need a simple decision-support application that provides a consolidated view of blocked Sales Orders and relevant customer credit information so they can quickly decide whether an order should be released or held.

---

## 3. Objective

The objective of this project is to build a small O2C decision-support application that:

- Displays Sales Orders requiring review
- Shows relevant customer and order information
- Calculates Sales Order value
- Performs a basic credit check
- Recommends Release or Hold
- Prevents invalid order releases
- Displays important O2C KPIs

---

## 4. O2C Process

The overall Order-to-Cash process can be represented as:

Customer
↓
Quotation
↓
Sales Order
↓
Credit Check
↓
Delivery
↓
Goods Issue
↓
Billing
↓
Payment
↓
Accounts Receivable Clearing

### Scope of This Practice

This practice focuses on:

Sales Order
↓
Credit Check
↓
Release / Hold

The remaining O2C stages can be added in future practice projects.

---

## 5. SAP Business Objects

The application uses simplified representations of the following business objects:

### Customer

Contains customer-related credit information.

Example:

- Customer ID
- Customer Name
- Credit Limit
- Current Exposure
- Overdue Amount
- Payment History

### Material

Represents the product being sold.

Example:

- Material ID
- Material Name
- Price

### Sales Order

Represents the customer's order.

Example:

- Sales Order ID
- Customer
- Material
- Quantity
- Order Value
- Status

---

## 6. Main Business Decision

The main decision in this application is:

> **Release or Hold the Sales Order?**

The application evaluates the Sales Order using customer credit information.

### Decision Flow

Sales Order
↓
Calculate Order Value
↓
Calculate Total Credit Exposure
↓
Check Credit Limit
↓
Check Overdue Amount
↓
Release / Hold Recommendation

---

## 7. Credit Check Logic

The application currently uses basic business rules.

### Rule 1 – Credit Limit

If:

Current Exposure + Order Value > Credit Limit

Then:

**HOLD**

Otherwise:

Continue with the next validation.

### Rule 2 – Overdue Receivables

If:

Overdue Amount > ₹5,00,000

Then:

**HOLD**

Otherwise:

The order can be considered for release.

### Example

Customer:

XYZ College

Credit Limit:

₹1,00,00,000

Current Exposure:

₹50,00,000

New Sales Order:

₹2,00,00,000

Total Exposure:

₹2,50,00,000

Since:

₹2,50,00,000 > ₹1,00,00,000

The application recommends:

**HOLD ORDER**

---

## 8. MVP Features

The current MVP contains:

### Dashboard

Displays:

- Total Orders
- Blocked Orders
- Released Orders
- High Risk Orders

### Sales Order Queue

Displays:

- Sales Order ID
- Customer
- Material
- Quantity
- Order Value
- Status

### Sales Order Details

Displays:

- Customer information
- Material
- Quantity
- Order value
- Credit limit
- Current exposure
- Overdue amount
- Payment history
- Order status

### Credit Decision

Displays:

- Release recommendation
- Hold recommendation
- Reason for the recommendation

### Actions

The Credit Manager can:

- Release an order
- Hold an order

---

## 9. Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Data

- Seeded / in-memory JavaScript data

### Version Control

- Git
- GitHub

### Deployment

- To be deployed using a simple web hosting platform

---

## 10. Project Structure

```text
1st-Practice/
│
├── index.html
├── style.css
├── script.js
└── README.md