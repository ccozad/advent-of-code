# Introduction
Advent of Code 2023 workspace

# Notes

Some references for people who want to learn the ideas behind solving Advent of Code problems with Javascript.

## General
  - Control Flow
    - Loops and conditions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
  - Console
    - Print content to the screen https://developer.mozilla.org/en-US/docs/Web/API/console/log_static 
  - File Handling
    - Read all text from a file in a blocking way https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
  - Language Concepts
    - Objects as Dictionaries https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/
  - Operators https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators  
  - String Handling
    - Split string on delimiter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    - Match in string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
    - Replace all in string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll

## Day 1

The general apporach for day 1 is to recognize the first and last digits amid a wide variety of text. Part 2 introduces a tricky undocumented case that you have to code around.

  - Regular expressions
    - RegEx Overview https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    - Character classes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
    - Groups https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences
    - Quantifiers https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers

## Day 2

The general approach for day 2 is to parse text and keep track of categorized numerical data using dictionaries.

  - Working with arrays https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## Day 3

The general approach for day 3 is to load data into a two dimensional (2D) array, traverse neighboring cells in the 2D array, then process the array in the the natural ordering of the 2D array. The second part adds an additional task of counting the number of neighboring cells and only doing operations for cells with a given number of neighbors.

  - Working with multi-dimensional arrays https://www.freecodecamp.org/news/javascript-2d-arrays/

## Day 4

The general approach for day 4 is to parse two lists of numbers, then use a dictionary lookup to test if each of your numbers match the winning numbers. You could also do this check with set objects and the intersect operation between the two sets. (the reference solution uses the dictionary approach) Point scoring in part 1 requires the exponentian operator to raise a number to a power. Part 2 introduces a recursive rule set that expands the number of cards. While recursion can be accomplished using recursive methods, iterative approaches are subjectively easier to comprehend because the reader does not have to consider the implied call stack that comes from using functions. 

As Wikipedia explains: *"Every recursive function can be transformed into an iterative function by replacing recursive calls with iterative control constructs and simulating the call stack with a stack explicitly managed by the program."*

  - Raise a number to a power https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  - Overview of recursion https://en.wikipedia.org/wiki/Recursion_(computer_science)
