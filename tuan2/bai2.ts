{
  function resolveAfterOneSecond(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(10); 
      }, 1000); 
    });
  }

  console.log("Đang xử lý Bài 2...");

  resolveAfterOneSecond().then((result) => {
    console.log(`Hoàn thành! Nhận được kết quả: ${result}`);
  });
}