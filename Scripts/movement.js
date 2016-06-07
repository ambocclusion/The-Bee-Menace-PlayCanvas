pc.script.attribute('speed', 'number', 0.1, {
    min: 0.05,
    max: 100,
    step: 0.05,
    decimalPrecision: 2
});

pc.script.attribute('maxSpeed', 'number', 0.1, {
    min: 0.05,
    max: 200,
    step: 0.05,
    decimalPrecision: 2
});

pc.script.attribute('model', 'entity', null, {
    displayName: 'Model'
});

pc.script.create('movement', function (app) {
    // Creates a new Movement instance
    var Movement = function (entity) {
        this.entity = entity;
    };
    
    var currentRot = 0.0;
    
    function clamp (min, max, num) {
        return Math.max(min, Math.min(num, max));   
    }

    Movement.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var velocityX = 0;
            var velocityY = 0;
            var vel = new pc.Vec3();
            var facingDir = currentRot;
            if(app.keyboard.isPressed(pc.KEY_LEFT) || app.keyboard.isPressed(pc.KEY_A)){
                facingDir = -90.0;
                velocityX -= this.speed;
            }
            if(app.keyboard.isPressed(pc.KEY_RIGHT) || app.keyboard.isPressed(pc.KEY_D)){
                facingDir = 90.0;
                velocityX += this.speed;
            }
            if(app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(pc.KEY_S)){
                facingDir = 0.0;
                velocityY += this.speed;
            }
            if(app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_W)){
                facingDir = 180.0;
                velocityY -= this.speed;
            }
            
            if(app.keyboard.isPressed(pc.KEY_LEFT) && app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_S)){
                facingDir = -45.0;
            }
            if(app.keyboard.isPressed(pc.KEY_RIGHT) && app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_S)){
                facingDir = 45.0;
            }
            if(app.keyboard.isPressed(pc.KEY_LEFT) && app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_W)){
                facingDir = -135.0;
            }
            if(app.keyboard.isPressed(pc.KEY_RIGHT) && app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_W)){
                facingDir = 135.0;                
            }
            
            vel.x = velocityX;
            vel.z = velocityY;
            this.entity.rigidbody.linearVelocity = vel;
            this.entity.setPosition(this.entity.position.x, 0.25, this.entity.position.z);
            currentRot = pc.math.lerpAngle(currentRot, facingDir, 5 * dt);
            this.model.setEulerAngles(0, currentRot,0);
        }
    };

    return Movement;
});