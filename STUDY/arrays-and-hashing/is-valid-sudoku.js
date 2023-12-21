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

const solutions = {
    'Stella Marie': { sm_1, sm_2 }
}

const tests = [
    { 
        ipt: [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]],
        res: true
    },
    {
        ipt: [["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]],
        res: false
    }
]

const cases = () => {}
const rates = cases()