import requests
import json
from bs4 import BeautifulSoup
import time

curTime = int(time.time())
limit = 20

baseUrl = "http://test.com"

#提交数据到manti
def postToManti(title,link):
    url = "http://localhost:9308/sql"
    headers = {
        'Content-Type': 'application/json'
    }

    data = {
        "mode": "raw",
        "query": f"INSERT INTO resource_item (title, url, create_time) VALUES ( '{title}','{link}','{curTime}');"
    }
    response = requests.post(url, headers=headers, data=data)
    
#获取页面内容
def getPageContent(title,url1):
    response = requests.get(url1)
    soup = BeautifulSoup(response.text, 'html.parser')
    div = soup.find('div', class_='Post-body')
    a_tags = div.find_all('a')
    a_str =""
    # 查找class为'Post-body'下的所有a标签，获取它们的href属性
    for a in a_tags:
        if a is not None:
            linkUrl = a.get('href')
            if(linkUrl is not None):
                a_str+=linkUrl
                print(a.get('href'))
    if a_str != "":
        postToManti(title,a_str)

for i in range(2,1000):
    print("爬取接口"+str(limit*i))
    # 目标网页URL
    baseUrl = baseUrl+'/api/discussions?include=user%2ClastPostedUser%2Ctags%2Ctags.parent%2CfirstPost&sort&page%5Boffset%5D='+str(limit*i)
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
    }

    response = requests.get(baseUrl,headers=headers)
    res = response.text
    res_content = json.loads(res)
    data = res_content['data']

    for b in data:
        print(b['attributes']['title'])
        detail_url = baseUrl+"/d/"+b['id']
        getPageContent(b['attributes']['title'],detail_url)
        time.sleep(5)
        







