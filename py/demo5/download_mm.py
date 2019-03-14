import urllib.request
import os

def get_page(url):
    pass

def find_imgs(url):
    pass

def save_imgs(img_addrs):
    pass

def download_mm(folder='OOXX', pages=10):
    os.mkdir(folder)
    os.chdir(folder)

    url = 'http://jiandan.net/ooxx'
    page_num = int(get_page(url))

    for i in range(pages):
        page_num -= i
        page_url = url + 'page-' + str(page_num) + '#comments'
        find_imgs