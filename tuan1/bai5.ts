{
  class BankAccount {
    constructor(public balance: number) {}
    deposit(amount: number): void {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Đã nạp: ${amount}. Số dư mới: ${this.balance}`);
      } else {
        console.log("Số tiền nạp > 0");
      }
    }
    withdraw(amount: number): void {
      if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        console.log(`Đã rút: ${amount}. Số dư mới: ${this.balance}`);
      } else {
        console.log("Số dư không đủ hoặc số tiền rút không hợp lệ!");
      }
    }
  }
  const myAccount = new BankAccount(1000); 
  myAccount.deposit(500);  
  myAccount.withdraw(200); 
  myAccount.withdraw(2000); 
}