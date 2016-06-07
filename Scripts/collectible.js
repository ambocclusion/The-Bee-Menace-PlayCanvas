pc.script.create('collectible', function (app) {
    // Creates a new Collectible instance
    var Collectible = function (entity) {
        this.entity = entity;
    };

    Collectible.prototype = {
        
        initialize: function (){
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        },
        
        onTriggerEnter: function (entity) {
            app.root.findByName('Scorekeeper').script.scorekeeper.updateScore(1);
            var particle = new pc.Entity();
            particle.setPosition(this.entity.position);
            particle.addComponent("particlesystem");
            particle.particlesystem.numParticles = 6;
            particle.particlesystem.initialVelocity = 10;
            particle.particlesystem.play();
            console.log(particle.name);
            this.entity.destroy();
        }
    };

    return Collectible;
});