# Introduction
Advent of Code workspace

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

# 2024

## Day 1

Day 1 introduces you to the idea of the challenge and focuses on iteration, the definition  of math terms, arrays and dictionaries.

### Concepts
  - We can iterate each line in a file and parse out multiple numbers from each line.
  - Arrays of numbers can be sorted in an arbitrary order such as ascending or descending
  - The difference of two numbers is positive so we take the absolute value of subtracting one number with another. This removes the need to do the subtraction is a specific order
  - We can gather a unique count of each item in a collection using a dictionary

### Ideas

  - Read each line in a file
  - Parse integers separated by a delimiter
  - Sort an array in ascending order
  - Iterate over items in an array
  - Access an array by index
  - Count the number of times an item has occurred using a dictionary data structure

### Resources
  - Read lines in a text file https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
  - Split a string based on a delimiter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split 
  - Parse an integer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  - Calculate the absolute value of a number https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs 
  - Sort an array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

## Day 2

Day 2 has you checking for outliers in a series. The problem also introduces the idea of simple what if analysis to search for additional solutions.

### Concepts

  - We can end a loop early when a failing condition in encountered
  - We can make a function that works on any array of numbers
  - We can alter the items in an array by making a copy and performing splice operations

### Ideas

  - Read each line in a file
  - Parse integers separated by a delimiter
  - Check for a change in sign
  - Check for a difference larger or smaller than a threshold
  - Break from a loop early
  - Use a function to repeat the same operations on different data
  - Copy an array and remove elements to create different variants while preserving the original array

### Resources
  - Break a loop early https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
  - Declare a function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function
  - Different ways to copy an array https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/

## Day 3

Day 3 involves regular expressions and stream processing

### Concepts
  - We can use regular expressions to find text patterns in large bodies of text
  - BigInt can be used to store and do basic math operations on numbers that are too large for the built in `number` type
  - We can traverse strings to look for markers and conditionally process text

### Ideas
  - Find patterns in text using regular expressions
  - Do math on large numbers
  - Find the index of a string in a larger string starting from a specific starting point

### Resources
  - Regular expression notes and test tool https://regexr.com
  - Regular expressions (JavaScript) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
  - Find all matches of a regular expression in a string (JavaScript) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
  - Work with large numbers using the BigInt class (JavaScript) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
  - Find the index of one string in another string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

## Day 4
Day 4 involves finding words in a word search

### Concepts
  - We can form a consistent grid using two dimensional arrays
  - Array elements can be accessed using a zero based index
  - We can skip ranges that are outside of the bounds of an array
  - We can use for loops to traverse every index in an array

### Ideas
  - Read text into a two dimensional array
  - Check values at array indexes
  - Check if an index is valid for a given array
  - Try all combinations for a game board location

### Resources
  - Arrays (JavaScript) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## Day 5
Day 5 steps up the difficulty as you consider custom ordering rules for lists

### Concepts
  - A dictionary is a data structure that allows values to be accessed in O(1) time using keys
  - We can use arbitrary strings as keys in a dictionary
  - A tuple is an ordered list of numbers
  - Given a rule a < b, we can create a dictionary key for the tuple (a,b) with a value to indicate a valid ordering
  - Given the same rule a < b, we can consider the inverse relationship and create a dictionary key for the tuple (b,a) with a value to indicate an INVALID ordering
  - Arrays can have arbitrary sort orders using a custom comparison function

### Ideas
  - Read text from a file
  - Process text differently based on a condition
  - Create a dictionary with text keys and boolean values
  - Generate dictionary keys using a formatted string
  - Lookup values in a dictionary using a key
  - Sort an array using a custom comparison function

### Resources
  - How to use an object as a dictionary https://www.makeuseof.com/javascript-dictionaries-create-use/
  - Template literals https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals 
  - Use a custom comparison function to sort an array https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort


# 2023

## Day 1

The general approach for day 1 is to recognize the first and last digits amid a wide variety of text. Part 2 introduces a tricky undocumented case that you have to code around.

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
  - Use Dictionaries to store category data

### Resources
  - Working with arrays https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


## Day 3

The general approach for day 3 is to load data into a two dimensional (2D) array, traverse neighboring cells in the 2D array, then process the array in the the natural ordering of the 2D array. The second part adds an additional task of counting the number of neighboring cells and only doing operations for cells with a given number of neighbors.

### Concepts
  - Arrays can be accessed using sequential numerical indexes
  - Two dimensional data like a table with rows and columns can be represented as an array of arrays or in a single array with extra calculations to logically divide storage into rows and columns
  - The regular addressing scheme of table data structures allows easy access to neighboring cells

### Ideas
  - Read all text from a file
  - 2D Arrays
  - 2D array neighbors a given index
  - Iterate a 2D array

### Resources
  - Working with multi-dimensional arrays https://www.freecodecamp.org/news/javascript-2d-arrays/

## Day 4

The general approach for day 4 is to parse two lists of numbers, then use a dictionary lookup to test if each of your numbers match the winning numbers. You could also do this check with set objects and the intersect operation between the two sets. (the reference solution uses the dictionary approach) Point scoring in part 1 requires the exponentian operator to raise a number to a power. Part 2 introduces a recursive rule set that expands the number of cards. While recursion can be accomplished using recursive methods, iterative approaches are subjectively easier to comprehend because the reader does not have to consider the implied call stack that comes from using functions. 

As Wikipedia explains: *"Every recursive function can be transformed into an iterative function by replacing recursive calls with iterative control constructs and simulating the call stack with a stack explicitly managed by the program."*

### Concepts
  - Dictionaries offfer fast look up times
  - Sets have well established math operations to find difference and similarities with other sets
  - Recursion creates a chain of operations that ends with a base case
  - Recursion can be represented as iteration

### Ideas

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

## Day 5

Data parsing for Day 5 includes the new idea of storing data into different groups. Individual lists or arrays can be used to organize inputs. Day 5 raises the difficulty because the real input has far too many values to be brute forced. The large number spans in the input prevents one from storing all possible keys and requires one to take a different strategy of storing range information and performing a calculation. The number of maps that need to be traversed raises the complexity level and introduces the need to use functions to organize code that is run many times. 

The second part of day 5 pushes the limits even more with giant ranges of numbers to evaluate location distances for. The overlap between two ranges can be calculated to reduce the number of inputs to evaluate. This approach allowed the calculations to at least reach an answer in several minutes. It's unusual for puzzle problems like this to take this long to solve so there is probably another way to further reduce the number of inputs that need to be evaluated or pre-calculate intermediate values, but this optimizationn is not clear at this time.

### Concepts
  - Not all problems can be solved with brute force, instead math, algorithms and simplifications are often required to get an answer
  - Functions help us organize our code into repeatable, testable blocks
  - We can map a value to the outcome of a calculation or function
  - Reducing the search space can allow calculations to complete in a reasonable time

### Ideas
  - Test if a value is in a number range
  - Determine the overlap of two ranges
  - Evaluate a list of calculations
  - Use functions to reuse code

### Resources
  - Functions overview https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
  - How to calculate interval overlap https://blogs.sas.com/content/sgf/2022/01/13/calculating-the-overlap-of-date-time-intervals/

## Day 6

Day 6 is a pleasant change in pace with a straight forward set of calculations and results processing.

### Concepts
  - The results of completed calculations can be gathered in a collection for further analysis.
  - We can use a reducer to take a collection of values, perform math on each element, accumulate results and produce a final answer

### Ideas
  - Iteration
  - Reducers

### Resources
  - Iteration https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
  - Reduce function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

## Day 7

Day 7 is challenging but not overwhelming. In this puzzle you are rankinghas hands for a card game, which may inspire you to work on your card games after completing the puzzle. Scoring cards in an exercise in enumerating characters in a string, counting occurances of each card then analyzing the counts to determine the greatest outcome. Ranking of these scores can be done by taking advantage of custom sort methods that use the rules of the challenge. In part 2 wild cards are introduced, complicating the scoring process to include more conditions. The hardest part of part 2 includes fitting the different rules along side part 1 and making sure you cover every condition. The full input appeared to cover nearly every scoring condition possible so if you error on the full data set, be sure to check and make sure you have covered every hand combination in the scoring part of your code.

### Concepts
  - We can enumerate characters in a string the same way we enumerate elements in an array
  - Sort functions on collections take a function parameter to apply custom sort orders

### Ideas
  - Iteration
  - Conditionals
  - Accessing characters in a string
  - Custom sort functions

### Resources
  - Access individual characters in a string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#character_access
  - Sorting arrays and defining custom sort functions https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

## Day 8

Day 8 involves creating a data structure to store directed graph nodes and then executing commands in a repeated fashion until a goal is reached. Fast traversal of the graph requires using data structures that allow for fast access of nodes. The reference solution uses a dictionary lookup but accessing an array by index would also be a suitable solution. Part 2 of the challenge has an answer in the trillions so direct iteration would take a very long time to converge on an answer. Instead of using iteration it is dramatically faster to use math. The mathematical relation is not immediately clear but ultimately the lowest common multiple (LCM) approach can be used. LCM can be thought of like planets with different orbits aligning at a certain time in the future.

### Concepts
  - Graphs can be represented as node objects with additional information on edges or connections
  - Navigating a graph can be accomplished by keeping track of the current node and following edges
  - The lowest common multiple is the smallest number that is a multiple of two numbers. The two element equation can be extended to a recursive algorithm that can be run significantly faster than trying every combination.

### Ideas
  - Graphs
  - Directed graphs
  - Graph theory
  - Lowest Common Multiple (LCM)

### Resources
  - Graph theory https://www.whitman.edu/mathematics/cgt_online/book/section05.11.html
  - Graph algorithms https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/
  - Directed graphs https://algs4.cs.princeton.edu/42digraph/
  - LCM review https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-expressions-and-variables/cc-6th-lcm/a/least-common-multiple-review
  - Algorithm for LCM of a list of numbers https://www.geeksforgeeks.org/lcm-of-given-array-elements/

## Day 9

  Day 9 has you doing simple numerical derivatives that can be used to work backwards to predict the next value in a sequence. But fear not, no advanced calculus is needed for this task. Start with the first sequence and then continue to take difference sequences until a root state is reached where all values are zero. This is the same as reaching the derivative of a constant, which is 0. As the problem describes you can then work backwards until the original sequence is reached. For part 2 you can repeat the exercise above except for the previous value or you can save time by recognizing that the previous item is the same as the last item of the reversed sequence.

### Concepts
  - Separate the work of the loop from the control flow of the loop.
  - In JavaScript arrays have list like properties that allow items to be easily added to the array, extending the size of the array
  - Arrays can be easily reversed with methods or simply traversed in reverse order

### Ideas
  - Dynamic arrays
  - Lists
  - Enumerate a list in reverse order
  - Reverse a list
  - Reverse an array

### Resources
  - Numerical methods for ordinary differential equations https://en.wikipedia.org/wiki/Numerical_methods_for_ordinary_differential_equations
  - Array reverse https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
  - Constant rule for differentiating constant functions https://math.libretexts.org/Bookshelves/Calculus/Calculus_(OpenStax)/03%3A_Derivatives/3.03%3A_Differentiation_Rules

## Day 10

Part 1 of day 10 involves determining what piece a start position is and then following a network directions in two directions to calculate distances from the start. Part 2 can very tricky if you are not familiar with approaches for testing if points are inside or outside a complex polygon. Even if you are aware of the algorithm to use it can be tricky to know how to manipulate the large data set.

### Concepts
  - The graph data structure for this problem needs to stor information about the symbol, row, column and connections
  - We can figure out what type of piece the start is by looking at what type of connections are possible in the up, down, left and right directons
  - As the elaborate path is followed we start from one direction and move to the cell in the second direction
  - We have reached the furtherest point when each independent search path meets at the same cell
  - We can use the even odd algorithm to count wall interesctions to determine if we are in the polygon or not. This approach is complicated by what to with corner pieces and pieces aligned with the index. One way to get around this is to think about a "virtual sample" that is a little above or below the line being sample. This eliminates all corners and leaves a simpler model of wall or no wall at each point along the ray being tested.
  - There s likely an optimization to interract with fewer nodes but for the sake of simplicity the reference solution assigns inside or outside the polygon to all cells on the board

### Ideas
  - Determine if a point is inside or outside a polygon

### Resources
  - Finding a point in a polygon https://en.wikipedia.org/wiki/Point_in_polygon
  - Points inside a polygon https://www.eecs.umich.edu/courses/eecs380/HANDOUTS/PROJ2/InsidePoly.html

## Day 11

Day 11 is a classic application of search algorithms. Part 1 wants you to physically alter the number of rows and colums but it is best to stick with row and column cost arrtibutes for each cell to prepare for the much large univers in part 2. Adaptions of Dijkstra's shortest path algorithm are appropriate for this problem. You can pre-calculate distance from each galaxy to every other galaxy using simple iteration with a queue to hold unprocessed nodes.

### Concepts
  - We can store distances or costs as simple variables for each cell. A real worl application for this might be making a game with different movement rate tiles for a 2d platformer or calculating routes on a map.
  - Algorithms such as Dijstra's shortest path can be used to find path costs.

### Ideas
  - Shortest path algorithms
  - Dijkstra's shortest path algorithm

### Resources
  - Intro to Dijkstra's shortest path algorithm https://www.freecodecamp.org/news/dijkstras-shortest-path-algorithm-visual-introduction/

## Day 12

Work in progress

## Day 13

Work in progress

## Day 14

Day 14 part 1 tests your ability to think about your data structure in terms of columns and how data values in each column change with the rules given in the problem. While you can be clever and move the column values in place, it is simpler to iterate the column, collect round rocks and empty spaces into their own storage and write them out in the correct order when a fixed rock or the other edge is met. The real input is a reasonable size so this approach of trading CPU cycles for space in effective.

Part 2 of this problem introduces movement in the other three compass directions. The code code for these sections is going to be very similar to the one movement direction from part 1. While you could make one mega function that handles all directions at once, it is likely easier to grasp four different functions, one for each movement direction. With this approach you can write each implementation without breaking the others. As an extra challenge you can try to separate your four movement functions into one function by analyzing the code that is shared and different. Once you have carefuly implemented with each cycles. Be sure to carefully implement your code so you can exactly reproduce the example cases in the problem description. You will be faced with a nearly impossible number of cycles to calculate. Unless you have access to a super computer or a high end GPU you are going to need to do some thinking. Try to do 1,000 cycles and plot the data on a graph. What you should see in the data is that if eventually settles into a regular oscilation pattern. Observe how many steps it take to move from one value back to the same value. This is the period of the repeating function. Once you known the period, write down a few values in the range. Look at indexes beyond the range you observed. Pick a few indexes and see if you can predict their value using only their index. Verify your predicted answer matches the actual answer. Continue working with the numbers until you can reliably predict values. Use this same approach for the very large iteration count in the problem. Watch out for off by one numbers. If you get the wrong answer try a neighboring value. All of the calculations for part 2 can be done by hand with a pencil, paper and calculator.

### Concepts
  - You can simplify sorting by using extra scratch space to sort items as you see them. As long as the sort space can fit in memory this is easy on your time because you don't have to get in place sorting algorithms working perfectly.
  - Don't Repeat Yourself (DRY) is a common mantra in programming. Following this concept helps reduce maitenance effort and it helps prevent subtle bugs of changing an implementation in one place and missing that change in another. But DRY is a final state. You have need to write a few ugly drafts to reach the pristine state of a DRY implementation. Show your code is right, make sure sure it has good enough performance, they look at how you maintain and optimize your functional solution.
  - Sometimes patterns emerge in our data and we can use math to calculate beyond what our CPU and memory can handle. Extracting patterns and relationships is exactly what many machine learning models do today.
  - Doing things like graphing or analyzing complex output is easier when yu write data to a file.

### Ideas
  - Sorting using additional memory
  - Periodic functions in math
  - Write data to a file

### Resources
  - We only have two classes to sort but larger data sets can use merge sort https://en.wikipedia.org/wiki/Merge_sort
  - Math background of periodic function https://www.cuemath.com/algebra/periodic-function/ 
  - Writing file in Node.js https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs 

## Day 15

Day 15 is about carefully following directions, understanding how to traverse datastructures and how to manipulate the contents of those data structures. Be sure in part 2 to account for the wider inputs that aren't part of the smaller input examples.

### Concepts
  - An array or list stores data in a fixed order and allows data to be accessed by continious, zero based indexes
  - Javascript arrays behave more like lists becuase their contents can be dynamically added and substracted along with other more complex operators.
  - We can perform a math equation where the same variable appears on the left and right of the equals sign because of the order that math operations are evaluated. Math operations follow the typical order of operations from algebra, namely PEMDAS, parenthesis, exponents, multiplication/division (in left to right order), addition/subtraction (in left to right order). Other operations like boolean comparisons happen after other operations and finally assignment happens. When assignment happens all of the right side is evaluated and converted to a value before being assigned to the left side variable.
  - The remainder operator returns the integer remainder of division. This operator is handy when you want to gurantee that a value is always between zero and value. This type of operation is common when accessing an array.

### Ideas
  - Order of operations
  - Lists
  - Remainder operator

### References
  - Javascript order of operations https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
  - Assignment operator in Javascript https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment 
  - Remainder operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
  - Splice array method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  - Index of array method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  - Substring string method https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring

## Day 16

Day 16 can be thought of like a game or scientific simulation that ticks time forward and updates the world state at each tick. In this case the world state involves sending light to different cells on the board and interacting with different elements that change the beam's direction or the number of beams. Programming the beam is similar to the concept of turtle graphics, an approach to teach programming where simple instructions are interpreted as drawing commands performed by an imaginary turtle.

### Concepts
  - A collection of different simulation states can be kept in sync by managing a world clock and updating all simulations in sequence before moving to the next time interval. In the game industry developers try to update world state in between frames. Scientific simulations may make complex calculations that take much longer to simulate than the original event. For example, a fluid dynamics simulation may solve for flows in a complex pipeline for safety testing

### Ideas
  - Simulations
  - Time stepping
  - Turtle graphics

### References
  - Turtle graphics https://en.wikipedia.org/wiki/Turtle_graphics