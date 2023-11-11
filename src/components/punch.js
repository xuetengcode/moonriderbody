/**
 * Calculate punch bounding box and velocity.
 */
 (function() {
  // Array to keep track of the log messages.
  const logFile = [];

  // Function to add messages to the log array.
  function saveLog(...messages) {
    const currentTime = new Date().toISOString();  // Get the current time in ISO format
    const formattedMessages = messages.map(msg => {
        if (typeof msg === 'object') {
            return JSON.stringify(msg, null, 2);
        }
        return msg;
    });
    logFile.push(`| ${currentTime} | ${formattedMessages.join(' ')}`);
    //logFile.push(formattedMessages.join(' '));
  }


  AFRAME.registerComponent('punch', {
    schema: {
      enabled: {default: false}
    },

    init: function () {
      saveLog('|Star | min-x | min-y | min-z | max-x | max-y | max-z | dx | dy | cross | body | min-x | min-y | min-z | max-x | max-y | max-z | dx | dy |')

      this.currentPos = new THREE.Vector3();
      this.direction = 0;
      this.lastSample = new THREE.Vector3();
      this.lastSampleTime = 0;
      this.speed = 0;

      this.bbox = new THREE.Box3();
      this.bboxEl = this.el.querySelector('.punchBbox');
    },

    play: function () {
      this.rig = this.el.closest('#curveFollowRig');
    },

    tick: function (time, dt) {
      if (!this.data.enabled) { return; }

      // Calculate velocity (direction + speed), m/s.
      this.direction = this.currentPos
        .copy(this.el.object3D.position)
        .sub(this.lastSample);

      this.speed = this.direction.length() / ((time - this.lastSampleTime) / 1000);

      this.lastSample.copy(this.el.object3D.position);
      this.lastSampleTime = time;
    },

    tickBeatSystem: function () {
      // Bounding box.
      this.bbox.setFromObject(this.bboxEl.getObject3D('mesh'));
    },

    checkCollision: (function () {
      console.log('[log] in punch')
      const box = new THREE.Box3();
      //const expand = new THREE.Vector3(0, 0, 0.2);
      const expand = new THREE.Vector3(0, 0, 0.5);

      return function (beat) {
        box.copy(beat.bbox).translate(beat.el.object3D.position).expandByScalar(0.1).expandByVector(expand);
        

        //saveLog('Bo')
        saveLog('|Star',   box.min.x, box.min.y, box.min.z, box.max.x, box.max.y, box.max.z, 
                '|', box.max.x - box.min.x, box.max.y - box.min.y,
                this.bbox.intersectsBox(box), 
                ', Body', this.bbox.min.x, this.bbox.min.y, this.bbox.min.z, this.bbox.max.x, this.bbox.max.y, this.bbox.max.z, 
                '|', this.bbox.max.x - this.bbox.min.x, this.bbox.max.y - this.bbox.min.y, '|'
                );
        
        //saveLog('Body Bbox (2)', 'min:', this.bbox.min.x, this.bbox.min.y, this.bbox.min.z, 
         //       ', max:', this.bbox.max.x, this.bbox.max.y, this.bbox.max.z,
          //      this.bbox.intersectsBox(box), 
           //     ', dx dy', this.bbox.max.x - this.bbox.min.x, this.bbox.max.y - this.bbox.min.y);
        
        //const debug_var = this.bboxEl
        //console.log('Bounding box 1 position:', 'min:', box.min, 'max:', box.max);
        //console.log('Bounding box 1 position: dx dy', box.max.x - box.min.x, box.max.y - box.min.y);
        //console.log('Weapon Bounding box 2 position:', 'min:', this.bbox.min, 'max:', this.bbox.max, this.bbox.intersectsBox(box), this.bbox.max.x - this.bbox.min.x, this.bbox.max.y - this.bbox.min.y);
        //console.log('Bounding box ', debug_var)
        //console.log('Bounding box 2 this.El position:', 'min:', debug_var.min, 'max:', debug_var.max, debug_var.max.x - debug_var.min.x, debug_var.max.y - debug_var.min.y);
        return this.bbox.intersectsBox(box);
      };
    })()
  });

  // Send logs to the server.
  function sendLogsToServer() {
    if (logFile.length === 0) return;

    fetch('https://10.0.0.147:4000/save-logs', {
        method: 'POST',
        body: JSON.stringify({ logs: logFile }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server response was not ok.');
        }
        // Clear the logs once sent.
        logFile.length = 0;
    })
    .catch(error => {
        console.error("Error sending logs:", error);
    });
	}

  // Send logs every 5 minutes (300000 ms).
  setInterval(sendLogsToServer, 10000);
})();
