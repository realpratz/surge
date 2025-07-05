---
title: "Module-8: Binary Search"
description: This module introduces Binary Search as a powerful technique for solving problems by smart guessing, often used when direct computation is difficult or impossible.
---
-----

### 8.A: Binary Search

Binary search is a technique of solving problems where instead of computing the answer directly, you arrive at it with smart guessing. It is generally used in cases where computing the answer directly is impossible or is difficult to implement. So, what is the smart guessing used in binary search? Let us see with the help of a game.

### 8.B: Guess the Number Game

Your friend thinks of a number from 1 to 1000, and asks you to guess what that number is. Every time you make a guess, your friend will reply in one of the following ways:

1.  The number I am thinking of is greater.
2.  The number I am thinking of is lesser.
3.  You have correctly guessed the number\!

This is a problem where there is no direct solution, as it is impossible to read your friend's mind. Let us see how the game unfolds with a random guessing strategy. At each turn, we keep track of the smallest range within which the number should lie.

The following table shows a random guessing strategy:

| Turn | Guess      | Friend's Reply | Range       |
| :--- | :--------- | :------------- | :---------- |
| 1.   | Is it 932? | Lesser         | [1, 931]    |
| 2.   | Is it 291? | Greater        | [292, 931]  |
| 3.   | Is it 816? | Lesser         | [292, 815]  |
| 4.   | Is it 365? | Greater        | [366, 816]  |
| 5.   | Is it 672? | Greater        | [673, 816]  |
| 6.   | Is it 799? | Lesser         | [673, 798]  |
| 7.   | Is it 702? | Greater        | [703, 798]  |
| 8.   | Is it 726? | Greater        | [727, 798]  |
| 9.   | Is it 778? | Lesser         | [727, 777]  |
| 10.  | Is it 745? | Greater        | [746, 777]  |
| 11.  | Is it 753? | Greater        | [754, 777]  |
| 12.  | Is it 763? | Greater        | [764, 777]  |
| 13.  | Is it 772? | Lesser         | [764, 773]  |
| 14.  | Is it 765? | Greater        | [766, 773]  |
| 15.  | Is it 770? | Lesser         | [766, 769]  |
| 16.  | Is it 767? | Greater        | [768, 769]  |
| 17.  | Is it 769? | Correct\!       | [769, 769]  |

Painful to read, right? 17 guesses is not too bad, but there is a smarter way to guess that ensures that the answer is found within 10 guesses. And that smarter way is employing binary search.

The following table shows the binary search strategy:

| Turn | Guess      | Friend's Reply | Range         |
| :--- | :--------- | :------------- | :------------ |
| 1.   | Is it 500? | Greater        | [501, 1000]   |
| 2.   | Is it 750? | Greater        | [751, 1000]   |
| 3.   | Is it 875? | Lesser         | [751, 874]    |
| 4.   | Is it 812? | Lesser         | [751, 811]    |
| 5.   | Is it 781? | Lesser         | [751, 780]    |
| 6.   | Is it 765? | Greater        | [766, 780]    |
| 7.   | Is it 773? | Lesser         | [766, 772]    |
| 8.   | Is it 769? | Correct\!       | [769, 769]    |

As you can see, the smart guessing that we are employing in binary search is nothing more than always guessing the number that is the midpoint of the search space at that point of time.

For example, at the point of time when we know that the answer is in the range [751, 874], we guess $(751+874)/2=812$ (after rounding down).

### 8.C: Efficiency of Binary Search

For the guessing the number problem, we mentioned that using binary search, we can arrive at the solution in no more than 10 guesses.

How did we get this number? The key observation is that in binary search, at every step preceding the last one, the range of possible values is halved. Since the original range consisted of 1000 numbers, the maximum number of guesses required is the least number p such that $2^p \>= 1000$. It so happens that this p is 10 ($2^{10} = 1024$).

To generalise, binary search has a time complexity of $O(\log(n))$, since we will be making a maximum of $\log(n)$ guesses and each guess is of $O(1)$ time complexity. Note that in other problems, one guess might be of $O(n)$ complexity, thus making the algorithm as a whole $O(n \log(n))$.

### 8.D: External Resources

  * [USACO Guide](https://usaco.guide/)
  * [Implementing binary search](https://www.geeksforgeeks.org/binary-search/)
  * [Ternary search](https://www.geeksforgeeks.org/ternary-search/)
  * [Finding square root using BS](https://www.geeksforgeeks.org/square-root-using-binary-search/)
  * [Finding peak element](https://www.geeksforgeeks.org/find-a-peak-element-in-a-given-array/)
  * [lower\_bound() and upper\_bound()](https://www.geeksforgeeks.org/binary-search-using-stl-in-c/)

### 8.E: Maximising Median Problem

You are given an array of n integers and an integer k. You are allowed to perform k operations on the array, and in each operation, you can increase one of the integers in the array by 1. Your task is to find the maximum median of the array that you can end up with after performing the k operations. This problem can be solved using binary search. Try to come up with the approach yourself before turning to the next slide.

Consider the array $[6,2,3,1,4,4,2,8,1]$ and let $k=10$. Since we are dealing with medians, let us sort the array. The sorted array is $[1,1,2,2,3,4,4,6,8]$. Let us say that we guess that the maximum median obtain is 7. Is it possible to obtain a median of 7 by performing at most 10 increments? Let us find out\! For the median of the array to be 7, the following conditions must be met:

1.  The element in the middle (the fifth element) is 7.
2.  The elements to the right (elements six to nine) are greater than or equal to 7.

Bearing in mind the two conditions, let us find the minimum number of increments.

Original Array:  
[ 1 , 1 , 2 , 2 , 3 , 4 , 4 , 6 , 8 ]

Target Median (7) and elements to its right \>= 7:  
[ 1 , 1 , 2 , 2 , 7 , 7 , 7 , 7 , 8 ]

Increments required for elements to reach 7 or stay \>= 7:  
\+4 +3 +3 +1 +0 = 11

Since obtaining a median of 7 requires at least 11 operations, it is not attainable. Therefore, we now know that the upper limit of our answer is 6.

What if, instead, 7 required only 8 operations and was therefore attainable? In that case, we would conclude that the lower limit of our answer is 7. Take some time to think about this for a while.

Here's a C++ code implementation for the Maximising Median Problem:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Taking input
    int n, k;
    cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a.begin(), a.end()); // Sorting the array to get it in the right form

    int l = 1, r = 1000000000; // Setting limits
    while (l < r) { // Keep searching as long as the size of the search space is non-zero
        int c = (l + r + 1) / 2; // Making the guess
        long long required = 0;
        // Calculating the increment element-wise
        for (int i = (n - 1) / 2; i < n; i++) required += max(0, c - a[i]);
        if (required > k) r = c - 1; // If it takes more than available operations
        else l = c; // If attainable with k operations
    }

    cout << l << '\n'; // Final result
    return 0;
}
```

### Practice Problems

  * [Codeforces 1201C: Maximum Median](https://codeforces.com/problemset/problem/1201/C)
  * [Codeforces 371C: Hamburgers](https://codeforces.com/problemset/problem/371/C)
  * [Codeforces 1612C: Chat Ban](https://codeforces.com/problemset/problem/1612/C)
  * [Codeforces 165B: Burning Midnight Oil](https://codeforces.com/problemset/problem/165/B)
  * [Codeforces 1742E: Scuza](https://codeforces.com/problemset/problem/1742/E)
  * [Codeforces 1463A: Dungeon](https://codeforces.com/problemset/problem/1463/A)
  * [Codeforces 1221C: Perfect Team](https://codeforces.com/problemset/problem/1221/C)
  * [Codeforces 1850E: Cardboard for Pictures](https://codeforces.com/problemset/problem/1850/E)