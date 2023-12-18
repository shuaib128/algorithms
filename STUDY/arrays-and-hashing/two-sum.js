const fs = require('fs')

/* Stella Marie */

const sm_1 = (nums, target) => {
    if (nums.length === 2)
        return [0, 1]

    for (let i = 0; i < nums.length - 1; ++i) {
        const rem = nums.slice(i + 1)
        for (let j of rem.keys()) {
            if (nums[i] + rem[j] === target)
                return [i, i + j + 1]
        }
    }
}

const sm_2 = (nums, target) => {
    if (nums.length === 2)
        return [0, 1]

    for (const i of nums.keys()) {
        let val = target - nums[i]
        if (nums.includes(val, i + 1))
            return [i, nums.indexOf(val, i + 1)]
    }
}

const sm_3 = (nums, target) => {
    if (nums.length === 2)
        return [0, 1]

    for (const i of nums.keys()) {
        const ind = nums.indexOf(target - nums[i], i + 1)
        if (ind !== -1)
            return [i, ind]
    }
}

const sm_4 = (nums, target) => {
    if (nums.length === 2)
        return [0, 1]

    const num = new Map()
    for (let i of num.keys()) {
        const operand = target - nums[i]
        if (num.get(operand) !== undefined)
            return [num.get(operand), i]
        num.set(nums[i], i)
    }
}

const sm_5 = (nums, target) => {
    if (nums.length === 2)
        return [0, 1]

    const num = { operand: -1 }

    for (let i of nums.keys()) {
        num.operand = target - nums[i]
        if (num[num.operand] !== undefined)
            return [num[num.operand], i]
        num[nums[i] = i]
    }
}

const sm_6 = (nums, target) => {
    if (nums.length === 2)
        return [0, 1]

    return nums.reduce((acc, v, i) => {
        if (!Array.isArray(acc)) {
            if (acc[target - v] !== undefined)
                return [acc[target - v], i]
            acc[v] = i
        }
        return acc
    }, {})
}

/* Sam */

// --------------------------------------------------------------------------------------

const solutions = {
    'Stella Marie': { sm_1, sm_2, sm_3, sm_4, sm_5, sm_6 },
    'Sam': {} 
}

const tests = [
    { ipt: { nums: [2,7,11,15], target: 9 }, res: [0,1] },
    { ipt: { nums: [3,2,4], target: 6 }, res: [1,2] },
    { ipt: { nums: [3,3], target: 6 }, res: [0,1] }
]

const cases = () => {
    const ipt = []
    for (let i = 2; i < 7; ++i) {
        const arr = new Array(10 ** i + 1)

        let n = Math.floor(10 ** i / 2)
        for (const i of arr.keys())
            arr[i] = i - n

        ipt.push({ 
            ipt: { nums: arr, target: 10 ** i }, 
            res: [arr.length - 3, arr.length - 1] 
        })
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
            const res = fn(test.ipt.nums, test.ipt.target)
            const end = performance.now() - start

            const testName = type ? 'nums: ' + test.ipt.nums + ', target: ' + test.ipt.target : test.ipt.nums.length
            const result = type ?
                res.toString() === test.res.toString() ? 'passed' : 'failed'
                : res.toString() === test.res.toString() ? end : 'failed'
            arr.push(`${key} on ${testName}: ${result}`)
        }
        arr.push('')
    }
    return arr
}

const results = () => {
    let lines = ['Two Sum (arrays and hashing)', '']

    lines = lines.concat(write('Stella Marie - Tests'), solutions['Stella Marie'], true)
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['Stella Marie'], false))

    const file = fs.createWriteStream('two-sum.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()