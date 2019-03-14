import urllib.request
req = urllib.request.Request('http://placekitten.com/g/500/600')
response = urllib.request.urlopen(req)
img = response.read()

with open('img.jpg','wb') as f :
    f.write(img)
    