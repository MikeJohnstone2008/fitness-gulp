var through =       require('through2')
var gutil =         require('gulp-util')
var rightPad =      require('right-pad')
var PluginError =   gutil.PluginError
var PLUGIN_NAME =   'gulp-align'

function align() {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'))
            return cb()
        }
        var indices = []
        var lines = file.contents.toString().split('\n')
        lines.forEach(function (line, idx) {
            line = line.trim()
            var isComment = line.indexOf('//') > -1
            var startWithVar = line.indexOf('var') == 0
                || line.indexOf('let') == 0
                || line.indexOf('const') == 0
            if (isComment || !startWithVar) return
            if (!/require *\(.*\)/.test(line)) return
            var requireIdx = line.indexOf('require')
            if (requireIdx > -1) indices[idx] = requireIdx
        })

        var validIndices = indices.filter(function (i) {
            return i
        })

        var maxIdx = Math.max.apply(null, validIndices)

        var content = lines.map(function (line, idx) {
            var info = indices[idx]
            if (info != null) {
                line = line.split('require')
                line[0] = rightPad(line[0], maxIdx)
                return line.join(' require')
            } else return line
        }).join('\n')
        file.contents = Buffer.from(content)
        this.push(file)
        cb()
    })
}

module.exports = align