{
  class Book {
    constructor(
      public title: string,
      public author: string,
      public year: number
    ) {}

    displayInfo(): void {
      console.log(`Cuốn sách "${this.title}" do ${this.author} viết năm ${this.year}.`);
    }
  }

  const myBook = new Book("Nhà Giả Kim", "Paulo Coelho", 1988);
  myBook.displayInfo();
  
  const anotherBook = new Book("Dế Mèn Phiêu Lưu Ký", "Tô Hoài", 1941);
  anotherBook.displayInfo();
}