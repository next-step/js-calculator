import {$} from './selectors.js';

export const CONSTANTS ={
    'DIGIT_MAX_LENGTH' : 3,

}
export const UI_COMPONENT ={
    '$display' : $('h1#total'),
    '$modifiersArea' : $('div.modifiers'),
    '$digitsArea' : $('div.digits'),
    '$operationsArea' : $('div.operations'),
}     
export const OPERATORS ={
    'DIVIDE':'/',
    'MULTIPLE':'X',
    'MINUS':'-',
    'PLUS':'+',
    'EQUAL':'='
}     
