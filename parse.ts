
import * as fs from 'fs'
import * as ts from "typescript";

const isObject = (token: any): token is Object => typeof token === 'object' && token !== null;

const source = fs.readFileSync(process.argv[2])

const sourceFile = ts.createSourceFile('main.ts', source.toString(), ts.ScriptTarget.ES5, true);

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

fs.writeFileSync('output/ast.json', JSON.stringify(sourceFile, resolver(), 2));
