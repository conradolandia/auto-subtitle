import { ArgumentParser } from 'argparse';
import { languages } from './langs.ts';

interface Args {
  video: string[];
  model: string;
  output_dir: string;
  output_srt: boolean;
  srt_only: boolean;
  verbose: boolean;
  task: 'transcribe' | 'translate';
  language: string;
  subtitle_style: string;
}

export function parseArgs(): Args {
  const parser = new ArgumentParser({
    description: 'Automatically generate subtitles for videos using Whisper and FFmpeg',
  });

  parser.add_argument('video', {
    nargs: '+',
    type: String,
    help: 'absolute paths to video files to transcribe',
  });

  parser.add_argument('--model', {
    default: 'small',
    choices: [
      `tiny`,
      `tiny.en`,
      `base`,
      `base.en`,
      `small`,
      `small.en`,
      `medium`,
      `medium.en`,
      `large-v1`,
    ],
    help: 'name of the Whisper model to use',
  });

  parser.add_argument('--output_dir', '-o', {
    type: String,
    default: '.',
    help: 'absolute path of directory to save the outputs',
  });

  parser.add_argument('--output_srt', {
    action: 'store_true',
    help: 'whether to output the .srt file along with the video files',
  });

  parser.add_argument('--srt_only', {
    action: 'store_true',
    help: 'only generate the .srt file and not create overlayed video',
  });

  parser.add_argument('--verbose', {
    action: 'store_true',
    help: 'whether to print out the progress and debug messages',
  });

  parser.add_argument('--task', {
    type: String,
    default: 'transcribe',
    choices: ['transcribe', 'translate'],
    help: "whether to perform X->X speech recognition ('transcribe') or X->English translation ('translate')",
  });

  parser.add_argument('--language', {
    type: String,
    default: 'auto',
    choices: languages,
  });

  parser.add_argument('--subtitle_style', {
    type: String,
    help: 'style of the subtitles to be added to the video',
    default: 'OutlineColour=&H40000000,BorderStyle=3',
  });

  return parser.parse_args() as Args;
}
