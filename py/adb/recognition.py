# encoding: utf-8
import urllib
import urllib.parse
import urllib.request
import base64
import json
import re

def get_token(API_Key, Secret_Key):
    # 获取access_token
    host = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + API_Key +'&client_secret='+ Secret_Key
    request = urllib.request.Request(host)
    request.add_header('Content-Type', 'application/json; charset=UTF-8')
    response = urllib.request.urlopen(request)
    content = response.read()
    content_json = json.loads(content)
    access_token = content_json['access_token']
    return access_token


def recognition_word_high(filepath, filename, access_token):
    url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token=' + access_token
    # 二进制方式打开图文件
    f = open(filepath + filename, 'rb')  
    # 参数image：图像base64编码
    img = base64.b64encode(f.read())
    params = {"image": img}
    params = urllib.parse.urlencode(params).encode('utf-8')
    request = urllib.request.Request(url, params)
    request.add_header('Content-Type', 'application/x-www-form-urlencoded')
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf-8')
    if (content):
        # print(content)
        world = re.findall('"words": "(.*?)"}', str(content), re.S)
        return world

if __name__ == '__main__':
    API_Key = "NXWqI8Qr0IuCMXneOGTTeAw1"
    Secret_Key = "HPjcoprSjTaFlHDrZp5sel8NuXcjfra4"
    filepath = "C:/Users/啊甲丶/Desktop/py/"
    filename = "next.png"
    access_token = get_token(API_Key, Secret_Key)
    recognition_word_high = recognition_word_high(filepath, filename, access_token)
