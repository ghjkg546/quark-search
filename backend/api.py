from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
app = Flask(__name__)


#获取总条数
def getCount():
    keyword = request.args.get('keyword', '') 
    url = "http://localhost:9308/sql"
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        "mode": "raw",
        "query": f"select count(*) as count from resource_item where match('{keyword}')"
    }
    response = requests.post(url, headers=headers, data=data)
    res = json.loads(response.text)

    return res[0]['data'][0]['count']

#提交数据到manti
def postToManti(match_contnet,offset,page_size):

    url = "http://localhost:9308/sql"
    headers = {
        'Content-Type': 'application/json'
    }

    data = {
        "mode": "raw",
        "query": f"select * from resource_item where match('{match_contnet}') limit {page_size} offset {offset}"
    }

    print(data)
    response = requests.post(url, headers=headers, data=data)
    print(response.text)
    return response.text

#获取详情信息
def postDetail(id):

    url = "http://localhost:9308/sql"
    headers = {
        'Content-Type': 'application/json'
    }

    data = {
        "mode": "raw",
        "query": f"select * from resource_item where id={id}"
    }

    response = requests.post(url, headers=headers, data=data)
    return response.text

@app.route('/api/data', methods=['GET'])
def get_data():
    page = int(request.args.get('page', 1))  # 默认为第一页
    page_size = int(request.args.get('page_size', 10))  # 默认每页10条数据
    keyword = request.args.get('keyword', '')  # 默认每页10条数据
    start = (page - 1) * page_size
    end = start + page_size
    paginated_data = postToManti(keyword,start,page_size)


    res =json.loads(paginated_data) [0]
    k=0
    for item in res['data']:
        res['data'][k]['id'] = str(item['id'])
        k =k+1
    res['total'] = getCount()
    return jsonify(res)

#详情接口
@app.route('/api/data/detail', methods=['GET'])
def get_detail():
    id = int(request.args.get('id', '') ) # 默认每页10条数据
    paginated_data = postDetail(id)
    res =json.loads(paginated_data) [0]
    k=0
    for item in res['data']:
        res['data'][k]['id'] = str(item['id'])
        k =k+1
    res['total'] = getCount()
    return jsonify(res)

if __name__ == '__main__':
    CORS(app)

    app.run(debug=True,port=8634, host="0.0.0.0")

app = Flask(__name__)

#列表接口
@app.route('/api/data', methods=['GET'])
def get_data():
    page = int(request.args.get('page', 1))  # 默认为第一页
    page_size = int(request.args.get('page_size', 10))  # 默认每页10条数据
    start = (page - 1) * page_size
    end = start + page_size
    paginated_data = postToManti(start,page_size)
    res =json.loads(paginated_data) [0]
    k=0
    for item in res['data']:
        res['data'][k]['id'] = str(item['id'])
        k =k+1
    print(res)
    return jsonify(res)

if __name__ == '__main__':
    CORS(app)
    app.run(debug=True,port=8634, host="0.0.0.0")