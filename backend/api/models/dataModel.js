'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema


var DataSchema = new Schema({
    date : {
        type: String,
    },
    aircraft : {
        type: String
    },
    helicopter : {
        type : String
    },
    tank : {
        type: String
    },
    APC : {
        type : String
    },
    field_artillery : {
        type : String
    },
    MRL : {
        type : String
    },
    military_auto : {
        type : String
    },
    fuel_tank : {
        type : String
    },
    drone : {
        type : String
    },
    naval_ship : {
        type : String
    },
    anti_aircraft_warfare : {
        type : String
    },
    special_equipment : {
        type : String
    }


})

module.exports = mongoose.model('Data', DataSchema)