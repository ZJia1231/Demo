import os
import time
import pytesseract
from PIL import Image

os.system('adb shell screencap -p /sdcard/sc.png')
os.system('adb pull /sdcard/sc.png')

im = Image.open('sc.png')
im.show()