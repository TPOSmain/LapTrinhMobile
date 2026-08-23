 class Person {
  constructor(public name: string, public age: number) {}
  
  display(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

const nguoiDung = new Person("Thành Long", 20);
nguoiDung.display();