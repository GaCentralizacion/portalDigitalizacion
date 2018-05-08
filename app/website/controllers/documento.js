var documentoView = require('../views/reference'),
    documentoModel = require('../models/dataAccess');

var path = require('path');
//var webPage = require('webpage');
var request = require('request');

var soap = require('soap');
var parseString = require('xml2js').parseString;


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


documento.prototype.get_permisos = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idAccion', value: req.query.idAccion, type: self.model.types.INT }        
    ];

    this.model.query('SEL_PERMISOS_ACCION_SEGURIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
documento.prototype.get_byNodo = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'idNodo', value: req.query.nodo, type: self.model.types.INT },
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idperfil', value: req.query.perfil, type: self.model.types.INT }         
    ];

    this.model.query('SEL_DOCUMENTOS_NODO_GENERAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


documento.prototype.get_pdfArraysPun = function(req, res, next) {
    var self = this;
     console.log('hi');
    console.log(req.query.tipo, req.query.factura, req.query.nodo)

    var url = this.conf.parameters.WSGeneraPdf;
    if (req.query.tipo && req.query.factura && req.query.nodo) {
        var args = {
            Tipo: req.query.tipo,
            Documento: req.query.factura,
            Nodo: req.query.nodo
        };
        soap.createClient(url, function(err, client) {
            console.log(url)
            if (err) {
                console.log('Error 4', err)

                self.view.expositor(res, {
                    mensaje: "Hubo un problema intente de nuevo",
                });
            } else {
                console.log(args)
                client.GenerarPdfArray(args, function(err, result, raw) {
                    if (err) {
                        console.log('Error 3', err)

                        self.view.expositor(res, {
                            mensaje: "Hubo un problema intente de nuevo",
                        });
                    } else {
                        parseString(raw, function(err, result) {
                            if (err) {
                                console.log('Error 2', err)

                                self.view.expositor(res, {
                                    mensaje: "Hubo un problema intente de nuevo",
                                });
                            } else {
                                console.log('Llegue hasta el final');
                                console.log(result["soap:Envelope"]["soap:Body"][0]["GenerarPdfArrayResponse"][0]["GenerarPdfArrayResult"][0], 'Lo logre?')
                                var arrayBits = result["soap:Envelope"]["soap:Body"][0]["GenerarPdfArrayResponse"][0]["GenerarPdfArrayResult"][0];
                                self.view.expositor(res, {
                                   result: {
                                        arrayBits: arrayBits
                                    }
                                });
                            }
                        });
                    }

                });
            }
        });
    } else {
        console.log('Error 1')
        self.view.expositor(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}
documento.prototype.get_cotizaciones = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'folio', value: req.query.folio, type: self.model.types.STRING }         
    ];

    this.model.queryAllRecordSet('SEL_COTIZACIONES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
documento.prototype.get_pdf = function(req, res, next) {
    var self = this;
     console.log('hi');
    console.log(req.query.tipo, req.query.factura, req.query.nodo)

    var url = this.conf.parameters.WSGeneraPdf;
    if (req.query.tipo && req.query.factura && req.query.nodo) {
        var args = {
            Tipo: req.query.tipo,
            Documento: req.query.factura,
            Nodo: req.query.nodo
        };
        soap.createClient(url, function(err, client) {
            console.log(url)
            if (err) {
                console.log('Error 4', err)

                self.view.expositor(res, {
                    mensaje: "Hubo un problema intente de nuevo",
                });
            } else {
                console.log(args)
                client.GenerarPdf(args, function(err, result, raw) {
                    if (err) {
                        console.log('Error 3', err)

                        self.view.expositor(res, {
                            mensaje: "Hubo un problema intente de nuevo",
                        });
                    } else {
                        parseString(raw, function(err, result) {
                            if (err) {
                                console.log('Error 2', err)

                                self.view.expositor(res, {
                                    mensaje: "Hubo un problema intente de nuevo",
                                });
                            } else {
                                console.log('Llegue hasta el final');
                                console.log(result["soap:Envelope"]["soap:Body"][0]["GenerarPdfResponse"][0]["GenerarPdfResult"], 'Lo logre?')
                                var arrayBits = result["soap:Envelope"]["soap:Body"][0]["GenerarPdfResponse"][0]["GenerarPdfResult"];
                                self.view.expositor(res, {
                                   result: {
                                        arrayBits: arrayBits
                                    }
                                });
                            }
                        });
                    }

                });
            }
        });
    } else {
        console.log('Error 1')
        self.view.expositor(res, {
            mensaje: "Hubo un problema intente de nuevo",
        });
    }
}
documento.prototype.get_resumenCotiza = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'FolioCotizacion', value: req.query.folio, type: self.model.types.STRING }         
    ];

    this.model.query('SEL_RESUMEN_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
documento.prototype.get_resumenGeneral = function(req, res, next) {

    var self = this;

    var params = [
        { name: 'FolioCotizacion', value: req.query.folio, type: self.model.types.STRING },
        { name: 'idCotizacionDetalle', value: req.query.idCot, type: self.model.types.STRING }          
    ];

    this.model.queryAllRecordSet('SEL_RESUMEN_COTIZACIONUNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = documento;