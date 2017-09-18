var documentoView = require('../views/reference'),
    documentoModel = require('../models/dataAccess');

var path = require('path');
//var webPage = require('webpage');
var request = require('request');


var documento = function(conf) {
       

    this.conf = conf || {};

    this.view = new documentoView();
    this.model = new documentoModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


documento.prototype.get_proceso = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'idProceso', value: req.query.idProceso, type: self.model.types.INT },
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING }        
    ];

    this.model.query('SEL_RESUMEN_PROCESOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = documento;