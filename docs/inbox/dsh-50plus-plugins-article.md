---
title: "扒了市场上 6254 个插件，梳理出我常用的 50+ 效率插件"
author: 苏茶 (@Suercha007)
url: https://x.com/Suercha007/status/2112791503278125329
article_url: https://x.com/i/article/2112786740834652160
published: 2026-10-21
fetched_at: 2026-10-22
---

# 扒了市场上 6254 个插件，梳理出我常用的 50+ 效率插件

> 用 DeepSeek 的这段时间，我把整个插件市场翻了个底朝天：数了数市面上足足有 **6254 个插件**，能留下来的，不多。
> 我筛选的标准只有三条：
>
> 1. **我真的会反复用**——不是尝鲜，是真的一天要打开好几次的那种
> 2. **数据安全可控**——本地优先，代码开源能审计，敏感操作有开关
> 3. **不能拖慢主进程**——资源占用高的、动不动假死的，统统 pass
>
> 按这个标准筛下来，还剩下 57 个，我按功能分了 7 类，每个都附了下载量和一句话点评，可以直接抄作业。
> 先贴两个总入口：
>
> - **插件收录仓库**：<https://github.com/awesome-dsh-plugin/awesome-dsh-plugin>
> - **插件市场**：<https://github.com/dsh-market/dsh-market>（也在做自己的站点 <https://dsh-market.com>，还收录了 awesome-dsh-plugin 的 6254 个插件数据 <https://awesome-dsh-plugin.com>）

开始正文，大家也可以把这篇文章当成 DSH 插件的中文索引手册。

## 一、记忆/上下文管理类

这类插件解决的是"AI 记不住事"的问题，尤其是新开会话时上下文丢失、要反复交代背景的痛点。

### 1. billion-context（5k+ 下载）

一句话：简单暴力，把上下文聊天的内容直接写进提示词，效果最好，可以单独制定任务，就是费token，整体逻辑简单效果好。

主页：<https://github.com/ranxianglei/billion-context>

### 2. dsh-archive-manager（6.7k+ 下载）

一句话：上下文自动归档+搜索，新开会话不抓瞎。

主页：<https://github.com/MichengAI/dsh-archive-manager>

### 3. dsh-context（1.9k+ 下载）

一句话：多智能体共享记忆，团队协作场景很顶。

主页：<https://github.com/bowenliang123/dsh-context>

### 4. hindsight#coding-agents

一句话：真正的"情景记忆"，海马体记忆管理，唯一缺点是非商用协议（CC BY-NC-SA）。

主页：<https://github.com/vectorize-io/hindsight/tree/main/hindsight-integrations/coding-agents>

### 5. dsh-mnemon

一句话：分享的作者使用了独特的记忆压缩策略，主打记忆 token 压缩，类似 zip 思路，省 token。

主页：<https://github.com/omdsh-dev/dsh-mnemon>

### 6. OpenViking memory（4k+ 下载）

一句话：火山引擎出品，标准记忆系统，操作习惯和 jujube 类似。

主页：<https://github.com/volcengine/OpenViking/tree/main/examples/dsh-memory-plugin>

### 7. dsh-memory

一句话：轻量级的记忆管理，上手简单，开箱即用。

主页：<https://github.com/FuRongJun-1999/dsh-memory>

### 8. dsh-rewind

一句话：类似 Mac 的 rewind，可以回溯历史所有对话，后悔药。

主页：<https://github.com/SiriLee/dsh-rewind>

## 二、UI 增强类

### 1. dsh-codex-ui

一句话：数据看板，算力信息、订阅状态、日志监控，一站式。

主页：<https://github.com/MichengAI/dsh-codex-ui>

### 2. DSH-better-sidebar（6.9k+ 下载）

一句话：侧边栏管理增强，细节控的最爱，主要是管理子代理，实时查看子代理状态。

主页：<https://github.com/omdsh-dev/DSH-better-sidebar>

### 3. DeepSeek-Balance-Whale-Widget（9.3k+ 下载）

一句话：会游动的鲸鱼余额挂件，挂机党狂喜，余额不足会提醒。

主页：<https://github.com/MeteorNOX/DeepSeek-Balance-Whale-Widget>

### 4. dsh-skills-manager

一句话：技能管理器，类似的还有吴烜的 skill_manager（其实这两个可以看做一个东西）。

主页：<https://github.com/MichengAI/dsh-skills-manager>

### 5. dsh-skill-explorer

一句话：技能市场，一键安装 community 技能，不用自己去 github 翻了。

主页：<https://github.com/zhu1090093659/dsh-web/tree/main/packages/dsh-skill-explorer>

## 三、桌宠/陪伴类

### 1. dsh-pet（1.9k+ 下载）

一句话：桌宠插件的开山鼻祖，萌系担当。

主页：<https://github.com/zhu1090093659/dsh-pet>

### 2. dsh-web-all（3.7k+ 下载）

一句话：功能最全的桌宠，也是目前最强的桌宠插件，注意这个插件的原理是远程 web UI，所以第一次加载会略慢。

主页：<https://github.com/zhu1090093659/dsh-web/tree/main/packages/dsh-web-all>

### 3. dsh-pet（1.2k+ 下载）PC2005版

一句话：皮肤超多，社区活跃，持续更新。

主页：<https://github.com/PC2005-cloud/dsh-pet/tree/main/dsh-pet>

### 4. dsh-codex-pet（1.4k+ 下载）

一句话：这个是 im 通讯软件的桌宠版本，能用即时通讯软件看到桌宠状态。

主页：<https://github.com/MichengAI/dsh-codex-pet>

## 四、皮肤/美化类

### 1. dsh-wallpaper-engine（2.2k+ 下载）

一句话：壁纸引擎，每天换壁纸，工作心情 +1。

主页：<https://github.com/elysia395/dsh-wallpaper-engine>

### 2. dsh-TUI

一句话：复古终端风，程序员审美。

主页：<https://github.com/ccch1mneyyy/dsh-TUI>

### 3. maid-atelier

一句话：深海女仆工坊，量娘皮肤制作工厂。

主页：<https://github.com/Small-tailqwq/dsh-deep-whale/tree/main/maid-atelier>

### 4. dsh-genui（7.3k+ 下载）

一句话：通用 UI 渲染引擎，各类 UI 插件的前置依赖，因为下载量包含作为依赖被自动下载。

主页：<https://github.com/omdsh-dev/dsh-genui>

### 5. dsh-dream-skin

一句话：定制主题/皮肤，风格优雅，还免费。

主页：<https://github.com/RevolutionLA/dsh-dream-skin>

### 6. dsh-claude-style

一句话：界面复刻，风格迁移，习惯其它软件 UI 的可以试。

主页：<https://github.com/Nwflower/dsh-claude-style>

## 五、效率工具类

### 1. dsh-agency-agents

一句话：DeepResearch 风格的多智能体并行，任务拆解自动执行。

主页：<https://github.com/MichengAI/dsh-agency-agents>

### 2. dsh-task-board

一句话：任务看板，可以直接看板编辑任务，拖拽排序。

主页：<https://github.com/zhu1090093659/dsh-web/tree/main/packages/dsh-task-board>

### 3. dsh-git-graph

一句话：可视化 Git 工作流，分支合并一目了然。

主页：<https://github.com/zhu1090093659/dsh-web/tree/main/packages/dsh-git-graph>

### 4. dsh-cost-meter

一句话：实时看花费，随时看余额，防止刷爆卡。

主页：<https://github.com/Han-1413141/dsh-cost-meter>

### 5. dsh-automation

一句话：自动确认弹窗 + 自动发送，挂机党最爱的两个功能，解放双手。

主页：<https://github.com/MichengAI/dsh-automation>

### 6. dsh-btw

一句话：弥补 DSH 没有的 vta（打字时 AI 提示词自动联想补全），建议用小模型。搭配 zhile 的 deepseek-free 的 API key 食用更佳。

主页：<https://github.com/MichengAI/dsh-btw>

### 7. dsh-simplify

一句话：可以极大程度简化界面元素，只保留核心对话功能，极简主义狂喜。

主页：<https://github.com/MichengAI/dsh-simplify>

### 8. dsh-pua

一句话：锐评插件，会以尖锐的口吻点评你的代码，疑似作者被老板 pua 后的产物。

主页：<https://github.com/MichengAI/dsh-pua>

### 9. dsh-code-review

一句话：多智能体代码评审，能模拟架构师、安全工程师、测试工程师等角色互相辩论，质量高于单模型 review。

主页：<https://github.com/MichengAI/dsh-code-review>

### 10. dsh-univer-office（2.1k+ 下载）

一句话：Univer 出品，直接在对话中处理 Office 文档，表格文档 ppt 全覆盖。

主页：<https://github.com/dream-num/dsh-univer-office>

### 11. dsh-agent-teams

一句话：类似 codex 平台的 agents 功能，1 分钟搭一个自己的团队，自定义团队成员。

主页：<https://github.com/NanmiCoder/dsh-agent-teams>

### 12. lunheng-article-pipeline

一句话：论文（文章）工业化流水线，为写论文场景准备。

主页：<https://github.com/zuoyunlai/lunheng-article-pipeline-dsh>

### 13. GraphFlow

一句话：可视化代码结构与调用关系的图谱，交互很流畅。

主页：<https://github.com/Roarpeng/GraphFlow>

### 14. archify

一句话：think 分层架构提取工具，可视化 sub agent 的思维链，读取.think.log 文件。

主页：<https://github.com/tt-a1i/archify/tree/main/integrations/deepseek-harness>

### 15. dsh-image-gen（1.1k+ 下载）

一句话：图像生成插件，接入完整的 MJ 绘画能力，支持文生图、图生图、局部重绘。

主页：<https://github.com/shanliuling/dsh-image-gen>

### 16. dsh-ops

一句话：远程服务器管理运维工具。

主页：<https://github.com/T-Auto/dsh-ops>

### 17. dsh-plugin-gating-hub

一句话：插件流量阈值管理，防止 API 挥霍，防止熊孩子刷爆你的 key。

主页：<https://github.com/Noob-stupid/dsh-plugin-gating-hub>

### 18. dsh-code-review（feng版）

一句话：AI 代码评审增强，实时分析代码变更，自动生成评审意见，风格类似 feng 版 code-review。

主页：<https://github.com/f-e-n-g-0531/dsh-code-review>

## 六、远程/连接类

### 1. dsh-remote-web-ui（2.4k+ 下载）

一句话：远程 UI 控制，躺在床上用手机也能操控电脑上的 deepseek。

主页：<https://github.com/zhu1090093659/dsh-web/tree/main/packages/dsh-remote-web-ui>

### 2. dsh-im-connect

一句话：把 DSH 接入各类即时通讯软件，飞书、微信、Telegram 全都能接。

主页：<https://github.com/MichengAI/dsh-im-connect>

### 3. dsh-ssh

一句话：SSH 远程连接管理，直连服务器，不配置 anything 的前提。

主页：<https://github.com/zhu1090093659/dsh-web/tree/main/packages/dsh-ssh>

### 4. dsh-im

一句话：类 IM 软件的聊天体验，气泡消息框。

主页：<https://github.com/xmanrui/dsh-im>

### 5. BrowserSkill（4.6k+ 下载）

一句话：腾讯出品，浏览器操作技能库，网页自动化利器。

主页：<https://github.com/Tencent/BrowserSkill/tree/main/packages/dsh-plugin-browserskill>

### 6. dsh-codex-subscription

一句话：订阅管理器，账单到期提醒，自动续费管理。

主页：<https://github.com/WSL043/dsh-codex-subscription>

## 七、模型/搜索类

### 1. dsh-mcp-connector

一句话：MCP 连接管理器，统一管理所有 MCP 服务器。

主页：<https://github.com/duhu2000/dsh-mcp-connector>

### 2. dsh-find-plugin

一句话：在 DSH 里面寻找插件，然后一键安装，好插件找不到的痛点被解决。

主页：<https://github.com/awesome-dsh-plugin/dsh-find-plugin>

### 3. dsh-connect-workbuddy

一句话：接入 workbuddy 服务器，打通和 workbuddy 的连接，deepseek 也能用上 workbuddy 的 MCP。

主页：<https://github.com/dingminhua/dsh-connect-workbuddy>

### 4. dsh-browser

一句话：浏览器集成工具，ai 时代浏览器全自动操作，自动记忆 password。

主页：<https://github.com/wqty123/dsh-browser>

### 5. dsh-wsl

一句话：Windows 的 WSL 集成，自动转换命令。

主页：<https://github.com/XINY11451/dsh-wsl>

### 6. modlens

一句话：模型信息透视，显示当前模型负载，数据来自垃圾信息中转站，这些站点模型的负载很有参考价值。

主页：<https://github.com/liustack/modlens>

### 7. cc-safety-net

一句话：安全网插件，核心操作前自动确认，高危命令拦截，老手保平安，新手防翻车。

主页：<https://github.com/kenryu42/cc-safety-net>

### 8. dsh-free-search

一句话：免费联网搜索，白嫖党的春天，集成搜索能力。

主页：<https://github.com/DDDMUC/dsh-free-search>

### 9. modsearch

一句话：模型试用，切换模型生成结果，不用切换会话。

主页：<https://github.com/liustack/modsearch>

### 10. dsh-vision-router

一句话：图像理解路由，自动切换视觉模型，看图任务不用手动选。

主页：<https://github.com/ysr666/dsh-vision-router>

## 结尾：一点点感悟

插件再多，不如趁手的三五个。这篇盘点不是"全家桶教程"，而是帮你省去试错时间的筛选器。我的建议：

1. **先把记忆/上下文类配好**——这是一切效率的基础
2. **UI 增强按需加**——侧边栏、余额挂件这类，装了就回不去
3. **桌宠皮肤是爱好，不是刚需**——开心最重要
4. **效率工具贵在精**——多智能体和 code-review 选一个用透就够
5. **连接类看场景**——远程办公、多端同步党再加

最后，插件生态能这么繁荣，离不开每一个开源作者的用爱发电。如果你用到了好插件，去仓库点个 Star，就是对他们最好的支持。

插件机制科普：DeepSeek 的插件放在 `~/.dsh/plugins/` 下，每个子目录一个插件，包含 `settings.json`（插件配置）和若干子目录（`agents`、`commands`、`skills` 等）。

希望这篇盘点能帮你少走弯路，把 DeepSeek 打造成真正的效率神器。

---

*苏茶，公众号：苏茶成长记，感谢阅读。*
