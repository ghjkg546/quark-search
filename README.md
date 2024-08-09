# quark-search
夸克盘搜索工具

# 使用技术

| 分类    | 名称                         | 介绍                                              |
|-------|----------------------------|-------------------------------------------------|
| 前端    | Vite+React+Antd+Typescript | 当前比较流行的前端技术栈，利用chatgpt生成的代码，修改而来                |
| 后端    | Flask                      | Manticore Search提供了curl接口，用python调用较为方便         |
| 搜索引擎  | Manticore Search           | 一款比 Es 更轻量级搜索引擎，考虑到es内存消耗极高，一般人买的低配服务器跑不动，于是不采用 |


# 使用方式
### 搭建 Manticore Search
上传main-search目录到服务器
```
cd main-search
docker-compose up -d 
mysql -P 9306 -h0
CREATE TABLE resource_item (title string indexed stored, url string ,create_time integer )charset_table = 'non_cjk,chinese' morphology = 'icu_chinese';

```
端口可以自己改，默认是9306，注意不要暴露9306到外网，以免遭受攻击，攻击者可能篡改，删除你的数据


### 爬取搜索数据
在backend/crawl.py ,修改2处”baseUrl“为真实目标url，谷歌搜”夸克资源分享“，很容易找到那种一眼flarum搭建的，本脚本仅支持此类网站爬取
time.sleep(),默认我是用了5秒，请自行修改间隔时间
其余类型需自行修改脚本,同样上传到带有python环境的服务器运行，Manticore Search跟爬取脚本需要在同一台服务器，以方便从localhost投递数据

### 启动flask-api
python api.py,启动即可，但这样关闭命令行后，服务端就断了。常驻后台需搭配supervisor运行,建议用1panel或者宝塔等面板运行，启动后验证下后端
url能否打开，如访问http://服务器ip/api/data?page=1&keyword=父亲

### 编译前端静态文件
如果没有pnpm请自行搜索并安装

修改.env.production VITE_BASE_URL=上一步启动的后端apiUrl
运行
```
pnpm install
pnpm build
```
上传文件到服务器

# 界面
## 首页

![本地路径](index.png "相对路径") 


## 结果页
![本地路径](result.png "相对路径") 


## 详情页

![本地路径](detail.png "相对路径") 


#注意
代码仅为演示，有其他需求请自行修改代码
