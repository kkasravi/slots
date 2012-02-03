module slots {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';

  class Ring {
    constructor(properties={}) {
      private shape;
      @shape = properties.shape;
      for(var section in Ring.sections) {
        @shape.add(
          monads.DOMable({tagName:'div'}).on('load').attributes({'class':'plane '+section})
        );
      }
    }
    static sections = {"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9, "ten":10, "eleven":11, "twelve":12}
    static init = (function() {
      var styles = [
        {selector:'.plane',style:"position:absolute;height:200px;width:200px;border:1px solid white;-webkit-border-radius:12px;-webkit-box-sizing:border-box;-moz-border-radius:12px;-moz-box-sizing:border-box;margin-top:400px;text-align:center;font-family:Times,serif;font-size:124pt;color:black;background-color:rgba(255, 255, 255, 0.6);-webkit-transition:-webkit-transform 2s,opacity 2s;-webkit-backface-visibility:hidden;-moz-transition:-moz-transform 2s, opacity 2s;-moz-backface-visibility: hidden;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
      styles = [];
      var i = 0;
      for(var section in Ring.sections) {
        styles.push({selector:'.ring > .'+section,style:"-webkit-transform:rotateX("+i+"deg) translateZ(380px);-moz-transform:rotateX("+i+"deg) translateZ(380px);"});
        i+=30;
      }
      monads.Styleable(styles).on("load").onstyle();
    })()
  }

  class Container extends monads.Touchable {
    constructor(properties={}) {
      private container, stage, shape, plane;
      monads.Touchable.call(this,properties);
      @continuationConstructor = ContainerContinuation;
      @shape = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'shape ring'});
      Ring({shape:@shape});
      @stage = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'stage'}).translate({z:'-100px'});
      @stage.add(@shape);
      @container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'container'});
      @container.add(@stage);
    }
    static init = (function() {
      var styles = [
        {selector:'.container',style:"margin:0 70px 0 70px;-webkit-perspective:700px;-webkit-perspective-origin:50% 500px;-moz-perspective:700px;-moz-perspective-origin: 50% 500px;"},
        {selector:'.stage',style:"width:100%;height:100%;-webkit-transition:-webkit-transform 2s;-webkit-transform-style:preserve-3d;-moz-transition:-moz-transform 2s;-moz-transform-style:preserve-3d;"},
        {selector:'.shape',style:"position:relative;margin:0 auto;height:200px;width:200px;-webkit-transform-style:preserve-3d;-webkit-transition:-webkit-transform 1s;-moz-transform-style:preserve-3d;-moz-transition:-moz-transform 1s;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }

  class ContainerContinuation extends monads.TouchContinuation {
    constructor(properties={}) {
      monads.TouchContinuation.call(this,properties);
    }
    bindBehaviors() {
      try {
        @monad.on('touchstart').bind(this.ontouchstart.bind(this));
        @monad.on('touchmove').bind(this.ontouchmove.bind(this), document, true);
        @monad.on('touchend').bind(this.ontouchend.bind(this), document, true);
      } catch(e) {
        log.Logger.error(this,e);
      }
    }
    ontouchstart(event) {
      console.log('ontouchstart');
    }
    ontouchmove(event) {
      console.log('ontouchmove');
    }
    ontouchend(event) {
      console.log('ontouchend');
    }
  }

  class Main {
    constructor() {
      private main, container;
      @main = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'main'});
      @container = [];
      for(var i = 0; i < 4; ++i) {
        container.push(Container());
        @main.add(container.top().container);
        container.top().on('load').bindBehaviors(container.top());
      }
      @main.insert(document.body);
      controller.Controller.subscribe('slotdata',this.onslotdata.bind(this));
    }
    onslotdata(event) {
      console.log('event received!!!');
      event.detail.forEach(function(info,i) {
        monads.DOMable({element:@container[info.slot].shape.child(info.index)}).on('load').add(monads.DOMable({tagName:'img'}).on('load').attributes({src:info.image}));
      }, this);
    }
    static init = (function() {
      var styles = [
        {selector:'body',style:"background-color:black;color:white;font-family:'Lucida Grande',Verdana,Arial;font-size:12px;"},
        {selector:'#main',style:"display:-webkit-box;display:-moz-box;-webkit-box-pack:center;-moz-box-pack:center;width:100%;height:100%;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }

  class AppType {
    constructor() {
      Main();
      var images = [
        {slot:0,index:0,image:'../slots/images/solec.jpg'},
        {slot:0,index:1,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:11,image:'../slots/images/carlisle.jpg'},
        {slot:1,index:0,image:'../slots/images/gp_radiantbarrier.jpg'},
        {slot:1,index:1,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:11,image:'../slots/images/unicosystem.jpg'},
        {slot:2,index:0,image:'../slots/images/gsky-com.jpg'},
        {slot:2,index:1,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:11,image:'../slots/images/whiteglass_counters.jpg'},
        {slot:3,index:0,image:'../slots/images/hafele_loaxled.jpg'},
        {slot:3,index:1,image:'../slots/images/solec.jpg'},
        {slot:3,index:11,image:'../slots/images/silentFx.jpg'}
      ];
      controller.Controller.publish(events.CustomEvent({type:'slotdata',canBubble:false,isCanceleable:true,detail:images}));
    }
  }
  export const App = AppType();
}
