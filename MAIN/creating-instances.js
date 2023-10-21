const n = [100, 1000, 10000, 100000, 1000000]

const Function = function(val) { this.__val = val }


class Class {
    constructor(val) {
        this.__val = val
    }
}

const Factory = (val) => ({ __val: val })

for (let i = 0; i < n.length; ++i) {
    console.time(`Function on ${n[i]}`)
    for(let k = 0; k < n[i]; ++k)
        new Function(1)
    console.timeEnd(`Function on ${n[i]}`)

    console.time(`Class on ${n[i]}`)
    for (let k = 0; k < n[i]; ++k)
        new Class(1)
    console.timeEnd(`Class on ${n[i]}`)

    console.time(`Factory on ${n[i]}`)
    for (let k = 0; k < n[i]; ++k)
        Factory(1)
    console.timeEnd(`Factory on ${n[i]}`)
}

/* This is speed. The relevant metric is memory consumption. */