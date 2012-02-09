module slots {
  module log from 'log';
  module monads from 'monads';
  module controller from 'controller';
  module events from 'events';

  class ConstsType {
    static columnWidth = 200//(document.documentElement.clientWidth/4 - 140)
    static columnHeight = 200//(document.documentElement.clientWidth/4 - 140)
  }
  const Consts = ConstsType();

  class Ring {
    constructor(properties={}) {
      private shape, flipped, moved;
      this.ontouchstart = this.ontouchstart.bind(this);
      this.ontouchmove = this.ontouchmove.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      @shape = properties.shape;
      @flipped = {};
      @moved = false;
      for(var section in Ring.sections) {
        @shape.add(
          monads.DOMable({tagName:'div'}).on('load').attributes({'class':'plane '+section}).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend).continuation
        );
      }
    }
    ontouchstart(event) {
      @moved = false;
    }
    ontouchmove(event) {
      @moved = true;
    }
    ontouchend(event) {
      if(!@moved) {
      var target = monads.DOMable({element:event.target}).on('load');
      if(target.element().tagName.toLowerCase() !== 'img') { 
        var img = target.child(0);
        target = monads.DOMable({element:img}).on('load');
      }
      var f = @flipped[target.id()];
      if(f) {
        @flipped[target.id()] = null;
        target.transition({property:'transform',timing:'1s'}).rotate({y:0});
      } else {
        @flipped[target.id()] = target;
        target.transition({property:'transform',timing:'1s'}).rotate({y:180});
      }
      }
    }
    static sections = {"one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9, "ten":10, "eleven":11, "twelve":12}
    static init = (function() {
      var styles = [
        {selector:'.plane',style:"position:absolute;height:"+ConstsType.columnHeight+"px;width:"+ConstsType.columnWidth+"px;border:transparent;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;text-align:center;font-family:Times,serif;font-size:124pt;color:black;background:transparent;-webkit-transition:-webkit-transform 2s,opacity 2s;-webkit-backface-visibility:hidden;-moz-transition:-moz-transform 2s, opacity 2s;-moz-backface-visibility: hidden;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
      styles = [];
      var i = 0;
      for(var section in Ring.sections) {
        styles.push({selector:'.ring > .'+section,style:"-webkit-transform:rotateX("+i+"deg) translateZ(480px);-moz-transform:rotateX("+i+"deg) translateZ(480px);"});
        i+=30;
      }
      monads.Styleable(styles).on("load").onstyle();
    })()
  }

  class Container {
    constructor(properties={}) {
      private container, stage, shape, plane, lastY, offsetY;
      this.ontouchstart = this.ontouchstart.bind(this);
      this.ontouchmove = this.ontouchmove.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      @shape = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'shape ring'}).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend).continuation;
      Ring({shape:@shape});
      @stage = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'stage'}).translate({z:'-200px'});
      @stage.add(@shape);
      @container = monads.DOMable({tagName:'div'}).on('load').attributes({'class':'container'});
      @container.add(@stage);
      @lastY = undefined;
      @offsetY = 0;
    }
    ontouchstart(event) {
      event.preventDefault();
      var top = @container.element().style.top;
      @lastY = parseInt(top,10);
      @lastY = Math.isNumber(@lastY) ? @lastY : 0;
      @offsetY = @shape.pointerY(event) - @lastY;
    }
    ontouchmove(event) {
      event.preventDefault();
      @lastY = @shape.pointerY(event) - @offsetY;
      @shape.rotate({x:-@lastY});
    }
    ontouchend(event) {
      event.preventDefault();
      @lastY = undefined;
    }
    static init = (function() {
console.log('columnWidth='+ConstsType.columnWidth+' columnHeight='+ConstsType.columnHeight);
      var styles = [
        {selector:'.container',style:"margin:25% 10px;-webkit-perspective:2000px;-webkit-perspective-origin:50% 0px;-moz-perspective:2000px;-moz-perspective-origin: 50% 0px;"},
        {selector:'.stage',style:"width:100%;height:100%;-webkit-transition:-webkit-transform 2s;-webkit-transform-style:preserve-3d;-moz-transition:-moz-transform 2s;-moz-transform-style:preserve-3d;"},
        {selector:'.shape',style:"-webkit-transform-style:preserve-3d;position:relative;margin:0 auto;height:"+ConstsType.columnHeight+"px;width:"+ConstsType.columnWidth+"px;-webkit-transition:-webkit-transform 1s;-moz-transition:-moz-transform 1s;"}
      ];
      monads.Styleable(styles).on("load").onstyle();
    })()
  }

  class Main {
    constructor() {
      private main, container;
      this.ontouchstart = this.ontouchstart.bind(this);
      this.ontouchmove = this.ontouchmove.bind(this);
      this.ontouchend = this.ontouchend.bind(this);
      @main = monads.DOMable({tagName:'div'}).on('load').attributes({'id':'main'});
      @container = [];
      for(var i = 0; i < 4; ++i) {
        container.push(Container());
        @main.add(container.top().container);
      }
      @main.insert(document.body).on('touchstart').bind(this.ontouchstart).on('touchmove').bind(this.ontouchmove).on('touchend').bind(this.ontouchend);
      controller.Controller.subscribe('slotdata',this.onslotdata.bind(this));
    }
    onslotdata(event) {
      event.detail.forEach(function(info,i) {
        monads.DOMable({element:@container[info.slot].shape.child(info.index)}).on('load').add(monads.DOMable({tagName:'img'}).on('load').attributes({src:info.image,height:ConstsType.columnHeight+"px",width:ConstsType.columnWidth+"px"}).round(12,12,12,12));
      }, this);
    }
    ontouchstart(event) {
      event.preventDefault();
    }
    ontouchmove(event) {
      event.preventDefault();
    }
    ontouchend(event) {
      event.preventDefault();
    }
    static init = (function() {
      var styles = [
        {selector:'body',style:"background-color:black;color:white;font-family:'Lucida Grande',Verdana,Arial;font-size:12px;"},
        {selector:'#main',style:"display:-webkit-box;display:-moz-box;-webkit-box-pack:justify;-moz-box-pack:justify;width:100%;height:100%;"}
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
        {slot:0,index:2,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:3,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:4,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:5,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:6,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:7,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:8,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:9,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:10,image:'../slots/images/Rapsel_elle.jpg'},
        {slot:0,index:11,image:'../slots/images/carlisle.jpg'},
        {slot:1,index:0,image:'../slots/images/gp_radiantbarrier.jpg'},
        {slot:1,index:1,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:2,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:3,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:4,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:5,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:6,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:7,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:8,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:9,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:10,image:'../slots/images/thermastrand.jpg'},
        {slot:1,index:11,image:'../slots/images/unicosystem.jpg'},
        {slot:2,index:0,image:'../slots/images/gsky-com.jpg'},
        {slot:2,index:1,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:2,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:3,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:4,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:5,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:6,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:7,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:8,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:9,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:10,image:'../slots/images/kitchen_recess.jpg'},
        {slot:2,index:11,image:'../slots/images/whiteglass_counters.jpg'},
        {slot:3,index:0,image:'../slots/images/hafele_loaxled.jpg'},
        {slot:3,index:1,image:'../slots/images/solec.jpg'},
        {slot:3,index:2,image:'../slots/images/solec.jpg'},
        {slot:3,index:3,image:'../slots/images/solec.jpg'},
        {slot:3,index:4,image:'../slots/images/solec.jpg'},
        {slot:3,index:5,image:'../slots/images/solec.jpg'},
        {slot:3,index:6,image:'../slots/images/solec.jpg'},
        {slot:3,index:7,image:'../slots/images/solec.jpg'},
        {slot:3,index:8,image:'../slots/images/solec.jpg'},
        {slot:3,index:9,image:'../slots/images/solec.jpg'},
        {slot:3,index:10,image:'../slots/images/solec.jpg'},
        {slot:3,index:11,image:'../slots/images/silentFx.jpg'}
      ];
      controller.Controller.publish(events.CustomEvent({type:'slotdata',canBubble:false,isCanceleable:true,detail:images}));
    }
  }
  export const App = AppType();
}
