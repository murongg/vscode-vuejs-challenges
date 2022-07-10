import { fetchData } from './fetch'

export type ChallengeDifficulty = 'warm' | 'easy' | 'medium' | 'hard' | 'extreme'
export type ChallengeLanguage = 'en' | 'zh-CN'

export interface ChallengeAuthorInfo {
  name: string
  github: string
}
export interface ChallengeInfo {
  title: string
  author: ChallengeAuthorInfo
  difficulty: ChallengeDifficulty
  tags: string
}
export interface ChallengeData {
  path: string
  quizLink: string
  no: number
  stackblitzLink: {
    [K in ChallengeLanguage]: string
  }
  readme: {
    [K in ChallengeLanguage]: string
  }
  info: {
    [K in ChallengeLanguage]: ChallengeInfo
  }
}

export type Challenge = {
  [K in ChallengeDifficulty]: ChallengeData[]
}

export class ChallengeDriver {
  public data?: Challenge
  constructor() { }

  async initData() {
    const data = await fetchData()
    this.data = data
  }

  getDataByDifficulty(difficulty: ChallengeDifficulty) {
    return this.data?.[difficulty]
  }

  getWarmData() {
    return this.getDataByDifficulty('warm')
  }

  getEasyData() {
    return this.getDataByDifficulty('easy')
  }

  getMediumData() {
    return this.getDataByDifficulty('medium')
  }

  getHardData() {
    return this.getDataByDifficulty('hard')
  }

  getExtremeData() {
    return this.getDataByDifficulty('extreme')
  }
}

export const challengeDriver = new ChallengeDriver()
