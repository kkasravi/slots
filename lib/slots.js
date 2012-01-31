(function() {
  var nm = module.Module('slots');
  (function(require, exports, moduleId) {
    var log = require('log');
    var monads = require('monads');
    var Ring = (function() {
      function Ring() {
        function privateData() {
          this.sections = null;
          this.shape = null;
        }
        var p_vars = new privateData();
        var sections = p_vars.sections;
        Object.getOwnPropertyDescriptor(this,'sections') || Object.defineProperty(this,'sections', {get: function(){return sections;},set: function(e){sections=e;}});
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.shape=properties.shape;
          this.sections={
            "one":1,
            "two":2,
            "three":3,
            "four":4,
            "five":5,
            "six":6,
            "seven":7,
            "eight":8,
            "nine":9,
            "ten":10,
            "eleven":11,
            "twelve":12
          };
          for(section in sections) {
            shape.add(monads.DOMable({
              tagName:'div'
            }).on('load').attributes({
              'class':'plane ' + section
            }).text(sections[section]));
          }
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Ring;
        return new Ring(args && args.length && args[0]);
      };
    })();
    var Container = (function() {
      function Container() {
        function privateData() {
          this.container = null;
          this.stage = null;
          this.shape = null;
          this.plane = null;
        }
        var p_vars = new privateData();
        var container = p_vars.container;
        Object.getOwnPropertyDescriptor(this,'container') || Object.defineProperty(this,'container', {get: function(){return container;},set: function(e){container=e;}});
        var stage = p_vars.stage;
        Object.getOwnPropertyDescriptor(this,'stage') || Object.defineProperty(this,'stage', {get: function(){return stage;},set: function(e){stage=e;}});
        var shape = p_vars.shape;
        Object.getOwnPropertyDescriptor(this,'shape') || Object.defineProperty(this,'shape', {get: function(){return shape;},set: function(e){shape=e;}});
        var plane = p_vars.plane;
        Object.getOwnPropertyDescriptor(this,'plane') || Object.defineProperty(this,'plane', {get: function(){return plane;},set: function(e){plane=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function (_properties) {
          var properties = _properties || {};
          this.shape=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'shape ring'
          });
          Ring({
            shape:this.shape
          });
          this.stage=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'stage'
          }).translate({
            z:'-100px'
          });
          this.stage.add(this.shape);
          this.container=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'class':'container'
          });
          this.container.add(this.stage);
          return this.container;
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Container;
        return new Container(args && args.length && args[0]);
      };
    })();
    ;//empty
    var Main = (function() {
      function Main() {
        function privateData() {
          this.wrapper = null;
        }
        var p_vars = new privateData();
        var wrapper = p_vars.wrapper;
        Object.getOwnPropertyDescriptor(this,'wrapper') || Object.defineProperty(this,'wrapper', {get: function(){return wrapper;},set: function(e){wrapper=e;}});
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          this.wrapper=monads.DOMable({
            tagName:'div'
          }).on('load').attributes({
            'id':'wrapper'
          });
          for(var i=0;i < 4;++i) {
            this.wrapper.add(Container());
          }
          this.wrapper.insert(document.body);
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = Main;
        return new Main(args && args.length && args[0]);
      };
    })();
    var AppType = (function() {
      function AppType() {
        var args = Array.prototype.slice.call(arguments);
        var ctor = function () {
          Main();
        }
        return ctor.apply(this,args) || this;
      }
      return function __() {
        var args = Array.prototype.slice.call(arguments);
        __.constructor = AppType;
        return new AppType(args && args.length && args[0]);
      };
    })();
    const App=AppType();
    exports.App = App;
  })(require, nm.getExports(), nm.getId());
})();

