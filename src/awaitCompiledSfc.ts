import type { SFCStyleCompileResults, SFCScriptBlock, SFCTemplateCompileResults } from "@vue/compiler-sfc";
import { compiler } from "./compiler";
import { getSource } from "./getSource";
import { watchRoot } from "./utils";

export async function awaitCompiledSfc(handler: Fn<[SFCStyleCompileResults[], SFCScriptBlock, SFCTemplateCompileResults]>) {
  const sources = await watchRoot(getSource);
  const { sfcScriptBlock, sfcTemplateCompileResults, sfcStyleCompileResultsList } = compiler(sources.join('\n'));
  handler(sfcStyleCompileResultsList, sfcScriptBlock, sfcTemplateCompileResults);
}
