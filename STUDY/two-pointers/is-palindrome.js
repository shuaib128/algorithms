const fs = require('fs')

/* Stella Marie */

const sm_1 = s => {
    s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    let left = 0, right = s.length - 1
    while (left <= right) {
        if (s[left] !== s[right])
            return false
        left++
        right--
    }
    return true
}

const sm_1a = s => {
    s = s.split('')
    for (let i = s.length - 1; i > -1; --i)
        if (/[^a-zA-Z0-9]/.test(s[i]))
            s.splice(i, 1)
        else
            s[i] = s[i].toLowerCase()
    let left = 0, right = s.length - 1
    while (left <= right) {
        if (s[left] !== s[right])
            return false
        left++
        right--
    }
    return true
}

const sm_2 = s => {
    let left = 0, right = s.length - 1
    while (left <= right) {
        while (/[^a-zA-Z0-9]/.test(s[left])) left++
        while (/[^a-zA-Z0-9]/.test(s[right])) right--
        if (left <= right && s[left].toLowerCase() !== s[right].toLowerCase())
            return false
        left++
        right--
    }
    return true
}

const sm_3 = s => {
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase().split('')
    const r = s.slice().reverse()
    return s.join('') === r.join('')
}

const sm_4 = s => {
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
    'Stella Marie': { sm_1, sm_1a, sm_2, sm_3, sm_4 }
}

const tests = [
    { ipt: 'A man, a plan, a canal: Panama', res: true },
    { ipt: 'race a car', res: false },
    { ipt: " ", res: true }
]

const cases = () => {
    const ipt = []

    const alphanum = [[48,57], [65,90], [97,122]]
    const non = [[33,47], [58,64], [91,96], [123,126]]

    const getN = ranges => {
        let count = 0;
        for (let i = 0; i < ranges.length; ++i)
            count += ranges[i][1] - ranges[i][0]
        return count
    }

    const getChar = (hb, ranges) => {
        let j = 0, i = ranges[j][0]
        while (i < ranges[ranges.length - 1][1]) {
            if (hb === 0)
                return String.fromCharCode(i)
            i++
            hb--
            if (i > ranges[j][1]) {
                j++
                i = ranges[j][0]
            }
        }
        return String.fromCharCode(ranges[ranges.length - 1][1])
    }

    const get = (useAlpha) => {
        const chance = Math.floor(Math.random() * 100)
        const arr = useAlpha ? alphanum : chance < 6 ? non : alphanum
        const n = getN(arr)
        const i = Math.floor(Math.random() * n)
        const char = getChar(i, arr)
        return char
    }

    for (let i = 2; i < 7; ++i) {
        const palindrome = new Array(10 ** i)
        const nonPalindrome = palindrome.slice()

        const half = []
        for (let j = 0; j < palindrome.length / 2; ++j) 
            half.push(get())

        const offHalf = half.slice()
        while (offHalf[offHalf.length - 1] === half[half.length - 1])
            offHalf[offHalf.length - 1] = get()

        for (const [ind, v] of half.entries()) {
            palindrome[ind] = v
            nonPalindrome[ind] = v
        }

        let ind = palindrome.length  / 2
        while (half.length)
            palindrome[++ind] = half.pop()

        ind = nonPalindrome.length  / 2
        while (offHalf.length)
            nonPalindrome[++ind] = offHalf.pop()

        ipt.push({ ipt: palindrome.join(''), res: true })
        ipt.push({ ipt: nonPalindrome.join(''), res: false })
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
            const res = fn(test.ipt)
            const end = performance.now() - start
    
            const testName = type ? test.ipt : test.ipt.length
            const result = res === test.res ? end : 'failed'
            if (res !== test.res) {
                console.log(test.ipt)
            }
            const line = `${key} on ${testName}: ${result}`
            arr.push(line)
        }
        arr.push('')
    }
    return arr
}

const results = () => {
    let lines = ['Valid Palindrome (two pointers)', '']
 
    lines = lines.concat(write('Stella Marie - Tests', solutions['Stella Marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['Stella Marie'], false))

    const file = fs.createWriteStream('is-palindrome.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()