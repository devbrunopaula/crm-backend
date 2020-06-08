'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkorderSchema extends Schema {
  up () {
    this.create('workorders', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('service').notNullable()
      table.string('description')
      table.string('price')
      table.timestamps()

    })
  }

  down () {
    this.drop('workorders')
  } 
}

module.exports = WorkorderSchema
