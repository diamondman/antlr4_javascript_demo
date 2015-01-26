var CalculatorListener = require('./CalculatorListener');


CalculatorListenerASTImpl = function() {
    CalculatorListener.CalculatorListener.call(this); // inherit default listener
    this.loginfo = false;
    return this;
};

CalculatorListenerASTImpl.prototype = Object.create(CalculatorListener.CalculatorListener.prototype);
CalculatorListenerASTImpl.prototype.constructor = CalculatorListenerASTImpl;

//Should be able to modify the parser rules to give the operator a constant name
//Then check ctx.operator.getText() or something to get if symbol
function generate_ast_for(ctx, items, symbol){
    //Removing this will make an entry in the tree for every rule that is passed through
    //even if there is nothing to do on this rule.
    if (items.length == 1){
	ctx.value = items[0].value
	return;
    }

    if (this.loginfo) console.log('\n'+symbol);
    var res = [];
    for (i=0; i<items.length;i++){
	var val = items[i].value;
	if (this.loginfo) console.log(symbol+val);
	res.push(val);
    }
    res.push(symbol);
    ctx.value = res;
};


// Enter a parse tree produced by CalculatorParser#evaluate.
CalculatorListenerASTImpl.prototype.enterEvaluate = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#evaluate.
CalculatorListenerASTImpl.prototype.exitEvaluate = function(ctx) {
    ctx.value = ctx.e.value;
    if (this.loginfo) console.log("FINAL RES: "+ctx.e.value);
    this.value = ctx.e.value
};

// Enter a parse tree produced by CalculatorParser#expression.
CalculatorListenerASTImpl.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#expression.
CalculatorListenerASTImpl.prototype.exitExpression = function(ctx) {
    if (ctx.m == null){
	if (this.loginfo) console.log('not negative');
	ctx.value = ctx.e.value;
    }else{
	if (this.loginfo) console.log('negative');
	ctx.value = ['-',ctx.e.value];
    }
    if (this.loginfo) console.log('expression:'+ctx.value);
};


// Enter a parse tree produced by CalculatorParser#subexpression.
CalculatorListenerASTImpl.prototype.enterSubexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#subexpression.
CalculatorListenerASTImpl.prototype.exitSubexpression = function(ctx) {
    var items = ctx.sumexpression();
    generate_ast_for(ctx, items, '-')
};


// Enter a parse tree produced by CalculatorParser#sumexpression.
CalculatorListenerASTImpl.prototype.enterSumexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#sumexpression.
CalculatorListenerASTImpl.prototype.exitSumexpression = function(ctx) {
    var items = ctx.divideexpression();
    generate_ast_for(ctx, items, '+')
};

// Enter a parse tree produced by CalculatorParser#divideexpression.
CalculatorListenerASTImpl.prototype.enterDivideexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#divideexpression.
CalculatorListenerASTImpl.prototype.exitDivideexpression = function(ctx) {
    var items = ctx.multiplyexpression();
    generate_ast_for(ctx, items, '/')
};


// Enter a parse tree produced by CalculatorParser#multiplyexpression.
CalculatorListenerASTImpl.prototype.enterMultiplyexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#multiplyexpression.
CalculatorListenerASTImpl.prototype.exitMultiplyexpression = function(ctx) {
    var items = ctx.exponentexpr();
    generate_ast_for(ctx, items, '*')
};


// Enter a parse tree produced by CalculatorParser#exponentexpr.
CalculatorListenerASTImpl.prototype.enterExponentexpr = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#exponentexpr.
CalculatorListenerASTImpl.prototype.exitExponentexpr = function(ctx) {
    var items = ctx.atom();
    generate_ast_for(ctx, items, '^')
};


// Enter a parse tree produced by CalculatorParser#atom.
CalculatorListenerASTImpl.prototype.enterAtom = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#atom.
CalculatorListenerASTImpl.prototype.exitAtom = function(ctx) {
    ctx.value = ctx.e.value;
    if (this.loginfo) console.log(ctx.e.value);
};


// Enter a parse tree produced by CalculatorParser#integer.
CalculatorListenerASTImpl.prototype.enterInteger = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#integer.
CalculatorListenerASTImpl.prototype.exitInteger = function(ctx) {
    ctx.value = parseInt(ctx.getText());
};





exports.CalculatorListenerASTImpl = CalculatorListenerASTImpl;
