import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'
import { openChallengeWebView, openSFCChallengeWebSite, openStackblitzChallengeWebSite } from './commands'
import { Commands } from './config'
import { challengesProvider } from './TreeDataProvider'

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(Commands.openChallengeWebView, openChallengeWebView),
    commands.registerCommand(Commands.sfcChallenge, openSFCChallengeWebSite),
    commands.registerCommand(Commands.stackblitzChallenge, openStackblitzChallengeWebSite),
    commands.registerCommand(Commands.refresh, () =>
      challengesProvider.refresh(),
    ),
    commands.registerCommand(Commands.language, () =>
      challengesProvider.changeLanguage(),
    ),
  )
  window.createTreeView('vuejsChallengeList', {
    treeDataProvider: challengesProvider,
  })
}

export function deactivate() {

}
