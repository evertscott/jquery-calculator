function Calculator(){}
import $ from "jquery"
var numeral = require('numeral')

Calculator.prototype = {
    addFrame : function(){
        document.body.innerHTML = `<div id="frame"/>`
    },
    addScreen : function(){
        let frame = document.getElementById('frame')
        let screen = document.createElement('div');
        screen.id = 'screen'
        screen.innerText = 'huihdd'
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
            let calcValue = (calcType == '+')? val1 + val2 : (calcType == '-')? val1 - val2 : (calcType == 'x')? val1 * val2 : val1 / val2
            let calcString = calcValue.toString
            if(calcString.contains('.')){
                let split = calcString.split('.')
                return `${numeral(split[0]).format('0,0')}.${split[1]}`
            } else {
                return numeral(calcString).format('0,0')
            }
        }

        $('.button').click(function(){
            let text = this.innerText;
            let screenVal = $('#screen').innerText;
            if(text == '+' || text == '-' || text == 'x' || text == '/'){
                if(sessionStorage.getItem('value') == 'undefined' || sessionStorage.getItem('type') == 'undefined'){
                    sessionStorage.setItem('value', screen)
                    sessionStorage.setItem('type', text)
                    screen.innerText = ''

                } else {
                    let val1 = sessionStorage.getItem('value')
                    let val2 = screenVal
                    let calcType = sessionStorage.getItem('type')
                    let newValue = (calcType == '=')? val1: calculate(val1, val2, calcType);
                    sessionStorage.setItem('value', newValue);
                    sessionStorage.setItem('type', text);
                    sessionStorage.setItem('clean', 'true');
                    $('#screen').innerText = newValue
                }

            } else if (text == '='){
                let val1 = sessionStorage.getItem('value')
                let val2 = screenVal
                let calcType = sessionStorage.getItem('type')
                let newValue = calculate(val1, val2, calcType);
                sessionStorage.setItem('value', newValue);
                sessionStorage.setItem('type', text);
                sessionStorage.setItem('clean', 'true');
                $('#screen').innerText = newValue

            } else {
                if(typeof screenVal === "undefined" || sessionStorage.getItem('clean') == 'true'){
                    $('#screen').innerText = text
                    sessionStorage.setItem('clean','false')
                
                } else if(screenVal.length < 26){
                    
                    let value = numeral(screenVal).value().toString
                    let newValue = value + text
                    if(newValue.contains('.')){
                        let split = newValue.split('.')
                        $('#screen').innerText = `${numeral(split[0]).format('0,0')}.${split[1]}`
                    } else {
                        $('#screen').innerText =  numeral(newValue).format('0,0')
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
