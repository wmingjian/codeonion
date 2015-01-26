function diffArray(array1, array2) {
    var map = [];
    var dir = [];
    var diffArr = [];
    var DIRECTION_LEFT = 1;
    var DIRECTION_UP = 2;
    var DIRECTION_LEFT_UP = 3;
    
    /// 1. init map and dir array
    for(var i = 0; i < array2.length; i ++) {
        map[i] = [];
        dir[i] = [];
        for(var j = 0; j < array1.length; j ++) {
            map[i][j] = 0;
            dir[i][j] = 0;
        }
    }
    
    /// 2. setup comparing map and direction dir
    for (var i = 0; i < array2.length; i ++) {
        for(var j = 0; j < array1.length; j ++) {
            if(array1[j] == array2[i]) {
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
    
    /// 3. get the diff array motions
    var j = array1.length - 1;
    var i = array2.length - 1;
    var k = 0;
    while(true) {
        if(i < 0 || j < 0) {
            while(j >= 0) {
                diffArr[k] = {state:-1, data:array1[j], line:-1};
                j --;
                k ++;
            }
            while(i >= 0) {
                diffArr[k] = {state:1, data:array2[i], line:-1};
                i --;
                k ++;
            }
            break;
        }
        if(dir[i][j] == DIRECTION_LEFT_UP) {
            diffArr[k] = {state:0, data:array1[j], line:i};
            k ++;
            i --;
            j --;
        }
        else if(dir[i][j] == DIRECTION_UP) {
            diffArr[k] = {state:1, data:array2[i], line:-1};
            k ++;
            i --;
        }
        else if(dir[i][j] == DIRECTION_LEFT) {
            diffArr[k] = {state:-1, data:array1[j], line:-1};
            k ++;
            j --;
        }
    }
    
    /// 4. upsidedown the diffArr
    var temp = [];
    for(var i = 0; i < diffArr.length; i ++) {
        temp[i] = diffArr[diffArr.length - i - 1];
    }
    diffArr = temp;
    return {result : diffArr};
}


function diffString(str1, str2) {
       var map = [];
    var dir = [];
    var diffArr = [];
    var DIRECTION_LEFT = 1;
    var DIRECTION_UP = 2;
    var DIRECTION_LEFT_UP = 3;
    
    /// 1. init map and dir array
    for(var i = 0; i < str2.length; i ++) {
        map[i] = [];
        dir[i] = [];
        for(var j = 0; j < str1.length; j ++) {
            map[i][j] = 0;
            dir[i][j] = 0;
        }
    }
    
    /// 2. setup comparing map and direction dir
    for (var i = 0; i < str2.length; i ++) {
        for(var j = 0; j < str1.length; j ++) {
            if(str1.charAt(i) == str2.charAt(j)) {
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
    
    /// 3. get the diff array motions
    var i = str2.length - 1;
    var j = str1.length - 1;
    var k = 0;
    while(true) {
        if(i < 0 || j < 0) {
            while(j >= 0) {
                diffArr[k] = {state:-1, data:str1[j]};
                j --;
                k ++;
            }
            while(i >= 0) {
                diffArr[k] = {state:1, data:str2[i]};
                i --;
                k ++;
            }
            break;
        }
        if(dir[i][j] == DIRECTION_LEFT_UP) {
            diffArr[k] = {state:0, data:str1.charAt(j), line:i};
            k ++;
            i --;
            j --;
        }
        else if(dir[i][j] == DIRECTION_UP) {
            diffArr[k] = {state:1, data:str2.charAt(i), line:-1};
            k ++;
            i --;
        }
        else if(dir[i][j] == DIRECTION_LEFT) {
            diffArr[k] = {state:-1, data:str1.charAt(j), line:-1};
            k ++;
            j --;
        }
    }
    
    /// 4. upsidedown the diffArr
    var temp = [];
    for(var i = 0; i < diffArr.length; i ++) {
        temp[i] = diffArr[diffArr.length - i - 1];
    }
    diffArr = temp;
    return {result : diffArr};
}
