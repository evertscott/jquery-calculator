function Calculator(){}

Calculator.prototype = {
    addFrame : function(){
        let body = document.getElementsByTagName('body')
        console.log(body)
        body.item(0).innerHTML = `<div id="frame"/>`
    }
}

let myCalc = new Calculator()
myCalc.addFrame() 