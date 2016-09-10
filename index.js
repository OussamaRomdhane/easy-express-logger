module.exports = function(req, res, next) {
    console.time('Response time');
    req.on("end", function() {
        var color;
        if (res.stausCode === 200) {
            color = '92';
        } else if (res.statusCode === 304) {
            color = '94';
        } else {
            color = '91';
        }
        console.log(res.req.method, res.req.originalUrl);
        console.log('\033[' + color + 'm', res.statusCode, '\033[0m', res.statusMessage);
        console.log('Headers:');
        printData(res.req.headers);
        console.log('Query:');
        printData(res.req.query);
        console.log('Params:');
        printData(res.req.params);
        console.log('Body:', res.req.body);
        console.timeEnd('Response time');
        console.log('\n---------\n');
    });
    next();
};


function printData(obj) {
  Object.keys(obj).forEach(function(key){
    console.log('\t', key, ':', obj[key]);
  });
}
