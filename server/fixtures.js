import _ from 'lodash'

import faker from 'faker'

Test.remove({})

Meteor.startup(function() {

  _.times(5, function () {
    Test.insert({
      title: faker.lorem.sentence()
    })
  })

})
