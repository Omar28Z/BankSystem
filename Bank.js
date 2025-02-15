class BankAccount {
    constructor(name, age, balance, address) {
        this.name = name;
        this.age = age;
        this.balance = balance;
        this.address = address;
    }

    accountInfo() {
        return `Name: ${this.name}, Balance: ${this.balance}, Address: ${this.address.city}, ${this.address.street}, ${this.address.buildingNo}, ${this.address.apartmentNo}`;
    }

    deposit(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (amount <= 0) {
                    reject("Deposit amount must be positive.");
                } else {
                    this.balance += amount;
                    resolve(`Deposited: ${amount}. New balance: ${this.balance}`);
                }
            }, 1000);
        });
    }

    async withdraw(amount) {
        try {
            const canWithdraw = await this.balanceCompare(amount);
            if (canWithdraw) {
                this.balance -= amount;
                return `Withdrawn: ${amount}. New balance: ${this.balance}`;
            }
        } catch (error) {
            return "Withdrawal amount exceeds available balance.";
        }
    }

    balanceCompare(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.balance >= amount) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }, 1000);
        });
    }
}

// DOM Elements
const form = document.getElementById("bankForm");
const depositButton = document.getElementById("depositButton");
const withdrawButton = document.getElementById("withdrawButton");
const depositAmount = document.getElementById("depositAmount");
const withdrawAmount = document.getElementById("withdrawAmount");
const infoName = document.getElementById("infoName");
const infoBalance = document.getElementById("infoBalance");
const infoAddress = document.getElementById("infoAddress");

let userAccount;

// Event Listener for Form Submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const balance = parseFloat(document.getElementById("balance").value);
    const city = document.getElementById("city").value;
    const street = document.getElementById("street").value;
    const buildingNo = document.getElementById("building_number").value;
    const apartmentNo = document.getElementById("apartment_number").value;

    const address = { city, street, buildingNo, apartmentNo };
    userAccount = new BankAccount(name, age, balance, address);

    // Display Account Info
    infoName.textContent = `Name: ${userAccount.name}`;
    infoBalance.textContent = `Balance: ${userAccount.balance}`;
    infoAddress.textContent = `Address: ${userAccount.address.city}, ${userAccount.address.street}, ${userAccount.address.buildingNo}, ${userAccount.address.apartmentNo}`;
});

// Event Listener for Deposit
depositButton.addEventListener("click", async () => {
    const amount = parseFloat(depositAmount.value);
    if (amount > 0 && userAccount) {
        const result = await userAccount.deposit(amount);
        infoBalance.textContent = `Balance: ${userAccount.balance}`;
        alert(result);
    } else {
        alert("Invalid deposit amount or no account created.");
    }
});

// Event Listener for Withdraw
withdrawButton.addEventListener("click", async () => {
    const amount = parseFloat(withdrawAmount.value);
    if (amount > 0 && userAccount) {
        const result = await userAccount.withdraw(amount);
        infoBalance.textContent = `Balance: ${userAccount.balance}`;
        alert(result);
    } else {
        alert("Invalid withdrawal amount or no account created.");
    }
});