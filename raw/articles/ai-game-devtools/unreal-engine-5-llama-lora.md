# Unreal Engine 5 Llama LoRA — Raw Source

**Source:** https://github.com/bublint/ue5-llama-lora (gitcode.com mirror)
**Cloned:** 2026-04-14
**License:** MIT

## README.md

### Project Description
A proof of concept for using natural language processing (NLP) to create a documentation assistant that can intelligently respond to user queries. Specifically, the author webscraped all of Unreal Engine 5.1's documentation into a single text file to use as a dataset for finetuning Meta's llama-7b in oobabooga's text generation webui. The author believes that locally hosted and trained LoRAs have the potential to be an interesting alternative to OpenAI API calls and vector databases for building context-aware assistants to help with niche tasks and information.

### How to Replicate
Requires oobabooga's text generation webui (the stable-diffusion-webui equivalent for locally running and training LLMs). On Windows, the new one-click installer is helpful. 

**Base model used:** Llama-7b loaded in 8bit mode. Other models may also work.

**Training data:** Place `unreal_docs.txt` in `text-generation-webui/training/datasets`, then configure training tab with settings shown in `assets/TrainingSettings.PNG`. Training took roughly 8 hours on a 3090 Ti.

### Training Data Stats
- Loss chart: `assets/LossChart.png`
- Learning rate chart: `assets/LearningRateChart.png`

### Results
Comparison of Base Llama7b vs ue5-llama-lora vs ChatGPT:
- Base Llama 7b: cannot provide information about UE5 or its new features
- ue5-llama-lora: generates high quality responses derived from UE 5.1 documentation
- ChatGPT: familiar with Nanite (announced before Sep 2021 training cutoff) but fails on Mass Avoidance (experimental newer feature)

### Limitations and Future Improvements
- Language model prone to hallucinations — can make up details
- Could improve with a UE5-tailored character yaml file for better prompting control
- Dataset could be formatted as instruction > response JSON like Stanford's Alpaca for more control through prompting
- Webscraping script implementation is poor (used Selenium with 10s sleep per page); takes very long to parse

### License: MIT

### Acknowledgements
- oobabooga's text generation webui
- Stanford's Alpaca research
- mcmonkey4eva (contributed training tab code in text-generation-webui)

---

## webscraping/getunrealenginedocumentation.py

**Dependencies:** requests, BeautifulSoup, selenium, Firefox webdriver

**Key details:**
- Uses Selenium Firefox headless to fetch pages (10 second sleep per page)
- Parses HTML via BeautifulSoup, extracts `<div id="maincol">` then all `<p>`, `<h1>`, `<h2>`, `<h3>` tags
- Writes concatenated text to `unreal_docs.txt`
- Logs to `unreal_docs.log`

**Note from author:** Script implementation is poor — overly cautious with Selenium for dynamically loaded content. Takes extremely long to run.

---

## File Structure
```
ue5-llama-lora/
├── README.md
├── LICENSE (MIT)
├── unreal_docs.txt           # Web-scraped UE 5.1 docs (training dataset)
├── assets/
│   ├── BaseLlama7b.PNG       # Base model response screenshot
│   ├── ChatGPT.PNG           # ChatGPT response screenshot
│   ├── ue5Lora.PNG           # LoRA-augmented response screenshot
│   ├── TrainingSettings.PNG  # text-generation-webui training settings
│   ├── LossChart.png         # Training loss over time
│   └── LearningRateChart.png # Learning rate over time
└── webscraping/
    ├── getunrealenginedocumentation.py
    └── urls.txt              # List of UE5 doc page URLs
```
