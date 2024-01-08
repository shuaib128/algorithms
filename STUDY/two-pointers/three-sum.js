const sm_1 = nums => {
    const ans = []
    let i = 0, j = nums.length - 2, k = nums.length - 1
    while (i < k) {
        while (j > i) {
            while (j > i && nums[i] + nums[j] + nums[k] != 0) j--
            if (j <= i)
                break;
            const posAns = [nums[i], nums[j], nums[k]]
            let found = false
            for (const v of ans.values()) {
                let count = 0
                for (const av of v.values()) 
                    for (const pv of posAns.values())
                        if (pv !== av)
                            continue;
                        else 
                            count++
                if (count === 3) {
                    found = true
                    break;
                }
            }
            
            if (!found)
                ans.push(posAns)
        }
        i++
        k--
        j = k - 1
    }
}

const sm_2 = nums => {
    const map = []
    for (let i = 0; i < nums.length - 2; ++i) {
        let j = i + 1, k = j + 1
        while (j < nums.length - 1) {
            while (k < nums.length) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    const sol = [nums[i], nums[j], nums[k]].sort((a, b) => a - b)
                    let found = false
                    for (const v of map.values())
                        if (v.join('') === sol.join(''))
                            found = true
                    if (!found)
                        map.push(sol)
                }
                k++
            }
            j++
            k = j + 1
        }
    }
    return map.length ? map : []
}

const sm_3 = nums => {
    nums.sort((a, b) => a - b)
    const map = new Map()
    for (const i of nums.keys()) {
        let j = i + 1, k = nums.length - 1
        while (j < k) {
            const ans = [nums[i], nums[j], nums[k]]
            const sum = nums[i] + nums[j] + nums[k]

            if (sum > 0)
                k--
            else if (sum < 0)
                j++
            else {
                if (!map.has(ans.join('')))
                    map.set(ans.join(''), ans)
                j++
            }
        }
    }
    return Array.from(map.values())
}