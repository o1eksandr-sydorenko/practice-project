class Process {
  constructor() {
    this._chain = Promise.resolve();
  }

  run(fn) {
    this._chain = this._chain.then(() => fn());

    return this._chain;
  }
}

module.exports = Process;
