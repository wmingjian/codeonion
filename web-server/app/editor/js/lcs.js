function lcsArray(array1, array2) {
    var map = [];
    var dir = [];
    var resultArr = [];
    var groupArr = [];
    var DIRECTION_LEFT = 1;
    var DIRECTION_UP = 2;
    var DIRECTION_LEFT_UP = 3;
    
    /// 1. init map and dir array
    for(var i = 0; i < array1.length; i ++) {
        map[i] = [];
        dir[i] = [];
        for(var j = 0; j < array2.length; j ++) {
            map[i][j] = 0;
            dir[i][j] = 0;
        }
    }
    
    /// 2. setup comparing map and direction dir
    for (var i = 0; i < array1.length; i ++) {
        for(var j = 0; j < array2.length; j ++) {
            if(array1[i] == array2[j]) {
                var val = (i-1 < 0 || j-1 < 0) ? (1) : (map[i-1][j-1] + 1);
                map[i][j] = val;
                dir[i][j] = DIRECTION_LEFT_UP;
            }
            else {
                var upper = (i-1 < 0) ? (0) : (map[i-1][j]);
                var lefter = (j-1 < 0) ? (0) : (map[i][j-1]);
                map[i][j] = upper >= lefter ? upper : lefter;
                dir[i][j] = upper >= lefter ? DIRECTION_UP : DIRECTION_LEFT;
            }
        }
    }
    
    /// 3. use direction dir to get the result array resultArr
    var i = array1.length - 1;
    var j = array2.length - 1;
    var k = map[i][j] - 1;
    var g = 0;
    var sameGroup = true;
    while(true) {
        if(i < 0 || j < 0 || k < 0) {
            break;
        }
        if(dir[i][j] == DIRECTION_LEFT_UP) {
            g = sameGroup ? g : g+1;
            groupArr[g] = k;
            resultArr[k] = array1[i];
            i --;
            j --;
            k --;
            sameGroup = true;
        }
        else if(dir[i][j] == DIRECTION_UP) {
            i --;
            sameGroup = false;
        }
        else if(dir[i][j] == DIRECTION_LEFT) {
            j --;
            sameGroup = false;
        }
    }
    
    /// final, upsidedown the groupArr
    var temp = [];
    for(var i = 0; i < groupArr.length; i ++) {
        temp[i] = groupArr[groupArr.length - i - 1];
        if(temp[i] == undefined)
            temp[i] = resultArr.length;
    }
    groupArr = temp;
    
    return {result : resultArr, group : groupArr};
}


function lcsString(str1, str2) {
    var map = [];
    var dir = [];
    var resultStr = "";
    var DIRECTION_LEFT = 1;
    var DIRECTION_UP = 2;
    var DIRECTION_LEFT_UP = 3;
    
    /// 1. init map and dir array
    for(var i = 0; i < str1.length; i ++) {
        map[i] = [];
        dir[i] = [];
        for(var j = 0; j < str2.length; j ++) {
            map[i][j] = 0;
            dir[i][j] = 0;
        }
    }
    
    /// 2. setup comparing map and direction dir
    for (var i = 0; i < str1.length; i ++) {
        for(var j = 0; j < str2.length; j ++) {
            if(str1.charAt(i) == array2.charAt(j)) {
                var val = (i-1 < 0 || j-1 < 0) ? (1) : (map[i-1][j-1] + 1);
                map[i][j] = val;
                dir[i][j] = DIRECTION_LEFT_UP;
            }
            else {
                var upper = (i-1 < 0) ? (0) : (map[i-1][j]);
                var lefter = (j-1 < 0) ? (0) : (map[i][j-1]);
                map[i][j] = upper >= lefter ? upper : lefter;
                dir[i][j] = upper >= lefter ? DIRECTION_UP : DIRECTION_LEFT;
            }
        }
    }
    
    /// 3. use direction dir to get the result array resultStr
    var i = str1.length - 1;
    var j = str2.length - 1;
    var k = map[i][j];
    while(true) {
        if(dir[i][j] == DIRECTION_LEFT_UP) {
            resultStr = resultStr + str1[i];
            i --;
            j --;
            k --;
        }
        else if(dir[i][j] == DIRECTION_UP) {
            i --;
        }
        else if(dir[i][j] == DIRECTION_LEFT) {
            j --;
        }
    }
    return resultStr;
}


function debugLcsArray(array1, array2) {
    var same = lcsArray(array1, array2);
    var text = "";
    var result = same.result;
    var group = same.group;

    for(var i = 0; i < group.length; i ++) {
        var g = group[i];
        var g2 = i == group.length-1 ? result.length : group[i + 1];
        for(var j = g; j < g2; j ++) {
            text = text + result[j];
        }
        text = text + "<div style=\"background-color:#FF0000\"><<</div>";
    }
    return text;
}
