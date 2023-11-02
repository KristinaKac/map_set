export class Character {
  constructor(name, type) {
    const players = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];

    if (name.length < 2 || name.length > 10) {
      throw new Error('Количество символов должно быть от 2х до 10');
    }

    if (!players.includes(type)) {
      throw new Error(`Должен быть один из типов: ${players.join(', ')}`);
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
  }

  levelUp() {
    if (this.health <= 0) {
      throw new Error('Нельзя повысить левел умершего');
    }
    this.level += 1;
    this.attack = (this.attack * 120) / 100;
    this.defence = (this.defence * 120) / 100;
    this.health = 100;
  }

  damage(points) {
    if (this.health <= 0) {
      throw new Error('Игрок уже умер');
    }
    this.health -= points * (1 - this.defence / 100);
  }
}
