import tmp from 'tmp-promise';
import { whisper } from 'whisper-node';
import { parseArgs } from './modules/argumentParser.ts';
import { addSubtitle, getSubtitles } from './modules/subtitleModule.ts';
import { filename, getAudio } from './modules/utils.ts';

interface WhisperOptions {
  modelName: string;
  whisperOptions: {
    language: string;
  };
}

async function main(): Promise<void> {
  const args = parseArgs();
  const audioPaths = await getAudio(args.video);
  const options: WhisperOptions = {
    modelName: args.model,
    whisperOptions: {
      language: args.language,
    },
  };

  const subtitles = await getSubtitles(
    audioPaths,
    args.output_srt || args.srt_only,
    args.output_dir,
    (audioPath: string) => {
      return whisper(audioPath, options);
    }
  );

  if (args.srt_only) {
    return;
  }

  for (const [path, srtPath] of Object.entries(subtitles)) {
    const outPath = `${tmp.tmpNameSync()}.mkv`;

    console.log(`Adding subtitles to '${filename(path)}'...`);

    addSubtitle(path, srtPath, outPath, args.subtitle_style);
  }
}

main().catch(error => {
  console.error('Error in main execution:', error);
  process.exit(1);
});
