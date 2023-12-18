const fs = require('fs')

/* Stella Marie */

const sm_fr_sam = strs => {
    const map = new Map()
    for (const str of strs) {
        const sorted = str.split('').sort().join('')

        if (map.has(sorted))
            map.set(sorted, map.get(sorted).concat(str))
        else
            map.set(sorted, [str])
    }
    return Array.from(map.values())
}

const isAnagram = (s, t) => {
    if (!s.length && s === t)
        return true
    else if (!s.length)
        return false
    else if (s.length !== t.length)
        return false

    const map = {}
    for (const c of t)
        map[c] = (map[c] || 0) + 1
    
    for (const c of s)
        if (!map[c] || map[c] === 0)
            return false
        else
            map[c]--

    return true
}

// Lower bound: n ** 3, upper bound: n ** 4
const sm_1 = strs => {
    const arr = []
    for (const str of strs) {
        let isAna = false
        for (const ana of arr) 
            if (isAnagram(ana[0], str)) {
                ana.push(str)
                isAna = true
            }

        if (!isAna)
            arr.push([str])
    }
    return arr
}

const sm_2 = strs => Object.values(strs.reduce((acc, v) => {
    const sorted = v.split('').sort().join('')
    acc[sorted] = (acc[sorted] || []).concat(v)
    return acc
}, {}))

/* Sam */

// --------------------------------------------------------------------------------------

const solutions = {
    'stella_marie': {},
    'sam': {}
}

const tests = [
    { 
        ipt: ["eat","tea","tan","ate","nat","bat"], 
        res: [["bat"],["nat","tan"],["ate","eat","tea"]]
    },
    {
        ipt: [""],
        res: [[""]]
    },
    {
        ipt: ["a"],
        res: [["a"]]
    },
    {
        ipt: ["","b"],
        res: [["b"],[""]]
    },
    {
        ipt: ["",""],
        res: [["",""]]
    },
    {
        ipt: ["","b",""],
        res: [["b"],["",""]]
    },
    {
        ipt: ["eat","tea","tan","ate","nat","bat","ac","bd","aac","bbd","aacc","bbdd","acc","bdd"],
        res: [["bdd"],["bat"],["nat","tan"],["ac"],["ate","eat","tea"],["bd"],["aac"],["bbd"],["aacc"],["bbdd"],["acc"]]
    }
]

const cases = () => {}
const rates = cases()