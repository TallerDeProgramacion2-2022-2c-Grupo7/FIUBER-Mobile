# FIUBER-Mobile
FIUBER - Mobile App, the UBER of FIUBA

## Getting Started

- Run `yarn install` to install dependencies

### Emulator

- Open Android Studio and start emulator
- `yarn start --reset-cache`
- In a differtent terminal `yarn android`
  
### Build APK

- `cd android && ./gradlew assembleRelease`


### Run installation script

To run this script it is necessary to:
- Have the adb package installed
- Have the phone plugged to the PC 
- Have the debugging mode in the phone enabled
- In Linux, you need to run the script with sudo

After this, you can run `adb devices` to check if evrything is working. The output of this should be something like:
```
List of devices attached
<code>	device
```

If that is the case, you should be able to run the instalation script. For this you just need to type:
```
./install.sh
```
