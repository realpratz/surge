---
title: "Module-4: Strings and Math"
description: " This module covers fundamental concepts in strings and various mathematical topics relevant to competitive programming."
---
-----
## 4.A: String Datatype

The easiest way to work with strings and string objects in C++ is via the `std::string` type, which lives in the `<string>` header. Just like normal variables, you can initialize or assign values to `std::string` objects as you would expect.

Using `string` with `cin` may yield some unexpected surprises\! For instance, when using `operator>>` to extract a string from `cin`, it only returns characters up to the first whitespace it encounters. If you enter "John Doe" for a name, `cin` will only read "John".

Here's an example program demonstrating this behavior:

```cpp
#include <iostream>
#include <string>

int main()
{
    std::cout << "Enter your full name: ";
    std::string name{};
    std::cin >> name; // this won't work as expected since std::cin breaks on whitespace

    std::cout << "Enter your favorite color: ";
    std::string color{};
    std::cin >> color;

    std::cout << "Your name is " << name << " and your favorite color is " << color << '\n';
    return 0;
}
```

If we want to find out the size of a string `s`, you can use `s.length()`, which returns the total number of characters in `s`.

## Practice Problems

  * 4.1: Codeforces 1791A: [Codeforces Checking](https://codeforces.com/problemset/problem/1791/A)
  * 4.2: Codeforces 1146A: [Love 'A'](https://codeforces.com/problemset/problem/1146/A)
  * 4.3: Codeforces 855A: [Tom Riddle's Diary](https://codeforces.com/problemset/problem/855/A)

## 4.B: Subarrays, Subsequences, and Substrings

An array is a collection or list of elements of the same datatype, and by definition, a string is an array of characters. When dealing with arrays, you will encounter different terms like subarrays, subsequences, and substrings.

Here's a discussion of the differences between these structures:

1.  **Subarray**

      * **Definition:** A contiguous part of an array.
      * **Properties:** Can be as small as a single element or as large as the entire array.
      * **Example:** For `arr = {1, 2, 3}`, possible subarrays are `(1)`, `(2)`, `(3)`, `(1, 2)`, `(2, 3)`, `(1, 2, 3)`.

2.  **Subsequence**

      * **Definition:** A sequence derived by deleting some or no elements from an array without changing the order of the remaining elements.
      * **Properties:** Not necessarily contiguous.
      * **Example:** For `arr[] = {1, 2, 3}`, possible subsequences are `()`, `(1)`, `(2)`, `(3)`, `(1, 2)`, `(1, 3)`, `(2, 3)`, `(1, 2, 3)`.

3.  **Permutation**

      * **Definition:** An arrangement of all elements of an array in a specific order.
      * **Properties:** Involves reordering.
      * **Example:** For `arr[] = {1, 2, 3}`, permutations are `{1, 2, 3}`, `{1, 3, 2}`, `{2, 1, 3}`, `{2, 3, 1}`, `{3, 1, 2}`, `{3, 2, 1}`.

4.  **Substring**

      * **Definition:** A contiguous sequence of characters within a string.
      * **Properties:** Specific to strings.
      * **Example:** For `str = "abc"`, substrings are `"a"`, `"b"`, `"c"`, `"ab"`, `"bc"`, `"abc"`.

5.  **Set**

      * **Definition:** A collection of distinct elements.
      * **Properties:** No duplicates, order is not guaranteed.
      * **Example:** `set<int> s = {1, 2, 3}`

## More Practice Problems

  * 4.4: Codeforces 1689B: [Mystic Permutation](https://codeforces.com/problemset/problem/1689/B)
  * 4.5: Codeforces 1714B: [Remove Prefix](https://codeforces.com/problemset/problem/1714/B)
  * 4.6: Codeforces 1703B: [ICPC Balloons](https://codeforces.com/problemset/problem/1703/B)

## 4.C: Prime Numbers

Prime numbers are frequently used in competitive programming due to their importance in various algorithms and problem-solving techniques.

### Primality Test

To check whether a number is prime or not, a common algorithm has a time complexity of $O(n \cdot \sqrt{n})$.

### Sieve of Eratosthenes

If you need to generate prime numbers up to `n` or check if `n` numbers are prime, you can use the Sieve of Eratosthenes, which is more efficient for generating multiple primes.

## Even More Practice Problems

  * 4.7: Codeforces 831A: [Factorise N+M](https://codeforces.com/problemset/problem/831/A)
  * 4.8: Codeforces 102267B: [Primes](https://www.google.com/search?q=https://codeforces.com/problemset/problem/102267/B)
  * 4.9: Codeforces 615 C: [Product of Three Numbers](https://codeforces.com/problemset/problem/615/C)

## 4.D: Binary Exponentiation

Binary exponentiation is a technique that allows you to calculate $a^n$ using only $O(\\log n)$ multiplications, instead of the $O(n)$ multiplications required by the naive approach. The idea is to split the work using the binary representation of the exponent.

For example, to calculate $3^{13}$:
The binary representation of 13 is `1101`.
So, $3^{13} = 3^{1101_2} = 3^8 \cdot 3^4 \cdot 3^1$

We can calculate these powers by repeatedly squaring:

$3^1 = 3$

$3^2 = (3^1)^2 = 3^2 = 9$

$3^4 = (3^2)^2 = 9^2 = 81$

$3^8 = (3^4)^2 = 81^2 = 6561$

To get the final answer for $3^{13}$, we multiply the relevant powers (skipping powers corresponding to `0` bits in the binary representation of the exponent): $6561 \cdot 9 \cdot 3$.

The final complexity of this algorithm is $O(\log n)$ because we compute $\log n$ powers of `a` and then perform at most $\log n$ multiplications to get the final answer.

Here's a C++ code snippet for binary exponentiation:

```cpp
long long binpow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```

`b >>= 1` bit shifts `b` once to the right (e.g., `1011` becomes `101`). `b & 1` checks if the 0th bit is set or not (e.g., `1001 & 1` becomes `1`, `1010 & 1` becomes `0`).

## 4.E: Finding GCD and LCM

GCD (Greatest Common Divisor) problems can vary in complexity and application. They generally involve finding the greatest common divisor of one or more integers or applying GCD properties to solve a specific problem. Finding GCD efficiently often involves the Euclidean algorithm.

The LCM (Least Common Multiple) of two numbers is the smallest number that can be divided by both numbers. Finding LCM is very easy if you know the GCD and the following property:
$a \times b = \text{LCM}(a, b) \times \text{GCD}(a, b)$
Therefore, $\text{LCM}(a, b) = (a \times b) / \text{GCD}(a, b)$.

## 4.F: Modular Arithmetic

Sometimes, solutions to problems are so large that they don't even fit into the 8 bytes of a `long long` and will overflow. In such problems, you are usually given a modulo like $10^9 + 7$ (`1000000007`). There are various rules of modular arithmetic that you need to follow when performing operations on numbers that can overflow.

**Modular Addition:**
`(a + b) mod m = ((a mod m) + (b mod m)) mod m`
If you are summing elements of an array `vector<int> v;`, instead of:

```cpp
int sum = 0, mod = 1000000007;
for (int i : v) {
    sum += i;
}
```

you would add like:

```cpp
sum = (sum + i) % m;
```

**Modular Multiplication:**
`(a x b) mod m = ((a mod m) x (b mod m)) mod m`
If you are multiplying elements of an array `vector<int> v;`, instead of:

```cpp
int prod = 0, mod = 1000000007;
for (int i : v) {
    prod *= i;
}
```

you would multiply like:

```cpp
prod = (prod * i) % m;
```

Modular division does not work the same way. You can check this [article on Modular arithmetic](https://www.geeksforgeeks.org/modular-arithmetic/) for details on division and modular exponentiation.

## 4.G: PnC, Series and Sequences, stuff from JEE

Understanding concepts from Permutations and Combinations (PnC), series, and sequences, as covered in the JEE syllabus, can be incredibly useful in competitive coding. PnC provides simple and fast formulas to arrange and count items, which is very useful for problems that involve creating combinations or calculating probabilities. Series and sequences come in handy when you need to recognize patterns or find the sum of terms of something like an Arithmetic Progression (AP) or Geometric Progression (GP). By mastering these mathematical ideas, you can solve coding challenges more effectively, using logical and analytical thinking.

## Final Practice Problems

  * 4.10: Codeforces 1204A: [BowWow and the Timetable](https://codeforces.com/problemset/problem/1204/A)
  * 4.11: Codeforces 1642C: [Division by Two and Permutation](https://codeforces.com/problemset/problem/1642/C)
  * 4.12: Codeforces 1352B: [Same Parity Summands](https://codeforces.com/problemset/problem/1352/B)