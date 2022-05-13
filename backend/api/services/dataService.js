'use strict'

var mongoose = require('mongoose')
    Data = mongoose.model('Data')

exports.get_all_data = function(req, res){
    let mParam = req.params.dataParam
    let selectQ = {
        "date" : 1,
    }
    selectQ[mParam] = 1

    let query = Data.find({}).sort({ date: -1 }).select(selectQ)
    query.exec((err, value) => {
        let resBuffer = []
        if(err){
            res.status(500).send({error : 'DB error'})
        }
        value.forEach(element => {
            if(element[mParam] != undefined){
                resBuffer.push({
                    date : element.date,
                    value : element[mParam]
                })
            }
        });
        res.send(resBuffer)
    })
}

exports.insert_data = function(req, res){
    let mParam = req.params.dataParam
    if(req.body == undefined || req.body.date == undefined || req.body.value == undefined){
        res.status(400).send({error : 'Body eror -> {date : string, value : string}'})
    }

    let dbBody = {
        date: req.body.date
    }
    dbBody[mParam] = req.body.value
    
    Data.findOneAndUpdate({date : req.body.date}, dbBody, {upsert: true}, (err, doc) => {
        if(err){
            res.status(500).send({error : 'DB error'})
        }
        res.status(200).send()
    })

}

exports.update_data = function(req, res){
    let mParam = req.params.dataParam
    if(req.body == undefined || req.body.date == undefined || req.body.value == undefined){
        res.status(400).send({error : 'Body eror -> {date : string, value : string}'})
    }

    let dbBody = {
        date: req.body.date
    }
    dbBody[mParam] = req.body.value
    
    Data.findOneAndUpdate({date : req.body.date}, dbBody, (err, doc) => {
        if(err){
            console.log(err)
            res.status(500).send({error : `DB error: ${err}`})
        }
        if(doc == null){
            res.status(404).send({error: 'Date not found'})
        }
        res.status(200).send()
    })
}

exports.delete_data = function(req,res){
    let mParam = req.params.dataParam
    let date = req.query.date
    if(date == undefined){
        res.status(404).send({error : "Date param not specified"})
    }

    let deleteField = {}
    deleteField[mParam] = 1

    Data.findOneAndUpdate({date : date}, {$unset: deleteField}, (err, doc) => {
        if(err){
            console.log(err)
            res.status(500).send({error : `DB error: ${err}`})
        }
    })

    res.status(200).send()
}