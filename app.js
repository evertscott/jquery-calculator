function Calculator(){}
import $ from "jquery"

Calculator.prototype = {
    addFrame : function(){
        document.body.innerHTML = `<div id="frame"/>`
    },
    addScreen : function(){
        let frame = document.getElementById('frame')
        let screen = document.createElement('div');
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
            let screen = $('#screen').innerText;
            
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
