# Introduction
Advent of Code 2023 workspace

# Notes

This document has references for people who want to learn the ideas behind solving Advent of Code problems with Javascript.

The approach described for each day is not the only way to solve each puzzle. See the corresponding mega threads for each day for more ideas on how to approach problems.

Approaches described here will generally help you reach a solution but you likely won't be winning any speed or code golf competitions. When you can instantly recognize these concepts you're ready to learn more advanced concepts and take on more competitive approaches.

# Applying to Other Languages

This document is written with JavaScript in mind. Where possible appropriate general terms are provided so you can adapt the ideas to your programming language of choice. Use the format `<idea> in <language>` For example if you were working in Rust you might search for `read all teaxt from a file in Rust`

# General

## Concepts
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
  

## Resources
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

# Day 1

The general apporach for day 1 is to recognize the first and last digits amid a wide variety of text. Part 2 introduces a tricky undocumented case that you have to code around.

## Concepts
  - Regular expressions are a special language that represent text patterns and operations such as extracting specific parts of a pattern called matches
  - Many programming languages support regular expressions and often share a common subset of conventions

## Ideas
  - Read all text from a file
  - Regular expression, RegEx
  - Regular expression character classes
  - Regular expression groups
  - Regular expression quantifiers

## Resources
  - Regular expressions
    - RegEx Overview https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    - Character classes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
    - Groups https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences
    - Quantifiers https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Quantifiers

# Day 2

The general approach for day 2 is to parse text and keep track of categorized numerical data using dictionaries.

## Concepts
  - Dictionaries allow values to be accessed using arbitrary keys
  - Arrays are accessed using a numerical index without gaps between each index.
  - Both dictionaries and arrays are fast to access when you know exactly what you want. In Big-O notation we say that reads are O(1), meaning reads usually take a fixed amount of time


## Ideas
  - Read all text from a file
  - Arrays
  - Lists
  - Use Dictionaries to store category data

## Resources
  - Working with arrays https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


# Day 3

The general approach for day 3 is to load data into a two dimensional (2D) array, traverse neighboring cells in the 2D array, then process the array in the the natural ordering of the 2D array. The second part adds an additional task of counting the number of neighboring cells and only doing operations for cells with a given number of neighbors.

## Concepts
  - Arrays can be accessed using sequential numerical indexes
  - Two dimensional data like a table with rows and columns can be represented as an array of arrays or in a single array with extra calculations to logically divide storage into rows and columns
  - The regular addressing scheme of table data structures allows easy access to neighboring cells

## Ideas
  - Read all text from a file
  - 2D Arrays
  - 2D array neighbors a given index
  - Iterate a 2D array

## Resources
  - Working with multi-dimensional arrays https://www.freecodecamp.org/news/javascript-2d-arrays/

# Day 4

The general approach for day 4 is to parse two lists of numbers, then use a dictionary lookup to test if each of your numbers match the winning numbers. You could also do this check with set objects and the intersect operation between the two sets. (the reference solution uses the dictionary approach) Point scoring in part 1 requires the exponentian operator to raise a number to a power. Part 2 introduces a recursive rule set that expands the number of cards. While recursion can be accomplished using recursive methods, iterative approaches are subjectively easier to comprehend because the reader does not have to consider the implied call stack that comes from using functions. 

As Wikipedia explains: *"Every recursive function can be transformed into an iterative function by replacing recursive calls with iterative control constructs and simulating the call stack with a stack explicitly managed by the program."*

## Concepts
  - Dictionaries offfer fast look up times
  - Sets have well established math operations to find difference and similarities with other sets
  - Recursion creates a chain of operations that ends with a base case
  - Recursion can be represented as iteration

## Ideas

  - Using dictionaries as a lookup table
  - Sets (Math)
  - Set Operations
  - Recursion
  - Iteration
  - Recursion to iteration

  ## Resources

  - Raise a number to a power https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  - Overview of recursion https://en.wikipedia.org/wiki/Recursion_(computer_science)

# Day 5

Data parsing for Day 5 includes the new idea of storing data into different groups. Individual lists or arrays can be used to organize inputs. Day 5 raises the difficulty because the real input has far too many values to be brute forced. The large number spans in the input prevents one from storing all possible keys and requires one to take a different strategy of storing range information and performing a calculation. The number of maps that need to be traversed raises the complexity level and introduces the need to use functions to organize code that is run many times. 

The second part of day 5 pushes the limits even more with giant ranges of numbers to evaluate location distances for. The overlap between two ranges can be calculated to reduce the number of inputs to evaluate. This approach allowed the calculations to at least reach an answer in several minutes. It's unusual for puzzle problems like this to take this long to solve so there is probably another way to further reduce the number of inputs that need to be evaluated or pre-calculate intermediate values, but this optimizationn is not clear at this time.

## Concepts
  - Not all problems can be solved with brute force, instead math, algorithms and simplifications are often required to get an answer
  - Functions help us organize our code into repeatable, testable blocks
  - We can map a value to the outcome of a calculation or function
  - Reducing the search space can allow calculations to complete in a reasonable time

## Ideas
  - Test if a value is in a number range
  - Determine the overlap of two ranges
  - Evaluate a list of calculations
  - Use functions to reuse code

## Resources
  - Functions overview https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
  - How to calculate interval overlap https://blogs.sas.com/content/sgf/2022/01/13/calculating-the-overlap-of-date-time-intervals/

# Day 6

Day 6 is a pleasant change in pace with a straight forward set of calculations and results processing.

# Concepts
  - The results of completed calculations can be gathered in a collection for further analysis.
  - We can use a reducer to take a collection of values, perform math on each element, accumulate results and produce a final answer

## Ideas
  - Iteration
  - Reducers

## Resources
  - Iteration https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
  - Reduce function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

# Day 7

Day 7 is challenging but not overwhelming. In this puzzle you are rankinghas hands for a card game, which may inspire you to work on your card games after completing the puzzle. Scoring cards in an exercise in enumerating characters in a string, counting occurances of each card then analyzing the counts to determine the greatest outcome. Ranking of these scores can be done by taking advantage of custom sort methods that use the rules of the challenge. In part 2 wild cards are introduced, complicating the scoring process to include more conditions. The hardest part of part 2 includes fitting the different rules along side part 1 and making sure you cover every condition. The full input appeared to cover nearly every scoring condition possible so if you error on the full data set, be sure to check and make sure you have covered every hand combination in the scoring part of your code.

## Concepts
  - We can enumerate characters in a string the same way we enumerate elements in an array
  - Sort functions on collections take a function parameter to apply custom sort orders

## Ideas
  - Iteration
  - Conditionals
  - Accessing characters in a string
  - Custom sort functions

## Resources
  - Access individual characters in a string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#character_access
  - Sorting arrays and defining custom sort functions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

