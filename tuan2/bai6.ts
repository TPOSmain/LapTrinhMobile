{
  function createTask(name: string, time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Đã xong ${name} (mất ${time}ms)`);
      }, time);
    });
  }

  console.log("Bắt đầu chạy 3 tác vụ cùng lúc...");
  const task1 = createTask("Tác vụ 1", 2000);
  const task2 = createTask("Tác vụ 2", 1000);
  const task3 = createTask("Tác vụ 3", 1500);

  Promise.all([task1, task2, task3])
    .then((results) => {
      console.log("Tất cả đã hoàn thành!");
      console.log("Kết quả:", results);
    })
    .catch((err) => {
      console.log("Có ít nhất 1 tác vụ bị lỗi:", err);
    });
}