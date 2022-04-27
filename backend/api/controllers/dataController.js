'use strict';

module.exports = function(app) {
    var dataService = require('../services/dataService')

    app.route('/data/:dataParam')
        .get(dataService.get_all_data)
        .post(dataService.insert_data)
        .put(dataService.update_data)
        .delete(dataService.delete_data)
}