const Process = require("./../tasks/asyncChain");

describe("Process class", () => {
  test("should run tasks in sequence", async () => {
    const process = new Process();

    const logs = [];

    process.run(async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          logs.push("Process 1");
          resolve();
        }, 500)
      );
    });

    process.run(async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          logs.push("Process 2");
          resolve();
        }, 300)
      );
    });

    process.run(async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          logs.push("Process 3");
          resolve();
        }, 100)
      );
    });

    await process.run(() => {});

    expect(logs).toEqual(["Process 1", "Process 2", "Process 3"]);
  });
});
