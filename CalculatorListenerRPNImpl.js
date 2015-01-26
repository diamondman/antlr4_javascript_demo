var CalculatorListener = require('./CalculatorListener');


CalculatorListenerRPNImpl = function() {
    CalculatorListener.CalculatorListener.call(this); // inherit default listener
    this.loginfo = false;
    return this;
};

CalculatorListenerRPNImpl.prototype = Object.create(CalculatorListener.CalculatorListener.prototype);
CalculatorListenerRPNImpl.prototype.constructor = CalculatorListenerRPNImpl;

//Should be able to modify the parser rules to give the operator a constant name
//Then check ctx.operator.getText() or something to get if symbol
function generate_ast_for(ctx, items, symbol){
    if (items.length > 1){
	if (this.loginfo) console.log('\n'+symbol);
	var res = [items[0].value];
	for (i=1; i<items.length;i++){
	    var val = items[i].value;
	    if (this.loginfo) console.log(symbol, val);
	    res = res.concat(val);
	    res.push(symbol);
	}
	ctx.value = res;
    }else{
	ctx.value = items[0].value
    }
};


// Enter a parse tree produced by CalculatorParser#evaluate.
CalculatorListenerRPNImpl.prototype.enterEvaluate = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#evaluate.
CalculatorListenerRPNImpl.prototype.exitEvaluate = function(ctx) {
    ctx.value = ctx.e.value;
    if (this.loginfo) console.log("FINAL RES: "+ctx.e.value);
    this.value = ctx.e.value
};

// Enter a parse tree produced by CalculatorParser#expression.
CalculatorListenerRPNImpl.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#expression.
CalculatorListenerRPNImpl.prototype.exitExpression = function(ctx) {
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
CalculatorListenerRPNImpl.prototype.enterSubexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#subexpression.
CalculatorListenerRPNImpl.prototype.exitSubexpression = function(ctx) {
    var items = ctx.sumexpression();
    generate_ast_for(ctx, items, '-')
};


// Enter a parse tree produced by CalculatorParser#sumexpression.
CalculatorListenerRPNImpl.prototype.enterSumexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#sumexpression.
CalculatorListenerRPNImpl.prototype.exitSumexpression = function(ctx) {
    var items = ctx.divideexpression();
    generate_ast_for(ctx, items, '+')
};

// Enter a parse tree produced by CalculatorParser#divideexpression.
CalculatorListenerRPNImpl.prototype.enterDivideexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#divideexpression.
CalculatorListenerRPNImpl.prototype.exitDivideexpression = function(ctx) {
    var items = ctx.multiplyexpression();
    generate_ast_for(ctx, items, '/')
};


// Enter a parse tree produced by CalculatorParser#multiplyexpression.
CalculatorListenerRPNImpl.prototype.enterMultiplyexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#multiplyexpression.
CalculatorListenerRPNImpl.prototype.exitMultiplyexpression = function(ctx) {
    var items = ctx.exponentexpr();
    generate_ast_for(ctx, items, '*')
};


// Enter a parse tree produced by CalculatorParser#exponentexpr.
CalculatorListenerRPNImpl.prototype.enterExponentexpr = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#exponentexpr.
CalculatorListenerRPNImpl.prototype.exitExponentexpr = function(ctx) {
    var items = ctx.atom();
    generate_ast_for(ctx, items, '^')
};


// Enter a parse tree produced by CalculatorParser#atom.
CalculatorListenerRPNImpl.prototype.enterAtom = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#atom.
CalculatorListenerRPNImpl.prototype.exitAtom = function(ctx) {
    ctx.value = ctx.e.value;
    if (this.loginfo) console.log(ctx.e.value);
};


// Enter a parse tree produced by CalculatorParser#integer.
CalculatorListenerRPNImpl.prototype.enterInteger = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#integer.
CalculatorListenerRPNImpl.prototype.exitInteger = function(ctx) {
    ctx.value = parseInt(ctx.getText());
};





exports.CalculatorListenerRPNImpl = CalculatorListenerRPNImpl;
