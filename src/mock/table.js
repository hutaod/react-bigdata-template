import Mock from 'mockjs';
Mock.mock('/get_table',{
    "success":true,
    "msg":"请求成功",
    "obj|1000": [{  
      "key|+1": 1,
      "name": "@cname",
      "age": "@int(20,100)",
      "street": "@city",
      "building": "test",
      "number": 2035,
      "companyAddress": "Lake Street 42",
      "companyName": "SoftLake Co",
      "gender": "M",
    }]
  })