{
  class Person {
    constructor(public name: string, public age: number) {}
    
    display(): void {
      console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
  }

  class Student extends Person {
    constructor(name: string, age: number, public grade: string) {
      // Bắt buộc phải gọi super() để truyền name và age lên cho Person xử lý
      super(name, age);
    }
    
    // Mở rộng phương thức
    displayAll(): void {
      this.display(); 
      console.log(`Grade: ${this.grade}`); 
    }
  }

  const sinhVien = new Student("Thành Long", 20, "A+");
  sinhVien.displayAll();
}