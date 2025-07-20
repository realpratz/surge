---
title: "Module 9: Prefix Arrays"
description: "A comprehensive guide to prefix arrays, an optimized solution for range sum queries in arrays."
---

---

### 9.A: Background

When working with arrays, a common task is to find the sum of elements within a specific range. You are given an array of $n$ integers and then asked $q$ queries. Each query provides a pair of integers $(l, r)$, and you need to determine the sum of all array elements at indices $l \le i \le r$.

Consider the following example array and queries:  
Array: `[1, 3, -2, 5, 2, 3]`

- $(l,r)=(2,3) \rightarrow 3 + (-2) = 1$
- $(l,r)=(1,4) \rightarrow 1 + 3 + (-2) + 5 = 7$
- $(l,r)=(4,5) \rightarrow 5 + 2 = 7$

The simplest solution to this problem involves iterating through the elements from index $l$ to $r$ for each query to calculate the sum. However, this approach has a time complexity of $O(nq)$, which can be inefficient for large inputs. Fortunately, there's a faster method with a time complexity of $O(n+q)$.

Here's the C++ code for the simpler, less optimized solution:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int l, r;
        cin >> l >> r;
        l--; // Adjust for 0-based indexing
        r--; // Adjust for 0-based indexing
        long long sum = 0;
        for (int i = l; i <= r; i++) sum += a[i];
        cout << sum << '\n';
    }
    return 0;
}
```

### 9.B: Prefix Sum Arrays

Before diving into the optimized solution, let's understand prefix sum arrays.

A prefix sum array of an array `a` is an array of $(n+1)$ elements where the element at index $i$ is the sum of all elements with indices $k < i$.

Consider the example array: `a = [1, 3, -2, 5, 2, 3]`

Its corresponding prefix sum array `prefix` would look like this:  
`prefix = [0, 1, 4, 2, 7, 9, 12]`

It's evident that the first element of a prefix sum array is always 0, and the last element is the sum of all elements in the original array.

A prefix sum array can be constructed in $O(n)$, using the following recurrence relation:  
`prefix[0] = 0`  
`prefix[i] = prefix[i-1] + a[i-1]`

### 9.C: Using Prefix Sum Arrays to Answer Queries

The first step in solving the query problem is to construct the prefix sum array, in $O(n)$ time.

We then use the prefix sum array to answer each query.

The sum of elements $(l, r)$ can be found using a simple $O(1)$ formula, which is given below:  
Sum of elements in range $(l,r) = prefix[r] - prefix[l-1]$

We encourage you to examine this formula to understand why it works.  
Essentially, `prefix[r]` gives the sum of elements from index 0 to `r-1` (or 1 to `r` in 1-based indexing if `prefix[0]` is for an empty sum), and `prefix[l-1]` gives the sum of elements from index 0 to `l-2` (or 1 to `l-1` in 1-based indexing). Subtracting the latter from the former isolates the sum of elements within the range $[l, r]$.

Here's the optimized C++ code:

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // construct the prefix sum array
    vector<long long> prefix(n + 1);
    prefix[0] = 0;
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + a[i];

    // answer queries
    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int l, r;
        cin >> l >> r;
        // Using 1-based indexing for l and r as per problem statement's example
        // The formula prefix[r] - prefix[l-1] assumes 1-based indexing for l and r
        // and that prefix[i] stores sum up to (i-1)th element of original array
        cout << (prefix[r] - prefix[l - 1]) << '\n';
    }
    return 0;
}
```

### 9.D: External Resources

For further learning, you can refer to:

1.  [USACO Guide](https://usaco.guide/silver/prefix-sums?lang=cpp)
2.  [GFG article](https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/)

### 9.E: Problems

Here is a list of problems to practice your understanding of prefix arrays:

- **9.1:** [https://cses.fi/problemset/task/1661](https://cses.fi/problemset/task/1661)
- **9.2:** [https://codeforces.com/problemset/problem/1215/B](https://codeforces.com/problemset/problem/1215/B)
- **9.3:** [https://codeforces.com/contest/1999/problem/E](https://codeforces.com/contest/1999/problem/E)
- **9.4:** [https://codeforces.com/contest/1398/problem/C](https://codeforces.com/contest/1398/problem/C)
- **9.5:** [https://codeforces.com/contest/433/problem/B](https://codeforces.com/contest/433/problem/B)
- **9.6:** [https://codeforces.com/contest/2033/problem/D](https://codeforces.com/contest/2033/problem/D)
- **9.7:** [https://codeforces.com/problemset/problem/1469/B](https://codeforces.com/problemset/problem/1469/B)
- **9.8:** [https://www.codechef.com/problems/PLPROCESS](https://www.codechef.com/problems/PLPROCESS)
- **9.9:** [https://codeforces.com/contest/1709/problem/B](https://codeforces.com/contest/1709/problem/B)
- **9.10:** [https://www.codechef.com/problems/SUMQ](https://www.codechef.com/problems/SUMQ)
- **9.11:** [https://www.codechef.com/problems/BOUNCEBALL](https://www.google.com/search?q=https://www.codechef.com/problems/BOUNCEBALL)
- **9.12:** [https://codeforces.com/problemset/problem/1779/C](https://codeforces.com/problemset/problem/1779/C)
- **9.13:** [https://codeforces.com/contest/1826/problem/D](https://codeforces.com/contest/1826/problem/D)
- **9.14:** [https://codeforces.com/problemset/problem/2009/F](https://codeforces.com/problemset/problem/2009/F)
- **9.15:** [https://codeforces.com/problemset/problem/1982/C](https://codeforces.com/problemset/problem/1982/C)
- **9.16:** [https://leetcode.com/problems/range-sum-query-2d-immutable/](https://leetcode.com/problems/range-sum-query-2d-immutable/)
