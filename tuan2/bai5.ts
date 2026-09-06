{
  function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Task done after ${time}ms`);
      }, time); 
    });
  }

  console.log("Bắt đầu chạy tác vụ...");
  simulateTask(1500).then((message) => {
    console.log(message);
  });
  
  simulateTask(500).then((message) => {
    console.log(message);
  });
}