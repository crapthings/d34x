import d3 from 'd3'

var tl = {}

tl.test = 'test'

tl.init = init

function init (container, options) {

  var data = options.data || []

  var _container = d3
    .select(container)
    .selectAll('p')
    .data(data)
    .enter()
    .append('p')
    .text(d => d.title || d)

  return _container

}

module.exports = tl
