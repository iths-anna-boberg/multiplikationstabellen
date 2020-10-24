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
        this.done = 0
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
        cells.forEach((cell,i) =>{
            
            if (this.arrayRandoms.includes(i)) {
                cell.classList.add('editable')
                cell.innerHTML = ""
                // cell.addEventListener('click', (e)=> {
                //     this.leaveAnswer(e)
                // })
                cell.addEventListener('click', this.leaveAnswer.bind(this))
            }
        })
    }

    createArrayOfRandom () {
        while (this.arrayRandoms.length < this.width){
            let random = Math.floor(Math.random() * (this.width*this.height)+1)
            let forbiddenRandoms = [23, 34, 45, 56, 67, 78, 89, 100, 111]
            if (random>this.width*2 && !forbiddenRandoms.includes(random)) {
                this.arrayRandoms.push(random)
            }
        }  
        console.log(this.arrayRandoms)
        console.log(this.arrayRandoms.length)      
    }

    leaveAnswer (e) {
        let editor = document.createElement('input')
        let td = e.target
        td.innerHTML = ""
        td.appendChild(editor).focus()
        editor.addEventListener('keyup', (event)=>{
            let answer = editor.value
            if(event.key === 'Enter'){
                td.removeChild(editor)
                td.innerHTML = answer
                this.checkAnswer(td)
            }
        })
    }

    checkAnswer (element) {

        if (element.innerHTML == parseInt(element.getAttribute('data'))) {
            alert('Cool!')
            element.className = 'done'
            this.done++
            console.log(this.done)
            // element.removeEventListener('click', this.leaveAnswer.bind(this),true)
            this.checkWin()
        } else {
            alert('Wrong!')
            element.classList.add('wrong')
        }
    }

    checkWin () {
        if (this.done == this.arrayRandoms.length) {
            let winnerMessage = document.createElement('article')
            this.main.appendChild(winnerMessage)
            winnerMessage.className = 'done'
            winnerMessage.innerHTML = `<h2>Grattis! Du klarade spelet!</h2>`
        }
    }


}

let board = new Board()

board.createArrayOfRandom()
