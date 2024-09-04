export const getMode = () =>
  document.querySelector("script[setup]:not([src])") ? "setup" : "in";
