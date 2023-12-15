const fs = require('fs')

/* Stella Marie */

const sm_1 = (s, t) => {
    if (s.length !== t.length) return false

    s = s.split('').sort().join('')
    t = t.split('').sort().join('')

    return s === t
}

// Be careful: O(n!)
const sm_2 = (s, t) => {
    if (s.length !== t.length) return false

    t = t.split('')
    for (let i = 0; i < s.length; ++i) {
        const index = t.findIndex(e => e === s[i])
        if (index > -1)
            t.splice(index, 1)
        else
            return false
    }

    return Boolean(t.length)
}

const sm_3 = (s, t) => {
    if (s.length !== t.length) return false

    const map = new Map()
    for (const c of t)
        map.set(c, (map.get(c) || 0) + 1)

    for (const c of s)
        if (!map.has(c) || map.get(c) === 0)
            return false
        else
            map.set(c, map.get(c) - 1)

    return true
}

const sm_4 = (s, t) => {
    if (s.length !== t.length) return false

    const map = {}
    for (const c of t)
        map[c] = (map[c] || 0) + 1

    for (const c of s) {
        if (!map[c] || map[c] === 0)
            return false
        map[c]--
    }

    return true
}

/* Sam */

// --------------------------------------------------------------------------------------

const solutions = {
    'stella_marie': {sm_1, sm_2, sm_3, sm_4},
    'sam': {}
}

const tests = [
    { ipt: ["anagram", "nagaram"], res: true },
    { ipt: ["rat", "car"], res: false }
]

const cases = () => {
    const ipt = []
    for (let i = 2; i < 7; ++i) {
        const arr = new Array(10 ** i)

        let k = 0
        for (let j = 0; j < arr.length; ++j) {
            arr[j] = String.fromCharCode(k + 65)
            k++
            if (k + 65 > 90)
                k = 0
        }

        const offArr = arr.slice()
        offArr.pop()
        if (++k + 65 > 90)
            k = 0
        offArr.push(String.fromCharCode(k + 65))

        arr_str = arr.join('')
        off_str = offArr.join('')

        ipt.push({ ipt: [arr_str, arr_str], res: true })
        ipt.push({ ipt: [arr_str, off_str], res: false })
    }
    return ipt
}
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
    
            const testName = type ? test.ipt : test.ipt[0].length
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
    let lines = ['Is Anagram (arrays and hashing)', '']
 
    lines = lines.concat(write('Stella Marie - Tests', solutions['stella_marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['stella_marie'], false))

    lines = lines.concat(write('Sam - Tests', solutions['sam'], true))
    lines = lines.concat(write('Sam - Rates of Growth', solutions['sam'], false))

    const file = fs.createWriteStream('is-anagram.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()