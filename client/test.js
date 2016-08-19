import tl from './tl'

Template.d3.onRendered(function () {

  const container = this.find('#container')

  const chart = window.chart = tl.init(container, {})

})
