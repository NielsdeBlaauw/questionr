var Questionr = function(element, questions){
    this.element           = document.getElementById(element);
    this.questions         = questions;
    this.results           = {};
    this.position          = 'bottom'; // top", "bottom", "left", "right"
    this.endNode           = null;
    this.possiblePositions = ['top', 'bottom', 'left', 'right'];
};

Questionr.prototype.setPosition = function(position){
    if(this.possiblePositions.indexOf(position) == -1){
        console.warn('Illegal position');
        position = this.position;
    }
    this.position = position;
}

Questionr.prototype.init = function(){
    this.getElement().setAttribute('class', 'questionr ' + this.position);
    this._renderQuestion();
    return this;
}

Questionr.prototype._clearElement = function(){
    this.getElement().innerHTML = '';
}

Questionr.prototype._renderQuestion = function(){
    this._clearElement();
    var innerWrapper = document.createElement("div");
    innerWrapper.setAttribute('class', 'innerWrapper');
    var questionWrapper = document.createElement("div");
    questionWrapper.setAttribute('class', 'questionWrapper');
    var questionText = document.createTextNode(this.getQuestion().question);
    var answersWrapper = document.createElement("div");
    answersWrapper.setAttribute('class', 'answersWrapper');
    questionWrapper.appendChild(questionText);
    for(var answerIndex = 0; answerIndex < this.getQuestion().answers.length; answerIndex++){
        var answer = this.getQuestion().answers[answerIndex];
        this._renderAnswer(answer, answerIndex, answersWrapper);
    }
    questionWrapper.appendChild(answersWrapper);
    innerWrapper.appendChild(questionWrapper);
    innerWrapper = this.getElement().appendChild(innerWrapper);
    setTimeout(function(){
        var currentClasses = innerWrapper.getAttribute('class');
        innerWrapper.setAttribute('class', currentClasses + ' showModal');
    }, 20);
}

Questionr.prototype._renderAnswer = function(answer, answerIndex, element){
    var answerButtonWrapper = document.createElement('div');
    answerButtonWrapper.setAttribute('class', 'answerButtonWrapper');
    answerButtonWrapper.setAttribute('data-answer-index', answerIndex);
    var answerButton = document.createTextNode(answer.text);
    answerButtonWrapper.addEventListener("click", function(target){
            this.answerClick(target);
        }.bind(this), false);
    answerButtonWrapper.appendChild(answerButton);
    element.appendChild(answerButtonWrapper);
}

Questionr.prototype.answerClick = function(target){
    var answerIndex = target.target.getAttribute('data-answer-index');
    var answer = this.getQuestion().answers[answerIndex];
    this._addResult(this.getQuestion().name, answer.value);
    this._triggerAnswerEvent();
    if(this._isEndNode(answer)){
        this.endNode = answer;
        this._triggerEndNodeReachedEvent();
    }else{
        this.questions = answer.result;
        this._renderQuestion();
    }
}

Questionr.prototype.getEndNode = function(){
    if(typeof this.endNode !== "object"){
        throw "No endNode has been reached yet.";
    }
    return this.endNode;
}

Questionr.prototype._triggerAnswerEvent = function(){
    var event = new Event('choseAnswer');
    this.getElement().dispatchEvent(event);
}

Questionr.prototype._triggerEndNodeReachedEvent = function(){
    var event = new Event('reachedEndNode');
    this.getElement().dispatchEvent(event);
}

Questionr.prototype._addResult = function(key, value){
    this.results[key] = value;
}

Questionr.prototype.getResults = function(){
    return this.results;
}

Questionr.prototype.close = function(){
    this.getElement().removeAttribute('class');
    this._clearElement();
}

Questionr.prototype._isEndNode = function(answer){
    return typeof answer.result !== 'object';
}

Questionr.prototype.getElement = function(){
    return this.element;
}

Questionr.prototype.getQuestion = function(){
    return this.questions;
}