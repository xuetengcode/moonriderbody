# Moon Rider

## Installation

- install nodejs 18: ```package-lock.json``` is really old, some packages cannot be installed from nodejs 11
- remove nodejs18 and install nodejs12 (11 also works): the code 
- We need to use https to open the hosted game. So we need to follow (https://stackoverflow.com/questions/24534468/server-https-on-node-js-doesnt-work)

## Start

```
npm run start
```

## Docker
```
docker run -tid \
      -v <local path>:/workspace/shared \
      -p 3000:3000 \
      moonrider:git bash
```

## Debug
It's based on Nodejs, we need to see debug console. Refer to https://developer.oculus.com/documentation/web/browser-remote-debugging/

Windows check port usage ```resmon.exe```

```
adb devices
adb shell ip route

adb tcpip 5555
adb connect <ipaddress>:5555
```

Go to ``chrome://inspect/#devices``


## major changes and scene descriptions
### ```beat-generator.js```
L77-79, changed to 1 height
```
  verticalPositionsHumanized: {
    0: 'bottom',
    1: 'middle',
    2: 'top'
  },
```
to
```
  verticalPositionsHumanized: {
    0: 'middle',
    1: 'middle',
    2: 'middle'
  },
```

```horizontalPositions: [-0.75, -0.25, 0.25, 0.75],```

Variable ```notes[10]``` content:

```
{
    "_time": 26,
    "_lineIndex": 1,
    "_lineLayer": 0,
    "_type": 0,
    "_cutDirection": 1
}
```

Add time diff limit so, no two beats appear at the same ```z```
```
if (noteInfo._time - this.prevBeatPosition < 0.1) return
```