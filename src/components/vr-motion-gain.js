AFRAME.registerComponent('vr-motion-gain', {
  schema: {
    gain: { type: 'number', default: 0.1 } // Default gain is 0.1.
  },

  init: function () {
    //this.camera = document.querySelector('a-camera');
    this.camera = document.getElementById('camera');
    this.cameraRig = document.querySelector('#cameraRig');
    this.bodyRig = document.querySelector('#bodyRig');
    this.lastPosition = new THREE.Vector3();
    console.log('vr-motion-gain component is initialized.');
  },

  tick: function () {
    // Check if camera or cameraRig is null before proceeding.
    if (!this.camera) {
      console.log('[debug] no camera')
    }
    if (!this.cameraRig) {
      console.log('[debug] no cameraRig')
    }
    if (!this.camera || !this.cameraRig) {
      return;
    }
    
    var gain = this.data.gain;

    // Calculate the change in camera position since the last tick.
    var position = this.camera.getAttribute('position');
    var dx = position.x - this.lastPosition.x;
    var dy = position.y - this.lastPosition.y;
    var dz = position.z - this.lastPosition.z;

    // Apply gain to the position change.
    dx *= (gain - 1);
    //dy *= (gain - 1);
    //dz *= (gain - 1);

    //console.log('[applying] motion diff:', dx, dy, dz, gain);
    // Update the cameraRig's position by adding the modified position change.
    var cameraRigPosition = this.cameraRig.getAttribute('position');
    var bodyRigPosition = this.bodyRig.getAttribute('position');

    //console.log('CameraRig b4:', cameraRigPosition.x, cameraRigPosition.y, cameraRigPosition.z, gain);

    this.cameraRig.setAttribute('position', {
      x: cameraRigPosition.x + dx,
      //y: cameraRigPosition.y + dy,
      //z: cameraRigPosition.z + dz
    });
    this.bodyRig.setAttribute('position', {
      x: bodyRigPosition.x + dx,
      //y: cameraRigPosition.y + dy,
      //z: cameraRigPosition.z + dz
    });
    
    var cameraRigPosition = this.cameraRig.getAttribute('position');
    //console.log('CameraRig:', cameraRigPosition.x, cameraRigPosition.y, cameraRigPosition.z, gain);
    // Update lastPosition with the new camera position.
    this.lastPosition.copy(position);
  },

  remove: function () {
    // Clean up any event listeners, if necessary.
    this.camera = null;
    this.cameraRig = null;
  }
});
