# Behaviac - 腾讯游戏AI行为框架

## 基本信息
- **项目名**: Behaviac
- **GitHub**: https://github.com/Tencent/behaviac
- **最新版本**: 3.6.39
- **许可证**: BSD 3-Clause
- **开发方**: 腾讯（THL A29 Limited）
- **最后更新**: 2017年9月

## 项目概述

Behaviac 是腾讯开源的游戏AI开发框架，也是游戏原型的快速设计工具。核心定位是**游戏AI的行为树/状态机编辑器+运行时**。

## 支持的AI范式

1. **行为树（Behavior Tree, BT）** - 主要范式
2. **状态机（Finite State Machine, FSM）**
3. **层次任务网络（Hierarchical Task Network, HTN）**

## 架构组成

### 目录结构
```
behaviac/
├── inc/           # 头文件（behaviac/agent, beveriac/behaviortree, beveriac/fsm, beveriac/htn, beveriac/network, beveriac/property）
├── src/           # 源码（对应模块实现）
├── tools/         # 编辑器工具
├── tutorials/     # 教程
├── docs/          # 文档
├── integration/   # 集成相关（Unity等）
├── projects/      # 各平台项目文件
├── build/         # 构建相关
├── test/          # 测试
└── version.txt    # 版本号
```

### 核心模块
- **agent** - Agent（智能体）定义，AI实体的基类
- **behaviortree** - 行为树节点和执行器
- **fsm** - 状态机实现
- **htn** - 层次任务网络
- **network** - 网络同步（多人游戏AI同步）
- **property** - 属性系统（AI状态变量）

## 编辑器与运行时

- **编辑器**: 仅支持 Windows 平台（BehaviacSetup*.exe 安装包）
- **运行时**: C++ 和 C# 两个版本
- **目标平台**: Windows, Linux, Android, iOS, Unity 等全平台
- **工作流**: 编辑器设计 → 导出行为文件 → 游戏运行时加载执行
- **调试**: 支持实时调试和离线调试

## 应用场景

- **C++ 版本**: 适用于客户端和服务器端（游戏服务端AI）
- **适用游戏类型**: 几乎所有需要AI的游戏（RPG、NPC、策略游戏等）

## 技术特点

- 支持热重载（Hot Reload）行为文件
- 元数据驱动代码生成
- 多种平台适配（PC/移动/主机）
- 行为树编辑器可视化编辑
- 支持并行（Parallel）节点、概率选择器等高级节点类型

## 版本历史

最新版本 3.6.39（2017-09-11），主要更新：
- 添加 End 节点
- 修复方法参数导出 Struct 的 bug

项目从2015年持续维护到2017年，版本从1.x演进到3.6.x。

## 参考链接

- 官方网站: http://www.behaviac.com/
- GitHub: https://github.com/Tencent/behaviac
- QQ群: 433547396
