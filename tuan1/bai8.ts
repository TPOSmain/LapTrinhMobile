{
  class Product {
    constructor(public name: string, public price: number) {}
  }
  const productList: Product[] = [
    new Product("Bàn phím cơ", 150),
    new Product("Chuột không dây", 50),
    new Product("Màn hình", 300),
    new Product("Lót chuột", 10)
  ];

  const expensiveProducts = productList.filter((item) => {
    return item.price > 100;
  });

  console.log("Các sản phẩm có giá lớn hơn 100:");
  expensiveProducts.forEach(product => {
    console.log(`- ${product.name}: $${product.price}`);
  });
}