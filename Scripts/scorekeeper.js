pc.script.create('scorekeeper', function (app) {
    // Creates a new Scorekeeper instance
    var Scorekeeper = function (entity) {
        this.entity = entity;
    };
    
    var instance = this;
    var score = 0;
    var displayText = 0;
    var uiEntity;

    Scorekeeper.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            uiEntity = app.root.findByName('UI');
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            //score += 1;
            if(displayText != score)
                displayText = pc.math.lerp(displayText, score, 20);
            uiEntity.script.ui.setText(displayText.toString());
        },
        
        updateScore: function(scoreToAdd){
            score += scoreToAdd;
        }
    };

    return Scorekeeper;
});