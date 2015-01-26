var CalculatorListener = require('./CalculatorListener');


CalculatorListenerImpl = function() {
    CalculatorListener.CalculatorListener.call(this); // inherit default listener
    this.loginfo = false;
    return this;
};

CalculatorListenerImpl.prototype = Object.create(CalculatorListener.CalculatorListener.prototype);
CalculatorListenerImpl.prototype.constructor = CalculatorListenerImpl;

// Enter a parse tree produced by CalculatorParser#evaluate.
CalculatorListenerImpl.prototype.enterEvaluate = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#evaluate.
CalculatorListenerImpl.prototype.exitEvaluate = function(ctx) {
    ctx.value = ctx.e.value;
    if (this.loginfo) console.log("FINAL RES: "+ctx.e.value);
    this.value = ctx.e.value
};

// Enter a parse tree produced by CalculatorParser#expression.
CalculatorListenerImpl.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#expression.
CalculatorListenerImpl.prototype.exitExpression = function(ctx) {
    if (ctx.m == null){
	if (this.loginfo) console.log('not negative');
	ctx.value = ctx.e.value;
    }else{
	if (this.loginfo) console.log('negative');
	ctx.value = -ctx.e.value;
    }
    if (this.loginfo) console.log('expression:'+ctx.value);
};


// Enter a parse tree produced by CalculatorParser#subexpression.
CalculatorListenerImpl.prototype.enterSubexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#subexpression.
CalculatorListenerImpl.prototype.exitSubexpression = function(ctx) {
    if (this.loginfo) console.log('\nSUB');

    var tmp = ctx.sumexpression();
    ctx.value = tmp[0].value;
    if (this.loginfo) console.log(ctx.value);
    for (i=1; i<tmp.length;i++){
	var val = tmp[i].value;
	if (this.loginfo) console.log('-'+val);
	ctx.value -= val;
    }
};


// Enter a parse tree produced by CalculatorParser#sumexpression.
CalculatorListenerImpl.prototype.enterSumexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#sumexpression.
CalculatorListenerImpl.prototype.exitSumexpression = function(ctx) {
    if (this.loginfo) console.log('\nSUM');

    var tmp = ctx.divideexpression();
    ctx.value = tmp[0].value;
    console.log(tmp.length);
    if (this.loginfo) console.log(ctx.value);
    for (i=1; i<tmp.length;i++){
	var val = tmp[i].value;
	if (this.loginfo) console.log('+'+val);
	ctx.value += val;
    }
};

// Enter a parse tree produced by CalculatorParser#divideexpression.
CalculatorListenerImpl.prototype.enterDivideexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#divideexpression.
CalculatorListenerImpl.prototype.exitDivideexpression = function(ctx) {
    if (this.loginfo) console.log('\nDIV');

    var tmp = ctx.multiplyexpression();
    ctx.value = tmp[0].value;
    if (this.loginfo) console.log(ctx.value);
    for (i=1; i<tmp.length;i++){
	var val = tmp[i].value;
	if (this.loginfo) console.log('/'+val);
	ctx.value = ctx.value / val;
    }
};


// Enter a parse tree produced by CalculatorParser#multiplyexpression.
CalculatorListenerImpl.prototype.enterMultiplyexpression = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#multiplyexpression.
CalculatorListenerImpl.prototype.exitMultiplyexpression = function(ctx) {
    if (this.loginfo) console.log('\nMULT');

    var tmp = ctx.exponentexpr();
    ctx.value = tmp[0].value;
    if (this.loginfo) console.log(ctx.value);
    for (i=1; i<tmp.length;i++){
	var val = tmp[i].value;
	if (this.loginfo) console.log('*'+val);
	ctx.value = ctx.value * val;
    }
};


// Enter a parse tree produced by CalculatorParser#exponentexpr.
CalculatorListenerImpl.prototype.enterExponentexpr = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#exponentexpr.
CalculatorListenerImpl.prototype.exitExponentexpr = function(ctx) {
    if (this.loginfo) console.log('\nEXP');

    var tmp = ctx.atom();
    ctx.value = tmp[0].value;
    if (this.loginfo) console.log(ctx.value);
    for (i=1; i<tmp.length;i++){
	var val = tmp[i].value;
	if (this.loginfo) console.log('^'+val);
	ctx.value = Math.pow(ctx.value, val);
    }
};


// Enter a parse tree produced by CalculatorParser#atom.
CalculatorListenerImpl.prototype.enterAtom = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#atom.
CalculatorListenerImpl.prototype.exitAtom = function(ctx) {
    ctx.value = ctx.e.value;
    if (this.loginfo) console.log(ctx.e.value);
};


// Enter a parse tree produced by CalculatorParser#integer.
CalculatorListenerImpl.prototype.enterInteger = function(ctx) {
};

// Exit a parse tree produced by CalculatorParser#integer.
CalculatorListenerImpl.prototype.exitInteger = function(ctx) {
    ctx.value = parseInt(ctx.getText());
};





exports.CalculatorListenerImpl = CalculatorListenerImpl;
