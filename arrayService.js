"use strict";

function getArrayService(){
    
    var arrayService = {};
    
    var arr = [];
    var currentArrPosition = 0;
    var currentStablePosition = 0;
    
    function isValidNumber(number) {
	    return number == (+number).toString(); //двойное преобразование, 0.toString != пустой строке.
    }
    arrayService.isValidNumber = isValidNumber;
    
    //init with two default elements
    arrayService.initArray = function(nodes) {    
        arr = [];
        currentArrPosition = 0;
        currentStablePosition = arr.length;
        
        //if nodes is empty
        if (!nodes){
            return arr;
        }
        
        //if nodes - array
        if (nodes.forEach) { 
            nodes.forEach( function(elem){
                if (!elem.id){
                    throw new Error("undefined node");
                }
                arr[+elem.id.slice(4)] = {
            		isValid: isValidNumber(elem.value),
            		value: +elem.value,
            		node: elem
        	    };    
            });
            currentStablePosition = arr.length;
            return arr;
        }
        
        //if nodes just 1 element
        if (typeof(nodes) == "object"){
            if (!nodes.id){
                return arr;
            }
            arr[+nodes.id.slice(4)] = {
        		isValid: isValidNumber(nodes.value),
        		value: +nodes.value,
        		node: nodes
    	    };
    	    currentStablePosition = arr.length;
    	    return arr;
        }
        return arr;
    };
    
    arrayService.push = function(node){
        if (!node){
            throw new Error("undefined node");
        }
        if (node.value == undefined){
            throw new Error("undefined node value");
        }
        if (!node.id){
            return arr;
        }
        arr[+node.id.slice(4)] = {
            isValid: isValidNumber(node.value),
    		value: +node.value,
    		node: node
        }
        currentStablePosition++;
    }
    
    arrayService.isArrayValid = function(){
        if (!arr.every || typeof arr.every != "function"){
		    return false;
    	}
    	return arr.every(function(element){
    		return element.isValid === true;
    	});
    }
    
    arrayService.isNodeValid = function(nodeId){
        if (!arr[nodeId]){
            throw new Error("value");
        }
        return arr[nodeId].isValid;
    }
    
    arrayService.updateNode = function(node){
        if (!node){
            throw new Error("undefined node");
        }
        if (!node.id || !arr[+node.id.slice(4)]){
            throw new Error("undefined node.id");
        }
        arr[+node.id.slice(4)] = {
            isValid: isValidNumber(node.value),
    		value: +node.value,
    		node: node
        }
        return true;
    }
    
    arrayService.swapNodes = function(firstNodeId, secondNodeId){
        if (firstNodeId == undefined || secondNodeId == undefined){
            throw new Error("undefined node.id");
        }
        if (!arr[firstNodeId] || ! arr[secondNodeId]){
            throw new Error("undefined node.id");
        }
        
        swapValues(firstNodeId, secondNodeId);
        swapNodeValues(firstNodeId, secondNodeId);
        return true;
    }
    
    function swapValues(firstNodeId, secondNodeId){
        var t = arr[firstNodeId].value;
    	arr[firstNodeId].value = arr[secondNodeId].value;
    	arr[secondNodeId].value = t;
    }
    
    function swapNodeValues(firstNodeId, secondNodeId){
        var t = arr[firstNodeId].node.value;
    	arr[firstNodeId].node.value = arr[secondNodeId].node.value;
    	arr[secondNodeId].node.value = t;
    }
    
    arrayService.getLength = function(){
        return arr.length;
    }
    
    arrayService.sortStep = function(){
        var result = {
            activeNodeIds: [],
            newStableNodeIds: [],
            prevNodeIds: []
        }
        
        if (currentArrPosition !== 0){
            result.prevNodeIds.push(arr[currentArrPosition].node.id);
            result.prevNodeIds.push(arr[currentArrPosition-1].node.id);
        } else{
            result.prevNodeIds.push(arr[currentStablePosition-1].node.id);
        }
        
        if (currentArrPosition < currentStablePosition-1){
            
            result.activeNodeIds.push(arr[currentArrPosition].node.id);
            result.activeNodeIds.push(arr[currentArrPosition+1].node.id);
            
    	    if (arr[currentArrPosition+1].value < arr[currentArrPosition].value) { 
		        arrayService.swapNodes(currentArrPosition, currentArrPosition+1);
	        }
    	    currentArrPosition++;
        } else{
        	currentArrPosition = 0;
    	    currentStablePosition--;
    	    result.newStableNodeIds.push(arr[currentStablePosition].node.id);
    	    if (currentStablePosition === 1){
    		    currentStablePosition--;
    	        result.newStableNodeIds.push(arr[currentStablePosition].node.id);
    	   	}
        }
        return result;
    }
    
    return arrayService;
}