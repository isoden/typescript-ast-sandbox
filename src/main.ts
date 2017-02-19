'use strict'

declare var CodeMirror: any
declare var jsontree: any
declare var ts: any

const isObject = (token: any): token is Object => typeof token === 'object' && token !== null;


const mountNode   = document.getElementById('editor')
const astViewNode = document.getElementById('ast-view') as HTMLElement

const editor = CodeMirror.fromTextArea(mountNode, {
  lineNumbers: true,
  mode       : 'text/typescript',
})

/**
 * 循環参照の解決
 * @see {@link  http://blog.geta6.net/post/65114518444/%E5%BE%AA%E7%92%B0%E5%8F%82%E7%85%A7%E3%81%AEobject%E3%82%92jsonstringify%E3%81%99%E3%82%8B}
 */
const resolver = () => {
  const cache: any[] = []

  return (key: string, value: any) => {
    if (key === 'kind') {
      return ts.SyntaxKind[value];
    }

    if (isObject(value)) {
      if (cache.includes(value)) {
        return;
      }

      cache.push(value)
    }

    return value
  }
}

const render = (json: Object) => {
  astViewNode.innerHTML = JSON.stringify(json, resolver(), 2);
}

editor.setSize(innerWidth / 2, innerHeight - 60)

editor.on('change', (cm: any) => {
  const sourceFile = ts.createSourceFile('main.ts', cm.getValue(), ts.ScriptTarget.ES5, true)

  render(sourceFile)
})

render(ts.createSourceFile('main.ts', editor.getValue(), ts.ScriptTarget.ES5, true))
