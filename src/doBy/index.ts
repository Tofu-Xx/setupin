export * from './script'
export * from './template'

export const SCRIPT_TAG = '<script setup>'
export const TEMPLATE_TAG = '<template>'

export type ROOT_TAGS = typeof SCRIPT_TAG | typeof TEMPLATE_TAG
