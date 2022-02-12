// 为了避免变量被污染，我们每个模块都采用立即执行函数
// 监控区域的tab切换
(function () {
  $('.monitor .tabs').on('click', 'a', function () {
    $(this)
      .addClass('active')
      .siblings('a')
      .removeClass('active');
    $('.monitor .content')
      .eq($(this).index())
      .show()
      .siblings('.content').hide();
  });
  // 先克隆marquee里面所有的行
  $('.marquee-view .marquee').each(function () {
    var rows = $(this).children().clone();
    $(this).append(rows);
  });
})();


// 点位分析模块
(function () {
  // 1、初始化echarts实例对象
  var myChart = echarts.init(document.querySelector(".pie"));
  // 2、指定配置项和数据
  var option = {
    // 图标提示组件
    tooltip: {
      // 触发模式，item的意思是放到数据对应图形上触发提示
      trigger: "item",
      // 格式化提示内容：
      // a代表series系列图标名称
      // b代表series中data数据中的name
      // c代表series中data数据中的value
      // d代表当前数据/总数据的比
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 颜色设置
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    // 控制图表
    series: [{
      // 图表名称
      name: "点位统计",
      // 图表类型
      type: "pie",
      // 饼形图的半，可以是像素也可以是百分比（基于图表的dom容器大小），第一个值是内半径，第二个值是外半径
      // radius: [30, 110],
      // 注意百分比必须要加引号
      radius: ['10%', '70%'],
      // 饼状图的中心点，基于图表的dom容器大小
      center: ["50%", "50%"],
      // 展示模式，radius表示半径模式，另外一种是 area表示面积模式
      roseType: "radius",
      // 文本标签,控制饼形图中文字的相关样式， 注意它是一个对象
      label: {
        fontSize: 10
      },
      labelLine: {
        //连接扇形线长
        length: 6,
        //连接文字线长
        length2: 8
      },
      // 数据集 value 数据的值 name 数据的名称
      data: [{
        value: 20,
        name: '云南'
      }, {
        value: 26,
        name: '北京'
      }, {
        value: 24,
        name: '山东'
      }, {
        value: 25,
        name: '河北'
      }, {
        value: 20,
        name: '江苏'
      }, {
        value: 25,
        name: '浙江'
      }, {
        value: 30,
        name: '四川'
      }, {
        value: 42,
        name: '湖北'
      }]
    }]
  };
  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
// 柱状图模块
(function () {
  // 把单独设置的柱子样式提取出来
  var item = {
    name: "",
    value: 1200,
    // 柱子颜色
    itemStyle: {
      color: '#254065'
    },
    // 鼠标经过柱子颜色
    emphasis: {
      itemStyle: {
        color: '#254065'
      }
    },
    // 隐藏提示框
    tooltip: {
      // 额外添加提示框的css样式
      extraCssText: 'opacity:0'
    },
  }
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".bar"));
  // 2. 指定配置和数据
  var option = {
    // 渐变颜色
    color: new echarts.graphic.LinearGradient(
      // (x1,y2) 点到点 (x2,y2) 之间进行渐变
      0, 0, 0, 1,
      [{
          offset: 0, // 0 起始颜色
          color: '#00fffb'
        },
        {
          offset: 1, // 1 结束颜色
          color: '#0061ce'
        }
      ]
    ),
    // 工具提示
    tooltip: {
      // 触发类型  经过轴触发axis  经过轴触发item
      trigger: 'item',
    },
    // 图表边界控制
    grid: {
      // 距离 上右下左 的距离
      left: '0%',
      right: '3%',
      bottom: '3%',
      top: '3%',
      // 是否显示直角坐标系网格
      show: true,
      //grid 四条边框的颜色
      borderColor: 'rgba(0, 240, 255, 0.3)',
      // 是否包含文本
      containLabel: true
    },
    // 控制x轴
    xAxis: [{
      // 使用类目，必须有data属性
      type: 'category',
      // 使用 data 中的数据设为刻度文字
      data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
      // 刻度设置
      axisTick: {
        // true意思：图形在刻度中间
        // false意思：图形在刻度之间
        alignWithLabel: false,
        // 隐藏x轴的刻度
        show: false
      },
      // x坐标轴文字标签样式设置
      axisLabel: {
        color: '#4c9bfd'
      },
      // x坐标线标签
      axisLine: {
        // 坐标线的样式
        lineStyle: {
          color: 'rgba(0, 240, 255, 0.3)',
          // width:8,  x轴线的粗细
          // opcity: 0,   如果不想显示x轴线 则改为 0
        }
      }

    }],
    // 控制y轴
    yAxis: [{
      // 使用数据的值设为刻度文字
      type: 'value',
      // 刻度设置
      axisTick: {
        // true意思：图形在刻度中间
        // false意思：图形在刻度之间
        alignWithLabel: false,
        // 隐藏x轴的刻度
        show: false
      },
      // x坐标轴文字标签样式设置
      axisLabel: {
        color: '#4c9bfd'
      },
      // x坐标线标签
      axisLine: {
        // 坐标线的样式
        lineStyle: {
          color: 'rgba(0, 240, 255, 0.3)',
          // width:8,  x轴线的粗细
          // opcity: 0,   如果不想显示x轴线 则改为 0
        }
      },
      // y轴分割线的样式 
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 240, 255, 0.3)'
        }
      }
    }],
    // 控制x轴
    series: [{
      // 图表数据名称
      name: '用户统计',
      // 图表类型
      type: 'bar',
      // 柱子宽度
      barWidth: '60%',
      // 数据
      data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
    }]
  };

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 订单模块
(function () {
  // 1、准备数据
  var data = {
    day365: {
      orders: '20,301,987',
      amount: '99834'
    },
    day90: {
      orders: '20,214,97',
      amount: '7834'
    },
    day30: {
      orders: '15,301,47',
      amount: '8934'
    },
    day1: {
      orders: '50,301,234',
      amount: '74834'
    },
  }
  $('.order .filter').on("click", 'a', function () {
    //  点击a标签时把对应的索引号赋值给自动切换时的index，不然先点击再自动切换时会出现切换顺序错误
    index = $(this).index();
    $(this)
      .addClass('active')
      .siblings('a')
      .removeClass('active');
    // console.log(data[$(this).data('name')].orders);
    $('.order .data .item h4:eq(0)').html(data[$(this).data('name')].orders);
    $('.order .data .item h4:eq(1)').html(data[$(this).data('name')].amount);
  });
  var index = 0;
  var timer = setInterval(() => {
    index++;
    if (index === 4) {
      index = 0;
    }
    $(".order .filter a").eq(index).click();
  }, 2000);
  // 鼠标经过是清除定时器，鼠标移开时打开定时器
  $('.order').hover(function () {
    clearInterval(timer);
  }, function () {
    clearInterval(timer);
    timer = setInterval(() => {
      index++;
      if (index === 4) {
        index = 0;
      }
      $(".order .filter a").eq(index).click();
    }, 2000);
  })
})();

// 销售统计模块
(function () {
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ],
    quarter: [
      [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
      [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
    ],
    month: [
      [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
      [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
    ],
    week: [
      [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
      [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
    ]
  };
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".line"));
  // 2. 指定配置和数据
  var option = {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      // 如果series里面设置了name，legend里的data可以省略
      data: ["预期销售额", "实际销售额"],
      textStyle: {
        color: '#4c9bfd' // 图例文字颜色
      },
      right: '10%' // 距离右边10%
    },
    // 设置网格样式
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true, // 显示边框
      borderColor: '#012f4a', // 边框颜色
      containLabel: true // 包含刻度文字在内
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // false表示去除轴两端的间距
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#4c9bfd' // 文本颜色
      },
      axisTick: {
        show: false
      }

    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false // 去除刻度
      },
      axisLabel: {
        color: '#4c9bfd' // 文字颜色
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a' // 分割线颜色
        }
      }
    },
    color: ['#00f2f1', '#ed3f35'],
    series: [{
      name: '预期销售额',
      data: data.year[0],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#00f2f1'
      }
    }, {
      name: '实际销售额',
      data: data.year[1],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#ed3f35'
      }
    }]
  };

  // 3. 把配置和数据给实例对象
  myChart.setOption(option);
  /*
   * tab栏切换
   */
  // 绑定事件
  $('.sales .caption').on("click", "a", function () {
    // 点击a标签后，一定要把它的索引赋值给自动切换时的index变量，不然先点击，然后等2s后自动切换时，会出现切换错误
    index = $(this).index() - 1;
    //之所以要减去1，是因为四个a标签前还有一个h3标签，所以索引号时从h3标签开始计算的
    $(this)
      .addClass('active')
      .siblings('a')
      .removeClass('active');
    console.log($(this));
    console.log(this);
    // 方法一： h5新增的获取自定义属性的方法，element.dataset.属性名，注意这里的属性名不加前面的data
    option.series[0].data = data[this.dataset.name][0];
    option.series[1].data = data[this.dataset.name][1];
    // option.series[0].data = data[$(this).data('name')][0];
    // option.series[1].data = data[$(this).data('name')][1];
    // 注意：上面this与$(this)两者的区别，前者是标签，后者是对象
    // 切记，重新设置数据  让图标重新渲染                  
    myChart.setOption(option);
  });
  // 设置定时器
  var index = 0;
  var timer = setInterval(() => {
    index++;
    if (index === 4) {
      index = 0;
    }
    $('.sales .caption a').eq(index).click();
  }, 2000);
  // 鼠标经过是关掉定时器，离开时又打开定时器，但注意，在打开前还是要先清除
  $('.sales').hover(function () {
    clearInterval(timer);
  }, function () {
    clearInterval(timer);
    timer = setInterval(() => {
      index++;
      if (index === 4) {
        index = 0;
      }
      $('.sales .caption a').eq(index).click();
    }, 2000);
  })
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 分布渠道模块
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".radar"));
  var option = {
    tooltip: {
      show: true,
      // 控制提示框组件的显示位置
      position: ['40%', '10%'],
      textStyle: {
        fontSize: "8"
      }
    },
    radar: {
      // 雷达图的指示器 内部填充数据
      indicator: [{
          name: '机场',
          max: 100
        },
        {
          name: '商场',
          max: 100
        },
        {
          name: '火车站',
          max: 100
        },
        {
          name: '汽车站',
          max: 100
        },
        {
          name: '地铁',
          max: 100
        }
      ],
      center: ['50%', '50%'],
      // 外半径占据容器大小
      radius: '60%',
      // 指示器轴的分割段数,相当于与有多少个圆圈
      splitNumber: 4,
      shape: "circle",
      name: {
        // 修饰雷达图文字的颜色
        textStyle: {
          color: '#4c9bfd',
          fontSize: '8'
        }
      },
      // 分割的圆圈的线条样式
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      splitArea: {
        show: false
      },
      // 坐标轴的轴线设置
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    },
    series: [{
      name: "渠道分布",
      type: "radar",
      // 填充区域的线条样式
      lineStyle: {
        normal: {
          color: '#fff',
          width: 1,
          opacity: 0.5
        }
      },
      data: [
        [90, 19, 56, 11, 34]
      ],
      // 设置图形标记，也就是拐点
      symbol: "circle",
      // 拐点的大小  
      symbolSize: 5,
      // 小圆点（拐点）设置为白色
      itemStyle: {
        color: '#fff'
      },
      // 在圆点上显示相关数据
      label: {
        show: true,
        color: '#fff',
        fontSize: 10
      },
      //修饰我们区域填充的背景样式
      areaStyle: {
        color: 'rgba(238, 197, 102, 0.6)',
      }
    }]
  };
  // 3.把配置和数据给对象
  myChart.setOption(option);
  // 4、当窗口缩小时，echart图标跟着放缩
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 销售模块 饼形图 半圆形 设置方式
(function () {
  var myChart = echarts.init(document.querySelector('.han'))
  var option = {
    series: [{
      name: "销售进度",
      type: "pie",
      // 放大图形
      radius: ['130%', '150%'],
      // 移动下位置  套住50%文字
      center: ['48%', '80%'],
      //是否启用防止标签重叠策略
      // avoidLabelOverlap: false,
      labelLine: {
        normal: {
          show: false
        }
      },
      // 起始角度，支持范围[0, 360]
      startAngle: 180,
      // 鼠标经过不变大
      hoverOffset: 0,
      data: [{
          value: 100,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                  offset: 0, // 0 起始颜色
                  color: "#00c9e0"
                },
                {
                  offset: 1, // 1 结束颜色
                  color: "#005fc1"
                }
              ]
            )
          }
        },
        {
          value: 100,
          itemStyle: {
            color: '#12274d'
          }
        },
        {
          value: 200,
          itemStyle: {
            // 透明隐藏第三块区域
            color: 'transparent'
          }
        }
      ]
    }]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  })
})();

// 热榜模块
(function () {
  // 1、第一步：得到后台数据（实际开发中，这个数据通过ajax请求获得）
  var hotData = [{
      city: '北京', // 城市
      sales: '25, 179', // 销售额
      flag: true, //  上升还是下降
      brands: [ //  品牌种类数据
        {
          name: '可爱多',
          num: '9,086',
          flag: true
        },
        {
          name: '娃哈哈',
          num: '8,341',
          flag: true
        },
        {
          name: '喜之郎',
          num: '7,407',
          flag: false
        },
        {
          name: '八喜',
          num: '6,080',
          flag: false
        },
        {
          name: '小洋人',
          num: '6,724',
          flag: false
        },
        {
          name: '好多鱼',
          num: '2,170',
          flag: true
        },
      ]
    },
    {
      city: '河北',
      sales: '23,252',
      flag: false,
      brands: [{
          name: '可爱多',
          num: '3,457',
          flag: false
        },
        {
          name: '娃哈哈',
          num: '2,124',
          flag: true
        },
        {
          name: '喜之郎',
          num: '8,907',
          flag: false
        },
        {
          name: '八喜',
          num: '6,080',
          flag: true
        },
        {
          name: '小洋人',
          num: '1,724',
          flag: false
        },
        {
          name: '好多鱼',
          num: '1,170',
          flag: false
        },
      ]
    },
    {
      city: '上海',
      sales: '20,760',
      flag: true,
      brands: [{
          name: '可爱多',
          num: '2,345',
          flag: true
        },
        {
          name: '娃哈哈',
          num: '7,109',
          flag: true
        },
        {
          name: '喜之郎',
          num: '3,701',
          flag: false
        },
        {
          name: '八喜',
          num: '6,080',
          flag: false
        },
        {
          name: '小洋人',
          num: '2,724',
          flag: false
        },
        {
          name: '好多鱼',
          num: '2,998',
          flag: true
        },
      ]
    },
    {
      city: '江苏',
      sales: '23,252',
      flag: false,
      brands: [{
          name: '可爱多',
          num: '2,156',
          flag: false
        },
        {
          name: '娃哈哈',
          num: '2,456',
          flag: true
        },
        {
          name: '喜之郎',
          num: '9,737',
          flag: true
        },
        {
          name: '八喜',
          num: '2,080',
          flag: true
        },
        {
          name: '小洋人',
          num: '8,724',
          flag: true
        },
        {
          name: '好多鱼',
          num: '1,770',
          flag: false
        },
      ]
    },
    {
      city: '山东',
      sales: '20,760',
      flag: true,
      brands: [{
          name: '可爱多',
          num: '9,567',
          flag: true
        },
        {
          name: '娃哈哈',
          num: '2,345',
          flag: false
        },
        {
          name: '喜之郎',
          num: '9,037',
          flag: false
        },
        {
          name: '八喜',
          num: '1,080',
          flag: true
        },
        {
          name: '小洋人',
          num: '4,724',
          flag: false
        },
        {
          name: '好多鱼',
          num: '9,999',
          flag: true
        },
      ]
    }
  ];
  //2、第二步：根据数据渲染各省热销 sup 模块内容
  //(1)删掉原先自带小li
  //(2)遍历数据 $.each() 
  var supHtml = "";
  $.each(hotData, function (index, item) {
    //(3)拼接字符串把数据渲染到 li 的span 里面
    supHtml += `<li>
                  <span>${item.city}</span>
                  <span>${item.sales} <s class=${item.flag ? "icon-up" : "icon-down"}></s></span>
                </li>`
  });
  //(4)追加给.sup 盒子
  $('.sup').html(supHtml);
  //3、第三步，当鼠标放上去后高亮显示

  $('.province .sup').on("mouseenter", "li", function () {
    render($(this));
  });
  //声明一个函数里面设置sup当前小i高亮还有对应的品牌对象渲染
  //这个函数需要传递当前元素进去
  function render(that) {
    that
      .addClass("active")
      .siblings()
      .removeClass("active");
    index = that.index();
    var tabHtml = '';
    var index1 = that.index();
    var brands = hotData[index1].brands;
    $.each(brands, function (index, item) {
      tabHtml += ` <li><span>${item.name}</span><span> ${item.num}<s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
    });
    $('.sub').html(tabHtml);
  };
  // 4、第四步：默认激活第一个tab
  var lis = $('.province .sup li');
  render(lis.eq(0));
  // 5、第五步：开启定时器
  var index = 0;
  var timer = setInterval(() => {
    index++;
    if (index >= 4) {
      index = 0;
    }
    render(lis.eq(index));
  }, 2000);
  // 6、第6步：当鼠标经过sup时停止自动切换，离开后又继续自动切换
  $('.province .sup').hover(function () {
    clearInterval(timer);
  }, function () {
    clearInterval(timer);
    timer = setInterval(() => {
      index++;
      if (index >= 4) {
        index = 0;
      }
      // 注意 这里的mouseenter与hover里面的mouseenter冲突了，所以会出现停止现象
      // $('.province .sup li').eq(index).mouseenter();
      // 解决办法：定时器里面不加mousenter事件而是直接重新渲染数据就可以(执行鼠标经过事件里面的代码)
      render(lis.eq(index));
    }, 2000);
  });
})();