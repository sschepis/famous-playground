/*globals define*/
define(function(require, exports, module) {
    var Engine           = require("famous/core/Engine");
    var Surface          = require("famous/core/Surface");
    var Modifier         = require("famous/core/Modifier");
    var Matrix           = require("famous/math/Matrix");
    var Vector           = require("famous/math/Vector");  

    var PhysicsEngine    = require("famous/physics/PhysicsEngine");
    var Spring           = require("famous/physics/forces/Spring");
    var RotationalDrag   = require("famous/physics/forces/RotationalDrag");    
    var RotationalSpring = require("famous/physics/forces/RotationalSpring"); 
    var Drag             = require("famous/physics/forces/Drag");  
    var Particle         = require("famous/physics/bodies/Particle");
    var Body             = require("famous/physics/bodies/Body");  
    var Circle           = require("famous/physics/bodies/Circle");
    var Rectangle        = require("famous/physics/bodies/Rectangle");

    var mainContext = Engine.createContext();
  
    var PE = new PhysicsEngine();

    var thevideo = '<iframe width="720" height="480" src="//bespinholdings.com/" frameborder="0"></iframe>';
    thevideo     = '<img src="http://cdn2.hubspot.net/hub/275240/file-293245134-png/website_assets/images/icon_robot.png?t=1378480068000" />';
// http://hellorun.helloenjoy.com/
// http://workshop.chromeexperiments.com/projects/armsglobe
  
    var thepainting = '<iframe id="genframe" width="900" height="535" src="/gen.html" frameborder="0"></iframe>';

    var surface = new Surface({
        size: [900,535],
        content: thepainting,
        classes: ["black"]
    });

    // var surface = new Surface({
    //     size: [171,91],
    //     //content: "<img src='http://bespinholdings.com/images/bhi_logo01.png'/>",
    //     content: thevideo,
    //     classes: ["black"]
    // });

    var particle = new Particle({
      mass : 1,
      position : [0,0,0],
      velocity : [0,0,0]
    });
    PE.addBody(particle);

    var spring = new Spring({
      anchor : [60,100,100],
      period : 90,
      dampingRatio : 0.03,
      length : 0
    });

    PE.attach(spring, particle);

    // var options = Drag.DEFAULT_OPTIONS;
    // options.strength = 0.1;
    // var rotationalDrag = new RotationalDrag(options);

    // var rotationalSpring = new RotationalSpring({ 
    //   anchor : [0,0,45], 
    //   stiffness : 0.01, 
    //   damping:0.02 
    // });

    var applyForce = function(evt){
       var force = new Vector(Math.random()/10, Math.random()/10, 0.25 + Math.random()/4);
       var loc = new Vector(0, 0, 0);
       particle.applyForce(force, loc);
    };
    surface.on("mousedown", applyForce);

    document.body.addEventListener('mousedown', applyForce, true); 

    //PE.attach(rotationalDrag, particle);
    //PE.attach(rotationalSpring, particle);
    //var center = new Modifier({origin:[0.25, 0.25]});
    
    mainContext.add(particle).add(surface);

    mainContext.setPerspective(1000);

    setInterval(function() {
       var force = new Vector(1/25, 1/25, 1/6);
       particle.applyForce(force);
       document.getElementById('genframe').contentWindow.location.reload();
    }, 60000)

    setInterval(function() {
       var force = new Vector(0.01, 0.01, 0);
       particle.applyForce(force);
       setTimeout(function() {
         particle.applyForce(force);
       }, 300);
    }, 5000)
});
