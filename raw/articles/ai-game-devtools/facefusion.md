# FaceFusion — Industry Leading Face Manipulation Platform

**Source:** https://github.com/facefusion/facefusion (cloned via gitcode.com mirror)
**Date:** 2026-04-19
**License:** OpenRAIL-AS

## README Summary

> Industry leading face manipulation platform.

- Build Status: CI via GitHub Actions
- Coverage: Coveralls tracked
- License: OpenRAIL-AS (green badge)

## Installation

Technical skills required, not recommended for beginners.
Windows Installer and macOS Installer available for non-technical users.

## CLI Commands

```
python facefusion.py [commands] [options]

commands:
    run                  Run the program (UI mode)
    headless-run         Run in headless mode
    batch-run            Run in batch mode
    force-download       Force automated downloads and exit
    benchmark            Benchmark the program
    job-list             List jobs by status
    job-create           Create a drafted job
    job-submit           Submit a drafted job to become queued
    job-submit-all       Submit all drafted jobs
    job-delete           Delete a drafted/queued/failed/completed job
    job-delete-all       Delete all jobs
    job-add-step         Add a step to a drafted job
    job-remix-step       Remix a previous step from a drafted job
    job-insert-step      Insert a step to a drafted job
    job-remove-step      Remove a step from a drafted job
    job-run              Run a queued job
    job-run-all          Run all queued jobs
    job-retry            Retry a failed job
    job-retry-all        Retry all failed jobs
```

## Architecture

### Entry Point (`facefusion.py`)
- Sets OMP_NUM_THREADS=1
- Calls conda.setup() then core.cli()

### Core Module (`facefusion/core.py`)
- Python 3.10+ required
- CLI argument parsing via argparse
- Commands routing: benchmark, job management, run (UI), headless-run, batch-run, job-run
- Pre-checks: Python version, curl availability
- Memory limiting support
- Signal handling (SIGINT)

### Face Processing Pipeline
- **face_detector**: Detect faces in images/video frames
- **face_landmarker**: Extract facial landmarks
- **face_classifier**: Classify faces
- **face_masker**: Generate face masks
- **face_recognizer**: Face recognition/embedding
- **content_analyser**: Content safety analysis
- **voice_extractor**: Voice extraction from audio

### Processors (modular pipeline)
Located in `facefusion/processors/modules/`:
- **face_swapper**: Face swapping
- **face_enhancer**: Face quality enhancement
- **deep_swapper**: Deep learning face swap
- **lip_syncer**: Lip synchronization
- **expression_restorer**: Expression restoration
- **frame_colorizer**: Video frame colorization
- **age_modifier**: Age modification
- **background_remover**: Background removal

### Workflows
- **image_to_image**: Image-to-image transformation
- **image_to_video**: Image-to-video generation

### UI (Gradio-based)
Located in `facefusion/uis/`:
- Layouts: default, webcam, jobs, benchmark
- Components: face_detector, face_selector, face_masker, face_swapper_options, lip_syncer_options, expression_restorer_options, deep_swapper_options, age_modifier_options, frame_colorizer_options, background_remover_options, voice_extractor, preview, output, terminal, execution, webcam, job_manager, job_list, download, common_options, etc.

### Job System
- Draft → Queue → Run → Complete/Failed lifecycle
- Remix previous steps
- Batch job management

### Other Key Modules
- **execution**: Multi-execution backend support (CPU/GPU)
- **memory**: System memory limiting
- **download**: Conditional model/hash downloads
- **ffmpeg_builder**: FFmpeg command building
- **video_manager**: Video processing
- **audio**: Audio processing
- **streamer**: Streaming support
- **camera_manager**: Camera/webcam support
- **translator**: i18n localization
