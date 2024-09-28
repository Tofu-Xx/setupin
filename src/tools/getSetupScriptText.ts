export function getSetupScriptText() {
  const setupScript = document.querySelector('script[setup]')
  if (!setupScript) {
    if (document.querySelector('script:not([src])')) {
      console.warn('You may have forgotten to add the <script setup> tag.')
    }
    return void 0
  }
  return setupScript.textContent || ''
}
