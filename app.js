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
        screen.maxLength = 27
        screen.readOnly = true
        screen.id = 'screen'
        frame.appendChild(screen)
    },
    addButtons : function(){
        let frame = document.getElementById('frame')
        let buttons = document.createElement('div')
        let general = document.createElement('div')
        general.id = 'general'
        for(var i = 0; i < 12; i++){
            let button = document.createElement('button')
            button.className = 'button'
            button.clicka
            button.innerText = (i == 9)? '0' : (i == 10)? '.' : (i == 11)? '=' : (i + (-6 * (Math.floor(i/3) + 1) + 13))
            general.appendChild(button)
        }
        let actions = document.createElement('div')
        actions.id = 'actions'
        for(var i = 0; i < 4; i++){
            let button = document.createElement('button')
            let action = ['+','-','x','/'];
            button.className = 'button'
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
            console.log(val1 + "       " + val2)
            let calcValue = (calcType == '+')? val1 + val2 : (calcType == '-')? val1 - val2 : (calcType == 'x')? val1 * val2 : val1 / val2
            let calcString = calcValue.toString()
            return numeral(calcString).format('0,0.[0000000000000000000000000]')
        }

        $('.button').click(function(){
            let text = this.innerText;
            let screenVal = $('#screen').val();
            console.log(screenVal)
            if(text == '+' || text == '-' || text == 'x' || text == '/'){
                if(sessionStorage.getItem('value') == null || sessionStorage.getItem('type') == null){
                    sessionStorage.setItem('value', screenVal);
                    sessionStorage.setItem('type', text);
                    $('#screen').val("");

                } else {
                    let val1 = sessionStorage.getItem('value')
                    let val2 = screenVal
                    let calcType = sessionStorage.getItem('type')
                    let newValue = (calcType == '=')? val1: calculate(val1, val2, calcType);
                    sessionStorage.setItem('value', newValue);
                    sessionStorage.setItem('type', text);
                    sessionStorage.setItem('clean', 'true');
                    $('#screen').val(newValue)
                }

            } else if (text == '='){
                let val1 = sessionStorage.getItem('value')
                let val2 = screenVal
                let calcType = sessionStorage.getItem('type')
                let newValue = calculate(val1, val2, calcType);
                sessionStorage.setItem('value', newValue);
                sessionStorage.setItem('type', text);
                sessionStorage.setItem('clean', 'true');
                $('#screen').val(newValue)

            } else {
                if(screenVal === "" || sessionStorage.getItem('clean') === 'true'){
                    let value = (text == '.')? '0.' : text
                    $('#screen').val(value)
                    sessionStorage.setItem('clean','false')
                    if(sessionStorage.getItem('type') === '='){
                        sessionStorage.removeItem('value')
                        sessionStorage.removeItem('type');
                    }
                
                } else if(screenVal.length < 26){
                    if(text == '.'){
                        $('#screen').val(screenVal + '.')
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
