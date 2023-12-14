/*
Ways to create and populate a loop with its indices
1.  init, for loop, populate
    init, while loop,  populate
    init, for-each loop, populate
2.  init by size, for loop, populate
    init by size, while loop,populate
3.  init arr1, init arr2,
    populate arr2 with arr1 keys
*/

const controller = {
    init_for: function(n) {
        const arr = []
        for(let i = 0; i < n; ++i)
            arr.push(i)
        return arr
    },
    init_while: function(n) {
        const arr = []
        let i = 0
        while (i < n) {
            arr.push(i)
            ++i
        }
        return arr
    },
    init_forEach: function(n) {
        const arr = new Array(n)
        arr.forEach((e, i) => arr[i] = i)
        return arr
    },
    isize_for: function(n) {
        const arr = new Array(n)
        for (let i = 0; i < arr.length; ++i)
            arr[i] = i
        return arr
    },
    isize_while: function(n) {
        const arr = new Array(n)
        let i = 0
        while (i < arr.length) {
            arr[i] = i
            ++i
        }
        return arr
    },
    init_init: function(n) {
        const arr = new Array(n)
        const arr2 = (new Array(n)).fill(...arr.keys())
        return arr2
    }
}

const test = () => {
    const rounds = [100, 1000, 10000, 100000, 1000000]

    const keys = Object.keys(controller)
    for (const key of keys)
        for (const round of rounds) {
            console.time(`${key} on ${round}`)
            controller[key](round)
            console.timeEnd(`${key} on ${round}`)
        }
}

test()