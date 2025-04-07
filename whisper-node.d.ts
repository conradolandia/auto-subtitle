declare module 'whisper-node' {
  export function whisper(
    audioPath: string, 
    options: {
      modelName: string;
      whisperOptions: {
        language: string;
      };
    }
  ): Promise<Array<{
    start: string;
    end: string;
    speech: string;
  }>>;
} 
