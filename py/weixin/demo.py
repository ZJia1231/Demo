import itchat
import re
import os

itchat.login()

itchat.send(u'你好——from Python', 'ZJia1231')

friends = itchat.get_friends(update=True)[0:]
# for i in friends:
#     signature = i["Signature"].strip().replace("span", "").replace("class", "").replace("emoji", "")
#     rep = re.compile("1f\d.+")
#     signature = rep.sub("", signature)
#     print(signature)

# f = open('./data.txt','w',encoding='utf-8')
# for i in friends:
#     f.write(str(i))
#     f.write('\n')
# f.close()

f = open('./data1.txt','w',encoding='utf-8')
for i in friends:
    NickName = str(i['NickName'])
    signature = i["Signature"].strip().replace("span", "").replace("class", "").replace("emoji", "")
    RemarkName = str(i['RemarkName'])
    f.write(NickName + '\n' + RemarkName + '\n' + signature + '\n\n')
f.close()