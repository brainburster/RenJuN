import { Controller, EState } from './controller'

const main = () => {
  const setting = document.getElementById('app-setting')
  const canvas = document.getElementById('app-canvas')
  const btnAiFrist = document.getElementById('btn-ai-frist')
  const info = document.getElementById('board-info')
  const btnUndo = document.getElementById('btn-board-undo')
  const btnDebug = document.getElementById('btn-board-debug')
  const sizeRange = document.getElementById('board-size')
  const nWinRange = document.getElementById('board-nwin')
  const depthRange = document.getElementById('board-depth')
  const breadthRange = document.getElementById('board-breadth')
  const timelimitRange = document.getElementById('board-timelimit')
  const sizeLabel = document.getElementById('board-size-value')
  const nWinLabel = document.getElementById('board-nwin-value')
  const depthLabel = document.getElementById('board-depth-value')
  const breadthLabel = document.getElementById('board-breadth-value')
  const timelimitLabel = document.getElementById('board-timelimit-value')
  const titleLabel = document.getElementById('title-value')
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  titleLabel.innerHTML = `<span style="color:red;">${nWinRange.value}</span>-${chineseNumbers[nWinRange.value]}`

  // new Controller()
  const controller = new Controller(canvas, info, btnAiFrist, sizeRange.valueAsNumber, nWinRange.valueAsNumber, breadthRange.valueAsNumber, depthRange.valueAsNumber, timelimitRange.valueAsNumber * 100)

  depthRange.onmouseup = depthRange.oninput = (e) => {
    depthLabel.innerText = depthRange.value
    controller.depth = Math.max(0, depthRange.valueAsNumber)
  }
  breadthRange.onmouseup = breadthRange.oninput = (e) => {
    breadthLabel.innerText = breadthRange.value
    controller.breadth = Math.max(1, breadthRange.valueAsNumber)
  }
  timelimitRange.onmouseup = timelimitRange.oninput = (e) => {
    timelimitLabel.innerText = timelimitRange.valueAsNumber * 100
    controller.timelimit = Math.max(100, timelimitRange.valueAsNumber * 100)
  }
  nWinRange.onmouseup = nWinRange.oninput = (e) => {
    nWinLabel.innerText = nWinRange.value
    controller.changeNWin(nWinRange.valueAsNumber)
    titleLabel.innerHTML = `<span style="color:red;">${nWinRange.value}</span>-${chineseNumbers[nWinRange.value]}`
  }
  sizeRange.onmouseup = sizeRange.oninput = (e) => {
    const value = isNaN(sizeRange.valueAsNumber) ? 15 : sizeRange.valueAsNumber
    sizeLabel.innerText = value
    nWinRange.value = value < 5 ? value : 5
    nWinRange.oninput(e)
    controller.changeSize(value)
    controller.state = EState.start
  }
  btnUndo.onclick = (e) => {
    controller.undo()
  }
  btnDebug.onclick = (e) => {
    btnDebug.value = controller.changeMode()
  }
  info.onclick = setting.onclick = function (e) {
    if (e.target.id !== this.id) {
      return
    }
    this.style.height === '20px'
      ? this.style.height = 'auto'
      : this.style.height = '20px'
  }
}

window.onload = (e) => {
  main()
}
