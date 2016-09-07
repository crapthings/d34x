import d3 from 'd3'

require('d3-extended')(d3)

var tl = {}

tl.init = init

function init (container, options) {

  var id = container.dataset.id

  var options = options || {}

  var lanes = options.lanes || []

  var __laneMargin = options.__laneMargin || 50
  var __laneStrokeWidth = 10

  var defaultContainerHeight = ((__laneStrokeWidth + __laneMargin) * (lanes.length + 1)) - __laneStrokeWidth * 2

  var marginSize = options.marginSize || 32

  var containerWidth = options.containerWidth || container.clientWidth
  var containerHeight = options.containerHeight || container.clientHeight || defaultContainerHeight

  var _currentDate = new Date()

  var _domainStartAt = options.domainStartAt || _currentDate.getFullYear()
  var _domainEndAt = options.domainEndAt || _currentDate.getFullYear() + 1

  //

  var xScale = d3
    .time.scale()
    .domain([new Date(_domainStartAt, 1, 1), new Date(_domainEndAt, 1, 1)])
    .range([0, containerWidth - marginSize * 2])
    .nice()

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('top')
    // .tickSizeInner(-(containerHeight - marginSize * 2))
    // .tickSizeOuter(0)
    // .tickPadding(0)

  // svg

  var svg = d3
    .select(container)
    .append('svg')
    .attr('width', containerWidth)
    .attr('height', containerHeight)
    .call(zoomable())
    .on('dblclick.zoom', null)

  // position group

  var group = svg
    .append('g')
    .attr('transform', `translate(${marginSize}, ${marginSize})`)

  // bg color etc

  var rect = group
    .append('rect')
    .attr('width', containerWidth - marginSize * 2)
    .attr('height', containerHeight - marginSize * 2)
    .style('fill', 'seashell')

  // x axis vis

  var gX = group
    .append('g')
    .call(xAxis)

  //



  group.__makelane = function (lane, index) {

    var $dataset = []

    var lane = this
      .append('g')
      .datum(lane)

    var __return = {}

    lane
      .append('line')
      .attr('x1', 0)
      .attr('x2', containerWidth - marginSize * 2)
      .style('stroke', d => d.color)
      .style('stroke-width', d => d.width || __laneStrokeWidth)
      .style('opacity', d => d.opacity || .4)
      .style('transform', `translate(0, ${__laneMargin * (index + 1)}px)`)
      .style('cursor', 'pointer')

    lane.on('click', function () {

      $dataset.push({
        x: xScale.invert(d3.mouse(this)[0]),
        y: __laneMargin * (index + 1),
        color: 'red'
      })

      __return.circles = lane
        .selectAll('circle')
        .data($dataset)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('cx', function(d) {
          return xScale(d.x)
        })
        .attr('cy', function (d) {
          return d.y
        })
        .attr('r', 16)
        .attr('fill', d => d.color || '#9b59b6')

    })

    return __return

  }

  svg._lanes = lanes.map((lane, index) => group.__makelane(lane, index))

  //

  svg.add = function (opt) {
    this
      .datum(opt)
      .append('p')
      .text(d =>  d.title)
  }

  function zoomable () {
    return d3.behavior.zoom()
    .x(xScale)
    .scaleExtent([1, 100])
    .on('zoom', handleZoom)
  }

  function handleZoom () {
    gX.call(xAxis)
    svg.selectAll('.circle').attr('cx', d => xScale(d.x))
  }

  return svg

}

module.exports = tl
