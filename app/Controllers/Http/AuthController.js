'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')



class AuthController {
   
   

    async create({request,response}){

        const rules = {
    email: 'required|email|unique:users,email',
    password: 'required',
    username: 'required|unique:users'
  }

     try {

        const validation = await validate(request.all(), rules)
       
        if (validation.fails()) {
            return response.status(401).send({message: validation.messages()})
          }
        

            const data = request.only(["username", "email", "password"])
            const user = await User.create(data)
            return user
        } catch (error) {
            return response.status(500).send({error: error.messsage})
        }
    }

    async login({request,response, auth}){
        try {
           const {email, password} = request.all()
            const data = await auth.attempt(email,password)
         return data

        } catch (error) {
            return response.status(500).send({error: error.messsage})
        }
    }


}

module.exports = AuthController
