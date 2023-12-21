const fs = require('fs')

/* Stella Marie */

const sm_1 = (nums, k) => {
    const map = {}
    for (const v of nums.values())
        map[v] = (map[v] || 0) + 1
    const keys = Object.keys(map).sort((a, b) => map[b] - map[a])
    const arr = []
    for (let i = 0; i < k; ++i)
        arr.push(keys[i])
    return arr
}

const sm_2 = (nums, k) => {
    const map = new Map()
    for (const v of nums.values())
        map.set(v, (map.get(v) || 0) + 1)

    const list = [...map]
    list.sort((a, b) => b[1] - a[1])

    const arr = []
    for (let i = 0; i < k; ++i)
        arr.push(list[i][0])
    return arr
}

const sm_3 = (nums, k) => {
    const stack = []
    while (nums.length) {
        const v = nums.pop()
        const i = stack.findIndex(e => e[1] === v)

        if (i === -1) {
            stack.unshift([1, v])
            continue;
        }

        const arr = stack.splice(i, 1)[0]
        arr[0]++

        const temp = []
        while (stack.length && stack[stack.length - 1][0] > arr[0]) temp.push(stack.pop())
        stack.push(arr)
        while (temp.length) stack.push(temp.pop())
    }

    const arr = []
    while (--k > -1)
        arr.push(stack.pop()[1])
    return arr
}

const solutions = {
    'Stella Marie': { sm_1, sm_2, sm_3 }
}

const tests = [
    { ipt: { nums: [1,1,1,2,2,3], k: 2 }, res: [1,2] },
    { ipt: { nums: [1], k: 1 }, res: [1] },
    { ipt: { nums: [3,0,1,0], k: 1 }, res: [0] },
    { ipt: { nums: [4,1,-1,2,-1,2,3], k: 2 }, res: [2,-1] }
]