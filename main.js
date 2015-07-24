'use strict';

var baseUrl = 'http://localhost:3000';

$(function() {

  var allUsers = $.get(baseUrl + '/users');
  var userPermissions = $.get(baseUrl + '/permissions');

  // Displays users when clicked first time. Does not duplicate if clicked again.
  $('.get-users').on('click', function() {
    if ($('li').length == 0) {
      getUsers();
    } else {
      console.log('users are already there')
    }
  });

  // Displays permissions per user. Does not duplicate if same button clicked again.
  $('body').on('click', '.permissions', function() {
    var thisBtn = this;
    if ($(this).parents('li').find('ul').length == 0) {
      getPermissions(thisBtn);
    } else {
      console.log('permissions are already listed')
    }
  });

  var source = $('#user-template').html();
  var userTmpl = Handlebars.compile(source);

  // Grab users from database and render them to the template.
  function getUsers() {
    allUsers
      .done(function(users) {
          $('.users').append(userTmpl(users));
      });
  }

  var permSource = $('#permissions-template').html();
  var permTmpl = Handlebars.compile(permSource);

  // Grabs permissions from the database and displays corrects set of user permissions.
  function getPermissions(obj) {
    var btnId = $(obj).parents('li').attr('id');
    $(obj).parents('li').append('<ul></ul>')
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
        });
      });
  }

});