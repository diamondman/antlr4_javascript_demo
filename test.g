grammar Calculator;

options {
  language=JavaScript;
}

evaluate
    : (letter_score+)? EOF;


letter_score
    : (LETTER+  USCORE?);


LETTER         : ('a'..'z'|'A'..'Z');
USCORE          : '_';

