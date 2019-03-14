# coding=utf-8
import os
import time
import recognition
from PIL import Image

# 获取access_token
API_Key = "NXWqI8Qr0IuCMXneOGTTeAw1"
Secret_Key = "HPjcoprSjTaFlHDrZp5sel8NuXcjfra4"
access_token = recognition.get_token(API_Key, Secret_Key)

# 0：十九大报告，1：四个全面，2：中国梦，3：青年工作，4：故事典故
num = input('please select the topic:')
if num == '':
    raise RuntimeError('num is Error！')
num = int(num)

start = input('please enter the start class:')
if start == '':
    raise RuntimeError('start is Error！')
start = int(start)

def shuati():
    os.system('adb shell screencap /sdcard/sc.png')
    os.system('adb pull /sdcard/sc.png')

    img = Image.open('sc.png')

    # 裁剪出按钮并判断按钮内容是否为下一个
    next = img.crop((360, 1660, 720, 1780))
    next.save('next.png')
    next = recognition.recognition_word_high(r'./', 'next.png', access_token)
    for i in next:
        if i == '下一个':
            os.system('adb shell input tap 538 1708')
            print('正在刷课...')
            time.sleep(6)
            shuati()
            break
        elif i == '继续学习':
            os.system('adb shell input tap 856 811')
            os.system('adb shell input tap 538 1708')
            time.sleep(5)
            position()
        elif i == '典故0':
            print('典故')
            topic()
        else :
            print(i)
            time.sleep(5)
            backToTopic()

# 自动点击topic
def topic():
    global num
    startX = 250
    startY = 1410
    addX = 300
    addY = 255
    lastX = startX + num % 3 * addX
    lastY = startY + int(num/3) * addY
    os.system('adb shell input tap ' + str(lastX) + ' ' + str(lastY))
    time.sleep(3)
    if num<5:
        num = num + 1
        position()
    else :
        print('刷课完毕！')

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
    time.sleep(3)
    shuati()

#刷完回到Topic界面
def backToTopic():
    img = Image.open('sc.png')
    back = img.crop((670, 1700, 980, 1790))
    back.save('back.png')
    back = recognition.recognition_word_high(r'./', 'back.png', access_token)
    for i in back:
        if i == '返回':
            print(i)
            check1 = img.crop((530, 1075, 680, 1160))
            check1.save('check1.png')
            check1 = recognition.recognition_word_high(r'./', 'check1.png', access_token)
            check2 = img.crop((770, 1090, 860, 1140))
            check2.save('check2.png')
            check2 = recognition.recognition_word_high(r'./', 'check2.png', access_token)
            print(check1)
            print(check2)
            for check in check1:
                if check=='确定':
                    os.system('adb shell input tap 600 1080')
            for check in check2:
                if check=='确定':
                    os.system('adb shell input tap 800 1120')
            os.system('adb shell input tap 832 1740')
            time.sleep(2)
            global start
            start = start - 4
            topic()
        else:
            shuati()
            
topic()
time.sleep(6)
shuati()
