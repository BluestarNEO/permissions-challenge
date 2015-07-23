'use strict';

var baseUrl = 'http://localhost:3000';

$(function() {

  var allUsers = $.get(baseUrl + '/users')
  var userPermissions = $.get(baseUrl + '/permissions')
  var source = $('#user-template').html();
  var userTmpl = Handlebars.compile(source);
  var permSource = $('#permissions-template').html();
  var permTmpl = Handlebars.compile(permSource);

  var dbUsers = [];

  $('.get-users').on('click', function() {
    if ($('li').length == 0) {
      getUsers();
    } else {
      console.log('users are already there')
    }
  })

  $('body').on('click', '.permissions', function() {
    var thisBtn = this;
    if ($(this).parents('li').find('ul').length == 0) {
      getPermissions(thisBtn);
    } else {
      console.log('permissions are already listed')
    }
  })

  function getUsers() {
    allUsers
      .done(function(users) {
        users.forEach(function(user){
          var html = {
            id: user.id,
            name: user.name
          }
          dbUsers.push(user);
          $('.users').append(userTmpl(html));
        })
      })
  }

  function getPermissions(obj) {
    var btnId = $(obj).parents('li').attr('id');
    $(obj).parents('li').append('<ul></ul>')
    console.log(btnId)
    userPermissions
      .done(function(permissions) {
        permissions.forEach(function(permission) {
          var html;
          if(permission.userId == btnId) {
            html = {
              permission: permission.permissions
            }
            $(obj).parents('li').find('ul').append(permTmpl(html));
          }
        })
      })
  }

});