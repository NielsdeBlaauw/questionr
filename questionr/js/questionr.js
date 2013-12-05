var Questionr = function(element, questions){
    this.element           = document.getElementById(element);
    this.questions         = questions.questions;
    this.results           = {};
    this.currentQuestion   = null;
    this.pickMethod        = 'random';
    this.position          = 'bottom'; // top", "bottom", "left", "right"
    this.endPoint          = 'endpoint.php';
    this.possiblePositions = ['top', 'bottom', 'left', 'right'];
};

Questionr.prototype.setPosition = function(position){
    if(this.possiblePositions.indexOf(position) == -1){
        console.warn('Illegal position');
        position = this.position;
    }
    this.position = position;
    return this;
}

Questionr.prototype._newCurrentQuestion = function(){
    if(this.getPickMethod() == 'random'){
        this._shuffleArray();
    }
    this.currentQuestion = this.questions.shift();
}

Questionr.prototype.getPickMethod = function(){
    return this.pickMethod;
}

Questionr.prototype.setPickMethod = function(pickMethod){
    this.pickMethod = pickMethod;
    return this;
}

Questionr.prototype.setEndPoint = function(endPoint){
    this.endPoint = endPoint;
    return this;
}

Questionr.prototype._shuffleArray = function(){
    var currentIndex = this.questions.length
    , temporaryValue
    , randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this.questions[currentIndex];
    this.questions[currentIndex] = this.questions[randomIndex];
    this.questions[randomIndex] = temporaryValue;
    }
}

Questionr.prototype.init = function(){
    this.getElement().setAttribute('class', 'questionr ' + this.position);
    this._newCurrentQuestion();
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
    var questionHeader = document.createElement("div");
    questionHeader.setAttribute('class', 'questionHeader');
    var questionText = document.createTextNode(this.getQuestion().question);
    var answersWrapper = document.createElement("div");
    answersWrapper.setAttribute('class', 'answersWrapper');
    questionHeader.appendChild(questionText);
    questionWrapper.appendChild(questionHeader);
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
    if(this.questions.length === 0){
        this._triggerEndNodeReachedEvent();
        this.close();
    }else{
        this._newCurrentQuestion();
        this._renderQuestion();
    }
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

Questionr.prototype.getElement = function(){
    return this.element;
}

Questionr.prototype.getQuestion = function(){
    return this.currentQuestion;
}

Questionr.prototype.getEndPoint = function(){
    return this.endPoint;
}