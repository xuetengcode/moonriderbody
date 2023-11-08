
copy folder **shared** to your computer

# Docker
## Load Docker Image

```
cd [path to **shared**]
docker load < moonriderbody.tar
```

## Start Container
```
docker run -tid -v [local path]:/workspace/shared -p 3000:3000 -p 4000:4000 moonriderbody bash
```

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






