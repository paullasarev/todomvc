;(function () {
  function globalName (name) {
    return name.replace(/[.\/\\:]/g,'')
  }

  var need = {    
    import :  function(name) {
      if (typeof require == "object") {
        return require(name);
      } else {
        return window[globalName(name)];
      }
    },

    export : function(name, moduleObject) {
      if (typeof module == "object" && typeof module.exports == "object") {  //require context
        module.exports = moduleObject;
      } else if (typeof define == "function" && define.amd) {  //RequireJS context
        define(name, [], function() {
          return moduleObject;
        });
      } else { //plain browser context
        window[globalName(name)] = moduleObject;
      }
    }
  };

  need.export('need', need);

})();
