/**
 * Word Document (.doc / .docx compatible HTML-Word) generator for Minecraft English learning manual.
 * Formatted specifically for standard A4 portrait printing and Microsoft Word / WPS Office / Google Docs rendering.
 * Fully structured from initial user registration, character creation, daily learning loop to advanced modules.
 */

export const exportLearningManualToWord = () => {
  const title = 'Minecraft English 全功能学习操作手册 (A4标准排版版)';
  
  const htmlContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${title}</title>
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page Section1 {
    size: 595.3pt 841.9pt; /* A4 standard: 210mm x 297mm */
    margin: 54.0pt 54.0pt 54.0pt 54.0pt; /* Top Right Bottom Left margins: ~1.9cm */
    mso-header-margin: 35.4pt;
    mso-footer-margin: 35.4pt;
    mso-paper-source: 0;
  }
  div.Section1 {
    page: Section1;
  }
  body {
    font-family: "Microsoft YaHei", "微软雅黑", "Segoe UI", Arial, sans-serif;
    line-height: 1.65;
    color: #2D3748;
    background-color: #ffffff;
    font-size: 10.5pt;
  }
  .cover-page {
    text-align: center;
    padding-top: 40pt;
    padding-bottom: 30pt;
    page-break-after: always;
  }
  .cover-badge {
    display: inline-block;
    background-color: #38A169;
    color: #ffffff;
    font-size: 11pt;
    font-weight: bold;
    padding: 4pt 14pt;
    border-radius: 20pt;
    margin-bottom: 20pt;
    text-transform: uppercase;
    letter-spacing: 1pt;
  }
  .cover-title {
    color: #1C4532;
    font-size: 26pt;
    font-weight: 800;
    line-height: 1.3;
    margin: 15pt 0 10pt 0;
  }
  .cover-subtitle {
    color: #4A5568;
    font-size: 13pt;
    font-weight: 500;
    margin-bottom: 35pt;
  }
  .cover-meta-table {
    width: 80%;
    margin: 40pt auto 0 auto;
    border-collapse: collapse;
    font-size: 10.5pt;
  }
  .cover-meta-table td {
    padding: 8pt 12pt;
    border: none;
    border-bottom: 1pt solid #E2E8F0;
  }
  .cover-meta-label {
    font-weight: bold;
    color: #2D3748;
    width: 35%;
    text-align: right;
  }
  .cover-meta-val {
    color: #4A5568;
    text-align: left;
  }
  .page-break {
    page-break-before: always;
  }
  h1 {
    color: #1C4532;
    font-size: 16pt;
    font-weight: bold;
    border-bottom: 2pt solid #38A169;
    padding-bottom: 5pt;
    margin-top: 24pt;
    margin-bottom: 12pt;
  }
  h2 {
    color: #1A365D;
    font-size: 13pt;
    font-weight: bold;
    border-left: 4.5pt solid #3182CE;
    padding-left: 8pt;
    margin-top: 18pt;
    margin-bottom: 10pt;
    background-color: #EBF8FF;
    padding-top: 4pt;
    padding-bottom: 4pt;
  }
  h3 {
    color: #2F855A;
    font-size: 11.5pt;
    font-weight: bold;
    margin-top: 14pt;
    margin-bottom: 6pt;
    border-bottom: 1pt dashed #CBD5E0;
    padding-bottom: 3pt;
  }
  p {
    margin: 5pt 0;
    text-align: justify;
    text-justify: inter-ideograph;
  }
  ul, ol {
    margin: 4pt 0 10pt 18pt;
    padding-left: 0;
  }
  li {
    margin-bottom: 4pt;
  }
  .callout-box {
    background-color: #F0FFF4;
    border: 1pt solid #9AE6B4;
    border-left: 4.5pt solid #38A169;
    padding: 10pt 14pt;
    border-radius: 4pt;
    margin: 12pt 0;
  }
  .callout-box-amber {
    background-color: #FFFAF0;
    border: 1pt solid #FBD38D;
    border-left: 4.5pt solid #DD6B20;
    padding: 10pt 14pt;
    border-radius: 4pt;
    margin: 12pt 0;
  }
  .callout-box-blue {
    background-color: #EBF8FF;
    border: 1pt solid #BEE3F8;
    border-left: 4.5pt solid #3182CE;
    padding: 10pt 14pt;
    border-radius: 4pt;
    margin: 12pt 0;
  }
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 9.5pt;
  }
  table.data-table th {
    background-color: #2F855A;
    color: #ffffff;
    font-weight: bold;
    padding: 6pt 8pt;
    border: 1pt solid #276749;
    text-align: left;
  }
  table.data-table td {
    padding: 6pt 8pt;
    border: 1pt solid #CBD5E0;
  }
  table.data-table tr:nth-child(even) td {
    background-color: #F7FAFC;
  }
  .toc {
    background-color: #F7FAFC;
    border: 1pt solid #E2E8F0;
    padding: 14pt 20pt;
    margin: 15pt 0 25pt 0;
    border-radius: 6pt;
  }
  .toc-title {
    font-weight: bold;
    color: #2D3748;
    font-size: 13pt;
    margin-bottom: 10pt;
    border-bottom: 1.5pt solid #CBD5E0;
    padding-bottom: 4pt;
  }
  .toc-item {
    font-size: 10.5pt;
    margin: 4pt 0;
    color: #2B6CB0;
  }
  .step-num {
    display: inline-block;
    width: 18pt;
    height: 18pt;
    line-height: 18pt;
    text-align: center;
    border-radius: 50%;
    background-color: #38A169;
    color: white;
    font-weight: bold;
    font-size: 9pt;
    margin-right: 5pt;
  }
  .footer-text {
    font-size: 9pt;
    color: #718096;
    text-align: center;
    border-top: 1pt solid #E2E8F0;
    padding-top: 10pt;
    margin-top: 30pt;
  }
</style>
</head>
<body>
<div class="Section1">

<!-- 封面 -->
<div class="cover-page">
  <div class="cover-badge">★ 官方正式版 • A4 教研标准操作手册 ★</div>
  <div class="cover-title">Minecraft English<br>全功能学习操作与实战指南手册</div>
  <div class="cover-subtitle">从账号注册、角色创建到高阶口语对练的全流程保姆级指引</div>
  
  <div style="height: 40pt;"></div>
  
  <table class="cover-meta-table">
    <tr>
      <td class="cover-meta-label">适用对象：</td>
      <td class="cover-meta-val">6~15 岁青少年学员、零基础英语爱好者、伴学家长及教研老师</td>
    </tr>
    <tr>
      <td class="cover-meta-label">核心体系：</td>
      <td class="cover-meta-val">英国经典《新概念英语》全册 + Minecraft 沉浸世界观</td>
    </tr>
    <tr>
      <td class="cover-meta-label">教学理论：</td>
      <td class="cover-meta-val">二语习得理论 (SLA) • 三遍精听法 • 空间积木语法</td>
    </tr>
    <tr>
      <td class="cover-meta-label">版本编号：</td>
      <td class="cover-meta-val">Version 2.5 (A4 打印优化版)</td>
    </tr>
    <tr>
      <td class="cover-meta-label">云端同步：</td>
      <td class="cover-meta-val">支持 PC / 手机 / iPad / 平板电脑全端跨设备漫游</td>
    </tr>
  </table>
</div>

<!-- 目录 -->
<div class="toc">
  <div class="toc-title">📑 目录导航 (Table of Contents)</div>
  <div class="toc-item"><strong>第一章：新用户起步（账号注册、角色创建与跨端云同步）</strong></div>
  <div class="toc-item"><strong>第二章：界面总览与新手快速导航</strong></div>
  <div class="toc-item"><strong>第三章：核心 4 步科学学习闭环（每天 20 分钟黄金法）</strong></div>
  <div class="toc-item"><strong>第四章：沉浸磨耳朵电台深度操作（三遍精听与 Zen 禅意盲听）</strong></div>
  <div class="toc-item"><strong>第五章：144 关新概念场景闯关与 AI 语音测评</strong></div>
  <div class="toc-item"><strong>第六章：3x3 语法合成工坊与怪物擂台（空间排砖法）</strong></div>
  <div class="toc-item"><strong>第七章：Alex 1V1 AI 外教导师听后说实战对练</strong></div>
  <div class="toc-item"><strong>第八章：生词本与艾宾浩斯抗遗忘记忆库</strong></div>
  <div class="toc-item"><strong>第九章：🛡️ 家长护航中心与专属 PIN 码门禁</strong></div>
  <div class="toc-item"><strong>第十章：常见问题解答与多端排错指南 (FAQ)</strong></div>
</div>

<div class="page-break"></div>

<!-- 第一章 -->
<h1>第一章：新用户起步（账号注册、角色创建与云同步）</h1>

<p>欢迎来到 Minecraft English 探险世界！为了确保学习记录（通关星级、生词掌握、绿宝石与红石等级）永久保存且在不同设备（电脑、手机、iPad）间无缝切换，请按照以下步骤完成首次注册。</p>

<h2>1.1 首次进入与账号注册流程</h2>
<ol>
  <li><strong>访问应用：</strong>打开浏览器进入应用首页。</li>
  <li><strong>点击右上角「用户头像 / 登录」按钮：</strong>若当前未登录，系统会显示默认探险者头像。点击即可唤起<strong>「用户注册与登录通行证」</strong>弹窗。</li>
  <li><strong>填写注册信息：</strong>
    <ul>
      <li><strong>探险者昵称 (Nickname)：</strong>例如 "Steve_Master" 或孩子的英文名。</li>
      <li><strong>电子邮箱 / 账号 (Email)：</strong>填写家长的常用邮箱（用作唯一账号标识及找回密码凭据）。</li>
      <li><strong>设置登录密码 (Password)：</strong>建议设置 6 位以上字母与数字组合。</li>
    </ul>
  </li>
  <li><strong>选择初始角色形象：</strong>系统提供经典 <strong>Steve (史蒂夫)</strong>、<strong>Alex (爱丽克斯)</strong> 以及专属探险家皮肤，点击选中后点击<strong>「立即注册并踏上旅程」</strong>。</li>
  <li><strong>领取新手启航大礼包：</strong>首次注册成功即可直接获赠 <strong>50 颗绿宝石 ❇️</strong> 与 <strong>1 级红石能量</strong>！</li>
</ol>

<div class="callout-box">
  <strong>【多设备免丢失提示】</strong><br>
  平台底层深度对接云端数据库。只要在任意新设备（如家里的 iPad 或外出时的手机）登录同一个邮箱账号，所有关卡得分、收藏的生词卡、错题本与绿宝石资产均会毫秒级自动拉取同步，绝不丢失数据！
</div>

<h2>1.2 音频权限与设备环境准备</h2>
<ul>
  <li><strong>扬声器与音量：</strong>请确保设备未处于静音模式，音量调整至 50%~70%。</li>
  <li><strong>麦克风授权：</strong>在首次进入口语闯关或与 Alex 对练时，浏览器会弹出<em>「是否允许使用麦克风」</em>提示，请务必点击<strong>「允许」</strong>。</li>
  <li><strong>移动端声音激活：</strong>由于 iOS (Safari) 和 Android 系统的自动播放限制，进入页面后<strong>点击任意按钮或顶部音效开关</strong>，即可瞬间激活音频通道。</li>
</ul>

<!-- 第二章 -->
<h1>第二章：界面总览与新手快速导航</h1>

<p>应用界面采用清爽、高对比度的 Minecraft 原生像素方块美学，功能布局直观高效：</p>

<h2>2.1 顶部状态栏 (Top App Bar)</h2>
<ul>
  <li><strong>💎 绿宝石余额 (Emeralds)：</strong>显示当前通过朗读、背词、闯关、与 Alex 对话累积的激励资产，可在商城兑换虚拟皮肤与徽章。</li>
  <li><strong>⚡ 红石经验等级 (Redstone Level)：</strong>记录综合学习时长与积分，等级越高，解锁的探险头衔越高级。</li>
  <li><strong>🔊 音效/背景乐快捷开关：</strong>一键静音或开启方块音效。</li>
  <li><strong>📖 指南手册图标：</strong>随时点击可调出此操作手册并支持一键导出 Word 文档。</li>
  <li><strong>🛡️ 家长中心入口：</strong>安全护航与学情分析面板（受 PIN 码保护）。</li>
</ul>

<h2>2.2 底部/主控导航功能区</h2>
<table class="data-table">
  <thead>
    <tr>
      <th style="width: 25%;">模块名称</th>
      <th style="width: 20%;">核心入口图标</th>
      <th style="width: 55%;">主要功能说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>📻 磨耳朵电台</strong></td>
      <td>Radio / 唱片机</td>
      <td>三遍精听法、课文磨耳朵、MC 原创冒险短剧、Zen 盲听模式。</td>
    </tr>
    <tr>
      <td><strong>🗺️ 关卡探险地图</strong></td>
      <td>Map / 罗盘</td>
      <td>144 关新概念课文闯关、重点句型精讲、AI 口语跟读打分。</td>
    </tr>
    <tr>
      <td><strong>🔨 3x3 语法工坊</strong></td>
      <td>Crafting Table</td>
      <td>将抽象语法转化为方块拖拽排砖，掌握主谓宾与陈述疑问句序。</td>
    </tr>
    <tr>
      <td><strong>👩‍🦰 Alex 1V1 导师</strong></td>
      <td>Alex Avatar</td>
      <td>听后说对练闭环、情景式口语交流、智能温柔纠错、慢速带读。</td>
    </tr>
    <tr>
      <td><strong>📦 词汇宝典</strong></td>
      <td>Chest / 宝箱</td>
      <td>艾宾浩斯抗遗忘单词库、发音拼写测试、一键生词归档。</td>
    </tr>
  </tbody>
</table>

<div class="page-break"></div>

<!-- 第三章 -->
<h1>第三章：核心 4 步科学学习闭环（每天 20 分钟黄金法）</h1>

<p>平台严格遵循语言学<strong>「二语习得理论（SLA）」</strong>与克拉申<strong>「i+1 可理解性输入」</strong>法则，打造了一套不可逆的科学四步学习闭环。建议学员每日坚持 15~25 分钟：</p>

<table class="data-table">
  <thead>
    <tr>
      <th style="width: 12%;">步骤</th>
      <th style="width: 22%;">对应核心模块</th>
      <th style="width: 44%;">学习目标与认知原理</th>
      <th style="width: 22%;">建议用时</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><span class="step-num">1</span><strong>输入</strong></td>
      <td><strong>📻 沉浸磨耳朵电台</strong></td>
      <td>三遍精听法（音律盲听 ➔ 慢速释义 ➔ 影子跟读），建立大脑听觉反射区。</td>
      <td>5 ~ 8 分钟</td>
    </tr>
    <tr>
      <td><span class="step-num">2</span><strong>探险</strong></td>
      <td><strong>🗺️ 关卡探险地图</strong></td>
      <td>144 关新概念场景闯关，核心句型剖析、双语词义辨析与 AI 发音测评。</td>
      <td>6 ~ 10 分钟</td>
    </tr>
    <tr>
      <td><span class="step-num">3</span><strong>内化</strong></td>
      <td><strong>🔨 3x3 语法合成工坊</strong></td>
      <td>将抽象语法转化为方块空间拖拽排砖，攻克主谓宾、冠词与疑问句序。</td>
      <td>3 ~ 5 分钟</td>
    </tr>
    <tr>
      <td><span class="step-num">4</span><strong>输出</strong></td>
      <td><strong>👩‍🦰 Alex 1V1 听后说对练</strong></td>
      <td>连线专属 AI 外教 Alex，针对所学课文开展情景提问与开放对谈。</td>
      <td>4 ~ 6 分钟</td>
    </tr>
  </tbody>
</table>

<!-- 第四章 -->
<h1>第四章：沉浸磨耳朵电台深度操作（三遍精听与 Zen 禅意盲听）</h1>

<p>磨耳朵电台是本系统的核心听力引擎，彻底解决孩子「只看不听、辨音困难」的哑巴英语问题。</p>

<h2>4.1 「三遍精听法」标准执行流程</h2>
<div class="callout-box-blue">
  <ol>
    <li><strong>第 1 遍【全英文原速 • 音律盲听感知】：</strong><br>
    系统以 1.0x 标准美音播读。学员不看字幕或闭上眼睛，专注于单词连读、失爆、弱读与升降调节奏，激活大脑听觉皮层。</li>
    <li><strong>第 2 遍【0.85x 慢速精听 • 中英对照剖析】：</strong><br>
    系统自动切换为 0.85x 慢速带读并显示中文释义，扫清生词障碍与句型结构盲点，理清每个单词的词性与语义。</li>
    <li><strong>第 3 遍【标准原速 • 影子跟读 (Shadowing) + 回音间隔】：</strong><br>
    播放原声并在播完后留出 2~3 秒「回音倒计时槽」，引导学员大声模仿原声的语音语调，强化发音肌肉记忆。</li>
  </ol>
</div>

<h2>4.2 频道选择与播放模式控制</h2>
<ul>
  <li><strong>课文磨耳朵频道：</strong>包含新概念英语全册精品课文（如 Lesson 1 Excuse me!），支持单课精听、最近 5 课循环复盘、一键搜索课程。</li>
  <li><strong>MC 原创探险故事频道：</strong>包含《矿洞中的红石谜题》《下界要塞的呼唤》等深度英文短剧，配有火把、开矿、脚步声等逼真音效。</li>
  <li><strong>Zen 纯粹禅意全屏模式：</strong>点击唱片机右上方<strong>「Zen 沉浸」</strong>按钮，界面将隐藏一切繁杂按钮，仅保留黑胶唱片与动态音波，提供极致纯粹的盲听环境；若遇到听不懂的句子，可点击<strong>「偷看字幕」</strong>临时唤起对照。</li>
  <li><strong>连读标注 (Prosody Linking)：</strong>点击连读开关，系统会智能高亮辅音连缀、连读弧线与失爆音标（如 <em>pick‿it‿up</em>）。</li>
</ul>

<div class="page-break"></div>

<!-- 第五章 -->
<h1>第五章：144 关新概念场景闯关与 AI 语音测评</h1>

<p>地图将新概念英语经典课文解构为 144 个由浅入深的探险关卡，结合 Minecraft 地形（主世界平原、幽暗矿洞、下界要塞、末地祭坛）。</p>

<h2>5.1 单关学习三部曲</h2>
<ol>
  <li><strong>情境剧场 (Scene Brief)：</strong>查看本关 Minecraft 背景剧情（如史蒂夫在村庄寻找失落的皮包）。</li>
  <li><strong>核心句型与生词拆解：</strong>点击每个英文单词均可实时发音并查看音标、词性与生词本添加按钮。</li>
  <li><strong>AI 麦克风录音跟读测评：</strong>
    <ul>
      <li>点击绿色<strong>「🎙️ 按住/点击录音」</strong>按钮，大声朗读屏幕中的目标英文句子。</li>
      <li>系统结合语音识别模型，从<strong>发音准确度 (Accuracy)</strong>、<strong>流利度 (Fluency)</strong> 与<strong>完整度 (Completeness)</strong> 三大维度实时打分（0~100 分）。</li>
      <li>得分 <strong>≥80 分</strong>判定为三星完美通关，爆出璀璨绿色粒子特效并奖励 <strong>+15~30 颗绿宝石 ❇️</strong>！</li>
    </ul>
  </li>
</ol>

<!-- 第六章 -->
<h1>第六章：3x3 语法合成工坊与怪物擂台（空间排砖法）</h1>

<div class="callout-box-amber">
  <strong>【具象化语法教学创新】</strong><br>
  传统英语语法枯燥抽象，孩子容易混淆语序。平台创新性将英语句子结构具象化为 Minecraft 经典的 <strong>3x3 合成工作台</strong>！
</div>

<h2>6.1 3x3 工作台排砖拼句规则</h2>
<ul>
  <li><strong>方块分类：</strong>名词（木块）、动词（铁块）、形容词（金块）、代词与介词（红石块/青金石块）。</li>
  <li><strong>拖拽排砖：</strong>学员需将备选栏中的单词方块，按正确英语语序（主语 + 谓语 + 宾语 / Be 动词疑问前置）拖拽放入 3x3 槽位。</li>
  <li><strong>物理自动复位机制：</strong>若语序错误，系统会发出“砰”的一声方块碎裂音效，<strong>错误方块自动弹回备选槽</strong>，引导孩子在安全的沙盒试错中自我顿悟语法规则。</li>
</ul>

<h2>6.2 怪物英语擂台 (斩击 Boss 挑战)</h2>
<p>在限时模式下迎战夜间出没的僵尸、苦力怕与末影龙：</p>
<ul>
  <li>怪物身上带有英文词汇或语法残卷，学员需在倒计时内选出正确的中文释义或连词完成斩击。</li>
  <li>连续答对可触发<strong>「钻石剑连击暴击」</strong>，通关即可获取稀有下界合金装备与高额经验值！</li>
</ul>

<!-- 第七章 -->
<h1>第七章：Alex 1V1 AI 外教导师听后说实战对练</h1>

<p>Alex 是常驻 Minecraft 英语村庄的专属 AI 导师，拥有敏锐的教学启发能力：</p>

<h2>7.1 听后说联动闭环 (Listen & Speak Loop)</h2>
<ul>
  <li>在磨耳朵电台听完故事后，点击卡片下方的<strong>「👩‍🦰 连线 Alex 聊聊刚才的故事」</strong>。</li>
  <li>Alex 会自动同步刚才的故事背景，并主动向学员提问（例如：<em>"Hi! What happened to Steve in the dark cave?"</em>）。</li>
  <li>学员点击麦克风直接用英语回答；Alex 会根据学员的回答展开 2~4 轮自然延伸探讨。完成对练即可结算 <strong>+5 绿宝石</strong> 奖励。</li>
</ul>

<h2>7.2 智能辅助与温柔纠错特性</h2>
<ul>
  <li><strong>0.7x 慢速带读喇叭：</strong>若没听清 Alex 的提问，点击消息旁的慢速喇叭，Alex 会以 0.7x 极清晰慢速逐词重放。</li>
  <li><strong>大字投影卡片：</strong>点击放大按钮可全屏显示当前对话句子，便于低龄学员认读。</li>
  <li><strong>非惩罚性温柔纠错：</strong>若学员漏掉冠词（如说了 "I see pig"），Alex 不会直接判定失败，而是微笑回应：<em>"Awesome! You mean 'I see a pig', right? What color is it?"</em>，在肯定孩子表达欲望的同时潜移默化纠正语法。</li>
</ul>

<div class="page-break"></div>

<!-- 第八章 -->
<h1>第八章：生词本与艾宾浩斯抗遗忘记忆库</h1>

<h2>8.1 词汇收录与状态分类</h2>
<ul>
  <li><strong>生词沉淀：</strong>在任何关卡、课文、电台或 Alex 对话中，长按或点击带有下划线的单词，点击<strong>「⭐ 收入生词本」</strong>。</li>
  <li><strong>艾宾浩斯抗遗忘轮次：</strong>系统根据学员的点击与答错频次，将生词智能划分为：
    <ol>
      <li><strong>需巩固生词 (New & Review)</strong></li>
      <li><strong>掌握中词汇 (Learning)</strong></li>
      <li><strong>已永久掌握 (Mastered)</strong></li>
    </ol>
  </li>
</ul>

<h2>8.2 词汇挑战考核</h2>
<p>在词汇宝典中可随时开启<strong>「听音辨词」</strong>与<strong>「方块拼写测试」</strong>。通过测试的生词方块将点亮金色附魔光效，晋升为熟词！</p>

<!-- 第九章 -->
<h1>第九章：🛡️ 家长护航中心与专属 PIN 码门禁</h1>

<p>家长护航中心为家长提供了全方位的孩子用眼健康保护、学情追踪与多维度发音诊断分析：</p>

<h2>9.1 专属 4 位安全 PIN 码（防误触）</h2>
<ul>
  <li>系统淘汰了容易被孩子破解的简单加减法，采用<strong>家长自定义 4 位数字 PIN 码</strong>。</li>
  <li>首次进入时由家长设定独立密码；若遗忘密码，提供<strong>成人常识问答双重备份验证</strong>。</li>
</ul>

<h2>9.2 护眼防沉迷黑屏与时长控制</h2>
<ul>
  <li>家长可设定单次连续使用时长限制（如 <strong>15 分钟 / 20 分钟 / 30 分钟</strong>）。</li>
  <li>当倒计时结束时，屏幕会自动进入全屏<strong>「护眼休息黑屏模式」</strong>，播放舒缓白噪音并提示孩子离开屏幕、远眺绿色植物，保护视力健康。</li>
</ul>

<h2>9.3 6 维发音雷达与一键学情报告</h2>
<ul>
  <li>系统从 <strong>咬舌音 [θ]/[ð]</strong>、<strong>卷舌音 [r]</strong>、<strong>长短元音辨析</strong>、<strong>尾音失爆</strong>、<strong>声调起伏</strong> 与 <strong>连续流利度</strong> 6 大维度绘制动态雷达图。</li>
  <li>支持一键点击<strong>「📋 复制今日学情周报」</strong>，生成包含当日学习时长、跟读得分、新增生词数的结构化文字，方便直接粘贴至微信/家校沟通群。</li>
</ul>

<!-- 第十章 -->
<h1>第十章：常见问题解答与多端排错指南 (FAQ)</h1>

<div class="callout-box">
  <p><strong>Q1: 在 iPad 或 iPhone Safari 浏览器中点击播放没有声音，怎么办？</strong><br>
  <strong>答：</strong>这是苹果 iOS 系统的安全静音保护机制。进入页面后，只需<strong>轻点一下屏幕任意按钮（或顶部的音量喇叭开关）</strong>，即可唤醒系统的音频引擎，恢复正常声音与音效。</p>

  <p><strong>Q2: 孩子说话声音小，麦克风识别不准或报错怎么办？</strong><br>
  <strong>答：</strong>
  1. 请检查浏览器地址栏左侧的<strong>「网站设置」</strong>，确保麦克风权限已设为<strong>「允许」</strong>；<br>
  2. 建议使用安静房间，离设备麦克风约 15~20 厘米，大声自信朗读；<br>
  3. 若在嘈杂环境下，可切换为「软键盘输入」模式。</p>

  <p><strong>Q3: 如何将家里电脑上的学习进度同步到出行的手机上？</strong><br>
  <strong>答：</strong>在两台设备上登录<strong>同一个注册邮箱账号</strong>即可。平台基于实时云端数据库架构，所有关卡星级、绿宝石数和生词本均会自动实时同步。</p>

  <p><strong>Q4: 离线或者在高铁/飞机等弱网环境下可以使用吗？</strong><br>
  <strong>答：</strong>可以！平台内置了高保真 Web Speech 本地语音离线引擎，即使没有网络信号，基础课文朗读、生词本查阅与 3x3 语法排砖均可离线流畅运行。</p>
</div>

<div class="footer-text">
  Minecraft English 官方教研团队 编写 • 遵循 A4 打印与装订标准规范 • 建议使用 Microsoft Word / WPS Office 打开或双面打印
</div>

</div>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Minecraft_English_A4全功能学习操作手册.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

