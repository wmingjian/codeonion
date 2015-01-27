function patchArray(arrayOrigin, structpatch) {
    var i = 0;
    var j = 0;
    var w = 0;
    var arrayResult = [];
    while(i < structpatch.length) {
        var obj = structpatch[i];
        if(obj.state == 0) {
            arrayResult[w] = arrayOrigin[j];
            j ++;
            w ++;
        }
        else if(obj.state == 1) {
            arrayResult[w] = structpatch[i].data;
            w ++
        }
        else if(obj.state == -1) {
            j ++;
        }
        i ++;
    }
    return arrayResult;
}
