{
  function generateRandomNumber(): Promise<number> {
    return new Promise((resolve, reject) => {
      const randomNum = Math.random(); 
      
      console.log(`Số ngẫu nhiên tạo ra là: ${randomNum}`);
      if (randomNum >= 0.5) {
        resolve(randomNum);
      } else {
        reject("Số quá nhỏ, không đạt yêu cầu!");
      }
    });
  }

  generateRandomNumber()
    .then((num) => {
      console.log(`Dữ liệu hợp lệ: ${num}`);
    })
    .catch((err) => {
      console.log(`Cảnh báo lỗi: ${err}`);
    });
}