import { createElement } from "react"
import rehypeReact from "rehype-react"

import markdown from "../components/markdown"

const astCompiler = new rehypeReact({
  createElement,
  components: markdown,
}).Compiler

export default astCompiler
