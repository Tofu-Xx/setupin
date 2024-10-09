export function getSetupScriptText() {
  const setupScript = document.querySelector('script[setup]') || document.querySelector('script[src*=setupin]')
  return setupScript!.textContent || ''
}
