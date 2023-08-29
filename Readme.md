# start host
### Steps
Start the app called ```Docker Desktop```
Click on the container name --> click the play button --> then click ```terminal``` and type:
```
bash
```
### tmux
```
cd shared/moonrider_bino
tmux
```

In tmux view:

- ```ctrl+B then quickly type %```: cut the screen into left-right windows
- ```ctrl+B then quickly type "```: cut the screen into top-bottom windows
### Main project
(in the container)
```
npm run start
```
### data receiver
(in the container)
```
cd receiver
node receive_log.js
```

Open browser, go to:
```
https://130.63.97.216:3000
```
Open folder ```c/Project/moonrider/receiver``` folder, change the name of ```logs.txt``` into ```participant_initial.txt```
### update ip address
```
/src/components/punch.js
```
L101: change the ip address to your host machine's IP.
```
fetch('https://10.0.0.24:4000/save-logs', {
    method: 'POST',
    body: JSON.stringify({ logs: logFile }),
    headers: {
        'Content-Type': 'application/json'
    }
})
```
change to
```
fetch('https://<ip>:4000/save-logs', {
    method: 'POST',
    body: JSON.stringify({ logs: logFile }),
    headers: {
        'Content-Type': 'application/json'
    }
})
```







