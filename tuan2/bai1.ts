{
  const helloPromise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello Async"); 
    }, 2000);
  });

  console.log("Bắt đầu chạy. Vui lòng đợi 2 giây...");
  helloPromise.then((message) => {
    console.log(`Kết quả nhận được: ${message}`);
  });
}