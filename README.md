# Automatic subtitles in your videos

This is a fork of the original [sepiropht's](https://github.com/sepiropht) [auto-subtitle](https://github.com/sepiropht/auto-subtitle), converted to TypeScript, divided into ESM modules and adapted to use bun instead of node. This repository uses `ffmpeg` and [OpenAI's Whisper](https://openai.com/blog/whisper) to automatically generate and overlay subtitles on any video.

## Requirements

- [Bun](https://bun.sh) runtime
- [FFmpeg](https://ffmpeg.org/)

### Installing FFmpeg

```bash
# on Ubuntu or Debian
sudo apt update && sudo apt install ffmpeg

# on MacOS using Homebrew (https://brew.sh/)
brew install ffmpeg

# on Windows using Chocolatey (https://chocolatey.org/)
choco install ffmpeg
```

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Install whisper model:
   ```bash
   bunx nodejs-whisper download
   ```

## Usage

The basic command to generate subtitles:

```bash
bun run index.ts /path/to/video.mp4 -o output/
```

### Available Options

- `--model`: Choose the Whisper model (default: 'small')
  Available models: `tiny`, `tiny.en`, `base`, `base.en`, `small`, `small.en`, `medium`, `medium.en`, `large`, `large-v1`
  ```bash
  bun run index.ts /path/to/video.mp4 --model medium
  ```

- `--language`: Specify the audio language (default: 'auto')
  ```bash
  bun run index.ts /path/to/video.mp4 --language ja
  ```

- `--task`: Choose between transcription or translation (default: 'transcribe')
  ```bash
  bun run index.ts /path/to/video.mp4 --task translate
  ```

- `--output_srt`: Generate .srt file alongside the video
  ```bash
  bun run index.ts /path/to/video.mp4 --output_srt
  ```

- `--srt_only`: Only generate the .srt file without creating video
  ```bash
  bun run index.ts /path/to/video.mp4 --srt_only
  ```

- `--subtitle_style`: Customize subtitle appearance
  ```bash
  bun run index.ts /path/to/video.mp4 --subtitle_style "FontSize=24,PrimaryColour=&HFFFFFF&"
  ```

## License

This project is open-source and licensed under the MIT License. For more details, check the [LICENSE](LICENSE) file.
