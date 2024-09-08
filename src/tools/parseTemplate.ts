export const parseTemplate = () => {
  const template = document.querySelector("template");
  if (!template) {
    console.warn("No template tag found.");
    return void 0;
  }
  const templateStr = template.innerHTML;
  template.remove();
  document.body.innerHTML = templateStr;
};
