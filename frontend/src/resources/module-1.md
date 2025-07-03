---
title: "Module-1: C++, Vectors, and Pairs"
description: "This module introduces the fundamentals of C++ programming, with a focus on vectors and pairs."
---
-----

## 1.A: Getting started with C++

C++ is quite similar to C, but there are some key differences to note.

One of the first differences you'll encounter is in the initial lines of code.

**Hello World in C**

```c
#include <stdio.h>

int main() {
    printf("Hello World!");
    return 0;
}
```

**Hello World in C++**

```cpp
#include <iostream>

using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}
```

Another significant difference is how you handle **input and output**.

**I/O in C**

```c
#include <stdio.h>

int main() {
    printf("Enter your age: ");
    int age;
    scanf("%d", &age);
    if (age >= 18) {
        printf("You are an adult.");
    }
    return 0;
}
```

**I/O in C++**

```cpp
#include <iostream>

using namespace std;

int main() {
    cout << "Enter your age: ";
    int age;
    cin >> age;
    if (age >= 18) {
        cout << "You are an adult.";
    }
    return 0;
}
```

For more detailed information, you can refer to these articles:

  * [GFG article on cin](https://www.geeksforgeeks.org/cin-in-c/)
  * [GFG article on cout](https://www.geeksforgeeks.org/cout-in-c/?ref=lbp)

-----

## 1.B: Basic problem solving

In competitive coding, beginner-level problems typically rely more on basic problem-solving intuition than on deep topic knowledge. This is a primary distinction from DSA-like problems which require more background knowledge. Don't worry about program efficiency for now; that will be covered in a later module. If you get stuck, feel free to ask your mentors for help.

Here are a few problems to get you started:

**1.1:** Given two integers, `x` and `y`, determine if $x^y$ is strictly greater than $y^x$. Since `x` and `y` are relatively small, you don't need to worry about integer overflow. Print "Yes" if $x^y \> y^x$, and "No" otherwise. Remember, "strictly greater" means if they are equal, you should still print "No".

  * **Input:** A single line with two integers, `x` and `y`.
  * **Output:** "Yes" or "No".
  * **Examples:**
      * `3 5` -\> `Yes` (`3^5 = 243, 5^3 = 125`)
      * `2 4` -\> `No` (`2^4 = 16, 4^2 = 16`)

**1.2:** You are given three integers, `a`, `b`, and `c`, representing the side lengths of a triangle. Determine if they can form a right-angled triangle.

  * **Input:** A single line with three integers, `a`, `b`, and `c`.
  * **Output:** "Yes" or "No".
  * **Examples:**
      * `3 4 5` -\> `Yes` (A right-angled triangle can be formed with 5 as the hypotenuse)
      * `4 5 7` -\> `No`
      * `5 12 13` -\> `Yes` (A right-angled triangle can be formed with 13 as the hypotenuse)

**Codeforces Problems:**

  * **1.3:** [Codeforces 4A: Watermelon](http://codeforces.com/problemset/problem/4/A)
  * **1.4:** [Codeforces 1A: Theatre Square](http://codeforces.com/problemset/problem/1/A)
  * **1.5:** [Codeforces 977A: Wrong Subtraction](http://codeforces.com/problemset/problem/977/A)
  * **1.6:** [Codeforces 200B: Drinks](http://codeforces.com/problemset/problem/200/B)

-----

## 1.C: Vectors

Vectors are similar to arrays, but they are **dynamic**, meaning their size is not fixed. To use vectors in C++, you must include the `<vector>` header at the start of your program.

```cpp
#include <iostream>
#include <vector> // 1. Including the vector header file
using namespace std;

int main() {
    cout << "Number of elements: ";
    int n;
    cin >> n;
    vector<int> a; // 2. Defining a vector of integers
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        a.push_back(x); // 3. Adding integers to a vector
    }
    return 0;
}
```

**Reading Material:**

  * [GFG article on vectors](https://www.geeksforgeeks.org/vector-in-cpp-stl/)
  * [List of methods that can be performed on a vector](https://www.javatpoint.com/cpp-vector)

-----

## 1.D: Pairs

A `pair` is a simple container that holds two items. To use pairs, you need to include the `<utility>` header in your C++ code. Pairs can be very powerful when combined with vectors.

```cpp
#include <iostream>
#include <vector>
#include <utility> // 1. Including the utility header file
using namespace std;

int main() {
    cout << "Number of points: ";
    int n;
    cin >> n;
    vector<pair<int, int>> a; // 2. Defining a vector of pairs
    for (int i = 0; i < n; i++) {
        int x, y;
        cin >> x >> y;
        a.push_back(make_pair(x, y)); // 3. Making a pair of integers
    }
    return 0;
}
```

**Reading Material:**

  * [GFG article on pairs](https://www.geeksforgeeks.org/pair-in-cpp-stl/)
  * [The make\_pair() function](https://www.educative.io/answers/how-to-use-the-makepair-function-in-cpp)

-----

## Additional Problems

**1.7:** You are given a list of integers. Find the number of inner elements (all elements except the first and last) that are smaller than both of their neighbors.

  * **Input:** The first line contains an integer `n` (the size of the list), and the second line contains `n` integers.
  * **Output:** A single integer.
  * **Examples:**
      * `5`
        `1 4 2 3 5` -\> `1`
      * `7`
        `2 1 2 1 2 1 2` -\> `3`

**1.8:** You are given a list of integers. Find the smallest and largest elements.

  * **Input:** The first line contains an integer `n` (the size of the list), and the second line contains `n` integers.
  * **Output:** Two integers - the smallest and largest elements.
  * **Examples:**
      * `8`
        `3 4 3 8 7 2 3 5` -\> `2 8`
      * `3`
        `2 3 1` -\> `1 3`

**More Codeforces Problems:**

  * **1.9:** [Codeforces 158A: Next Round](http://codeforces.com/problemset/problem/158/A)
  * **1.10:** [Codeforces 116A: Tram](http://codeforces.com/problemset/problem/116/A)
  * **1.11:** [Codeforces 268A: Games](http://codeforces.com/problemset/problem/268/A)
  * **1.12:** [Codeforces 231A: Team](http://codeforces.com/problemset/problem/231/A)