function IndexCtrl($scope) {
    
    $scope.eq = {
        x: 'x',
        y: 'y',
        rate: 1,
        actions: [
            {
                variable: 'y',
                operation: 'add',
                value: 1
            }
        ]
    };
    
    $scope.comp = {
        x: 1
    }
    
    $scope.newAction = function() {
      $scope.eq.actions.push({
        variable: 'x',
        operation: 'add',
        value: 1
      });
    };
 
    $scope.compute = function() {
        var ret = 0;
        
        for(var j=0; j<$scope.comp.x; j++) {           
            for(var i=0, max=$scope.eq.actions.length; i<max; i++) {
                var action = $scope.eq.actions[i];
                
                var operation;
                
                switch(action.operation) {
                    case "add":
                        operation = computeAdd;
                        break;
                        
                    case "subtract":
                      operation = computeSubtract;
                      break;
                      
                    case "multiply":
                        operation = computeMultiply;
                        break;
                        
                        
                    case "divide":
                        operation = computeDivide;
                        break;
                }
                
                ret = operation(ret, action.value);
                
            }
        }
        
        return ret;
    };
}

function computeAdd(pre, val) {
    return pre + val;
}
function computeSubtract(pre, val) {
    return pre - val;
}
function computeMultiply(pre, val) {
    return pre * val;
}
function computeDivide(pre, val) {
    return pre / val;
}
    
    