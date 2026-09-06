{
  function rejectAfterOneSecond(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Something went wrong"); 
      }, 1000);
    });
  }

  console.log("Đang xử lý Bài 3...");

  rejectAfterOneSecond()
    .then((data) => {
      console.log("Thành công: ", data); 
    })
    .catch((error) => {
      console.error(`Bị lỗi rồi: ${error}`); 
    });
}