// The entity to follow
pc.script.attribute('target', 'entity', null, {
    displayName: 'Target'
});

pc.script.attribute('catchSpeed', 'number', 0.1, {
    min: 0.05,
    max: 1,
    step: 0.05,
    decimalPrecision: 2
});

// How far from the entity should the follower be
//pc.script.attribute('distance', 'number', 4);
// How far from the entity should the follower be
pc.script.attribute('distance', 'number', 4);

// Script Definition
pc.script.create('follow', function (app) {
    // Creates a new Follow instance
    var Follow = function (entity) {
        this.entity = entity;
        this.vec = new pc.Vec3();
    };

    Follow.prototype = {        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (!this.target) return;
                                        
            // get the position of the target entity
            var pos = this.target.getPosition();
            
            // calculate the desired position for this entity
            //pos.x += 0.75 * this.distance;
            pos.y += 1.0 * this.distance;
            pos.z += .75 * this.distance;
            
            // smoothly interpolate towards the target position
            this.vec.lerp(this.vec, pos, this.catchSpeed * dt);
            
            // set the position for this entity
            this.entity.setPosition(this.vec);            
        }
    };

    return Follow;
});