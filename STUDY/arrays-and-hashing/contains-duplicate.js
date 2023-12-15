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
    for (let i = 0; i < nums.length; ++i)
        for (let j = 0; j < i; j++)
            if (nums[i] === nums[j])
                return true
    return false
}

const sm_4 = nums => {
    nums.sort()
    for(let i = 0; i < nums.length - 1; ++i)
        if (nums[i] === nums[i + 1])
            return true
    return false
}

/* Sam */

const solutions = {
    sm_1, sm_2, sm_3, sm_4
}

const worst_case = () => {
    const n = Math.floor(Math.random() * 10 ** 4) + 10 ** 6
    const arr = new Array(n)
    arr.forEach((e, i, a) => a[i] = i)
    return arr
}

const tests = [
    { arr: [1,2,3,1], res: true },
    { arr: [1,2,3,4], res: false },
    { arr: [1,1,1,3,3,4,3,2,4,2], res: true },
    { arr: worst_case().concat([1]), res: true },
    { arr: worst_case(), res: false }
]

const test = () => {
    for (const key in solutions)
        for (const test of tests.values()) {
            const start = performance.now()
            const res = solutions[key](test.arr)
            const end = performance.now() - start
            console.log(`${key} on ${test.arr}: ${res === solutions[key].res ? end : 'failed'}`)
        }
}

test()