# Introduction
Advent of Code 2023 workspace

# Notes

This document has references for people who want to learn the ideas behind solving Advent of Code problems with Javascript.

The approach described for each day is not the only way to solve each puzzle. See the corresponding mega threads for each day for more ideas on how to approach problems.

Approaches described here will generally help you reach a solution but you likely won't be winning any speed or code golf competitions. When you can instantly recognize these concepts you're ready to learn more advanced concepts and take on more competitive approaches.

# Applying to Other Languages

This document is written with JavaScript in mind. Where possible appropriate general terms are provided so you can adapt the ideas to your programming language of choice. Use the format `<idea> in <language>` For example if you were working in Rust you might search for `read all teaxt from a file in Rust`

## General

### Concepts
  - Many problems presented on coding challenges have descriptions that imply the use of certain data structures. 
  - You'll need to use various constructs to make choices and repeat operations
  - Data is typically loaded from files outside of the code
  - Basic manipulation of text data such as accessing individual characters, finding text and extracting portions of text will be commonly done
  - Basic math operations such as addition, subtraction, multiplication and division will be common
  - More advanced math operations such as exponents and the modulus operator (whole number remainder of division) may also be needed
  - You'll need to return the answer to calculations. Common approaching include writing content to the screen or to a file

## Ideas
  - Data structures
    - Arrays
    - Lists
    - 2D Arrays
    - 3D Arrays
    - N Dimension Arrays
    - Dictionary
    - Hash Table
    - Stack / Last in Last Out / LIFO
    - Queue / First in First Out/ FIFO
    - Directed graph
    - Tree
    - Mesh Network
  - Input/Output, I/O
    - Read all text in file
    - Write all text to file
  - String/Text Operations
    - Split text based a delimiter
    - Find text
    - Extract text
    - Replace text
  

### Resources
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

### Concepts
  - Regular expressions are a special language that represent text patterns and operations such as extracting specific parts of a pattern called matches
  - Many programming languages support regular expressions and often share a common subset of conventions

### Ideas
  - Read all text from a file
  - Regular expression, RegEx
  - Regular expression character classes
  - Regular expression groups
  - Regular expression quantifiers

### Resources
  - Regular expressions
    - RegEx Overview https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    - Character classes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
    - Groups https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences
    - Quantifiers https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers

## Day 2

The general approach for day 2 is to parse text and keep track of categorized numerical data using dictionaries.

### Concepts
  - Dictionaries allow values to be accessed using arbitrary keys
  - Arrays are accessed using a numerical index without gaps between each index.
  - Both dictionaries and arrays are fast to access when you know exactly what you want. In Big-O notation we say that reads are O(1), meaning reads usually take a fixed amount of time


### Ideas
  - Read all text from a file
  - Arrays
  - Lists
  - Dictionaries

### Resources
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
