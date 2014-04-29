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
  
    var surface = new Surface({
        size: [200,200],
        content: thevideo,
        classes: ["white"]
    });

    // var surface = new Surface({
    //     size: [171,91],
    //     //content: "<img src='http://bespinholdings.com/images/bhi_logo01.png'/>",
    //     content: thevideo,
    //     classes: ["black"]
    // });

    var particle = new Rectangle({
      mass : 1,
      size : [200,200],
      position : [0,0,0],
      velocity : [0,0,0]
    });
    PE.addBody(particle);

    var particle2 = new Particle({
      mass : 1,
      position : [0,100,0],
      velocity : [0,0,0]
    });
    PE.addBody(particle2);

    var spring = new Spring({
      anchor : [0,0,0],
      period : 400,
      dampingRatio : 0.03,
      length : 0
    });

    var spring2 = new Spring({
      anchor : [300, 0, -200],
      period : 400,
      dampingRatio : 0.03,
      length : 300
    });

    var spring3 = new Spring({
      anchor : [0, -200, 800],
      period : 400,
      dampingRatio : 0.03,
      length : 0
    });

    var spring4 = new Spring({
      anchor : [0, 100, 0],
      period : 400,
      dampingRatio : 0.03,
      length : 0
    });

    // var options = Drag.DEFAULT_OPTIONS;
    // options.strength = 0.1;
    // var rotationalDrag = new RotationalDrag(options);

    // var rotationalSpring = new RotationalSpring({ 
    //   anchor : [0,0,45], 
    //   stiffness : 0.01, 
    //   damping:0.02 
    // });

    surface.on("mousedown", function(){
       var force = new Vector(0, 0, -0.5);
       var loc = new Vector(0, 0, 0);
       particle.applyForce(force, loc);
       particle2.applyForce(new Vector(0, 0, -0.5));
    });
  
    PE.attach(spring, particle);
    PE.attach(spring2, particle);
    PE.attach(spring3, particle);
    PE.attach(spring4, particle2);

    //PE.attach(rotationalDrag, particle);
    //PE.attach(rotationalSpring, particle);

    var center = new Modifier({origin:[0.5, 0.5]});
    mainContext.add(center).add(particle).add(particle2).add(surface);

    mainContext.setPerspective(1000);
});
