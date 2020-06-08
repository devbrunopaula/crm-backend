'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const WorkOrder = use('App/Models/Workorder')
const Database = use('Database')
/**
 * Resourceful controller for interacting with workorders
 */
class WorkorderController {
  /**
   * Show a list of all workorders.
   * GET workorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */ 
  async index ({ request, response, auth}) {
     const workorder = await WorkOrder.query().where('user_id', auth.user.id).fetch()

    // const workorder = await Database
    //   .select('price', 'service')
    //   .from('workorders')
    //   .where('user_id', auth.user.id)
    return workorder
  }

 

  /**
   * Create/save a new workorder.
   * POST workorders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {

    const {id} = auth.user

    const data = request.only(["service","description","price"])

    const workorder = await WorkOrder.create({...data, user_id: id})
    return workorder

  }

  /**
   * Display a single workorder.
   * GET workorders/:id
   * 
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    const workorder = await WorkOrder.query().where('id', params.id)
    .where('user_id', auth.user.id).first()
    if(!workorder){
      return response.status(404).send({message: 'Work Order Not Found'})
    }
    return workorder
  }

  

  /**
   * Update workorder details.
   * PUT or PATCH workorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth}) {
    const { price, service, description } = request.all()
    const workorder = await WorkOrder.query().where('id', params.id)
    .where('user_id', auth.user.id).first()

    if(!workorder){
      return response.status(404).send({message: 'Work Order Not Found'})
    }

    workorder.price = price
    workorder.description = description
    workorder.service =  service
   
    await workorder.save()
   
    return workorder
  }

  /**
   * Delete a workorder with id.
   * DELETE workorders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const workorder = await WorkOrder.query().where('id', params.id)
    .where('user_id', auth.user.id).first()

    if(!workorder){
      return response.status(404).send({message: 'Work Order Not Found'})
    }

    await workorder.delete()
    return response.status(200).send({message: `Work Order Deleted ID# ${workorder.id}`})
  }
}

module.exports = WorkorderController
