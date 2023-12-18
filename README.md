# Algorithms

Small experiments in Node.js

## Description

Algorithms

## Included Algorithms

**Video Chat with Screensharing**
[] used : [] usable
- [x][x]    Discord
- [-][x]    Zoom
- [][]      [Whereby](https://whereby.com)
- [][]      [Talky](https://talky.io)

**How to add a solution**
1.  Add solution as independent function named <name|abbr>_<num>, e.g. 
    ``` const sm_1 = input => {} ```
2.  Add name of solution to solutions object (found past divider in file), e.g. 
    ``` const solutions = { '<name>': {<func_name>}, ... } ```
    If you don't see your name in solutions, use your unabbreviated name for the key
3.  If you don't see your name in results(), add the following lines:
    ```js
    lines = lines.concat(write('<name> - Tests', solutions[<name>], true))
    lines = lines.concat(write('<name> - Rates of Growth', solutions[<name>], false))
    ```
4.  Navigate into the local directory (if you haven't already): ``` cd STUDY/<topic> ```
    Generate results using terminal: ```node <filename>.js```

### MAIN

**Array Init**: Test rate of growth for initializing an array filled with the values of its indices

**Creating Instances**: Test rate of growth between declaring prototypes, classes, and factories

**String Int Convert**: How to convert char to int and int to char

### STUDY

Sources:
- [NeetCode 150](https://neetcode.io/practice)
- [Cracking the Coding Interview](./cracking-the-coding-interview-6ed.pdf)
- [Learn How to Program](https://old.learnhowtoprogram.com/computer-science)

Additional sources:
- [Grokking Algorithms](./grokking-algorithms-1ed.pdf)
- Only use [DSA Guide](./dsa-guide.pdf) for review of a concept

**1D Dynamic Programming**
- (none yet)

**2D Dynamic Programming**
- (none yet)

**Advanced Graphs**
- (none yet)

**Arrays and Hashing**
- contains duplicate
- group anagrams
- is anagram
- two sum

**Backtracking**
- (none yet)

**Binary Search**
- (none yet)

**Bit Manipulation**
- (none yet)

**Graphs**
- (none yet)

**Greedy**
- (none yet)

**Heap / Priority Queue**
- (none yet)

**Intervals**
- (none yet)

**Linked Lists**
- (none yet)

**Math and Geometry**
- (none yet)

**Sliding Window**
- (none yet)

**Stack**
- (none yet)

**Trees**
- (none yet)

**Tries**
- (none yet)

**Two Pointers**
- (none yet)

## Schedule

THU 2023.12.14      Arrays & Hashing 1-3 | CCI: Arrays and Strings
                    -- Move pr. 3 to SUN
SUN 2023.12.17      pr. 4-6
MON 2023.12.18      pr. 7-8

TUE 2023.12.19      Two Pointers 1-3
THU 2023.12.21      pr. 4-5

SUN 2023.12.24      Sliding Window 1-3
MON 2023.12.25      pr. 4-6

TUE 2023.12.26      Stack 1-4 | CCI: Stacks and Queues
THU 2023.12.28      pr. 5-7

SUN 2023.12.31      Binary Search 1-4
MON 2024.1.1        pr. 5-7

TUE 2024.1.2        Linked List 1-3 | CCI: Linked Lists
THU 2024.1.4        pr. 4-6
SUN 2024.1.7        pr. 7-9
MON 2024.1.8        pr. 10-11

TUE 2024.1.9        Trees 1-3 | CCI: Trees and Graphs
THU 2024.1.11       pr. 4-6
SUN 2024.1.14       pr. 7-9
MON 2024.1.15       pr. 10-12
TUE 2024.1.16       pr. 13-15

THU 2024.1.18       Tries 1-3

SUN 2024.1.21       Heap / Priority Queues 1-4
MON 2024.1.22       pr. 5-7

TUE 2024.1.23       Backtracking 1-3
THU 2024.1.25       pr. 4-6
SUN 2024.1.28       pr. 7-9

MON 2024.1.29       Graphs 1-4
TUE 2024.1.30       pr. 5-7
THU 2024.2.1        pr. 8-10
SUN 2024.2.4        pr. 11-13

MON 2024.2.5        Advanced Graphs 1-3
TUE 2024.2.6        Advanced Graphs 4-6

THU 2024.2.8        1D Dynamic Programming 1-3 | CCI: Recursion and Dynamic Programming
SUN 2024.2.11       pr. 4-6
MON 2024.2.12       pr. 7-9
TUE 2024.2.13       pr. 10-12

THU 2024.2.15       2D Dynamic Programming 1-3
SUN 2024.2.18       pr. 4-6
MON 2024.2.19       pr. 7-9
TUE 2024.2.20       pr. 10-11

THU 2024.2.22       Greedy 1-3
SUN 2024.2.25       pr. 4-6
MON 2024.2.26       pr. 7-8

TUE 2024.2.27       Intervals 1-3
THU 2024.2.29       pr. 4-6

SUN 2024.3.3        Math & Geometry 1-3
MON 2024.3.4        pr. 4-6
TUE 2024.3.5        pr. 7-8

THU 2024.3.7        Bit Manipulation 1-4
SUN 2024.3.10       pr. 5-7