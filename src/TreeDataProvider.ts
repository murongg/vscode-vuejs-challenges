import { TreeItemCollapsibleState, TreeDataProvider, Event, Disposable, EventEmitter } from 'vscode';
import { ChallengeDifficulty, challengeDriver } from './ChallengeDriver';
import { ChallengeNode } from './ChallengeNode';

export class ChallengesProvider implements TreeDataProvider<ChallengeNode>, Disposable {

  private _onDidChangeTreeData: EventEmitter<ChallengeNode | undefined | null | void> = new EventEmitter<ChallengeNode | undefined | null | void>();
  readonly onDidChangeTreeData: Event<ChallengeNode | undefined | null | void> = this._onDidChangeTreeData.event;

  getTreeItem(element: ChallengeNode): ChallengeNode {
    return element;
  }

  async getChildren(element?: ChallengeNode) {
    if (!element) {
      await challengeDriver.initData()
      return this.initChallengeDifficulty()
    }
    const res = await this.getChallengeData(element.label as ChallengeDifficulty)
    return Promise.resolve(res)
  }

  public dispose() {
    this.fire();
  }

  fire(): void {
    this._onDidChangeTreeData.fire(null);
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  private initChallengeDifficulty() {
    return ['easy', 'medium', 'hard'].map(d => new ChallengeNode(d, undefined, TreeItemCollapsibleState.Collapsed))
  }

  private async getChallengeData(difficulty: ChallengeDifficulty) {
    const data = challengeDriver.getDataByDifficulty(difficulty)
    return data
      ?.sort((a, b) => a.no - b.no)
      .map(question =>
        new ChallengeNode(`${question.path}`, question.no, TreeItemCollapsibleState.None, question, true))
      || []
  }

}


export const challengesProvider = new ChallengesProvider()
