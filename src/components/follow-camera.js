AFRAME.registerComponent('follow-camera', {
  init: function () {
    this.camera = document.querySelector('#camera'); // Reference to the camera
    console.log('follow-camera component is initialized.');
  },
  tick: function () {
    if (!this.camera) {
      return;
    }
    var cameraPosition = this.camera.getAttribute('position');
    var currentBodyObjectPosition = this.el.getAttribute('position');
    
    // Set only the X coordinate of the element this component is attached to (bodyObject) to match the camera's X coordinate
    this.el.setAttribute('position', {
      x: cameraPosition.x,
      y: currentBodyObjectPosition.y,
      z: currentBodyObjectPosition.z
    });
  }
});