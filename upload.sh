#!/bin/bash
cd ./hidden/schedule
touch master.sched
echo "" > master.sched
for f in *.schedule; do
  content= $(cat $f)
  echo "$content" >> master.sched;
done
cd ../..
git add .
git commit -m "SCRIPT-UPLOAD: commiting latest version to master"
git push origin master