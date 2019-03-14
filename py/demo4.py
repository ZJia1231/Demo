import urllib.request

url = 'http://www.ip138.com/'

proxy_support = urllib.request.ProxyHandler({'http': '202.38.92.100:3128'})

opener = urllib.request.build_opener(proxy_support)
openner.addheaders = [
    ('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.170 Safari/537.36')]

urllib.request.install_opener(opener)

response = urllib.request.urlopen(url)

html = response.read().decode('utf-8')

print(html)
