import type { Command, TreeItemCollapsibleState } from 'vscode'
import { TreeItem } from 'vscode'
import type { ChallengeData, ChallengeLanguage } from './ChallengeDriver'
import { Commands } from './config'

export enum ChallengeNodeContentValue {
  SFC = 'SFC',
  STACKBLITZ = 'STACKBLITZ',
  ALL = 'ALL',
  NONE = 'NONE'
}

export class ChallengeNode extends TreeItem {
  constructor(
    public titie: string,
    public readonly no: number | undefined,
    public collapsibleState?: TreeItemCollapsibleState,
    public data?: ChallengeData,
    public readonly isChild: boolean = false,
    public language: ChallengeLanguage = 'en',
  ) {
    const label = no ? `${no} - ${titie}` : titie
    super(label, collapsibleState)
    if (data) {
      if (data.quizLink && data.stackblitzLink[language]) {
        this.contextValue = ChallengeNodeContentValue.ALL
      }
      else {
        if (data.quizLink) {
          this.contextValue = ChallengeNodeContentValue.SFC
        } else if (data.stackblitzLink[language]) {
          this.contextValue = ChallengeNodeContentValue.STACKBLITZ
        } else {
          this.contextValue = ChallengeNodeContentValue.NONE
        }
      }
    }


    if (isChild)
      this.command = this.previewCommand
  }

  public get previewCommand(): Command {
    return {
      title: this.data!.quizLink,
      command: Commands.openChallengeWebView,
      arguments: [this],
    }
  }
}
