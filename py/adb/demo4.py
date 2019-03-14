from PIL import Image
import demo5

img = Image.open('sc.png')
next = img.crop((360,1660,720,1780))
next.save('next.png')
next.show()
