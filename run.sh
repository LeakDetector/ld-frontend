#!/bin/bash
killall 'Google Chrome'
sleep 1
open -a 'Google Chrome' index.html --args --allow-file-access-from-files
