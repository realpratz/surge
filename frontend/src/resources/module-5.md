---
title: "Module-5: Data Structures" 
description: "An overview of fundamental data structures including Stacks, Queues, Priority Queues, Maps, and Sets, their operations, and practice problems."
---
-----

## 5.A: Stacks

A stack is a linear data structure where the insertion of a new element and the removal of an existing element occur at the same end, known as the top of the stack. Stacks adhere to the **LIFO (Last In, First Out)** principle, meaning the last element inserted is the first one to be removed.

### Operations in Stacks

There are three primary operations for stacks:

1.  **`push()`**: Adds an element to the top of the stack. This operation has a time complexity of $O(1)$.
2.  **`pop()`**: Removes and returns the top element from the stack. This operation has a time complexity of $O(1)$.
3.  **`peek()`**: Returns the top element of the stack without removing it. This operation has a time complexity of $O(1)$.

### Reading Material:

  * [CodeForces Blog](https://www.google.com/search?q=https://codeforces.com/blog/entry/78293)
  * [GFG](https://www.geeksforgeeks.org/stack-data-structure/)

### Questions:

  * 5.1: [Balanced Parenthesis](https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/)
  * 5.2: [SPOJ: Histogram](https://www.spoj.com/problems/HISTOGRA/)
  * 5.3: [LC: Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)
  * 5.4: [MAX special Product](https://www.interviewbit.com/problems/maxspprod/)
  * 5.5: [Bus of Characters](https://codeforces.com/problemset/problem/1101/B)

-----

## 5.B: Queues

A queue is a linear data structure that follows the **First-In, First-Out (FIFO)** principle. This means the first element added to the queue will be the first one to be removed.

### Functions of a Queue:

The three main functions of a queue are:

1.  **`Enqueue()`**: Adds an element to the end of the queue in $O(1)$ time.
2.  **`Dequeue()`**: Removes and returns the front element of the queue in $O(1)$ time.
3.  **`Peek()`**: Returns the front element of the queue without removing it in $O(1)$ time.

### Reading Material:

  * [GFG](https://www.geeksforgeeks.org/queue-data-structure/)

### Questions:

  * 5.6: [Character Blocking (Read set also)](https://codeforces.com/contest/1840/problem/E)
  * 5.7: [Social Network (Read set also)](https://codeforces.com/contest/1234/problem/B2)
  * 5.8: [Table Tennis](https://codeforces.com/contest/879/problem/B)

-----

## 5.C: Priority Queues

A priority queue is a type of queue that arranges elements based on their **priority values**. Elements with higher priority are retrieved before elements with lower priority. Unlike a normal queue, a priority queue does not follow the FIFO principle.

### Functions of a Priority Queue:

1.  **`empty()`**: Checks if the queue is empty and returns a boolean value. Time complexity: $O(1)$.
2.  **`size()`**: Returns the number of elements in the priority queue. Time complexity: $O(1)$.
3.  **`top()`**: Returns the first element of the priority queue. Time complexity: $O(1)$.
4.  **`push()`**: Inserts an element into the priority queue. Time complexity: $O(logn)$.
5.  **`pop()`**: Deletes the first element of the priority queue. Time complexity: $O(logn)$.

### Reading Material:

  * [GFG](https://www.geeksforgeeks.org/priority-queue-in-cpp-stl/)
  * [Programiz](https://www.programiz.com/dsa/priority-queue)

### Questions:

  * 5.9: [Heap Operations](https://codeforces.com/contest/681/problem/C)
  * 5.10: [Minimise the error](https://codeforces.com/contest/960/problem/B)
  * 5.11: [Kolya and Movie Theatre](https://codeforces.com/contest/1862/problem/E)

-----

## 5.D: Maps

Maps are associative containers that store elements in a **key-value** pair fashion. Each element has a key and a mapped value, and no two elements can have the same key. Maps store data in ascending order of their keys.

### Functions of a Map:

1.  **`m[key]=value;`**: Assigns a value to a key. Time complexity: $O(log(n))$.
2.  **`size()`**: Returns the number of elements in the map. Time complexity: $O(1)$.
3.  **`clear()`**: Removes all elements from the map. Time complexity: O(map\_size).

### Iterating Through Maps:

You can iterate through a map as shown below. The map is sorted in increasing order of the key.

```cpp
map<int,int> m; //map<key's datatype, values's datatype> map_name;
//assigning values to map.
m[1] = 2; // map_name[key]=value;
m[2] = 3;
m[3] = 4;
//'it' will be a pair of datatype pair<key datatype, value datatype>
//it.first->key, it.second -> value.
//map is sorted in increasing order of key.
for(auto it:m){
    cout << "key: " << it.first
    value: " << it.second << '\n';
}
```

### Reading Material:

  * [GFG](https://www.geeksforgeeks.org/map-associative-containers-the-c-standard-template-library-stl/)
  * [Programiz](https://www.programiz.com/cpp-programming/map)

### Questions:

  * 5.13: [Yarik and Musical Notes](https://codeforces.com/contest/1899/problem/D)
  * 5.14: [Train and Queries](https://codeforces.com/problemset/problem/1702/C)
  * 5.15: [Weird Sum](https://codeforces.com/problemset/problem/1648/A)

-----

## 5.E: Sets and Multisets

A **set** is a data structure that stores **unique** elements in a sorted order. The main difference between sets and **multisets** is that you can store duplicate elements in a multiset.

### Functions of Sets and Multisets:

1.  **`s.insert(element)`**: Inserts an element into the set. Time complexity: O(log(N)).
2.  **`s.find(element)`**: Returns an iterator pointing to the specified element. If the element is not found, it returns `s.end()`. Time complexity: O(log(N)).
3.  **`s.erase(iterator position)`**: Removes the element at the position pointed to by the iterator. Time complexity: O(log(N)).

### `lower_bound` and `upper_bound` in Sets and Multisets:

  * **`s.lower_bound(element)`**: Returns an iterator to the first element in the set that is **greater than or equal to** the element. If no such element exists, it returns `s.end()`. Time complexity: O(log(N)).
  * **`s.upper_bound(element)`**: Returns an iterator to the first element in the set that is **strictly greater than** the element. If no such element exists, it returns `s.end()`. Time complexity: O(log(N)).

**Note:** All functions apply to both sets and multisets. For `erase`, a multiset removes only one occurrence of the element. For `find`, `lower_bound`, and `upper_bound`, a multiset returns an iterator pointing to the first occurrence of the element.

### Reading Material:

  * [GFG (Set)](https://www.geeksforgeeks.org/set-in-cpp-stl/)
  * [Programiz (Set)](https://www.programiz.com/cpp-programming/set)
  * [GFG (Multiset)](https://www.google.com/search?q=https://www.geeksforgeeks.org/multiset-in-c-stl/)
  * [Programiz (Multiset)](https://www.programiz.com/cpp-programming/multiset)
  * [GFG (Set lower\_bound)](https://www.google.com/search?q=https://www.geeksforgeeks.org/set-lower_bound-in-c-stl/)
  * [GFG (Set upper\_bound)](https://www.google.com/search?q=https://www.geeksforgeeks.org/set-upper_bound-in-c-stl/)

### Questions:

  * 5.16: [Merge Equals](https://codeforces.com/contest/962/problem/D)
  * 5.17: [Distinct Characters Queries](https://codeforces.com/contest/1234/problem/D)
  * 5.18: [Rooks Defenders](https://codeforces.com/contest/1679/problem/C)

-----

## 5.F: `Lower_bound` and `upper_bound` for Vectors and Arrays

Similar to sets and multisets, you can use `upper_bound` and `lower_bound` on vectors and arrays, given that the container is **sorted**.

  * **`lower_bound(iterator first, iterator last, val)`**: Returns an iterator pointing to the first element in the range `[first, last)` that is **greater than or equal to `val`**. Time complexity: O(log(N)).
  * **`upper_bound(iterator first, iterator last, val)`**: Returns an iterator pointing to the first element in the range `[first, last)` that is **strictly greater than `val`**. Time complexity: O(log(N)).

### Reading Material:

  * [GFG](https://www.geeksforgeeks.org/cpp/upper_bound-and-lower_bound-for-vector-in-cpp-stl/)
  * [Codeforces Blog](hhttps://codeforces.com/blog/entry/109920)

### Questions:

  * 5.19: [Number of Pairs](https://codeforces.com/problemset/problem/1538/C)
  * 5.20: [Yet Another Problem About Pairs Satisfying an Inequality](https://codeforces.com/problemset/problem/1703/F)