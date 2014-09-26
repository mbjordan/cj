var fs = require("fs"),
    args = process.argv.slice(2),
    Arr = [],
    inputFile, outputFile, data, headers, headerLen, i, len, cachedRow, cachedRowLen, tmpObj, x, xlen;

try {
    inputFile = args[0];
    outputFile = (!args[1].match(/\.json$/i)) ? args[1] + ".json" : args[1];
} catch (e) {
    return console.error(e);
}


try {
    data = fs.readFileSync(inputFile, {
        "encoding": "utf8"
    }).split(/\r\n|\r|\n/);
} catch (e) {
    return console.error(e);
}


headers = data.shift().split(",");
headerLen = headers.length;


for (i = 0, len = data.length; i < len; i++) {
    cachedRow = data[i].split(",");
    cachedRowLen = cachedRow.length;
    tmpObj = {};

    if (data[i] === "" || cachedRowLen !== headerLen) {
        continue;
    }

    for (x = 0, xlen = cachedRowLen; x < xlen; x++) {
        tmpObj[headers[x]] = cachedRow[x];
    }

    Arr.push(tmpObj);
}

fs.writeFile(outputFile, JSON.stringify(Arr, null, 4), {
    "encoding": "utf8" // `utf8` is the default, but this just makes be feel better
}, function(err) {
    if (err) {
        throw err;
    }
    console.log("%d lines of CSV data converted and written to `%s`", Arr.length, outputFile);
});
