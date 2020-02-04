#!/bin/bash
cd ./hidden/schedule
rm master.sched
touch master.sched
for f in *.schedule; do
  echo "$(cat $f)" >> master.sched;
done
cd ../..
git add .
git commit -m "SCRIPT-UPLOAD: commiting latest version to master"
git push origin master