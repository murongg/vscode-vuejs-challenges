import { ViewColumn } from 'vscode'
import type { ChallengeNode } from './ChallengeNode'
import { previewProvider } from './PreviewProvider'

export const openChallengeWebView = function (node: ChallengeNode) {
  previewProvider.show(node)
}

export const openSFCChallengeWebSite = function (node: ChallengeNode) {
  previewProvider.showChallenge(node, node.data?.quizLink || '', ViewColumn.Two)
}

export const openStackblitzChallengeWebSite = function (node: ChallengeNode) {
  previewProvider.showChallenge(node, node.data!.stackblitzLink[node.language], ViewColumn.Three)
}
