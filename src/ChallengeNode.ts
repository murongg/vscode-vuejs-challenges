import { Command, TreeItem, TreeItemCollapsibleState } from "vscode";
import { ChallengeData } from "./ChallengeDriver";
import { Commands } from "./config";


export class ChallengeNode extends TreeItem {

  constructor(
    public titie: string,
    public readonly no: number | undefined,
    public collapsibleState?: TreeItemCollapsibleState,
    public data?: ChallengeData,
    public readonly isChild: boolean = false
  ) {
    const label = no ? `${no} - ${titie}` : titie
    super(label, collapsibleState)
    if (isChild) {
      this.command = this.previewCommand
    }
  }

  public get previewCommand(): Command {
    return {
      title: this.data!.quizLink,
      command: Commands.openChallengeWebView,
      arguments: [this]
    };
  }
}
