import _ from 'lodash'

import faker from 'faker'

Posts.remove({})

Meteor.startup(function() {
  _.times(50, function () {
    Posts.insert({
      title: faker.lorem.sentence()
    })
  })
})
