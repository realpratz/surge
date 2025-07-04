---
title: "Module-6: Greedy Algorithms"
description: "An introduction to greedy algorithms, their application, shortcomings, and a list of practice problems."
---
----
## 6.A: What is a greedy algorithm?

In technical terms, a greedy algorithm is an approach that follows the problem-solving heuristic of making the **locally optimal choice** at each stage.

Let's break down what a greedy algorithm is with the help of an example problem.

-----

## 6.B: The Least Notes/Coins Problem

Imagine you're at a shop and need to buy an item priced at **x** rupees. You have an infinite supply of notes and coins of each denomination. The goal is to determine the way to select notes/coins to pay the amount using the minimum number of items.

For example, let's say you want to buy something priced at **83 INR**. The available denominations are **1, 2, 5, 10, 20, 50, 100, 200, 500, and 2000**.

-----

## 6.C: The Greedy Solution

A greedy method you could follow is: at each step, pick the largest denomination that is less than or equal to the amount you are left to pay. Repeat this process until the entire amount is paid off.

Here’s how this approach would work for the **x = 83** example:

1.  Remaining amount is **83**. Pick a **50** rupee note. Amount left: 83-50 = **33**.
2.  Remaining amount is **33**. Pick a **20** rupee note. Amount left: 33-20 = **13**.
3.  Remaining amount is **13**. Pick a **10** rupee note. Amount left: 13-10 = **3**.
4.  Remaining amount is **3**. Pick a **2** rupee coin. Amount left: 3-2 = **1**.
5.  Remaining amount is **1**. Pick a **1** rupee coin. Amount left: 1-1 = **0**.

This requires a total of 5 notes/coins. It turns out that this greedy method gives the correct answer for any value of x with the standard Indian currency denominations.

-----

## 6.D: The Shortcomings of Greedy

Greedy algorithms do not always work.

Let's consider the same problem, but with a different currency (let's call it the doubloon) which only has three denominations: **1, 3, and 4**.

You have to pay an amount of **6**. Let's run the greedy algorithm:

1.  Remaining amount is **6**. Pick a **4** doubloon coin. Amount left: 6 - 4 = **2**.
2.  Remaining amount is **2**. Pick a **1** doubloon coin. Amount left: 2 - 1 = **1**.
3.  Remaining amount is **1**. Pick a **1** doubloon coin. Amount left: 1 - 1 = **0**.

According to the greedy algorithm, the minimum number of coins required is 3 (by doing 4 + 1 + 1). However, this is incorrect. The amount of 6 can be reached by using just 2 coins (3 + 3).

Thus, the greedy algorithm fails in this case. The right way to solve this particular problem is using dynamic programming.

When you are faced with a greedy problem in a contest, you must trust your instincts. The best way to build this intuition is by practicing a variety of problems.

-----

### Additional Resources

  * [MIT OCW introductory lecture](https://www.google.com/search?q=https://www.youtube.com/watch%3Fv%3DBPlK_g3R-g8)
  * [GFG's list of greedy problems and their solutions](https://www.geeksforgeeks.org/greedy-algorithms/)

### Practice Problems

  * 6.1: [Codeforces 996A: Hit the Lottery](https://codeforces.com/problemset/problem/996/A)
  * 6.2: [Codeforces 50A: Domino piling](https://codeforces.com/problemset/problem/50/A)
  * 6.3: [Codeforces 520B: Two Buttons](https://codeforces.com/problemset/problem/520/B)
  * 6.4: [Codeforces 1367B: Even Array](https://codeforces.com/problemset/problem/1367/B)
  * 6.5: [Codeforces 1690A: Pedestal](https://codeforces.com/problemset/problem/1690/A)
  * 6.6: [Codeforces 1941B: Rudolf and 121](https://codeforces.com/problemset/problem/1941/B)
  * 6.7: [Codeforces 1370A: Maximum GCD](https://codeforces.com/problemset/problem/1370/A)
  * 6.8: [Codeforces 1857A: Array Coloring](https://codeforces.com/problemset/problem/1857/A)
  * 6.9: [Codeforces 1927A: Make it White](https://codeforces.com/problemset/problem/1927/A)
  * 6.10: [Codeforces 1992A: Only Pulses](https://codeforces.com/problemset/problem/1992/A)
  * 6.11: [Codeforces 1374C: Move Brackets](https://codeforces.com/problemset/problem/1374/C)
  * 6.12: [Codeforces 1979A: Guess the Maximum](https://codeforces.com/problemset/problem/1979/A)