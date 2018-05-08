var nodoView = require('../views/reference'),
    nodoModel = require('../models/dataAccess');

var path = require('path');
//var webPage = require('webpage');
var request = require('request');


var nodo = function(conf) {
       

    this.conf = conf || {};

    this.view = new nodoView();
    this.model = new nodoModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

nodo.prototype.get_header = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING }        
    ];

    this.model.query('SEL_EXPEDIENTE_ENCABEZADO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
nodo.prototype.get_verificaUsuario = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING }        
    ];

    this.model.query('SEL_BOTON_CERRAR_NODO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
nodo.prototype.get_cierraNodo = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'proc_Id', value: req.query.idProceso, type: self.model.types.INT },        
        { name: 'nodo_Id', value: req.query.idNodo, type: self.model.types.INT },
        { name: 'folio_Operacion', value: req.query.idFolio, type: self.model.types.STRING }        
    ];
    this.model.query('INS_CIERRA_NODO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
nodo.prototype.get_bitacoraAccion = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'idFolio', value: req.query.idFolio, type: self.model.types.STRING },        
        { name: 'idNodo', value: req.query.idNodo, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }        
    ];
    this.model.query('INS_BITACORA_ACCION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
nodo.prototype.get_all = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'id_proceso', value: req.query.idproceso, type: self.model.types.INT },
        { name: 'id_folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'id_perfil', value: req.query.perfil, type: self.model.types.INT }        
    ];

    this.model.query('SEL_NODO_FOLIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


nodo.prototype.get_encabezadoResumen = function(req, res, next) {

    var self = this;
    var params = [
        { name: 'folio', value: req.query.idFolio, type: self.model.types.STRING }        
    ];

    this.model.query('SEL_ENCABEZADO_RESUMEN_CXC_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


nodo.prototype.get_cargos = function(req, res, next) {

    var self = this;

    var params = [        
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idCotDet', value: req.query.idCotDet, type: self.model.types.STRING }        
    ];

    this.model.query('SEL_RESUMEN_FACTURAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
nodo.prototype.get_abonos = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'factura', value: req.query.factura, type: self.model.types.STRING }         
    ];

    this.model.query('SEL_RESUMEN_COT_ABONOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
nodo.prototype.get_anticipos = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'factura', value: req.query.factura, type: self.model.types.STRING }         
    ];

    this.model.query('SEL_RESUMEN_ANTICIPOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


nodo.prototype.get_otrasFacturas = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idCotizacion', value: req.query.cotizacion, type: self.model.types.INT }        
    ];

    this.model.query('SEL_OTRAS_FACTURAS_CXC', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = nodo;