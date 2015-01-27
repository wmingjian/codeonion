var _diff_cache = [];
var _time_tick = [];

function pushDiff(diffData, timeTick) {
    _diff_cache[_diff_cache.length] = diffData;
    _time_tick[_time_tick.length] = timeTick;
}

function clearDiff() {
    _diff_cache = [];
    _time_tick = [];
}

function getDiffData() {
    return _diff_cache;
}

function hasDiffData() {
    return _diff_cache.length > 0 ? true : false;
}

function getDiffStringData() {
    var stringData = "";
    var jsonData = {};
    jsonData["a"] = [];
    for(var i = 0; i < _diff_cache.length; i ++) {
        var diff = _diff_cache[i];
        jsonData["a"][i] = {};
        jsonData["a"][i]["t"] = _time_tick[i];
        jsonData["a"][i]["d"] = [];
        for(var j = 0; j < diff.length; j ++) {
            var obj = diff[j];
            jsonData["a"][i]["d"][j] = {};
            if(obj.state != 0) {
                jsonData["a"][i]["d"][j]["s"] = obj.state;
                jsonData["a"][i]["d"][j]["c"] = obj.data;
            }
        }
    }
    stringData = JSON.stringify(jsonData);
    return stringData;
}

function stringToDiffData(stringData) {
    var resultData = [];
    var jsonData = JSON.parse(stringData);
    var arrayData = jsonData["a"];
    for(var i = 0; i < arrayData.length; i ++) {
        var diffDataArray = arrayData[i]["d"];
        var diffObjectArray = [];
        for(var j = 0; j < diffDataArray.length; j ++) {
            var diffObject = {};
            if(Object.keys(diffDataArray[j]).length == 0) {
                diffObject = {state:0, data:"", tick:arrayData[i]["t"]};
            }
            else {
                diffObject.state = diffDataArray[j]["s"];
                diffObject.data = diffDataArray[j]["c"];
                diffObject.tick = arrayData[i]["t"];
            }
            diffObjectArray[j] = diffObject;
        }
        resultData[i] = diffObjectArray;
    }
    return resultData;
}
