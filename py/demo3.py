import json
import urllib.parse
import urllib.request

url = 'http://fanyi.baidu.com/sug'
keyword = input('请输入需要翻译的内容：')
data = {'kw': keyword }
data = urllib.parse.urlencode(data).encode('utf-8')

response = urllib.request.urlopen(url,data)

html = response.read().decode('utf-8')
target = json.loads(html)['data'][0]['v']
print('翻译结果为：'+ target)
