import type { ChallengeNode } from './ChallengeNode'
import { previewProvider } from './PreviewProvider'

export const openChallengeWebView = function (node: ChallengeNode) {
  previewProvider.show(node)
}

export const openChallengeWebSite = function (node: ChallengeNode) {
  previewProvider.showChallenge(node)
}
