import fs from 'fs';
import path from 'path';
import tmp from 'tmp-promise';
import ffmpeg from 'fluent-ffmpeg';
import { filename } from './utils.ts';

interface WhisperSegment {
  start: string;
  end: string;
  speech: string;
}

export function addSubtitle(
  inputPath: string,
  subtitlePath: string,
  outputPath: string,
  style: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        `-vf subtitles=${subtitlePath}:force_style='${style}'`,
      ])
      .on('error', (err) => reject(err))
      .on('end', () => resolve())
      .save(outputPath);
  });
}

export async function getSubtitles(
  audioPaths: Record<string, string>,
  outputSrt: boolean,
  outputDir: string,
  transcribe: (audioPath: string) => Promise<WhisperSegment[]>
): Promise<Record<string, string>> {
  const subtitlesPath: Record<string, string> = {};

  if (outputSrt) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [path, audioPath] of Object.entries(audioPaths)) {
    const srtPath = outputSrt
      ? `${outputDir}${filename(path)}.srt`
      : `${tmp.tmpNameSync()}.srt`;

    console.log(
      `Generating subtitles for ${filename(path)}... This might take a while.`
    );

    const result = await transcribe(audioPath);
    console.log(`Transcription completed for ${filename(path)}`);

    fs.writeFileSync(
      srtPath,
      result
        .map(
          (segment, index) =>
            `${index + 1}\n${segment.start} --> ${segment.end}\n${
              segment.speech
            }\n`
        )
        .join('\n')
    );

    subtitlesPath[path] = srtPath;
  }
  console.log(subtitlesPath);
  return subtitlesPath;
}
