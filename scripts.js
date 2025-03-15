// script.js

document.addEventListener("DOMContentLoaded", function() {
    let savedTarget = localStorage.getItem("savingsTarget") || 0;
    document.getElementById("current-target").textContent = savedTarget;
    document.getElementById("remaining-savings").textContent = savedTarget;
});


function setSavingsTarget() {
    let target = document.getElementById("savings-target").value;
    if (!target || target <= 0) {
        alert("Enter a valid savings target!");
        return;
    }
    
    localStorage.setItem("savingsTarget", target);
    document.getElementById("current-target").textContent = target;
    document.getElementById("remaining-savings").textContent = target;  

    console.log("Saved Target:", localStorage.getItem("savingsTarget"));
}


function setNewTarget() {
    localStorage.removeItem("savingsTarget");
    localStorage.removeItem("remainingSavings");
    document.getElementById("current-target").textContent = "0";
    document.getElementById("remaining-savings").textContent = "0";
    alert("New savings target can now be set.");
}

function updateSavingsUI() {
    let target = localStorage.getItem("savingsTarget") || 0;
    let remaining = localStorage.getItem("remainingSavings") || 0;
    document.getElementById("current-target").textContent = target;
    document.getElementById("remaining-savings").textContent = remaining;
}

function addExpense() {
    let amount = parseFloat(document.getElementById("expense-amount").value);
    if (!amount || amount <= 0) {
        alert("Enter a valid expense amount!");
        return;
    }
    let remaining = localStorage.getItem("savingsTarget") - amount;
    localStorage.setItem("savingsTarget", remaining);
    document.getElementById("remaining-savings").textContent = remaining;
}

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ desc, amount, category, date });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    let remaining = parseFloat(localStorage.getItem("remainingSavings")) - amount;
    localStorage.setItem("remainingSavings", remaining);
    updateSavingsUI();
    loadExpenses();
}

function loadExpenses() {
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${expense.date} - ${expense.desc} (₹${expense.amount}) <button class="delete-btn" onclick="deleteExpense(${index})">X</button>`;
        expenseList.appendChild(li);
    });
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let removedAmount = expenses[index].amount;
    
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    let remaining = parseFloat(localStorage.getItem("remainingSavings")) + removedAmount;
    localStorage.setItem("remainingSavings", remaining);
    updateSavingsUI();
    loadExpenses();
}

function loadSavingsTarget() {
    updateSavingsUI();
}

function downloadReceipt() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    if (expenses.length === 0) {
        alert("No expenses to generate a receipt.");
        return;
    }

    let receiptText = "Expense Receipt\n------------------\n";
    expenses.forEach(exp => {
        receiptText += `${exp.date} - ${exp.desc}: ₹${exp.amount} (${exp.category})\n`;
    });

    let blob = new Blob([receiptText], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Expense_Receipt.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
