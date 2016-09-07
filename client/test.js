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
      name: 'lane3',
      color: 'yellow'
    }, {
      name: 'lane4',
      color: 'green'
    }, {
      name: 'lane4',
      color: 'pink'
    }, {
      name: 'lane4',
      color: 'black'
    }]

  }

  const chart = window.chart = tl.init(container, opt)

})
