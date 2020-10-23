class Board {

    constructor(){
        this.main = document.querySelector('main')
        this.table = document.createElement('table')
        this.rowNumber = 1
        this.main.appendChild(this.table)
        this.drawBoard()
    }

    drawBoard(){
        
        for (let row=0; row<11; row++) {
            
            let tableRow = document.createElement('tr')
            this.table.appendChild(tableRow)
            if (row === 0) {
                for (let i=0; i <11; i++) {
                    if (i === 0) {
                        let empty = document.createElement('td')
                        tableRow.appendChild(empty)
                    }else {
                        let cell = document.createElement('td')
                        tableRow.appendChild(cell)
                        cell.innerHTML = i
                    }
                }
            }
            for (let column = 0; column<11; column++){
                if (column === 0 && row != 0) {
                    let col = document.createElement('td')
                    tableRow.appendChild(col)
                    col.setAttribute('data', this.rowNumber)
                    col.innerHTML = this.rowNumber++
                } else if (row != 0) {
                    let cell = document.createElement('td')
                    let multi = column*row
                    tableRow.appendChild(cell)
                    cell.setAttribute('data', multi)
                    cell.innerHTML = multi
                }
            }

        }
    }
}

let board = new Board()