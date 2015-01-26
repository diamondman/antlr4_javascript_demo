grammar Calculator;

options {
  language=JavaScript;
}

evaluate
    : e=expression EOF;

expression
    : m=MINUS? e=subexpression
    ;

subexpression
    : sumexpression
        ( MINUS sumexpression )*
    ;

sumexpression
    : divideexpression
        ( PLUS divideexpression )*
    ;

divideexpression
    : multiplyexpression ( DIV multiplyexpression)*
    ;

multiplyexpression
    : exponentexpr ( MULT? exponentexpr)*
    ;

exponentexpr
    : atom ( EXP atom)*
    ;

atom
    : e=integer
    | OPAREN e=expression CPAREN
    ;

integer
    : DECIMAL
    ;

WHITESPACE
    : ( ' ' | '\t' | '\r' | '\n' )+ -> channel(HIDDEN)
    ;

DECIMAL       : (DIGITS ('.' DIGITS?)?);
DIGITS        : DIGIT+;
DIGIT         : ('0'..'9');
PLUS          : '+';
MINUS         : '-';
MULT          : '*';
DIV           : '/';
EXP           : '^';
OPAREN        : '(';
CPAREN        : ')';
