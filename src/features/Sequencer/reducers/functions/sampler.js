import * as Tone from 'tone';
import { HOST, NETWORK_TIMEOUT } from '../../../../network';
import * as defaultKits from '../../defaults/defaultKits';

export const disposeSamplers = (kit) => {
  for (let sample of kit.samples) {
    sample.sampler?.dispose();
    delete sample.sampler;
    sample.channel?.dispose();
    delete sample.channel;
  }
  kit.samples.length = 0;
};

export const buildSamplers = (kit, sequenceKitName) =>
  new Promise(async (resolve, reject) => {
    const promises = [];
    const defaultKit = defaultKits[sequenceKitName];
    for (let [i, sample] of defaultKit.samples.entries()) {
      kit.samples[i] = {
        ...defaultKit.samples,
        samples: defaultKit.samples.map((sample) => ({ ...sample })),
      };
      const sampleUrl = HOST + '/kits/' + sample.path;
      promises.push(
        new Promise((resolveSample) => {
          kit.samples[i].sampler = new Tone.Sampler({
            urls: {
              C2: sampleUrl,
            },
            onload: () => {
              kit.samples[i].channel = new Tone.Channel({
                volume: 0,
                pan: 0,
                channelCount: 2,
              }).toDestination();
              kit.samples[i].sampler.connect(kit.samples[i].channel);
              resolveSample();
            },
          });
        })
      );
    }
    try {
      let rejectTimer = setTimeout(
        () => reject('error loading samples'),
        NETWORK_TIMEOUT
      );
      await Promise.all(promises);
      clearTimeout(rejectTimer);
      kit.name = sequenceKitName;
      console.log(`${kit.name} buffers loaded!`);
      resolve();
    } catch (e) {
      reject('error loading samples');
    }
  });

export const triggerStep = (time, step, samples) => {
  for (const [sample, { noteOn, notes }] of Object.entries(step)) {
    if (noteOn) {
      let slice = notes.length;
      samples[sample].sampler.triggerAttackRelease(
        notes[0].pitch,
        notes[0].length,
        time,
        notes[0].velocity
      );
      if (slice === 2) {
        samples[sample].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32n'),
          notes[1].velocity
        );
      } else if (slice === 3) {
        samples[sample].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32t'),
          notes[1].velocity
        );
        samples[sample].sampler.triggerAttackRelease(
          notes[2].pitch,
          notes[2].length,
          time + Tone.Time('32t') + Tone.Time('32t'),
          notes[2].velocity
        );
      }
    }
  }
};