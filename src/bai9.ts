{
  interface Animal {
    name: string;
    sound(): void;
  }

  class Dog implements Animal {
    constructor(public name: string) {}

    sound(): void {
      console.log(`${this.name} sủa: Gâu gâu!`);
    }
  }

  class Cat implements Animal {
    constructor(public name: string) {}

    sound(): void {
      console.log(`${this.name} kêu: Meo meo!`);
    }
  }

  const myDog = new Dog("Cậu Vàng");
  myDog.sound();

  const myCat = new Cat("Mimi");
  myCat.sound();
}