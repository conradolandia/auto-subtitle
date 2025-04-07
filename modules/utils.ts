import tmp from 'tmp-promise';
import ffmpeg from 'fluent-ffmpeg';

export function filename(path: string): string {
  return path.split('/').pop()?.split('.').shift() || '';
}

export async function getAudio(paths: string[]): Promise<Record<string, string>> {
  const audioPaths: Record<string, string> = {};

  for (const path of paths) {
    console.log(`Extracting audio from ${filename(path)}...`);
    const outputFilePath = `${tmp.tmpNameSync()}.wav`;

    await new Promise<void>((resolve, reject) => {
      ffmpeg(path)
        .audioCodec('pcm_s16le')
        .audioChannels(1)
        .audioFrequency(16000)
        .on('error', err => reject(err))
        .on('end', () => resolve())
        .save(outputFilePath);
    });

    audioPaths[path] = outputFilePath;
  }
  console.log({ audioPaths });
  return audioPaths;
}
