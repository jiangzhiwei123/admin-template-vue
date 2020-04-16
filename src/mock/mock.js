/* eslint-disable import/no-extraneous-dependencies */
import Mock from "mockjs";

//const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

Mock.mock("/admin/getCode", "post", {
  ret: 0
});
Mock.mock("/admin/login", "post", {
  ret: 0,
  model: {
    name: "管理员xxx",
    level: "1"
  }
});
Mock.mock("/admin/logout", "post", {
  ret: 0
});
Mock.mock("/admin/GetTableData", "post", {
  ret: 0,
  success: true,
  model: {
    data: [
      {
        startTime: "2019/08/01 00:00:00",
        endTime: "2019/08/02 15:00:00",
        status: 1,
        img: "http://ww1.sinaimg.cn/large/ae741d56gy1g9muc0le91j20ki0odgnh.jpg"
      },
      {
        startTime: "2019/01/01 00:00:00",
        endTime: "2019/02/02 15:00:00",
        status: 0,
        img: "http://ww1.sinaimg.cn/large/ae741d56gy1g9mucssj9jj20rs0lwwgw.jpg"
      },
      {
        startTime: "2019/10/01 00:00:00",
        endTime: "2019/11/02 15:00:00",
        status: 1,
        img: "http://ww1.sinaimg.cn/large/ae741d56gy1g9mucyi50zj20rs0zijuw.jpg"
      }
    ]
  }
});
