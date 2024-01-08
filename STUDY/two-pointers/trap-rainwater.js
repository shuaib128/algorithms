const sm_1 = height => {
    let sum = 0, lowerBound = 0, upperBound = lowerBound + 1
    while (lowerBound < height.length) {
        while (lowerBound === 0) lowerBound++
        upperBound = lowerBound + 1

        while (upperBound === 0 || height[upperBound] < height[lowerBound]) upperBound++
        if (upperBound > height.length - 1) {
            lowerBound++
            continue;
        }

        const min = Math.min(height[lowerBound], height[upperBound])

        let p = lowerBound + 1
        while (p < upperBound)
            sum += min - height[p]

        lowerBound = upperBound
        upperBound = lowerBound + 1
    }
    return sum
}

const sm_2 = height => {
    let lowerBound = -1
    let upperBound = height.length
    while (height[++lowerBound] <= height[lowerBound + 1]);
    while (height[--upperBound] <= height[upperBound - 1]);

    let peaks = [lowerBound], minBound = Math.min(height[lowerBound], height[upperBound])
    for (let i = lowerBound + 1; i < upperBound; ++i) {
        if (height[i] >= minBound)
            peaks.push(i)
        while (height[i + 1] >= minBound) i++
    }
    if (peaks[peaks.length - 1] != upperBound - 1)
        peaks.push(upperBound)
    console.log(peaks)

    let sum = 0
    let pointer = 0
    let p
    while (pointer + 1 < peaks.length) {
        const min = Math.min(height[peaks[pointer]], height[peaks[pointer + 1]])
        p = peaks[pointer]
        while (++p < peaks[pointer + 1])
            sum += min - height[p]
        pointer++
    }
    return sum
}