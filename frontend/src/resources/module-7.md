---
title: "Module-7: Two Pointers and Sliding Window"
description: "Explore the Two Pointers and Sliding Window techniques for optimizing algorithm complexities from O(n^2) to O(n) or O(nk) to O(n)."
---

---

### 7.A: Two Pointers

The Two Pointers technique is a powerful method used to enhance the efficiency of solutions for specific problems, often reducing their time complexity from $O(n^2)$ to $O(n)$.

The name itself comes from the usage of moving 'pointers' that traverse across the array. These pointers move in a single direction (either both move left, or one move lefts and the other right).

It's important to note that when implementing two pointers, integers are used as 'pointers' to keep track of indices, and not the actual C/C++ pointers that you must have learnt about in CS F111.

### 7.B: Two-sum Problem

The two-sum problem is a standard CC problem. Given a sorted array of $n$ integers and an integer $x$, the task is to find a pair of integers from the array that sum upto $x$.

A naive approach would involve iterating through all possible $nC2$ pairs of integers from the array and seeing if they add up to $x$. This solution is of $O(n^2)$ complexity. The next better solution is by using a set and this has $O(n \log n)$ solution (we encourage you to try to come up with this solution yourself). There is an even better way to solve this problem, using two pointers.

To summarise the two pointers solution to the problem here:

1.  You initialise two pointers - one at the left end, and the other at the right end.
2.  For each position of the left pointer, you keep moving the right pointer to the left as long as the integers the pointers point to give a sum greater than $x$.
3.  If the pointers end up in a state where they give a sum of $x$, you have found your solution.
4.  Otherwise, you move the left pointer to the right and continue.

Let's look at a C++ example:

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, x;
    cin >> n >> x;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, r = n - 1;
    while (l < r) {
        while ((r > l) && ((a[l] + a[r]) > x)) r--;
        if ((l < r) && ((a[l] + a[r]) == x)) {
            cout << a[l] << " " << a[r] << '\n';
            return 0;
        }
        l++;
    }
    return 0;
}
```

### 7.C: Amortized Analysis

The code makes it seem like the solution is of $O(n^2)$ complexity, as there is a while loop nested within another. So, how is the solution $O(n)$? We arrive at the $O(n)$ complexity through something amortized analysis. Since each pointer traverses a maximum of $n$ positions, we conclude that the solution is $O(n)$.

### 7.D: Maximum Difference Problem

Given a sorted array of integers and integer $x$, your task is to find the number of pairs of integers from the array such that their difference is less than or equal to $x$. This problem can also be solved using two pointers, except in this case, both pointers move in the same direction.

The approach is as follows:

1.  Initialise both pointers to the start of the array.
2.  For each position of the left pointer, move the right pointer to the right as long as the difference between the numbers that they point to is less than or equal to $x$.
3.  After the right pointer reaches its limit, add the difference between the positions of the two pointers to the answer.
4.  After adding the difference, move the left pointer to the right and repeat the process. This continues till the left pointer reaches the end.

Let's visualize the process:

**1. Initialise the pointers**  
1 2 2 3 4 6 7 7  
`^`  
`^`

**2. Move the right pointer till diff \> 2**  
1 2 2 3 4 6 7 7  
`^`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`^`

**3. Move the left pointer one step**  
1 2 2 3 4 6 7 7  
&nbsp;&nbsp;`^`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`^`

**4. Move the right pointer till diff \> 2**  
1 2 2 3 4 6 7 7  
&nbsp;&nbsp;`^`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`^`

**5. Repeat till the left pointer hits the end**

### 7.E: Sliding Window

Sliding window problems are a class of problems where you need to find something for a fixed length subarray of a given array. For example, let us say that you are given an array of integers and are asked to find the largest sum of a subarray of length $k$.

The naive way to solve this problem is to iterate over different starting positions and calculate the sum of elements of the $k$-length subarray starting from those positions independent of each other. This solution has a time complexity of $O(nk)$. You can solve this problem in $O(n)$ using a sliding window.

The core idea of the sliding window technique is to maintain a "window" of a fixed size and efficiently update its properties (like sum) as it slides across the array.

Here's how it works for finding the largest sum of a $k$-length subarray:

**1. Calculate the sum of the first k elements**  
Array: `4 2 -1 3 5 -3 7 1` (let k=5)  
`S = 4 + 2 + (-1) + 3 + 5 = 13`

**2. Since we have to move the window to the right, add the next element**  
Array: `4 2 -1 3 5 -3 7 1`  
Current window sum: `13`  
Add next element: `-3`  
`S = 13 + (-3) = 10`

**3. Subtract the first element as it no longer belongs to the window**  
Array: `4 2 -1 3 5 -3 7 1`  
Current window sum: `10`  
Subtract first element of previous window: `4`  
`S = 10 - 4 = 6`

**4. With just two operations, the sum of the next k-length subarray has been obtained\! Repeat the process to find the sum of the other k-length subarrays**.  
Array: `4 2 -1 3 5 -3 7 1`

Here's a C++ implementation for finding the maximum sum of a fixed-length subarray:

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int sum = 0;
    // Calculate sum of the first window
    for (int i = 0; i < k; i++) sum += a[i];
    int result = sum;
    // Slide the window
    for (int i = k; i < n; i++) {
        sum += a[i];     // Add the new element
        sum -= a[i - k]; // Remove the element leaving the window
        result = max(result, sum); // Update the maximum sum
    }
    cout << result << '\n';
    return 0;
}
```

### Practice Problems

Here are some competitive programming problems that can be solved using Two Pointers or Sliding Window techniques:

- [Codeforces 1840C: Ski Resort](https://codeforces.com/contest/1840/problem/C)
- [Codeforces 1972A: Contest Proposal](https://codeforces.com/contest/1972/problem/A)
- [Codeforces 1968B: Prefiquence](https://codeforces.com/problemset/problem/1968/B)
- [Codeforces 2000D: Right Left Wrong](https://codeforces.com/contest/2000/problem/D)
- [Codeforces 1547C: Pair Programming](https://codeforces.com/problemset/problem/1547/C)
- [Codeforces 2000B: Seating in a Bus](https://codeforces.com/contest/2000/problem/B)
- [Codeforces 1995B1: Bouquet (Easy Version)](https://codeforces.com/contest/1995/problem/B1)
- [Codeforces 978C: Letters](https://codeforces.com/problemset/problem/978/C)
- [Codeforces 616D: Longest k-Good Segment](https://codeforces.com/problemset/problem/616/D)
- [AtCoder 194E: Mex-Min](https://atcoder.jp/contests/abc194/tasks/abc194_e)
