/* =========================================================
   项目数据 —— 新增项目时，直接在数组末尾追加一个对象即可
   ---------------------------------------------------------
   字段说明：
   name      项目名称（必填）
   category  类别标签，如：移动应用 / Web应用 / AI应用 / 数据可视化（必填）
   color     类别色块：orange | blue | gold（必填）
   intro     项目简介（必填）
   stack     技术栈数组，页面以「/」连接展示（必填）
   date      完成时间，格式 YYYY.MM（必填）
   role      担任角色（可选）
   image     项目配图地址（必填）
   imageAlt  配图替代文本（必填）
   link      项目详情链接，暂无页面可先填 "#"（必填）

   说明：数组第一项会作为「精选项目」通栏展示（编号 01），
        其余项目自动按 02 起递增编号，并在三种杂志式版式间
        交替轮换（大图居左 / 文字居左 / 通栏横幅），无需改样式。
        建议按完成时间从新到旧排列。
   ========================================================= */

const PROJECTS = [
  {
    name: "轻记账",
    category: "移动应用",
    color: "orange",
    intro: "一款面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2026.09",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minimalist%20bookkeeping%20mini%20program%20UI%20mockup%2C%20two%20floating%20smartphone%20screens%20showing%20expense%20list%20and%20monthly%20budget%20chart%2C%20voice%20input%20button%2C%20warm%20cream%20background%2C%20soft%20shadows%2C%20vermilion%20orange%20accent%2C%20editorial%20magazine%20style%2C%20high%20quality%20render&image_size=landscape_16_9",
    imageAlt: "轻记账微信小程序界面展示图",
    link: "#"
  },
  {
    name: "拾光集市",
    category: "Web应用",
    color: "blue",
    intro: "一个面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2026.09",
    role: "独立完成",
    // 本地 SVG 界面示意图（在线生图服务当时卡在「生成中」占位图）。
    // 如需换回 AI 生成图或真实截图，替换下面 image 地址即可，原在线地址：
    // https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Second-hand%20trading%20platform%20web%20interface%20on%20a%20laptop%2C%20campus%20flea%20market%20online%20store%2C%20masonry%20grid%20of%20secondhand%20goods%20cards%2C%20books%20bicycle%20lamp%20with%20price%20labels%2C%20warm%20cream%20and%20orange%20palette%2C%20soft%20studio%20light%2C%20editorial%20photography%20style&image_size=landscape_16_9
    image: "images/shiguang-market.svg",
    imageAlt: "拾光集市校园二手交易平台界面展示图",
    link: "#"
  },
  {
    name: "课语通",
    category: "AI应用",
    color: "gold",
    intro: "一个基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    date: "2026.07",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20course%20question%20answering%20assistant%20web%20app%20UI%2C%20chat%20interface%20with%20document%20upload%20and%20citations%2C%20quiz%20cards%2C%20warm%20paper%20tone%20background%2C%20minimal%20editorial%20style%2C%20floating%20browser%20window%20mockup&image_size=landscape_4_3",
    imageAlt: "课语通课程问答助手界面展示图",
    link: "#"
  },
  {
    name: "城市脉搏",
    category: "数据可视化",
    color: "blue",
    intro: "一个城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    stack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026.03",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=City%20real-time%20traffic%20and%20weather%20data%20visualization%20big%20screen%2C%20dark%20blue%20dashboard%20with%20maps%2C%20particle%20flow%20and%20charts%2C%20glowing%20data%20panels%2C%20modern%20control%20room%20display%2C%20editorial%20photography&image_size=landscape_16_9",
    imageAlt: "城市脉搏数据可视化大屏展示图",
    link: "#"
  }
];
