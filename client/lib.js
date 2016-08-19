const helper = Template.registerHelper

helper('list', function () {
  return Test.find({})
})
