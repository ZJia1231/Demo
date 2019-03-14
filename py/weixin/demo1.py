import re

import itchat
import jieba

import matplotlib.pyplot as pltfrom
import PIL.Image as Image
import wordcloud
import WordCloud

itchat.login()

friends = itchat.get_friends(update=True)[0:]
tList = []

for i in friends:
    signature = i['Signature'].replace(' ','').replace('span','').replace('class','').replace('emoji','')
    rep = re.compile('1f\d.+')
    signature = rep.sub('',signature)
    tList.append(signature)

text = ''.join(tList)

wordlist_jieba = jieba.cut(text,cut_all=True)
wl_space_split = " ".join(wordlist_jieba)


# 这里要选择字体存放路径，这里是Mac的，win的字体在windows／Fonts中
my_wordcloud = WordCloud(background_color="white", max_words=2000, max_font_size=40,
                         random_state=42, font_path='C:\Windows\Fonts\Microsoft YaHei UI.ttf').generate(wl_space_split)

plt.imshow(my_wordcloud)
plt.axis("off")
plt.show()