const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const totalIncomeEl = document.getElementById('total-income');
const totalExpensesEl = document.getElementById('total-expenses');
const remainingBudgetEl = document.getElementById('remaining-budget');
const transactionList = document.getElementById('transaction-list');

let totalIncome = 0;
let totalExpenses = 0;

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (category === 'Income') {
        totalIncome += amount;
    } else {
        totalExpenses += amount;
    }

    updateSummary();
    addTransactionToList(description, amount, category);

    descriptionInput.value = '';
    amountInput.value = '';
});

function updateSummary() {
    totalIncomeEl.textContent = totalIncome.toFixed(2);
    totalExpensesEl.textContent = totalExpenses.toFixed(2);
    remainingBudgetEl.textContent = (totalIncome - totalExpenses).toFixed(2);
}

function addTransactionToList(description, amount, category) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${description}: ${amount.toFixed(2)} (${category})
        <button class="remove-btn">&times;</button>
    `;
    transactionList.appendChild(listItem);

    listItem.querySelector('.remove-btn').addEventListener('click', function() {
        const value = amount;
        if (category === 'Income') {
            totalIncome -= value;
        } else {
            totalExpenses -= value;
        }
        updateSummary();
        listItem.remove();
    });
}
