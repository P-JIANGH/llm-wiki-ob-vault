# GameAISDK — 原始源

> 项目: Tencent/GameAISDK (aitest 平台)
> 克隆自: https://github.com/Tencent/GameAISDK
> 日期: 2026-04-15

## 概述

GameAISDK（aitest 平台）是腾讯开源的基于游戏图像开发游戏 AI 的工具包。支持跑酷类、吃鸡类、射击类、MOBA 类等游戏类型的自动化测试和 AI 训练。

## 核心架构

### 模块组成

- **AI Client**: 与手机端交互，获取游戏图像，并执行 UI 或 AI 输出的动作
- **IO 模块**: 与 AI Client 交互，作为 AI SDK 的数据输入输出控制
- **MC 模块**（ManageCenter）: 与 IO 模块交互，将数据分发至后端 UI 和 AI 模块，做业务逻辑管理控制
- **UI 模块**: 根据游戏图像识别需要进行的 UI 操作
- **GameReg 模块**: 根据游戏图像识别游戏场景内的数字、血条、目标物等元素
- **AI 模块**: 根据识别到的游戏元素，根据 AI 算法执行业务逻辑

### 技术栈

- 深度学习框架: TensorFlow
- 视觉库: OpenCV 3.4.2
- 通信协议: TBUS（腾讯内部 RPC 框架）
- 目标检测: YOLO（内置 RefineDet）
- 强化学习算法: DQN、IM（模仿学习）、RainBOW
- 支持平台: Ubuntu 14.04/16.04、Windows（需 VS2017）、macOS（Docker）

### 项目目录

```
gameAISDK/
├── src/           # 核心源码
│   ├── AgentAI/   # AI 智能体逻辑
│   ├── API/       # 对外 API
│   ├── ImgProc/   # 图像处理模块
│   ├── IOService/ # IO 服务
│   ├── ManageCenter/ # MC 模块
│   └── PlugIn/    # 插件扩展
├── Modules/       # 第三方模块
│   ├── darknetV3/ # YOLO 目标检测
│   ├── RefineDet/ # 目标检测
│   ├── opencv-3.4.2/
│   ├── protobuf/
│   └── tbus/      # 通信框架
├── cfg/           # 配置文件
├── bin/           # 编译产物
├── tools/         # 工具脚本
└── doc/           # 文档
```

## 主要功能

### 图像识别能力

- 固定位置物体识别（fix object）
- 形变物体识别（deform object）
- 数字识别（number）
- 血条识别（fix/deform blood）
- 像素值筛选（pixel）
- 卡住判断（stuck）
- UI 元素检测

### AI 算法

- **DQN**: 深度 Q 网络强化学习
- **IM（模仿学习）**: 录制样本 + 模仿学习
- **RainBOW**: 结合多种 RL 算法的优势

### SDKTool 配置工具

- UI 配置：配置游戏中需要点击的按钮和位置
- 场景识别配置：配置需要识别的游戏元素
- UI 自动探索：自动遍历游戏内所有 UI 界面

## 许可证

GPL v3（第三方组件另有 LICENSE）

## 相关链接

- 官网: https://aitest.qq.com/
- GitHub: https://github.com/Tencent/GameAISDK
