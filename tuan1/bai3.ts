class Car {
  constructor(
    public brand: string,
    public model: string,
    public year: number
  ) {}

  showInfo(): void {
    console.log(`Xe: ${this.brand} ${this.model}, Năm sản xuất: ${this.year}`);
  }
}

const myCar = new Car("Mẹc Xa Đéc", "Đồng Tháp", 2025);
myCar.showInfo();