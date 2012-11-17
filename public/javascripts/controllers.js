function IndexCtrl($scope) {
    
    $scope.eq = {
        x: {
            name: 'x',
            init: 1,
            value: 1
        },
        dependents: [
            {
                name: 'y',
                init: 1,
                value: 1
            }
        ],
        rate: 1,
        actions: [
            {
                variable: 0,
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
        variable: 0,
        operation: 'add',
        value: 1
      });
    };    
    
    $scope.newDependent = function() {
      $scope.eq.dependents.push({
            name: 'y',
            init: 1,
            value: 1
        });
    };
 
    $scope.compute = function() {
        console.log($scope);
        for(var i=0, max=$scope.eq.dependents.length ; i<max; i++) {
            $scope.eq.dependents[i].value = $scope.eq.dependents[i].init;   
        }
        
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
                
                $scope.eq.dependents[action.variable].value = operation($scope.eq.dependents[action.variable].value, action.value);
                
            }
        }
        return "";
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
    
    