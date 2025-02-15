class BankAccount {
    constructor(name, age, balance, address) {
        this.name = name;
        this.age = age;
        this.balance = balance;
        this.address = address;
    }

    accountInfo() {
        console.log(`The user name: ${this.name}, The user balance: ${this.balance}`);
    }

    // Method to simulate a deposit action
    deposit(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (amount <= 0) {
                    reject("Deposit amount must be positive.");
                } else {
                    resolve(amount);
                }
            }, 1000); // Simulate a 1 second delay
        });
    }

    // Method to add the amount to the balance using a Promise
    addAmount(amount) {
        return new Promise((resolve) => {
            this.balance += amount;
            resolve(`New balance after deposit: ${this.balance}`);
        });
    }

    async balanceCompare (amount){
        return new Promise((resolve, reject) => {
            setTimeout( ()=>{
                if(this.balance >= amount){
                    resolve(true)
                }
                else{
                    reject(false)
                }
        }, 1000)
        })
    }

    async withdraw(amount){
        try{
            const canwithdraw = await this.balanceCompare(amount)
            if(canwithdraw){
                this.balance -= amount
                console.log(`Withdrawed: ${amount}\nThis is your current balance: ${this.balance}`)
            }
        }
        catch(error){
            console.log("Withdraw amount must be avalible")
        }
    }
}

// Example usage
const user1 = new BankAccount("ahmed", 20, 3000, {
    city: "Cairo",
    street: "street",
    buildingNo: "34",
    apartmentNo: "10"
});

// Call the deposit method
user1.deposit(500)
    .then(amount => {
        console.log(`Deposited: ${amount}`);
        return user1.addAmount(amount); // Call addAmount and return the Promise
    })
    .then(message => {
        console.log(message); // Log the new balance message
        user1.accountInfo(); // Display the updated account info
    })
    .catch(error => {
        console.error(error);
    });


user1.withdraw(500)