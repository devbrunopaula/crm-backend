'use strict'

class User {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      password: 'required',
      username: 'required|unique:users'
    }
  }

    get messages () {
        return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'username.required': 'You must provide a username',
      'username.unique': 'This Username is not available, Please choose another username',
      }
   }
}

module.exports = User
