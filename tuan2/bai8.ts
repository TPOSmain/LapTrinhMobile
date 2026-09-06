{
  Promise.resolve(2)
    .then((num) => {
      console.log(`Bắt đầu: ${num}`);
      return num * num; 
    })
    .then((squared) => {
      console.log(`Bình phương lên: ${squared}`);
      return squared * 2; 
    })
    .then((doubled) => {
      console.log(`Nhân đôi lên: ${doubled}`);
      return doubled + 5; 
    })
    .then((finalResult) => {
      console.log(`Kết quả cuối cùng: ${finalResult}`);
    })
    .catch((err) => {
      console.log("Có lỗi xảy ra trong chuỗi:", err);
    });
}