import { Analyser } from './analyser'
/**
 * 贪心算法AI，功能是获取可以下的点的数组，并做启发式排序
 */
class GreedAI {
  constructor (controller) {
    this.board = controller.board
  }
  /** 获取可以下的点的数组，并做了排序 */
  getNexts (color, searchRange) {
    const openlist = []

    this.board.data.forEach((value, index) => {
      if (value !== 0) { return }
      let place
      const { x, y } = this.board.getXY(index)
      for (let i = -searchRange; i < searchRange + 1; ++i) {
        for (let j = -searchRange; j < searchRange + 1; ++j) {
          if (i === 0 && j === 0) {
            continue
          }
          let flag = this.board.data[this.board.getIndex(x + i, y + j)]
          if (flag === color || flag === -color) {
            place = { x: x, y: y, color: color, score: 0 }
            place.score = Analyser.getPlaceScore(this.board, place)
            openlist.push(place)
            return
          }
        }
      }
    })

    openlist.forEach((place, index) => {
      const center = this.board.size / 2
      openlist[index].score -= (Math.pow(place.x - center, 2) + Math.pow(place.y - center, 2)) * 0.1 + Math.random()
    })

    // 排序以做启发式搜索
    openlist.sort((a, b) => { return b.score - a.score })
    // return this.canPlacesList
    return openlist
  }

  /** 可以单独做为一个五子棋AI来使用，但效果不好 */
  run (color, callback) {
    setTimeout(() => {
      const best = this.getNexts(color)[0]
      callback(best)
    }, 20)
  }
}

export {
  GreedAI
}
