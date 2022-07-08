import { ViewColumn, window } from "vscode";
import MarkdownIt from 'markdown-it'

import { ChallengeNode } from "./ChallengeNode";
import { generateBadge, generateBadgeLink, generateDifficultyBadge } from "./badge";
import { ChallengeAuthorInfo } from "./ChallengeDriver";

// let css = ''
/// TODO code highlight
/// TODO badge
/// TODO code split
const markdownIt = new MarkdownIt({
  html: true
})

class PreviewProvider {

  public show(node: ChallengeNode): void {
    const panel = window.createWebviewPanel(
      'catCoding',
      'Cat Coding',
      ViewColumn.One,
      {}
    );
    // if (!css) {
    //   css = getGitHubCSS()
    // }
    // const styleContent = `
    // <style>${css}</style>
    // `
    try {
      const readme = markdownIt.render(node.data!.readme.en)
      const { difficulty, tags, author } = node.data!.info.en
      const { quizLink } = node.data!
      const html = ''
        + `<h1>${node.data!.path} ${generateDifficultyBadge(difficulty)} ${(tags ? tags.split(',') : []).map(i => generateBadge("", `#${i}`, "999")).join(" ")}</h1>`
        + `<blockquote><p>${generateAuthorInfo(author)}</p></blockquote>`
        + "<p>"
        + generateBadgeLink(quizLink, "", "Take the Challenge", "213547", "?logo=vue.js&logoColor=42b883")
        + "</p>"
        + readme
      panel.webview.html = html
    } catch (error) {
      console.log(error)
    }
  }

}

function generateAuthorInfo(author: ChallengeAuthorInfo) {
  return `By ${author.name}${author.github ? ` <a href="https://github.com/${author.github}" target="_blank">@${author.github}</a>` : ""}`
}

export const previewProvider: PreviewProvider = new PreviewProvider();

