import { ASCII_LOGO, IMPORTS_TAG_CODE, REPO_NAME } from '@/data'
import { awaitClientCode } from '@/funcs'
import { createDom } from '@/utils'
import { createConvertor } from "sfc2esm";

awaitClientCode((sfcCode) => {
  const site = document[__IS_DEV__ ? 'head' : 'body']
  const { sfc2esm, sfc2css } = createConvertor({ id: REPO_NAME, appName: 'APP$' })
  createDom(IMPORTS_TAG_CODE)?.mount(site)
  createDom(`<script ${REPO_NAME} type="module">`, ASCII_LOGO + sfc2esm(sfcCode,'body'))?.mount(site)
  createDom(sfc2css(sfcCode) && `<style ${REPO_NAME}>`, sfc2css(sfcCode))?.mount(document.head)
})
