#!/bin/bash
cp -r /mnt/chromeos/MyFiles/Downloads/portfolio/* .
git add .
git commit -m "SCRIPT-UPLOAD: commiting latest version to master"
git push origin master
