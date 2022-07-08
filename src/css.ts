import { readFileSync } from 'fs'
import { resolve } from 'path'

export function getGitHubCSS(): string {
  try {
    const cssContent = readFileSync(resolve(__dirname, './github.css'), 'utf8')
    return cssContent
  }
  catch (error) {
    return error as string
  }
}
