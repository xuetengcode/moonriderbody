// body-collision.js

AFRAME.registerComponent('body-collision', {
  dependencies: ['geometry'],

  init: function () {
    // Reference to the beat system
    this.beatSystem = document.querySelector('#beatSystem'); // Adjust the selector as per your HTML
    
    // Set up a tick function to continuously check for collisions
    this.el.sceneEl.addEventListener('loaded', () => {
      this.el.sceneEl.addBehavior(this);
    });
  },

  tick: function (time, timeDelta) {
    // Get all the beats
    const beats = this.beatSystem.querySelectorAll('.beat'); // Adjust the selector to match the beats in your scene

    // Iterate through the beats and check for collision with the body object
    beats.forEach((beat) => {
      if (this.checkCollision(this.el, beat)) {
        // Handle the collision, e.g., destroy the beat, play a sound, etc.
        this.handleCollision(beat);
      }
    });
  },

  // Function to check if two objects are colliding
  checkCollision: function (obj1, obj2) {
    const obj1BB = new THREE.Box3().setFromObject(obj1.object3D);
    const obj2BB = new THREE.Box3().setFromObject(obj2.object3D);

    return obj1BB.intersectsBox(obj2BB);
  },

  // Function to handle the collision
  handleCollision: function (beat) {
    // You can retrieve the color or other properties of the beat
    const beatColor = beat.getAttribute('material').color;

    // Destroy the beat or take other action
    beat.parentNode.removeChild(beat); // Or emit an event or use another method to destroy the beat

    // You can add logic to play a sound or other effects here

    // Logic to update score or other game state
    // For example, if there are specific rules about how the body object collides with the beats based on color
    // You can apply those rules here

    // If you want to mirror the behavior of the punch system, you may want to look into the logic of the punch.js
    // And replicate the scoring and effects logic here
  }
});
