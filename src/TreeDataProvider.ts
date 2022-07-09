import type { Disposable, Event, TreeDataProvider } from 'vscode'
import { EventEmitter, TreeItemCollapsibleState } from 'vscode'
import type { ChallengeDifficulty, ChallengeLanguage } from './ChallengeDriver'
import { challengeDriver } from './ChallengeDriver'
import { ChallengeNode } from './ChallengeNode'

export class ChallengesProvider implements TreeDataProvider<ChallengeNode>, Disposable {
  private _onDidChangeTreeData: EventEmitter<ChallengeNode | undefined | null | void> = new EventEmitter<ChallengeNode | undefined | null | void>()
  readonly onDidChangeTreeData: Event<ChallengeNode | undefined | null | void> = this._onDidChangeTreeData.event

  public language: ChallengeLanguage = 'en'

  getTreeItem(element: ChallengeNode): ChallengeNode {
    return element
  }

  async getChildren(element?: ChallengeNode) {
    if (!element) {
      if (!challengeDriver.data) {
        await challengeDriver.initData()
      }
      return this.initChallengeDifficulty()
    }
    const res = await this.getChallengeData(element.label as ChallengeDifficulty)
    return Promise.resolve(res)
  }

  public dispose() {
    this.fire()
  }

  fire(): void {
    this._onDidChangeTreeData.fire(null)
  }

  refresh(): void {
    this._onDidChangeTreeData.fire()
  }

  changeLanguage() {
    if (this.language === 'en') {
      this.language = 'zh-CN'
    } else {
      this.language = 'en'
    }

    this.refresh()
  }

  private initChallengeDifficulty() {
    return ['easy', 'medium', 'hard'].map(d => new ChallengeNode(d, undefined, TreeItemCollapsibleState.Collapsed, undefined, false, this.language))
  }

  private async getChallengeData(difficulty: ChallengeDifficulty) {
    const data = challengeDriver.getDataByDifficulty(difficulty)
    return data
      ?.sort((a, b) => a.no - b.no)
      .map(question =>
        new ChallengeNode(question.info[this.language].title, question.no, TreeItemCollapsibleState.None, question, true, this.language))
      || []
  }
}

export const challengesProvider = new ChallengesProvider()
