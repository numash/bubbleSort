describe("arrayService", function() {

    var arrayService;
    beforeEach(function() {
        arrayService = getArrayService();
    });

    describe("initArray", function() {

        it("inites with empty array in case of call without args", function() {
            var expectedArrayLength = 0;
            arrayService.initArray();
            var actualArrayLength = arrayService.getLength();
            assert.equal(expectedArrayLength, actualArrayLength);
        });

        it("inites with empty array in case of call with null", function() {
            var expectedArrayLength = 0;
            arrayService.initArray(null);
            var actualArrayLength = arrayService.getLength();
            assert.equal(expectedArrayLength, actualArrayLength);
        });

        it("throws error when node.id is invalid or undefined", function() {
            var elem0 = {
                id: 0,
                value: 0
            };
            arrayService.initArray(elem0);
            var actualArrayLength = arrayService.getLength();
            assert(!actualArrayLength);
        });

        it("inits array with 2 elements", function() {
            var elem0 = {
                id: "node0",
                value: 0
            };
            var elem1 = {
                id: "node1",
                value: 0
            };
            var expectedArrayLength = 2;
            arrayService.initArray([elem0, elem1]);
            var actualArrayLength = arrayService.getLength();
            assert.equal(expectedArrayLength, actualArrayLength);
        });

    });

    describe("push", function() {

        it("returns array without changes in case of call with incorrect id", function() {
            var startArrayLength = arrayService.getLength();
            var elem0 = {
                id: 0,
                value: 0
            };
            arrayService.push(elem0);
            var finishArrayLength = arrayService.getLength();
            assert.equal(startArrayLength, finishArrayLength);
        });

        it("throws error when node is undefined", function() {
            assert.throws(arrayService.push);
        });

        it("throws error 'undefined node value'", function() {
            var elem0 = {
                id: "node0",
                value: undefined
            }
            assert.throws(arrayService.push, elem0);
        });

        it("adds element to the array", function() {
            var expectedArrayLength = arrayService.getLength() + 1;
            var elem0 = {
                id: "node0",
                value: 0
            }
            arrayService.push(elem0);
            var actualArrayLength = arrayService.getLength();
            assert.equal(expectedArrayLength, actualArrayLength);
        });
    });

    describe("isValidNumber", function() {

        it("returns False when arg is null", function() {
            assert.isFalse(arrayService.isValidNumber(null));
        });

        it("returns False when there is no arg", function() {
            assert.isFalse(arrayService.isValidNumber());
        });

        it("returns False when arg is a string", function() {
            assert.isFalse(arrayService.isValidNumber(""));
        });

        it("returns True when arg is a number", function() {
            assert.isTrue(arrayService.isValidNumber(1.2));
        });

    });

    describe("isArrayValid", function() {

        it("returns True when each element value is valid", function() {
            var elem0 = {
                id: "node0",
                value: 0
            }
            var elem1 = {
                id: "node1",
                value: 0
            }
            arrayService.initArray([elem0, elem1]);
            assert.isTrue(arrayService.isArrayValid());
        });

        it("returns False when one of elements value is invalid (string)", function() {
            var elem0 = {
                id: "node0",
                value: 0
            }
            var elem1 = {
                id: "node1",
                value: ""
            }
            arrayService.initArray([elem0, elem1]);
            assert.isFalse(arrayService.isArrayValid());
        });

        it("returns False when one of elements value is invalid (NaN)", function() {
            var elem0 = {
                id: "node0",
                value: 0
            }
            var elem1 = {
                id: "node1",
                value: NaN
            }
            arrayService.initArray([elem0, elem1]);
            assert.isFalse(arrayService.isArrayValid());
        });

        it("returns False when one of elements value is invalid (number with comma)", function() {
            var elem0 = {
                id: "node0",
                value: "3,14"
            }
            var elem1 = {
                id: "node1",
                value: 0
            }
            arrayService.initArray([elem0, elem1]);
            assert.isFalse(arrayService.isArrayValid());
        });

        it("returns False when one of elements value is invalid (null)", function() {
            var elem0 = {
                id: "node0",
                value: null
            }
            var elem1 = {
                id: "node1",
                value: 0
            }
            arrayService.initArray([elem0, elem1]);
            assert.isFalse(arrayService.isArrayValid());
        });
    });

    describe("isNodeValid", function() {

        it("throws error 'undefined node' when nodeId is invalid", function() {
            var nodeId = "";
            assert.throws(arrayService.isNodeValid, nodeId);
        });
        
        it("throws error 'undefined node' when arr[nodeId] doesn't exist", function() {
            var elem0 = {
                id: "node0",
                value: 0
            }
            var nodeId = "";
            arrayService.initArray(elem0);
            assert.throws(arrayService.isNodeValid, nodeId);
        });
        
        it("returns False when arr element value is invalid", function() {
            var elem0 = {
                id: "node0",
                value: ""
            }
            arrayService.initArray(elem0);
            assert.isFalse(arrayService.isNodeValid(0));
        });
        
        it("returns True when arr element value is valid", function() {
            var elem0 = {
                id: "node0",
                value: 0
            }
            arrayService.initArray(elem0);
            assert.isTrue(arrayService.isNodeValid(0));
        });

    });
    
    describe("updateNode", function() {

        it("throws error when node is undefined", function() {
            assert.throws(arrayService.updateNode);
        });
        
        it("throws error when node.id is invalid or doesn't exist", function() {
            assert.throws(arrayService.updateNode, "undefined node", "");
        });
        
        it("updates array element", function() {
            var elem0 = {
                id: "node0",
                value: 3.14
            }
            var elem1 = {
                id: "node1",
                value: 0
            }
            arrayService.initArray([elem0, elem1]);
            var node1 = {
                id: "node1",
                value: 100
            }
            assert.isTrue(arrayService.updateNode(node1));
        });

    });
    
    describe("swapNodes", function() {

        it("throws error when args are undefined", function() {
            assert.throws(arrayService.swapNodes, "undefined node.id");
        });
        
        it("throws error when arr[nodeId] doesn't exist", function() {
            var elem0 = {
                id: "node0",
                value: 100
            }
            var elem1 = {
                id: "node1",
                value: 0
            }
            arrayService.initArray([elem0, elem1]);
            var elem2 = {
                id: "node2",
                value: 0
            }
            assert.throws(arrayService.swapNodes, "undefined node.id", elem2.id, elem1.id);
        });
        
        it("swaps two elements", function() {
            var elem0 = {
                id: "node0",
                value: 100
            }
            var elem1 = {
                id: "node1",
                value: 0
            }
            arrayService.initArray([elem0, elem1]);
            assert.isTrue(arrayService.swapNodes("0", "1"));
        });

    });
    
    describe("sortStep", function() {
       
       var elem0, elem1, elem2, elem3, elem4;
       beforeEach(function() {
           elem0 = {
                id: "node0",
                value: 0
           };
           elem1 = {
                id: "node1",
                value: 100
           };
           elem2 = {
                id: "node2",
                value: -17
           };
           elem3 = {
                id: "node3",
                value: 3.14
           };
            elem4 = {
                id: "node4",
                value: 7
            };
       });
       
       it("makes active two first elems", function(){
            var expectedResult = {
                activeNodeIds: [elem0.id, elem1.id],
                newStableNodeIds: [],
                prevNodeIds: [elem4.id]
            };
            
            arrayService.initArray([elem0, elem1, elem2, elem3, elem4]);
            var actualResult = arrayService.sortStep();
            assert.equal(expectedResult.activeNodeIds.toString(), actualResult.activeNodeIds.toString());
            assert.equal(expectedResult.newStableNodeIds.toString(), actualResult.newStableNodeIds.toString());
            assert.equal(expectedResult.prevNodeIds.toString(), actualResult.prevNodeIds
            .toString());
       });
       
       it("makes active two last elems", function(){
            var expectedResult = {
                activeNodeIds: [elem3.id, elem4.id],
                newStableNodeIds: [],
                prevNodeIds: [elem3.id, elem2.id]
            };
            
            arrayService.initArray([elem0, elem1, elem2, elem3, elem4]);
            arrayService.sortStep();
            arrayService.sortStep();
            arrayService.sortStep();
            var actualResult = arrayService.sortStep();
            assert.equal(expectedResult.activeNodeIds.toString(), actualResult.activeNodeIds.toString());
            assert.equal(expectedResult.newStableNodeIds.toString(), actualResult.newStableNodeIds.toString());
            assert.equal(expectedResult.prevNodeIds.toString(), actualResult.prevNodeIds
            .toString());
       });
       
       it("makes stable last elem", function(){
            var expectedResult = {
                activeNodeIds: [],
                newStableNodeIds: [elem4.id],
                prevNodeIds: [elem4.id, elem3.id]
            };
            
            arrayService.initArray([elem0, elem1, elem2, elem3, elem4]);
            arrayService.sortStep();
            arrayService.sortStep();
            arrayService.sortStep();
            arrayService.sortStep();
            var actualResult = arrayService.sortStep();
            assert.equal(expectedResult.activeNodeIds.toString(), actualResult.activeNodeIds.toString());
            assert.equal(expectedResult.newStableNodeIds.toString(), actualResult.newStableNodeIds.toString());
            assert.equal(expectedResult.prevNodeIds.toString(), actualResult.prevNodeIds
            .toString());
       });
       
    });
});