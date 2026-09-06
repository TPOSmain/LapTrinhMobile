{
  class Account {
    public accountName: string;
    private balance: number;
    public readonly accountNumber: string;

    constructor(name: string, initialBalance: number, accNumber: string) {
      this.accountName = name;
      this.balance = initialBalance;
      this.accountNumber = accNumber;
    }

    public deposit(amount: number): void {
      if (amount > 0) {
        this.balance += amount;
        console.log(`Đã nạp ${amount}.`);
      }
    }

    public showAccountInfo(): void {
      console.log(`Tài khoản: ${this.accountName}`);
      console.log(`Số TK: ${this.accountNumber}`);
      console.log(`Số dư: ${this.balance}`); 
    }
  }

  const myAcc = new Account("Thành Long", 5000, "123456789");
  myAcc.showAccountInfo();

  myAcc.accountName = "Long Khủng Long"; 
  console.log(`Tên mới: ${myAcc.accountName}`);

  myAcc.deposit(1000); 
}