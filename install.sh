#! /bin/bash

PATH_TO_APK="app/build/outputs/apk/release/app-release.apk"

cd android
./gradlew assembleRelease
adb install -r $PATH_TO_APK
