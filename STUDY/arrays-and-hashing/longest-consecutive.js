const fs = require('fs')

/* Stella Marie */

const sm_1 = nums => {
    if (nums.length < 2)
        return nums.length

    nums.sort((a, b) => a - b)
    nums = Array.from(new Set(nums))

    let count = 1, largest = 1
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] === nums[i - 1] + 1)
            count++
        else
            count = 1

        if (count > largest)
            largest = count
    }
    return largest
}

const sm_2 = nums => {
    if (nums.length < 2)
        return nums.length

    nums.sort((a, b) => a - b)

    let last = nums.pop(), count = 1, largest = 1
    while (nums.length) {
        const curr = nums.pop()

        if (last - 1 === curr)
            count++
        else if (last !== curr)
            count = 1

        if (count > largest)
            largest = count
        last = curr
    }
    return largest
}

// --------------------------------------------------------------------------------------

const solutions = {
    'Stella Marie': { sm_1, sm_2}
}

const tests = [
    { ipt: [100,4,200,1,3,2], res: 4 },
    { ipt: [0,3,7,2,5,8,4,6,0,1], res: 9 },
    { ipt: [0,1,1,2], res: 3 }
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
    let lines = ['Longest Consecutive Sequence (arrays and hashing)', '']
 
    lines = lines.concat(write('Stella Marie - Tests', solutions['stella_marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['stella_marie'], false))

    const file = fs.createWriteStream('longest-consecutive.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()