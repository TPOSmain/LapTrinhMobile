{
  function flipCoin(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isHeads = Math.random() > 0.5; 
        if (isHeads) {
          resolve("Thành công: Mặt ngửa!");
        } else {
          reject("Thất bại: Mặt sấp!");
        }
      }, 1000);
    });
  }

  console.log("Đang tung đồng xu...");

  flipCoin()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log("Done");
    });
}