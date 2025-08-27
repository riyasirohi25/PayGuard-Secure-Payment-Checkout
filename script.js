// Luhn Algorithm for card validation
function isValidCardNumber(number) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10 === 0);
}

// Cardholder Name validation (only letters & spaces)
document.getElementById('name').addEventListener('input', function () {
    const val = this.value;
    const error = document.getElementById('name-error');
    if (!/^[A-Za-z ]+$/.test(val)) {
        error.textContent = "Cardholder name must contain only letters.";
    } else {
        error.textContent = "";
    }
});

// Card Number validation with formatting
document.getElementById('card-number').addEventListener('input', function (event) {
    let value = event.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    event.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    const error = document.getElementById('card-error');
    if (value.length === 16 && !isValidCardNumber(value)) {
        error.textContent = "Invalid card number (checksum failed).";
    } else if (value.length < 16) {
        error.textContent = "Card number must be 16 digits.";
    } else {
        error.textContent = "";
    }
});

// Expiry Date validation
document.getElementById('expiry').addEventListener('input', function () {
    const val = this.value;
    const error = document.getElementById('expiry-error');
    if (!/^\d{2}\/\d{2}$/.test(val)) {
        error.textContent = "Format must be MM/YY.";
        return;
    }
    const [mm, yy] = val.split("/").map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (mm < 1 || mm > 12) {
        error.textContent = "Invalid month.";
    } else if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
        error.textContent = "Card expired.";
    } else {
        error.textContent = "";
    }
});

// CVV validation
document.getElementById('cvv').addEventListener('input', function () {
    const val = this.value;
    const error = document.getElementById('cvv-error');
    if (val.length !== 3 || isNaN(val) || val === "000") {
        error.textContent = "Invalid CVV.";
    } else {
        error.textContent = "";
    }
});

// Amount validation
document.getElementById('amount').addEventListener('input', function () {
    const val = parseFloat(this.value);
    const error = document.getElementById('amount-error');
    if (isNaN(val) || val <= 0) {
        error.textContent = "Enter a valid amount.";
    } else {
        error.textContent = "";
    }
});

// Final form submission
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (document.querySelectorAll('.error:not(:empty)').length > 0) {
        document.getElementById('message').textContent = "❌ Fix errors before proceeding.";
        document.getElementById('message').style.color = "red";
        return;
    }

    const name = document.getElementById('name').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    document.getElementById('message').textContent =
        `✅ Payment of ₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} successful! Thank you, ${name}.`;
    document.getElementById('message').style.color = "green";
});
