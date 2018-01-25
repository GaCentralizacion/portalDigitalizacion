var nodoUrl = global_settings.urlCORS + '/api/nodoapi/';
var nodoApiUrl = global_settings.urlApiNode + '/api/nodo/';
registrationModule.factory('nodoRepository', function($http) {
    return {
        get: function(id) {
            return $http.get(nodoUrl + '0|' + id);
        },
        //getAll: function(folio, idproceso, perfil) {
        //    return $http.get(nodoUrl + '1|' + folio + '|' + idproceso + '|' + perfil);
        //},
        getHeader: function(folio, usuario) {
            return $http.get(nodoUrl + '2|' + folio + '|' + usuario);
        },
        update: function(id) {
            return $http.post(nodoUrl + '2|' + id);
        },
        getNavegacion: function(folio, tipofolio, tiporegreso) {
            return $http.get(nodoUrl + '3|' + folio + '|' + tipofolio + '|' + tiporegreso);
        },
        CancelarOrden: function(folio, idusuario) {
            return $http.get(nodoUrl + '4|' + folio + '|' + idusuario);
        },
        cambiaEstatusApartada: function(serie, folio, idusuario) {
            return $http.get(nodoUrl + '5|' + serie + '|' + folio + '|' + idusuario);
        },
   getHeader: function(folio, idUsuario){
        return $http({
                url: nodoApiUrl + 'header/',
                method: "GET",
                params: {
                    folio: folio,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        verificaUsuario: function(folio, idUsuario) {
            return $http({
                url: nodoApiUrl + 'verificaUsuario/',
                method: "GET",
                params: {
                    folio: folio,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        cierraNodo: function(idProceso, idNodo, idFolio) {
            return $http({
                url: nodoApiUrl + 'cierraNodo/',
                method: "GET",
                params: {
                    idProceso: idProceso,
                    idFolio: idFolio,
                    idNodo: idNodo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        bitacoraAccion: function(idFolio, idNodo, idUsuario) {
            return $http({
                url: nodoApiUrl + 'bitacoraAccion/',
                method: "GET",
                params: {
                    idFolio: idFolio,
                    idNodo: idNodo,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
 	getEncabezadoResumen: function(idFolio) {
            return $http({
                url: nodoApiUrl + 'encabezadoResumen/',
                method: "GET",
                params: {
                    idFolio: idFolio
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getAll: function(folio, idproceso, perfil){
        return $http({
                url: nodoApiUrl + 'all/',
                method: "GET",
                params: {
                    folio: folio,
                    idproceso: idproceso,
                    perfil: perfil
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        //--Resumen Cotización
        getResumenCargo: function(factura,folio){
        return $http({
                url: nodoApiUrl + 'cargos/',
                method: "GET",
                params: {
                    folio: folio,
                    factura: factura
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getResumenAbono: function(factura,folio){
        return $http({
                url: nodoApiUrl + 'abonos/',
                method: "GET",
                params: {
                    folio: folio,
                    factura: factura
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getResumenAnticipos: function(factura,folio){
        return $http({
                url: nodoApiUrl + 'anticipos/',
                method: "GET",
                params: {
                    folio: folio,
                    factura: factura
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

         ,
          getOtrasFacturas: function(folio,cotizacion) {
            return $http({
                url: nodoApiUrl + 'otrasFacturas/',
                method: "GET",
                params: {
                    folio: folio,
                    cotizacion:cotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        //---

    };
});