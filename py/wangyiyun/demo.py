# encoding:utf-8
import requests
import json


def get_comments(url):
    name_id = url.split('=')[1]
    headers = {
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
        'Referer': 'https://music.163.com/song?id=33756016'
    }
    params = 'AAboBJS9QsFw03oLbsEDMzriVu8f63wscOTPDi2sdDcmzHvKcQrmS6NNzt1WnZVPhSuzJej0ZJ/90CsKaZ/3NO7mW16WLLadrPVuExjssmf0KeVWSiJrSkKUUxE0kAXv18DRWVdDsXnaZh6DNQBfyUerSkvRFH6bcuLQ6zibgsZ1errCKMQZXXxldv1Smmvx391mu9ptr6RjOceZj6MiKJYoUXoRsYa/BJaHF0J4oxc='
    encSecKey = '5d12e6478f727260ed44efded6c277f0e31fe1629ca56b3c31acdd56fbf68277e7e8025e5fe723521b8b3510d7a87dd9b88eafc5066dbe8da74715e7b960e49ecd599c198993c4e72dad16e91291286e7d37849a473ba5ccdf5941b2afc35492038dadd1f7d54013cf395a8718f2e0d6144f1b05fac0b074a6d2edb35f9a1afc'
    data = {
        'params': params,
        'encSecKey': encSecKey
    }
    target_url = 'https://music.163.com/weapi/v1/resource/comments/R_SO_4_{}?csrf_token='.format(
        name_id)
    res = requests.post(target_url, headers=headers, data=data)
    return res

def get_hot_comments(res):
    comments_json = json.loads(res.text)
    hot_comments = comments_json['hotComments']
    with open('res.txt', 'w', encoding='utf-8') as file:
        for each in hot_comments:
            file.write(each['content']+ '\n')

def main():
    url = input('请输入地址：')
    res = get_comments(url)
    get_hot_comments(res)


if __name__ == '__main__':
    main()
