describe("arrayService", function() {
  var arrayService;
  beforeEach(function(){
    arrayService = getArrayService();
  });
  
  describe("initArray", function() {
    
    it("is inited with empty array in case of call without args", function() {
      var expectedArrayLength = 0;
      arrayService.initArray();
      var actualArrayLength = arrayService.getLength();
      assert.equal(expectedArrayLength, actualArrayLength);
    });
    
    it("is inited with empty array in case of call with null", function() {
      var expectedArrayLength = 0;
      arrayService.initArray(null);
      var actualArrayLength = arrayService.getLength();
      assert.equal(expectedArrayLength, actualArrayLength);
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

});