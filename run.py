#!/usr/bin/env python
import shutil
import os
import subprocess
import time

def copyleak():
    """Copy leak detector output file to current directory."""
    shutil.copy(os.path.join(basepath, "amazon-output.json.analyzed"), ".")

def interface():
    """Pop open the front end in a browser."""
    subprocess.call("killall 'Google Chrome'", shell=True)
    time.sleep(1)
    os.system("open -a 'Google Chrome' " + os.path.join(frontendpath, "index.html") + " --args --allow-file-access-from-files ")
    
if __name__ == '__main__':
   basepath = "/Users/celabimac-mainLab/Documents/leak-detector/package"
   frontendpath = "/Users/celabimac-mainLab/Desktop/ld-frontend"
   copyleak()
   interface()
