{
  class User {
    private _name: string;

    constructor(name: string) {
      this._name = name;
    }

    get name(): string {
      return this._name;
    }

    set name(newName: string) {
      if (newName.length > 2) {
        this._name = newName;
        console.log(`Đã đổi tên thành: ${this._name}`);
      } else {
        console.log("Lỗi: Tên phải có ít nhất 3 ký tự!");
      }
    }
  }

  const user1 = new User("Long");
  console.log(`Tên ban đầu: ${user1.name}`); 

  user1.name = "Ha"; 
  user1.name = "Thanh Long"; 
}