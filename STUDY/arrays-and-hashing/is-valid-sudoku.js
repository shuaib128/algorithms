const fs = require('fs')

/* Stella Marie */

const sm_1 = board => {
    let sub = (new Array(9)).fill(0)
    const emptySub = sub => sub.map(e => 0)

    // Loop: row y = i, x = [0:9]
    for (let y = 0; y < board.length; ++y) {
        const row = board[y]
        for (const v of row.values())
            if (v !== ".")
                if (sub[v - 1])
                    return false
                else
                    sub[v - 1] = 1
        sub = emptySub(sub)
    }

    // Loop: column x = i, y [0:9]
    for (let x = 0; x < board.length; ++x) {
        for (let y = 0; y < board.length; ++y) {
            const v = board[y][x]
            if (v !== ".")
                if (sub[v - 1])
                    return false
                else
                    sub[v - 1] = 1
        }
        sub = emptySub(sub)
    }

    // Loop: box z = i % 9, y = z / 3, x % 3
    for (let z = 0; z < 3; ++z) {
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 9; ++j) {
                const x = j % 3 + i * 3
                const y = Math.floor(j / 3) + z * 3
                const v = board[y][x]
                if (v !== ".")
                    if (sub[v - 1])
                        return false
                    else
                        sub[v - 1] = 1
            }
            sub = emptySub(sub)
        }
    }

    return true
}

const sm_2 = board => {
    let sub = new Array(9).fill(0)
    const empty = () => sub = sub.map(e => 0)

    for (let u = 0; u < board.length; ++u) {
        // board[u][0:9]
        for (let x = 0; x < board.length; ++x) {
            const v = board[u][x]
            if (v !== '.')
                if (sub[v - 1])
                    return false
                else
                    sub[v - 1] = 1
        }
        empty()

        // board[0:9][u]
        for (let y = 0; y < board.length; ++y) {
            const v = board[y][u]
            if (v !== '.')
                if (sub[v - 1])
                    return false
                else
                    sub[v - 1] = 1
        }
        empty()

        // board[x=[0:3] + i=[0:3]][y=[0:3] + j=[0:3]]
        const i = u % 3
        const j = Math.floor(u / 3)
        for (let z = 0; z < board.length; ++z) {
            const v = board[Math.floor(z / 3) + j * 3][z % 3 + i * 3]
            if (v != '.')
                if (sub[v - 1])
                    return false
                else
                    sub[v - 1] = 1
        }
        empty()
    }

    return true
}

const sm_3 = board => {
    const arrSet = () => {
        const arr = new Array(board.length)
        for (const i of arr.keys())
            arr[i] = new Set()
        return arr
    }

    const map = {
        row: arrSet(),
        col: arrSet(),
        box: arrSet()
    }

    for (const y of board.keys())
        for (const x of board[y].keys()) {
            const v = board[y][x]
            if (v === '.')
                continue;

            const box = Math.floor(y / 3) * 3 + Math.floor(x / 3)
            
            if (map.row[x].has(v) || map.col[y].has(v) || map.box[box].has(v)) 
                return false
            else {
                map.row[x].add(v)
                map.col[y].add(v)
                map.box[box].add(v)
            }
        }

    return true
}

const sm_4 = board => {
    const map = new Map()
    for (const i of board.keys())
        for (const j of board.keys())
            if (board[i][j] !== '.')
                map.set([i, j], board[i][j])

    const tab = { row: {}, col: {}, box: {} }

    for (const [[x, y], v] of map.entries()) {
        const b = Math.floor(y / 3) * 3 + Math.floor(x / 3)

        if (!tab.row[x]) tab.row[x] = {}
        if (!tab.col[y]) tab.col[y] = {}
        if (!tab.box[b]) tab.box[b] = {}

        if (tab.row[x][v] || tab.col[y][v] || tab.box[b][v])
            return false
        
        tab.row[x][v] = 1
        tab.col[y][v] = 1
        tab.box[b][v] = 1
    }

    return true
}

const sm_5 = board => {
    const tab = { x: new Array(9), y: new Array(9), b: new Array(9) }
    for (const y of board.keys())
        for (const x of board.keys())
            if (board[y][x] !== '.') {
                const v = board[y][x]

                if (tab.x[x] && tab.x[x].has(v))
                    return false
                else if (!tab.x[x])
                    tab.x[x] = new Set()
                tab.x[x].add(v)

                if (tab.y[y] && tab.y[y].has(v))
                    return false
                else if (!tab.y[y])
                    tab.y[y] = new Set()
                tab.y[y].add(v)

                const b = Math.floor(y / 3) * 3 + Math.floor(x / 3)
                if (tab.b[b] && tab.b[b].has(v))
                    return false
                else if (!tab.b[b])
                    tab.b[b] = new Set()
                tab.b[b].add(v)
            }
    return true
}

const sm_6 = board => {
    const arr = new Array(board.length)
    for (let y = 0; y < board.length; ++y)
        for (let x = 0; x < board.length; ++x)
            if (board[y][x] !== '.') {
                const b = Math.floor(y / 3) * 3 + Math.floor(x / 3)

                let v = board[y][x]
                if (!arr[v - 1]) {
                    arr[v - 1] = { x: new Set([x]), y: new Set([y]), b: new Set([b]) }
                    continue;
                }

                v = arr[v - 1]
                
                if (v.x.has(x) || v.y.has(y) || v.b.has(b))
                    return false

                v.x.add(x)
                v.y.add(y)
                v.b.add(b)
            }
    return true
}

const solutions = {
    'Stella Marie': { sm_1, sm_2, sm_3, sm_4, sm_5, sm_6 }
}

const tests = [
    { 
        ipt: [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]],
        res: true
    },
    {
        ipt: [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]],
        res: false
    },
    {
        ipt: [[".",".",".",".",".",".","5",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],["9","3",".",".","2",".","4",".","."],[".",".","7",".",".",".","3",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".","3","4",".",".",".","."],[".",".",".",".",".","3",".",".","."],[".",".",".",".",".","5","2",".","."]],
        res: false
    }
]

const cases = () => {}
const rates = cases()

const write = (title, sol, type) => {
    let arr = [title, '']
    for (const key in sol) {
        const data = type ? tests.values() : rates.values()
        const fn = sol[key]
        for (const test of data) {
            const start = performance.now()
            const res = fn(test.ipt)
            const end = performance.now() - start
    
            const testName = test.ipt.reduce((acc, v) => {
                if (v !== ".")
                    acc++
                return acc
            }, 0)
            const result = type? 
                res === test.res ? 'passed' : 'failed'
                : res === test.res ? end : 'failed'
            const line = `${key} on ${testName}: ${result}`
            arr.push(line)
        }
        arr.push('')
    }
    return arr
}

const results = () => {
    let lines = ['Is Valid Sudoku (arrays and hashing)', '']

    lines = lines.concat(write('Stella Marie - Tests', solutions['Stella Marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['Stella Marie'], false))

    const file = fs.createWriteStream('is-valid-sudoku.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()