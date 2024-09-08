export const parseTemplate = () => {
  const template = document.querySelector("template");
  if (!template) {
    throw new Error("No template tag found.");
  }
  const templateStr = template!.innerHTML;
  template.remove();
  document.body.innerHTML = templateStr;
};
