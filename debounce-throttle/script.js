const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
});

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
});

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
});

// text inputs / search / any requests to the backend
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// resizing / mouse movement / scrowling
function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
}

const updateDebounceIncrement = debounce((text) => {
  incrementCounter(text);
});

const updateThrottleIncrement = throttle((text) => {
  incrementCounter(text);
}, 100);

document.addEventListener("mousemove", (e) => {
  incrementCounter(defaultText);
  updateDebounceIncrement(debounceText);
  updateThrottleIncrement(throttleText);
});

function incrementCounter(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}
