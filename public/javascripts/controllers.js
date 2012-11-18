function IndexCtrl($scope, $location) {
    
    $scope.eq = {
        x: {
            name: 'x',
            init: 1,
            value: 1
        },
        dependents: [
            {
                index: 0,
                name: 'y',
                init: 1,
                value: 1,
                percent: 100,
                color: "#ecb484"
            }
        ],
        rate: 1,
        actions: [
            {
                type: "number",
                byVar: 0,
                variable: 0,
                operation: 'add',
                value: 1
            }
        ]
    };
    
    $scope.comp = {
        x: 1
    }
    
    $("#xSlider").slider({
        value: $scope.comp.x,
        step: $scope.eq.rate,
        range: "min",
        min: 0,
        max: 100,
        slide: function(event, ui) {
            $scope.$apply(function() {
                $scope.comp.x = ui.value;
                $scope.compute();
            });
        }
    });
    
    $scope.getShareURL = function() {
        var eq = JSON.stringify($scope.eq);
        var comp = JSON.stringify($scope.comp);
        
        var url = "http://www.mocktime.com/#?eq=" + encodeURIComponent(eq) + "&comp=" + encodeURIComponent(comp);
        
        return url;
    }
    
    $scope.resetRate = function() {
        $scope.comp.x = $scope.eq.rate;
        var max = (($scope.eq.rate * 100) > 100) ? $scope.eq.rate * 100 : 100;
        $("#xSlider").slider("option", "step", $scope.eq.rate);
        $("#xSlider").slider("option", "value", $scope.comp.x);
        $("#xSlider").slider("option", "max", max);
        $scope.compute();
    };
    
    $scope.newAction = function() {
      $scope.eq.actions.push({
        type: "number",
        byVar: 0,
        variable: 0,
        operation: 'add',
        value: 1
      });
    };    
    
    $scope.newDependent = function() {
      $scope.eq.dependents.push({
            index: $scope.eq.dependents.length,
            name: 'y',
            init: 1,
            value: 1,
            percent: 0,
            color: "#ecb484"
        });
    };
 
    $scope.compute = function() {
        
        for(var i=0, max=$scope.eq.dependents.length ; i<max; i++) {
            $scope.eq.dependents[i].value = $scope.eq.dependents[i].init;   
        }
        
        var doTimes = $scope.comp.x / $scope.eq.rate;
        
        for(var j=0; j<doTimes; j++) {           
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
                
                var secNum = action.byVar === null ? action.value : $scope.eq.dependents[action.byVar].value;

                $scope.eq.dependents[action.variable].value = operation($scope.eq.dependents[action.variable].value, secNum);
                
            }
        }
        
        var total = 0;
        
        for(var i=0, max=$scope.eq.dependents.length ; i<max; i++) {
            total += $scope.eq.dependents[i].value > 0 ? $scope.eq.dependents[i].value : 0; 
            
            var step = 360 / $scope.eq.dependents.length;

            $scope.eq.dependents[i].color = hsv2rgb({hue: step * i, sat: 80, val: 80});
        }
        
        for(var i=0, max=$scope.eq.dependents.length ; i<max; i++) {
            $scope.eq.dependents[i].percent = Math.floor(($scope.eq.dependents[i].value / total) * 10000) / 100;   
            
            if($scope.eq.dependents[i].percent < 0) {
                $scope.eq.dependents[i].percent = 0;   
            }
        }
        
        return "";
    };
    
        
    var queries = $location.search();
    
    if(typeof(queries.eq) !== "undefined" && typeof(queries.comp) !== "undefined") {

        try {
            var eq = JSON.parse(queries.eq);
            var comp = JSON.parse(queries.comp);
        } catch(err) {
            console.log("Query parameters set, but not valid JSON", err);   
            return false;
        }

        $scope.eq = eq;
        $scope.comp = comp;
        
        
        var max = (($scope.eq.rate * 100) > 100) ? $scope.eq.rate * 100 : 100;
        $("#xSlider").slider("option", "step", $scope.eq.rate);
        $("#xSlider").slider("option", "value", $scope.comp.x);
        $("#xSlider").slider("option", "max", max);
        $scope.compute();
    }
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
    
var hsv2rgb = function(hsv) {
  var h = hsv.hue, s = hsv.sat, v = hsv.val;
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){ 
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};