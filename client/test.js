import tl from './tl'

Template.d3.onRendered(function () {

  const container = this.find('.container')

  const opt = {

    lanes: [{
      name: 'lane1',
      color: 'red'
    }, {
      name: 'lane2',
      color: 'yellow'
    }, {
      name: 'lane2',
      color: 'yellow'
    }]

  }

  const chart = window.chart = tl.init(container, opt)

})
