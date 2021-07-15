const { emailActions } = require('../constants');

module.exports = {
  [emailActions.WELCOME]: {
    templateName: 'welcome',
    subject: 'Welcome on board'
  },

  [emailActions.LOG_OUT]: {
    templateName: 'LogOut',
    subject: 'Log Out, buy'
  },

  [emailActions.LOG_IN]: {
    templateName: 'LogIn',
    subject: 'Log In, hello'
  },

  [emailActions.CREATE_NEW_USER]: {
    templateName: 'createUser',
    subject: 'Create new User, approve e-mail'
  },

  [emailActions.DELETE_USER]: {
    templateName: 'deleteUser',
    subject: 'Delete User'
  },

  [emailActions.UPDATE_USER]: {
    templateName: 'updateUserData',
    subject: 'Update User'
  },

  [emailActions.CHANGE_PASSWORD]: {
    templateName: 'changeUserPassword',
    subject: 'Change User password, approve e-mail'
  }
};
