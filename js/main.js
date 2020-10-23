class Board {

    constructor(){
        this.main = document.querySelector('main')
        this.table = document.createElement('table')
        this.rowNumber = 1
        this.main.appendChild(this.table)
        this.arrayRandoms = []
        this.width = 11
        this.height = 11
        this.drawEditableBoard()
    }

    drawBoard(){
        
        for (let row=0; row<this.height; row++) {
            
            let tableRow = document.createElement('tr')
            this.table.appendChild(tableRow)
            if (row === 0) {
                for (let i=0; i <this.height; i++) {
                    if (i === 0) {
                        let empty = document.createElement('td')
                        tableRow.appendChild(empty)
                    }else {
                        let cell = document.createElement('td')
                        tableRow.appendChild(cell)
                        cell.innerHTML = i
                        cell.setAttribute('data', i)
                    }
                }
            }
            for (let column = 0; column<this.width; column++){
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

    drawEditableBoard() {
        this.drawBoard()
        this.createArrayOfRandom()
        let cells = document.querySelectorAll('td')
        cells.forEach(cell =>{
            if(this.arrayRandoms.includes(parseInt(cell.getAttribute('data')))){
                cell.classList.add('editable')
                cell.innerHTML = ""
                cell.addEventListener('click', this.leaveAnswer)
            }
        })
    }

    createArrayOfRandom () {
        while (this.arrayRandoms.length < this.width){
            let random = Math.floor(Math.random() * (this.width*this.height)+1)
            if (random>10){this.arrayRandoms.push(random)}
        }
        
    }

    leaveAnswer () {
        let editor = document.createElement('input')
        this.appendChild(editor).focus()
        let answer = ""
        editor.addEventListener('keyup', (e)=>{
            answer = editor.value
            if(e.key === 'Enter'){
                this.removeChild(editor)
                this.innerHTML = answer
            }
        })
    }


}

let board = new Board()

board.createArrayOfRandom()
