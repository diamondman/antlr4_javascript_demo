Simple example of how to use Antlr4 in Javascript.
Also a test to see how long it takes me to be able to make something in Node.
Also Also part of a project with Drew Winget to build a demo that animates order of operations of algebra.



Requirements:
antlr4-javascript: https://github.com/antlr/antlr4-javascript (Should be in a repo soon)
ANTLR>=4.5: http://www.antlr.org/download.html (Select Complete ANTLR 4.5 Java binaries jar)
Java Runtime Environment: OS dependent. (Needed just to compile the .g file into javascript)

Build Steps:
alias antlr4='java -jar "/path/to/antlr-4.5-complete.jar"'
antlr4 Calculator.g

Running:
Put antlr4-javascript/src/antlr4 (or a package) in your path (You can specify it bash with NODE_PATH='')
node run_calculator.js '-2(3+4)^2'  # Simplify an expression with basic PEMDAS order of operations.
node run_AST.js '-2(3+4)^2'         # Product AST in sample JSON format. Format is not supposed to be final and is more of a demonstration of how a structure could be generated from the parser.


Other Stuff:
Uncomment the following line in the run_*.js files for more detailed logging.
//listener.loginfo=true;