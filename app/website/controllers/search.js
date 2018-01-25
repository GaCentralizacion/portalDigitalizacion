var searchView = require('../views/reference'),
    searchModel = require('../models/dataAccess');

var path = require('path');
//var webPage = require('webpage');
var request = require('request');


var search = function(conf) {
       

    this.conf = conf || {};

    this.view = new searchView();
    this.model = new searchModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


search.prototype.get_folios = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'folioorden', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idempresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'iddepartamento', value: req.query.idDepartamento, type: self.model.types.INT },
        { name: 'idTipoOrden', value: req.query.tipoOrden, type: self.model.types.INT },
        { name: 'idproveedor', value: req.query.idProveedor, type: self.model.types.INT },
        { name: 'fechaini', value: req.query.fecha1, type: self.model.types.STRING },
        { name: 'fechafin', value: req.query.fecha2, type: self.model.types.STRING },
        { name: 'idProceso', value: req.query.idProceso, type: self.model.types.INT },
        { name: 'idusuariosolicitante', value: req.query.idempleado, type: self.model.types.INT },
        { name: 'factura', value: req.query.factura, type: self.model.types.STRING },
        { name: 'numeroSerie', value: req.query.numeroSerie, type: self.model.types.STRING },
        { name: 'ordenServicio', value: req.query.ordenServicio, type: self.model.types.STRING },
        { name: 'tipoBusqueda', value: req.query.identificaBusqueda, type: self.model.types.INT }          
    ];
console.log('Inicie la busqueda', req.query.folio)
//console.log(params)
    this.model.query('SEL_ORDENES_FILTROS_V2_SP', params, function(error, result) {
	console.log('Termine la busqueda', req.query.folio);
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
search.prototype.get_diccionario = function(req, res, next) {

    var self = this;
    var params = [ { name: 'tipo', value: req.query.tipo, type: self.model.types.INT }
                 , { name: 'proceso', value: req.query.proceso, type: self.model.types.INT } ];

    this.model.query('SEL_DICCIONARIO_NODO_Y_STATUS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
       // console.log(result);
    });
};
search.prototype.get_nodoActual = function(req, res, next) {

    var self = this;
    var params = [ { name: 'folio', value: req.query.folio, type: self.model.types.STRING }
                 , { name: 'idProceso', value: req.query.idProceso, type: self.model.types.INT } ];

    this.model.query('SEL_NODO_TIPO_FOLIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
       // console.log(result);
    });
};
module.exports = search;