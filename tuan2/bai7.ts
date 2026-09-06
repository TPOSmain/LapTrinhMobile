{
  function fetchServerA(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("Dữ liệu từ Server A"), 2000));
  }

  function fetchServerB(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("Dữ liệu từ Server B"), 1000));
  }

  console.log("Đang tải dữ liệu từ 2 server, ai nhanh hơn sẽ thắng...");

  Promise.race([fetchServerA(), fetchServerB()])
    .then((winner) => {
      console.log(`Kết quả cuộc đua: ${winner}`);
    });
}