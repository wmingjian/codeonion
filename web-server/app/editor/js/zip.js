var zipkeyscontent = ["<div class=\"CodeMirror-gutter-wrapper\" style=\"left: -29px; width: 29px;\">",
                   "<div class=\"CodeMirror-linenumber CodeMirror-gutter-elt\" style=\"left: 0px; width: 20px;\">",
                   "</div>",
                   "<pre class=\"\">",
                   "<span style=\"padding-right: 0.1px;\">",
                   "<span class=\"cm-variable\">",
                   "<span class=\"cm-keyword\">",
                   "<span class=\"cm-operator\">",
                   "<span>",
                   "</span>",
                   "<pre>",
                   "</pre>"];
                   
var zipkeysziped = ["<gt>",
                   "<ln>",
                   "</d>",
                   "<p>",
                   "<ss>",
                   "<scv>",
                   "<sck>",
                   "<sco>",
                   "<s>",
                   "</s>",
                   "<p>",
                   "</p>"];

function zipLine(line) {
    var retLine = line;
    for(var i = 0; i < zipkeyscontent.length; i ++) {
        retLine = retLine.replace(new RegExp(zipkeyscontent[i], 'g'), zipkeysziped[i]);
    }
    var retLinePlaint = retLine;
    return retLinePlaint;
}

function unzipLine(line) {
    var retLine = line;
    for(var i = 0; i < zipkeyscontent.length; i ++) {
        retLine = retLine.replace(new RegExp(zipkeysziped[i], 'g'), zipkeyscontent[i]);
    }
    var retLinePlaint = retLine;
    return retLinePlaint;
}

function unzipLines(lines) {
    var results = [];
    for(var i = 0; i < lines.length; i ++) {
        results[i] = unzipLine(lines[i]);
    }
    return results;
}

