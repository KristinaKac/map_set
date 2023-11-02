export class Settings {
  constructor() {
    this.defaultMap = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]);
    this.map = new Map([
      ['theme', ['dark', 'light', 'gray']],
      ['music', ['trance', 'pop', 'rock', 'chillout', 'off']],
      ['difficulty', ['easy', 'normal', 'hard', 'nightmare']],
    ]);
    this.userMap = new Map();
  }

  get commonMap() {
    if (this.userMap.size === 0) {
      return Array.from(this.defaultMap);
    }
    for (const key of this.defaultMap.keys()) {
      if (!this.userMap.has(key)) {
        this.userMap.set(key, this.defaultMap.get(key));
      }
    }
    return Array.from(this.userMap);
  }

  setUserMap(key, value) {
    if (this.map.has(key)) {
      const values = this.map.get(key);
      if (values.includes(value)) {
        this.userMap.set(key, value);
      }
    }
  }
}
