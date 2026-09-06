{
  function readAndFilterArray(): Promise<number[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        
        const evenNumbers = data.filter((num) => num % 2 === 0);
        
        resolve(evenNumbers);
      }, 1000); // Trễ 1 giây
    });
  }

  console.log("Đang đọc dữ liệu...");

  readAndFilterArray()
    .then((result) => {
      console.log(`Đã lọc xong các số chẵn:`, result);
    });
}