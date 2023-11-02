import { Team } from '../js/Team';
import { Character } from '../js/Character';
import { ErrorRepository } from '../js/ErrorRepository';
import { Settings } from '../js/Settings';

test('testing method "add" from class Team (to show error)', () => {
  expect(() => {
    const member = new Team();
    const character = new Character('Ivan', 'Zombie');
    member.add(character);
    member.add(character);
  }).toThrowError('Такой персонаж уже существует');
});

test('testing method "addAll" from class Team (no show error)', () => {
  const member = new Team();
  const character = new Character('Ivan', 'Zombie');
  const character2 = new Character('Olga', 'Swordsman');
  const result = member.addAll(character, character2, character);
  expect(result).toBe();
});

test('testing method "toArray" from class Team', () => {
  const member = new Team();
  const character = new Character('Ivan', 'Zombie');
  const character2 = new Character('Olga', 'Swordsman');
  member.addAll(character, character2, character);
  const result = member.toArray();
  expect(result).toEqual(
    [{
      name: 'Ivan', type: 'Zombie', health: 100, level: 1, attack: undefined, defence: undefined,
    },
    {
      name: 'Olga', type: 'Swordsman', health: 100, level: 1, attack: undefined, defence: undefined,
    }],
  );
});

test('testing method "setUserMap" from class Settings (no show error)', () => {
  const settings = new Settings();
  const result = settings.setUserMap('music', 'off');
  expect(result).toBe();
});

test('testing method "setUserMap" from class Settings', () => {
  const settings = new Settings();
  const result = settings.setUserMap('music', 'off');
  expect(result).toBe();
});

test('testing getter "commonMap" from class Settings (user way)', () => {
  const settings = new Settings();
  settings.setUserMap('theme', 'blue');
  settings.setUserMap('difficulty', 'nightmare');
  const result = settings.commonMap;
  expect(result).toStrictEqual([['difficulty', 'nightmare'], ['theme', 'dark'], ['music', 'trance']]);
});

test('testing getter "commonMap" from class Settings (default way)', () => {
  const settings = new Settings();
  const result = settings.commonMap;
  expect(result).toStrictEqual([['theme', 'dark'], ['music', 'trance'], ['difficulty', 'easy']]);
});

test.each([
  [500, 'Internal Server Error'],
  [806, 'Unknown error'],
])('testing method "translate" from class ErrorRepository', (code, textCode) => {
  const error = new ErrorRepository();
  const result = error.translate(code);
  expect(result).toStrictEqual(textCode);
});

test.each([
  ['I', Character, 'Bowerman'],
  ['IvanPetrovich', Character, 'Bowerman'],
])('testing checkName - name: %s, object: %s, type: %s', (name, Player, type) => {
  expect(() => {
    const ivan = new Player(name, type);
    ivan.checkName();
  }).toThrowError('Количество символов должно быть от 2х до 10');
});

test('testing function - checkType', () => {
  expect(() => {
    const player = new Character('Ivan', 'Player');
  }).toThrowError('Должен быть один из типов: Bowerman, Swordsman, Magician, Daemon, Undead, Zombie');
});

test('testing error of function - levelUp for Character', () => {
  expect(() => {
    const ivan = new Character('Ivan', 'Zombie', 30, 40);
    ivan.health = -10;
    ivan.levelUp();
  }).toThrowError('Нельзя повысить левел умершего');
});

test.each([
  [Character, 'Bowerman'],
])('testing error of function - damage: %s', (Player, type) => {
  expect(() => {
    const ivan = new Player('Ivan', type);
    ivan.health = -10;
    ivan.damage();
  }).toThrowError('Игрок уже умер');
});

test('testing of function - damage for Character', () => {
  const ivan = new Character('Ivan', 'Zombie');
  const result = ivan.damage(30);
  expect(result).toBe();
});

test('testing of function - levelUp for Character', () => {
  const ivan = new Character('Ivan', 'Daemon');
  const result = ivan.levelUp();
  expect(result).toEqual();
});
