class Rectangle {
  constructor(public width: number, public height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return (this.width + this.height) * 2;
  }
}

const hinhChuNhat = new Rectangle(10, 5);
console.log(`Diện tích: ${hinhChuNhat.calculateArea()}`);
console.log(`Chu vi: ${hinhChuNhat.calculatePerimeter()}`);