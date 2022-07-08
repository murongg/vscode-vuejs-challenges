import { window } from 'vscode'
import axios from 'axios'
import { CHALLENGE_DATA_URL, ERROR_OK } from './constants'
import type { Challenge } from './ChallengeDriver'

export function fetchData(): Thenable<Challenge> {
  return new Promise((resolve, reject) => {
    axios.get(CHALLENGE_DATA_URL).then((res) => {
      const { data, status, statusText } = res
      if (status === ERROR_OK) {
        const challengesByDifficulty = data.challengesByDifficulty
        resolve(challengesByDifficulty)
      }
      else {
        const message = `Fetch challenage data error: ${statusText}`
        window.showInformationMessage(message)
        reject(message)
      }
    })
  })
}
