# Baichuan-13B — AI 游戏开发工具源文件

> 来源：https://github.com/baichuan-inc/Baichuan-13B
> 克隆时间：2026-04-13
> 许可：Apache 2.0（代码）+ Baichuan-13B 社区许可协议（模型，可免费商用，邮件申请）

## 基本信息

- **发布方**：百川智能（Baichuan Intelligence）
- **发布时间**：2023-08-01
- **参数量**：130 亿（13B）
- **训练数据**：1.4 万亿 tokens（超过 LLaMA-13B 40%）
- **语种**：中英双语
- **位置编码**：ALiBi（线性偏置），上下文窗口 4096
- **词表大小**：64,000
- **架构**：Transformer，隐藏层维度 5120，40 层，40 注意力头

## 核心文件

- `README.md` / `README_EN.md` — 使用文档
- `cli_demo.py` — 命令行对话 Demo
- `web_demo.py` — Streamlit 网页 Demo
- `requirements.txt` — 依赖（transformers、streamlit、cpm_kernels 等）

## Benchmark 表现

| Benchmark | Baichuan-13B-Base | Baichuan-13B-Chat |
|-----------|:-----------------:|:-----------------:|
| C-Eval    | 52.4              | 51.5              |
| MMLU      | 51.6              | 52.1              |
| CMMLU     | 55.3              | 55.8              |

全面超越同尺寸 LLaMA-13B、Vicuna-13B、Chinese-Alpaca-Plus-13B 等开源模型。

## 推理性能

ALiBi 位置编码减少计算量，相比 LLaMA-13B 推理速度提升 **31.6%**（tokens/s: 25.4 vs 19.4，A100 实测）。

## 量化支持

| 精度   | GPU 显存 |
|--------|:--------:|
| bf16/fp16 | 26.0 GB |
| int8     | 15.8 GB |
| int4     | 9.7 GB  |

int4 量化后可部署在 NVIDIA RTX 3090 等消费级显卡。

## 许可证说明

- 代码：Apache 2.0（可商用）
- 模型：需邮件申请许可（opensource@baichuan-inc.com），免费商用
- 衍生模型同样需联系许可方

## 与 Baichuan-7B 的关系

Baichuan-13B 是 Baichuan-7B 的升级版，参数量从 7B 增至 13B，训练数据从 1.2 万亿增至 1.4 万亿。Baichuan-7B 使用 RoPE 位置编码，Baichuan-13B 改用 ALiBi 以提升推理速度。

## 依赖

```
accelerate
colorama
cpm_kernels
sentencepiece
streamlit
transformers_stream_generator
```
