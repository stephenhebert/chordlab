let audioContext = null;
let mainGainNode = null;
let activeSources = [];
let sampleLibrary = {}

let initialized = false;

enum Instrument {
  ACOUSTIC_GUITAR = 'acoustic-guitar',
  PIANO = 'piano',
}

function initialize() {
  initialized = true;

  audioContext = new AudioContext();

  mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.gain.value = 1;

}

function stopAll() {
  const currentSources = [ ...activeSources ]
  while (currentSources.length) {
    currentSources.shift().stop();
  }
}

async function playSample(url) {

  if (!initialized) {
    initialize();
  }

  const audioElement = new Audio(url);
  audioElement.play();
  activeSources.push(audioElement);
  audioElement.onended = () => {
    audioElement.remove();
  }

  // TODO: convert url to media stream

  // You can also use the Web Audio API to directly generate and manipulate
  // audio streams from JavaScript code rather than streaming pre-existing
  // audio files. You can set the srcObject in JavaScript to a MediaStream
  // object. This is commonly used for live audio streams or real-time audio
  // processing.

  // https://stackoverflow.com/questions/40314457/audiobuffers-getchanneldata-equivalent-for-mediastream-or-mediastreamaudio
  // ChannelSplitterNode to split the audio stream into separate channels,
  // and then use a ScriptProcessorNode to access the raw audio data.

  // failed attempt below
  // const audio = new Audio();
  // const audioBuffer = await fetch(url)
  //   .then(res => res.arrayBuffer())
  //   .then(ArrayBuffer => audioContext.decodeAudioData(ArrayBuffer));
  // audio.srcObject = audioBuffer;
  // audio.play();
  // audio.onended = () => {
  //   audio.remove();
  // }

  // this doesn't work on iPhone with silent switch
  // const source = audioContext.createBufferSource();
  // const audioBuffer = await fetch(url)
  //   .then(res => res.arrayBuffer())
  //   .then(ArrayBuffer => audioContext.decodeAudioData(ArrayBuffer));

  // source.buffer = audioBuffer;
  // source.connect(audioContext.destination);
  // source.start();
  // activeSources.push(source);
  // source.onended = () => {
  //   activeSources = activeSources.filter(s => s !== source);
  // }

  // console.log(`Playing sample ${url}`, audioBuffer);
  // how does strum machine do it?


}

async function playNote(note: string, instrument = Instrument.ACOUSTIC_GUITAR) {

  if (!initialized) {
    initialize();
  }

  // const url = `https://awiclass.monoame.com/pianosound/set/${instrument}/${note}.mp3`;
  const noteFileName = note.includes('#') ? note.replace('#', '').concat('s') : note;
  if (!sampleLibrary[instrument]) sampleLibrary[instrument] = {};
  if (!sampleLibrary[instrument][noteFileName]) {
    sampleLibrary[instrument][noteFileName] = (await import(`../assets/samples/${instrument}/${noteFileName}.mp3`)).default
  }
  playSample(sampleLibrary[instrument][noteFileName])
}

export {
  stopAll,
  playSample,
  playNote,
}