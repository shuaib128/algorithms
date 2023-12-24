const fs = require('fs')

/* Stella Marie */

const sm_1 = s => {
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase().split('')
    const r = s.slice().reverse()
    return s.join('') === r.join('')
}

const sm_2 = s => {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    if (!s.length)
        return true
    let i = 0, j = s.length - 1
    while(s[i] === s[j] && i < j) {
        i++
        j--
    }
    return i >= j
}

const solutions = {
    'Stella Marie': { sm_1, sm_2 }
}

const tests = [
    { ipt: 'A man, a plan, a canal: Panama', res: true },
    { ipt: 'race a car', res: false },
    { ipt: " ", res: true }
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
            const res = fn(test.ipt[0], test.ipt[1])
            const end = performance.now() - start
    
            const testName = type ? test.ipt : test.ipt.length
            const result = res === test.res ? end : 'failed'
            const line = `${key} on ${testName}: ${result}`
            arr.push(line)
        }
        arr.push('')
    }
    return arr
}

const results = () => {
    let lines = ['Valid Palindrome (two pointers)', '']
 
    lines = lines.concat(write('Stella Marie - Tests', solutions['stella_marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['stella_marie'], false))

    const file = fs.createWriteStream('is-palindrome.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()