// ============================================================
// O2C PRACTICE 1
// Credit Release Cockpit
// ============================================================

// ============================================================
// 1. SAMPLE CUSTOMER DATA
// ============================================================

const customers = [
    {
        id: "C001",
        name: "XYZ College",
        creditLimit: 10000000,
        currentExposure: 5000000,
        overdueAmount: 0,
        paymentHistory: "Excellent"
    },
    {
        id: "C002",
        name: "ABC Technologies",
        creditLimit: 5000000,
        currentExposure: 2000000,
        overdueAmount: 50000,
        paymentHistory: "Good"
    },
    {
        id: "C003",
        name: "PQR Industries",
        creditLimit: 8000000,
        currentExposure: 3000000,
        overdueAmount: 800000,
        paymentHistory: "Poor"
    },
    {
        id: "C004",
        name: "LMN Solutions",
        creditLimit: 10000000,
        currentExposure: 2000000,
        overdueAmount: 0,
        paymentHistory: "Excellent"
    }
];


// ============================================================
// 2. SAMPLE MATERIAL DATA
// ============================================================

const materials = [
    {
        id: "MAT001",
        name: "Business Laptop",
        price: 40000
    },
    {
        id: "MAT002",
        name: "Office Monitor",
        price: 15000
    },
    {
        id: "MAT003",
        name: "Wireless Keyboard",
        price: 2500
    }
];


// ============================================================
// 3. SAMPLE SALES ORDER DATA
// ============================================================

const salesOrders = [
    {
        id: "SO1001",
        customerId: "C001",
        materialId: "MAT001",
        quantity: 500,
        status: "BLOCKED"
    },
    {
        id: "SO1002",
        customerId: "C002",
        materialId: "MAT002",
        quantity: 100,
        status: "BLOCKED"
    },
    {
        id: "SO1003",
        customerId: "C003",
        materialId: "MAT001",
        quantity: 100,
        status: "BLOCKED"
    },
    {
        id: "SO1004",
        customerId: "C004",
        materialId: "MAT003",
        quantity: 200,
        status: "RELEASED"
    }
];


// ============================================================
// 4. CURRENTLY SELECTED SALES ORDER
// ============================================================

let selectedOrderId = null;


// ============================================================
// 5. HELPER FUNCTIONS
// ============================================================

// Find a customer using Customer ID
function getCustomer(customerId) {
    return customers.find(customer => customer.id === customerId);
}


// Find a material using Material ID
function getMaterial(materialId) {
    return materials.find(material => material.id === materialId);
}


// Calculate the total value of a sales order
function calculateOrderValue(order) {

    const material = getMaterial(order.materialId);

    if (!material) {
        return 0;
    }

    return material.price * order.quantity;
}


// Format numbers as Indian Rupees
function formatCurrency(amount) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}


// ============================================================
// 6. CREDIT CHECK LOGIC
// ============================================================

function performCreditCheck(order) {

    const customer = getCustomer(order.customerId);

    if (!customer) {

        return {
            canRelease: false,
            reason: "Customer not found."
        };
    }

    const orderValue = calculateOrderValue(order);

    const totalExposure =
        customer.currentExposure + orderValue;


    // Rule 1:
    // Customer exposure must not exceed credit limit.

    if (totalExposure > customer.creditLimit) {

        return {
            canRelease: false,
            reason: "Customer credit limit would be exceeded.",
            orderValue: orderValue,
            totalExposure: totalExposure,
            creditLimit: customer.creditLimit
        };
    }


    // Rule 2:
    // Customer should not have significant overdue amount.

    if (customer.overdueAmount > 500000) {

        return {
            canRelease: false,
            reason: "Customer has significant overdue receivables.",
            orderValue: orderValue,
            totalExposure: totalExposure,
            creditLimit: customer.creditLimit
        };
    }


    // If all checks pass

    return {
        canRelease: true,
        reason: "Credit check passed.",
        orderValue: orderValue,
        totalExposure: totalExposure,
        creditLimit: customer.creditLimit
    };
}


// ============================================================
// 7. DASHBOARD KPI CALCULATIONS
// ============================================================

function calculateKPIs() {

    const totalOrders = salesOrders.length;

    const blockedOrders = salesOrders.filter(
        order => order.status === "BLOCKED"
    ).length;

    const releasedOrders = salesOrders.filter(
        order => order.status === "RELEASED"
    ).length;

    const highRiskOrders = salesOrders.filter(order => {

        const result = performCreditCheck(order);

        return !result.canRelease;

    }).length;


    return {
        totalOrders,
        blockedOrders,
        releasedOrders,
        highRiskOrders
    };
}


// ============================================================
// 8. DISPLAY DASHBOARD KPIs
// ============================================================

function renderKPIs() {

    const kpis = calculateKPIs();


    // These IDs must exist in index.html

    const totalOrdersElement =
        document.getElementById("totalOrders");

    const blockedOrdersElement =
        document.getElementById("blockedOrders");

    const releasedOrdersElement =
        document.getElementById("releasedOrders");

    const highRiskOrdersElement =
        document.getElementById("highRiskOrders");


    if (totalOrdersElement) {
        totalOrdersElement.textContent =
            kpis.totalOrders;
    }

    if (blockedOrdersElement) {
        blockedOrdersElement.textContent =
            kpis.blockedOrders;
    }

    if (releasedOrdersElement) {
        releasedOrdersElement.textContent =
            kpis.releasedOrders;
    }

    if (highRiskOrdersElement) {
        highRiskOrdersElement.textContent =
            kpis.highRiskOrders;
    }
}


// ============================================================
// 9. DISPLAY SALES ORDERS
// ============================================================

function renderSalesOrders() {

    const orderTableBody =
        document.getElementById("orderTableBody");


    if (!orderTableBody) {
        return;
    }


    orderTableBody.innerHTML = "";


    salesOrders.forEach(order => {

        const customer =
            getCustomer(order.customerId);

        const material =
            getMaterial(order.materialId);

        const orderValue =
            calculateOrderValue(order);


        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${order.id}</td>

            <td>
                ${customer ? customer.name : "Unknown Customer"}
            </td>

            <td>
                ${material ? material.name : "Unknown Material"}
            </td>

            <td>
                ${order.quantity}
            </td>

            <td>
                ${formatCurrency(orderValue)}
            </td>

            <td>
                <span class="status ${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </td>

            <td>
                <button
                    onclick="selectOrder('${order.id}')"
                >
                    View
                </button>
            </td>
        `;


        orderTableBody.appendChild(row);

    });
}


// ============================================================
// 10. SELECT A SALES ORDER
// ============================================================

function selectOrder(orderId) {

    selectedOrderId = orderId;


    const order =
        salesOrders.find(
            order => order.id === orderId
        );


    if (!order) {
        return;
    }


    renderOrderDetails(order);
}


// ============================================================
// 11. DISPLAY SELECTED ORDER DETAILS
// ============================================================

function renderOrderDetails(order) {

    const customer =
        getCustomer(order.customerId);

    const material =
        getMaterial(order.materialId);

    const orderValue =
        calculateOrderValue(order);


    const creditCheck =
        performCreditCheck(order);


    // These elements must exist in index.html

    const orderIdElement =
        document.getElementById("detailOrderId");

    const customerElement =
        document.getElementById("detailCustomer");

    const materialElement =
        document.getElementById("detailMaterial");

    const quantityElement =
        document.getElementById("detailQuantity");

    const orderValueElement =
        document.getElementById("detailOrderValue");

    const creditLimitElement =
        document.getElementById("detailCreditLimit");

    const exposureElement =
        document.getElementById("detailExposure");

    const overdueElement =
        document.getElementById("detailOverdue");

    const paymentHistoryElement =
        document.getElementById("detailPaymentHistory");

    const statusElement =
        document.getElementById("detailStatus");

    const decisionElement =
        document.getElementById("creditDecision");


    if (orderIdElement) {
        orderIdElement.textContent = order.id;
    }

    if (customerElement) {
        orderCustomerText(customerElement, customer);
    }

    if (materialElement) {
        materialElement.textContent =
            material
                ? material.name
                : "Unknown Material";
    }

    if (quantityElement) {
        quantityElement.textContent =
            order.quantity;
    }

    if (orderValueElement) {
        orderValueElement.textContent =
            formatCurrency(orderValue);
    }

    if (creditLimitElement) {
        creditLimitElement.textContent =
            formatCurrency(customer.creditLimit);
    }

    if (exposureElement) {
        exposureElement.textContent =
            formatCurrency(customer.currentExposure);
    }

    if (overdueElement) {
        overdueElement.textContent =
            formatCurrency(customer.overdueAmount);
    }

    if (paymentHistoryElement) {
        paymentHistoryElement.textContent =
            customer.paymentHistory;
    }

    if (statusElement) {
        statusElement.textContent =
            order.status;
    }

    if (decisionElement) {

        if (creditCheck.canRelease) {

            decisionElement.textContent =
                "RELEASE RECOMMENDED";

            decisionElement.className =
                "decision success";

        } else {

            decisionElement.textContent =
                "HOLD RECOMMENDED";

            decisionElement.className =
                "decision danger";
        }
    }


    // Show the reason for the decision

    const reasonElement =
        document.getElementById("creditReason");


    if (reasonElement) {

        reasonElement.textContent =
            creditCheck.reason;
    }
}


// ============================================================
// 12. CUSTOMER TEXT HELPER
// ============================================================

function orderCustomerText(element, customer) {

    if (!customer) {

        element.textContent =
            "Unknown Customer";

        return;
    }

    element.textContent =
        customer.name;
}


// ============================================================
// 13. RELEASE ORDER
// ============================================================

function releaseOrder() {

    if (!selectedOrderId) {

        alert("Please select a sales order first.");

        return;
    }


    const order =
        salesOrders.find(
            order => order.id === selectedOrderId
        );


    if (!order) {

        alert("Sales order not found.");

        return;
    }


    // Perform credit check before releasing

    const creditCheck =
        performCreditCheck(order);


    // Validation:
    // Do not release if credit check fails.

    if (!creditCheck.canRelease) {

        alert(
            "Order cannot be released.\n\n" +
            creditCheck.reason
        );

        return;
    }


    // Update status

    order.status = "RELEASED";


    alert(
        `Sales Order ${order.id} has been released.`
    );


    // Refresh application

    renderKPIs();
    renderSalesOrders();
    renderOrderDetails(order);
}


// ============================================================
// 14. HOLD ORDER
// ============================================================

function holdOrder() {

    if (!selectedOrderId) {

        alert("Please select a sales order first.");

        return;
    }


    const order =
        salesOrders.find(
            order => order.id === selectedOrderId
        );


    if (!order) {

        alert("Sales order not found.");

        return;
    }


    order.status = "BLOCKED";


    alert(
        `Sales Order ${order.id} has been placed on hold.`
    );


    // Refresh application

    renderKPIs();
    renderSalesOrders();
    renderOrderDetails(order);
}


// ============================================================
// 15. INITIALIZE APPLICATION
// ============================================================

function initializeApp() {

    console.log("O2C Credit Release Cockpit started.");

    renderKPIs();

    renderSalesOrders();

}


// ============================================================
// 16. START APPLICATION
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);