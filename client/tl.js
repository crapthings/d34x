import d3 from 'd3'

require('d3-extended')(d3)

var tl = {}

tl.init = init

function init (container, options) {

  var lanes = options.lanes || []

  var options = options || {}

  console.log(lanes.length)

  var __laneMargin = 50
  var __laneStrokeWidth = 10

  // var defaultContainerHeight = ((10 + 50) * (lanes.length + 1)) - 10
  var defaultContainerHeight = ((__laneStrokeWidth + __laneMargin) * (lanes.length + 1)) - __laneStrokeWidth

  var marginSize = options.marginSize || 32

  var containerWidth = options.containerWidth || container.clientWidth
  var containerHeight = options.containerHeight || container.clientHeight || defaultContainerHeight

  var _currentDate = new Date()

  var _domainStartAt = options.domainStartAt || _currentDate.getFullYear()
  var _domainEndAt = options.domainEndAt || _currentDate.getFullYear() + 1

  //

  var xScale = d3
    .scaleTime()
    .domain([new Date(_domainStartAt, 1, 1), new Date(_domainEndAt, 1, 1)])
    .range([0, containerWidth - marginSize * 2])
    .nice()

  var xAxis = d3
    .axisTop()
    .scale(xScale)
    .tickSizeInner(-(containerHeight - marginSize * 2))
    .tickSizeOuter(0)
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
    .attr('class', 'axis x')
    .call(xAxis)

  //

  group.makelane = function (lane, index) {

    var lane = this
      .append('g')
      .datum(lane)

    lane
      .append('line')
      .attr('x1', 0)
      .attr('x2', containerWidth - marginSize * 2)
      .style('stroke', d => d.color)
      .style('stroke-width', d => d.width || __laneStrokeWidth)
      .style('opacity', d => d.opacity || .4)
      .style('transform', `translate(0, ${__laneMargin * (index + 1)}px)`)
      .style('cursor', 'pointer')

    return lane

  }

  lanes.forEach((lane, index) => group.makelane(lane, index))

  //

  var test = group


  //

  svg.add = function (opt) {
    this
      .datum(opt)
      .append('p')
      .text(d =>  d.title)
  }

  function zoomable () {
    return d3
    .zoom()
    .scaleExtent([1, 100])
    .on('zoom', handleZoom)
  }

  function handleZoom () {
    gX.call(xAxis.scale(d3.event.transform.rescaleX(xScale)))
  }

  return container

}

module.exports = tl
