function Calculator(){}
import $ from "jquery"
var numeral = require('numeral')

Calculator.prototype = {
    addFrame : function(){
        document.body.innerHTML = `<div id="frame"/>`
    },
    addScreen : function(){
        let frame = document.getElementById('frame')
        let screen = document.createElement('textarea');
        screen.maxLength = 15
        screen.readOnly = true
        screen.id = 'screen'
        frame.appendChild(screen)
    },
    addButtons : function(){
        let frame = document.getElementById('frame')
        let buttons = document.createElement('div')
        let general = document.createElement('div')
        general.id = 'general'
        let general_btns = ['AC','C','±','7','8','9','4','5','6','1','2','3','0','.','='];
        for(var i = 0; i < general_btns.length; i++){
            let button = document.createElement('button')
            button.className = 'button notplus'
            button.clickable = true;
            button.innerText = general_btns[i];
            //button.innerText = (i == 9)? '0' : (i == 10)? '.' : (i == 11)? '=' : (i + (-6 * (Math.floor(i/3) + 1) + 13))
            general.appendChild(button)
        }
        let actions = document.createElement('div')
        actions.id = 'actions'
        let action = ['÷', '×','-','+'];
        for(var i = 0; i < action.length; i++){
            let button = document.createElement('button')
            if(action[i] === '+'){
                button.className = 'button plus'
            } else {
                button.className = 'button notplus'
            }
            button.innerText = action[i];
            actions.appendChild(button)
        }
        buttons.appendChild(general)
        buttons.appendChild(actions)
        buttons.id = 'buttons'
        frame.appendChild(buttons)
    },
    addEventListeners(){
        function calculate(value1, value2, calcType){
            let val1 = numeral(value1).value()
            let val2 = numeral(value2).value()
            let calcValue = (calcType == '+')? val1 + val2 : (calcType == '-')? val1 - val2 : (calcType == '×')? val1 * val2 : val1 / val2
            let calcString = calcValue.toString()
            return numeral(calcString).format('0,0.[0000000000000000000000000]')
        }

        function cleanSessionStorage(){
            sessionStorage.removeItem('value')
            sessionStorage.removeItem('type');
            sessionStorage.removeItem('prevValue')
            sessionStorage.removeItem('prevType');
        }

        $('.button').click(function(){
            let text = this.innerText;
            let screenVal = $('#screen').val();
            if(text == '+' || text == '-' || text == '×' || text == '÷'){
                if(sessionStorage.getItem('value') == null || sessionStorage.getItem('type') == null){
                    sessionStorage.setItem('value', screenVal);
                    sessionStorage.setItem('type', text);
                    sessionStorage.setItem('clean','true')

                } else {
                    let def = (text == '×' || text == '÷')? "1" : "0";
                    let val1 = sessionStorage.getItem('value');
                    let clean = sessionStorage.getItem('clean')
                    let val2 = (clean == 'true')? def : screenVal;
                    let calcType = sessionStorage.getItem('type');
                    let newValue = (calcType == '=' || clean == 'true')? val1: calculate(val1, val2, calcType);
                    sessionStorage.setItem('value', newValue);
                    sessionStorage.setItem('type', text);
                    sessionStorage.setItem('clean', 'true');
                    $('#screen').val(newValue);
                }

            } else if (text == '='){
                if(sessionStorage.getItem('value') == null || sessionStorage.getItem('type') == null){
                    $('#screen').val(numeral(screenVal).format('0,0.[0000000000000000000000000]'))

                } else {
                    let val1 = sessionStorage.getItem('value')
                    let val2 = screenVal
                    let calcType = sessionStorage.getItem('type')
                    if(calcType == '='){
                        let prevType = sessionStorage.getItem('prevType')
                        let prevValue = sessionStorage.getItem('prevValue')
                        let newValue = calculate(screenVal, prevValue, prevType);
                        sessionStorage.setItem('value', newValue);
                        sessionStorage.setItem('type', text);
                        sessionStorage.setItem('clean', 'true');
                        $('#screen').val(newValue)
                        
                    } else {
                        sessionStorage.setItem('prevType', calcType)
                        sessionStorage.setItem('prevValue', val2)
                        let newValue = calculate(val1, val2, calcType);
                        sessionStorage.setItem('value', newValue);
                        sessionStorage.setItem('type', text);
                        sessionStorage.setItem('clean', 'true');
                        $('#screen').val(newValue)
                    }
                }

            } else if (text == 'AC') {
                cleanSessionStorage();
                $('#screen').val("");

            } else if (text == 'C') {
                $('#screen').val("");
                if(sessionStorage.getItem('type') === '='){
                    cleanSessionStorage();
                }

            } else if (text == '±') {
                if(screenVal === "" || sessionStorage.getItem('clean') === 'true'){
                    $('#screen').val('-')
                    sessionStorage.setItem('clean','false');
                    if(sessionStorage.getItem('type') === '='){
                        cleanSessionStorage();
                    }

                } else {
                    if(screenVal.startsWith('-')) {
                        $('#screen').val(screenVal.replace('-',''))
                    } else {
                        $('#screen').val('-' + screenVal)
                    }

                }

            } else {
                if(screenVal === "" || sessionStorage.getItem('clean') === 'true'){
                    let value = (text == '.')? '0.' : text
                    $('#screen').val(value)
                    sessionStorage.setItem('clean','false');
                    if(sessionStorage.getItem('type') === '='){
                        cleanSessionStorage();
                    }
                
                } else if(screenVal.length < 19){
                    if(text == '.'){
                        if(!screenVal.includes('.')){
                            $('#screen').val(screenVal + '.')
                        }

                    } else if (screenVal == '-'){
                        $('#screen').val('-' + text)

                    } else if (screenVal.includes('.')){
                        $('#screen').val(screenVal + text)

                    } else {
                        let value = (screenVal.endsWith('.'))? numeral(screenVal).value().toString() + '.': numeral(screenVal).value().toString()
                        let newValue = value + text
                        $('#screen').val(numeral(newValue).format('0,0.[0000000000000000000000000]'))
                    }
                }
            }
            
        });
    }

}

window.onload = function(){
    let myCalc = new Calculator()
    myCalc.addFrame() 
    myCalc.addScreen()
    myCalc.addButtons()
    myCalc.addEventListeners()
}
