import updateAudioQueue from 'types/updateAudioQueue'
import Song from 'types/song'


export type AudioQueueContextType = {
  audioQueue: Song[] | null;
  updateAudioQueue: updateAudioQueue;
};

export default AudioQueueContextType