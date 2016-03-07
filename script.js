'use strict';

var arr = [];

function createNode(){
	var node = document.createElement('input');
	node.type = "text";
	node.className = "node";
	node.id = "node".concat(arr.length);
	node.onblur = sortPermission;
	arr.push({
		isValid: false,
		value: ""
	});
	currentStablePosition++;
	var nextStepBtn = document.getElementById("nextStepBtn");
	disableButton(nextStepBtn);
	return node;
}

function screenPermission(){
	var width = document.body.clientWidth;
	var newNode = document.getElementById("newNode");
    if ((width - newNode.getBoundingClientRect().right) < 45) {
    	return false;
    }
    return true;
}

function onPlusPress(event){
	if (screenPermission()){
		var nodeDiv = document.getElementById("nodeDiv");
		var newNode = document.getElementById("newNode");
		var node = createNode();
		nodeDiv.insertBefore(node, newNode);
	} else {
		var plusBtn = document.getElementById("newNode");
		plusBtn.disabled = true;
		var message = document.getElementById("message");
		message.style.visibility = "visible";
	}
}

function disableButton(btn){
	btn.disabled = true;
}

function enableButton(btn){
	btn.disabled = false;
}

function isValidNumber(number) {
	return number == (+number).toString(); //двойное преобразование, 0.toString != пустой строке.
}

function isArrayValid(arr){
	if (!arr.every || typeof arr.every != "function"){
		return false;
	}
	return arr.every(function(element){
		return element.isValid === true;
	});
}

function sortPermission(event){
	var input = event.target;
	var inputId = input.id;
	var index = +inputId.slice(4);
	var currentValue = input.value;
	var nextStepBtn = document.getElementById("nextStepBtn");
	if (isValidNumber(currentValue)){
		arr[index].isValid = true;
		arr[index].value = +currentValue;
		input.style = "border-color: none";
		if (isArrayValid(arr)){
			enableButton(nextStepBtn);
		} else {
			disableButton(nextStepBtn);
		}
	} else {
		disableButton(nextStepBtn);
		arr[index].isValid = false;
		arr[index].value = +currentValue;
		input.style = "border-color: red";
	}
}

function onReset() {
	var nextStepBtn = document.getElementById("nextStepBtn");
	disableButton(nextStepBtn);
	var nodeDiv = document.getElementById("nodeDiv");
	
	for (var i = arr.length-1; i > 1; i--){
		var node = document.getElementById("node".concat(i));
		nodeDiv.removeChild(node);
	}
	var node0 = document.getElementById("node0");
	node0.value = "";
	node0.style = "border-color:none; background-color:none";
	var node1 = document.getElementById("node1");
	node1.value = "";
	node1.style = "border-color:none; background-color:none";
	var message = document.getElementById("message");
	message.style.visibility = "hidden";
	
	arr = [
	{
		isValid: false,
		value: ""
	},
	{
		isValid: false,
		value: ""
	}];
	
	currentStablePosition = arr.length;
}

var currentArrPosition = 0,
	currentStablePosition;

function startSort(){
	toSortMode();
    if (currentArrPosition < currentStablePosition-1){
    	bubbleSort();
    } else {
    	unlightNodes();
    	currentArrPosition = 0;
    	currentStablePosition--;
    	highlightCurrentStableNode();
    	if (currentStablePosition === 1){
    		currentStablePosition--;
    		highlightCurrentStableNode();
    		
			var nextStepBtn = document.getElementById("nextStepBtn");
			disableButton(nextStepBtn);
    	}else{
			startSort();
    	}
    }
}

function toSortMode() {
	for (var i = 0; i < arr.length; i++){
		var node = document.getElementById("node".concat(i));
		node.disabled = true;
	}
	var newNode = document.getElementById("newNode");
	newNode.disabled = true;
}

function bubbleSort() {
	unlightNodes();
	highlightNodes();
    if (arr[currentArrPosition+1].value < arr[currentArrPosition].value) { 
		bubbleSortStep();
	}
	currentArrPosition++;
}

function bubbleSortStep(){
	var t = arr[currentArrPosition + 1].value;
	arr[currentArrPosition + 1].value = arr[currentArrPosition].value;
	arr[currentArrPosition].value = t;
	
	var firstNode = document.getElementById("node".concat(currentArrPosition));
	var secondNode = document.getElementById("node".concat(currentArrPosition + 1));
	firstNode.value = arr[currentArrPosition].value;
	secondNode.value = arr[currentArrPosition + 1].value;
}

function highlightNodes(){
	var firstNode = document.getElementById("node".concat(currentArrPosition));
	var secondNode = document.getElementById("node".concat(currentArrPosition + 1));
	highlightNode(firstNode);
	highlightNode(secondNode);
}

function unlightNodes(){
	if (currentArrPosition !== 0){
		var firstNode = document.getElementById("node".concat(currentArrPosition - 1));
		var secondNode = document.getElementById("node".concat(currentArrPosition));
		unlightNode(firstNode);
		unlightNode(secondNode);
	}
}

function highlightCurrentStableNode(){
	var node = document.getElementById("node".concat(currentStablePosition));
	highlightNodeAsStable(node);
}

function highlightNode(node){
	node.style = "background-color: lightgreen";
}

function highlightNodeAsStable(node){
	node.style = "background-color: gray";
}

function unlightNode(node){
	node.style = "background-color: none";
}