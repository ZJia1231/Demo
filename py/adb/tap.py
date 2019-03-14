# encoding: utf-8
from PIL import Image
import main

#刷完回到Topic界面
def backToTopic():
    back = img.crop((670, 1700, 980, 1790))
    back.save('back.png')
    back = demo3.recognition_word_high(r'./', 'back.png', access_token)
    for i in back:
        if i == '返回':
            print(i)
            os.system('adb shell input tap 832 1740')
            topic()

# 自动点击topic
def topic():
    global num
    startX = 250
    startY = 1410
    addX = 295
    addY = 255
    lastX = startX + num % 3 * addX
    lastY = startY + int(num/3) * addY
    os.system('adb shell input tap ' + str(lastX) + ' ' + str(lastY))
    num = num + 1
    time.sleep(3)
    position()

# 自动点击第几课
def position():
    global start
    startX = 242
    startY = 633
    add = 118
    lastX = startX + (start-1) % 6 * add
    lastY = startY + int((start-1) / 6) * add
    os.system('adb shell input tap ' + str(lastX) + ' ' + str(lastY))
    start = start + 1
    main.shuati()
