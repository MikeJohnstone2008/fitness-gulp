var assert = require('chai').assert
var align = require('../index')
var rename = require('gulp-rename')
var fs = require('fs')
var path = require('path')

describe('gulp-align-test', function () {
    it('the index of "require" should be identical', function () {
        var origin = fs.readFileSync(path.join(__dirname, 'example.js'))
        var generated = fs.readFileSync(path.join(__dirname, 'example-aligned.js'))
        var lines = generated.toString().split('\n').filter(function (line) {
            return line.indexOf('require') > -1
        })

        var indices = lines.map(function (i) {
            return i.indexOf('require')
        })

        assert(Math.max.apply(null, indices) == Math.min.apply(null, indices))
        console.log('\n' + 'original:' + '\n' + origin + '\n \n')
        console.log('generated:' + '\n' + generated)
    })
})