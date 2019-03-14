import urllib.request as req
import os
import re

url = 'https://www.kuaidaili.com/free/inha/'
iplist = []

res = req.urlopen(url)

html = res.read().decode('utf-8')
re.search(
    r'(?<![\.\d])(?:25[0-5]\.|2[0-4]\d\.|[01]?\d\d?\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)(?![\.\d])', html)
print(html)
