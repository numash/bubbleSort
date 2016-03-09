'use strict';

var arrayService = getArrayService();

function screenPermission(){
	var width = document.body.clientWidth;
	var newNodeBtn = document.getElementById("newNodeBtn");
    if ((width - newNodeBtn.getBoundingClientRect().right) < 45) {
    	return false;
    }
    return true;
}

function createNode(){
	var node = document.createElement('input');
	node.type = "text";
	node.className = "node";
	node.id = "node".concat(arrayService.getLength());
	node.onblur = nodePermission;
	arrayService.push(node);
	var nextStepBtn = document.getElementById("nextStepBtn");
	disableButton(nextStepBtn);
	return node;
}

function onPlusPress(event){
	if (screenPermission()){
		var nodeDiv = document.getElementById("nodeDiv");
		var newNodeBtn = document.getElementById("newNodeBtn");
		var node = createNode();
		nodeDiv.insertBefore(node, newNodeBtn);
	} else {
		var plusBtn = document.getElementById("newNodeBtn");
		disableButton(plusBtn);
		$("#message").show();
		//showMessage();
	}
}

function nodePermission(event){
	var input = event.target;
	var currentValue = input.value;
	var inputId = input.id;
	
	arrayService.updateNode(input);
	if (arrayService.isNodeValid(+input.id.slice(4))){
		$("#"+inputId).removeClass("invalidNode");	
	}
	else{
		$("#"+inputId).addClass("invalidNode");
	}
	var nextStepBtn = document.getElementById("nextStepBtn");
	if (arrayService.isArrayValid()){
		enableButton(nextStepBtn);
	} else{
		disableButton(nextStepBtn);
	}
}

function reloadPage(){
	var node0 = document.getElementById("node0");
	var node1 = document.getElementById("node1");
	node0.value = "";
	node1.value = "";
	node0.disabled = false;
	node1.disabled = false;
	
	unlightNode(node0.id);
	unlightNode(node1.id);
	unlightNodeAsStable(node0.id);
	unlightNodeAsStable(node1.id);
	$("#node0").removeClass("invalidNode");
	$("#node1").removeClass("invalidNode");
	$("#message").hide();
	//hideMessage();
	
	var newNodeBtn = document.getElementById("newNodeBtn");
	enableButton(newNodeBtn);
	var nextStepBtn = document.getElementById("nextStepBtn");
	disableButton(nextStepBtn);
	
	arrayService.initArray([node0, node1]);
}

function onLoad(){
	reloadPage();
}

function onReset() {
	var nodeDiv = document.getElementById("nodeDiv");
	for (var i = arrayService.getLength()-1; i > 1; i--){
		var node = document.getElementById("node".concat(i));
		nodeDiv.removeChild(node);
	}
	$("#nextStepBtn").show();	
	reloadPage();
}

function startSort(){
	toSortMode();
	var stepResult = arrayService.sortStep();
	
	if (stepResult.newStableNodeIds[1] === "node0"){
		$("#nextStepBtn").hide();
	}
	
	stepResult.prevNodeIds.forEach(function(nodeId){
		unlightNode(nodeId);
	});
	
	stepResult.activeNodeIds.forEach(function(nodeId){
		highlightNode(nodeId);
	});
	
	stepResult.newStableNodeIds.forEach(function(nodeId){
		highlightNodeAsStable(nodeId);
	});
	
    /*if (currentArrPosition < currentStablePosition-1){
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
    	} else{
			startSort();
    	}
    }*/
}

function toSortMode() {
	for (var i = 0; i < arrayService.getLength(); i++){
		var node = document.getElementById("node".concat(i));
		node.disabled = true;
	}
	var newNodeBtn = document.getElementById("newNodeBtn");
	disableButton(newNodeBtn);
}

function showMessage(){
	var message = document.getElementById("message");
	message.style.visibility = "visible";
}

function hideMessage(){
	var message = document.getElementById("message");
	message.style.visibility = "hidden";
}

function disableButton(btn){
	btn.disabled = true;
}

function enableButton(btn){
	btn.disabled = false;
}

function highlightNode(nodeId){
	$("#"+nodeId).addClass("activeNode");
}

function highlightNodeAsStable(nodeId){
	$("#"+nodeId).addClass("stableNode");
}

function unlightNodeAsStable(nodeId){
	$("#"+nodeId).removeClass("stableNode");
}

function unlightNode(nodeId){
	$("#"+nodeId).removeClass("activeNode");
}