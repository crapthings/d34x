import tl from './tl'

chart = null

Template.d3.onRendered(function () {

  const container = this.find('#container')

  Meteor.autorun(() => {
    const data = Posts.find({}).fetch()
    chart = tl.init(container, { data })
    console.log(chart)
  })

})
