const fs = require('fs')

/* Stella Marie */

const sm_1 = nums => {
    const map = {}
    for (let i = 0; i < nums.length; ++i)
        if (map[String(nums[i])])
            return true
        else
            map[nums[i]] = 1
    return false
}

const sm_2 = nums => !((new Set(nums).size === nums.length))

const sm_3 = nums => {
    nums.sort()
    for(let i = 0; i < nums.length - 1; ++i)
        if (nums[i] === nums[i + 1])
            return true
    return false
}

const sm_4 = nums => {
    for (let i = 0; i < nums.length; ++i)
        for (let j = 0; j < i; j++)
            if (nums[i] === nums[j])
                return true
    return false
}

/* Sam */


// ------------------------------------------------------------------------

const solutions = {
    'stella_marie': { sm_1, sm_2, sm_3, sm_4 },
    'sam': {}
}

const tests = [
    { arr: [1,2,3,1], res: true },
    { arr: [1,2,3,4], res: false },
    { arr: [1,1,1,3,3,4,3,2,4,2], res: true }
]

const cases = () => {
    const ipt = []
    for (let i = 2; i < 6; ++i) {
        const n = 10 ** i        
        const arr = new Array(n)
        for (let j = 0; j < n; ++j)
            arr[j] = j
        ipt.push({ arr, res: false })
        ipt.push({ arr: arr.concat([1]), res: true })
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
            const res = fn(test.arr)
            const end = performance.now() - start
    
            const testName = type ? test.arr : test.arr.length
            const result = type ?
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
    let lines = [ 'Contains Duplicates (arrays and hashing)', '']

    lines = lines.concat(write('Stella Marie - Tests', solutions['stella_marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['stella_marie'], false))
    
    lines = lines.concat(write('Sam - Tests', solutions['sam'], true))
    lines = lines.concat(write('Sam - Rates of Growth', solutions['sam'], false))

    const file = fs.createWriteStream('contains-duplicate.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()