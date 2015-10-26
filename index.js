var path = require('path');


function trim(str) {
    return str.replace(/^\s*/g, '').replace(/\s*$/g, '');
}

function parsePath(str) {
    //去除可能存在的引号
    return str.replace(/[\'|\"]?$/g, '');
}
// 获取相对路径
function getRelativePath(from, to) {
    to = trim(to);
    //console.log(path.relative(from, to).replace(/\\/g, '/'));
    var res = path.relative(from, to).replace(/\\/g, '/');
    if (res.indexOf('.') !== 0) {
        res = './' + res;
    }
    return res;
}

function parseContent(content, dir) {
    //console.log(file);
    var regs = [
        {
            patten: /url\([\'|\"]?\s*(\/.*)[\'|\"]?\s*\)/g,
            handle: function(origin, path) {
                return origin.replace(/\(.*\)/g, '(' + path + ')');
            }
        },
        {
            // 没有小括号的import，必须要有引号和分号
            patten: /@import\s+[\'|\"]\s*(\/.*)\s*[\'|\"]\s*(?=;)/g,
            handle: function(origin, path) {
                return origin.replace(/[\'|\"]\s*(\/.*)\s*[\'|\"]/g, '"' + path + '"');
            }
        }
    ];

    //var reg = /url\([\'|\"]?\s*(\/.*)[\'|\"]?\s*\)/g;
    for (var i = 0, l = regs.length; i < l; i ++) {
        var reg = regs[i];
        content = content.replace(reg.patten, function(m, $1) {
            //console.log(m, $1);
            var relativePath = getRelativePath(dir, parsePath($1));
            // 可能有括号也可能没括号
            return reg.handle(m, relativePath);
        });
    }
    return content;

}

module.exports = function(ret, conf, settings, opt) {
    fis.util.map(ret.src, function(subpath, file) {
        if (file.isCssLike) {
            var content = file.getContent();
            file.setContent(parseContent(content, file.subdirname));
        }
    });
};