from PIL import Image
import pytesseract
import os

img = Image.open(r'C:\Users\啊甲丶\Desktop\py\sc.png')

code = pytesseract.image_to_string(img)
print(code)
