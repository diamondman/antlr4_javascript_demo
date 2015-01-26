var antlr4 = require('antlr4/index')
var CalculatorLexer = require('./CalculatorLexer')
var CalculatorParser = require('./CalculatorParser')
var CalculatorListenerImpl = require('./CalculatorListenerImpl');
if(process.argv.length != 3){
    console.log('Incorrect number of arguments specified.');
    return;
}

var input = process.argv[2]
var chars = new antlr4.InputStream(input);
var lexer = new CalculatorLexer.CalculatorLexer(chars);
var tokens = new antlr4.CommonTokenStream(lexer);
var parser = new CalculatorParser.CalculatorParser(tokens);
parser.buildParseTrees = true;
var tree = parser.evaluate();
var listener = new CalculatorListenerImpl.CalculatorListenerImpl;
//listener.loginfo=true;
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
console.log("RESULT: "+listener.value)
