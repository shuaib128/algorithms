const fs = require('fs')

/* Stella Marie */

const sm_1 = (numbers, target) => {
    if (numbers.length === 2)
        return [1, 2]
    let j = numbers.length - 1
    for (let i = 0; i < numbers.length; ++i) {
        while (i < j && numbers[i] + numbers[j] !== target) j--
        if (numbers[i] + numbers[j] === target)
            return [i + 1, j + 1]
        j = numbers.length - 1
    }
}

const solutions = {
    'Stella Marie': { sm_1 }
}

const tests = [
    { ipt: { numbers: [2, 7, 11, 15], target: 9 }, res: [1, 2]  },
    { ipt: { numbers: [2, 3, 4], target: 6 }, res: [1, 3]  },
    { ipt: { numbers: [-1, 0], target: -1 }, res: [1, 2]  },
    { ipt: { numbers: [5,25,75], target: 100 }, res: [2, 3]  }
]

const cases = () => {
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
    
            const testName = type ? test.ipt.numbers + ', target=' + test.ipt.target : test.ipt.numbers.length
            const result = res === test.res ? end : 'failed'
            const line = `${key} on ${testName}: ${result}`
            arr.push(line)
        }
        arr.push('')
    }
    return arr
}

const results = () => {
    let lines = ['Sorted Two Sum (two pointers)', '']
 
    lines = lines.concat(write('Stella Marie - Tests', solutions['stella_marie'], true))
    lines = lines.concat(write('Stella Marie - Rates of Growth', solutions['stella_marie'], false))

    const file = fs.createWriteStream('sorted-two-sum.txt')
    file.on('error', err => console.error(err))
    lines.forEach(line => file.write(line + '\n'))
    file.end()
}

results()