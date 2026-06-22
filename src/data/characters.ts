import { Character } from "../types";

export const characters: Character[] = [
    {
        id: 1,
        name: 'Guerrero',
        class: 'Guerrero',
        level: 1,
        hp: 0,
        maxHp: 100,
        status: 'muerto',
        guild: 'Guerreritos',
        isAlive() {
            return this.hp > 0;
        }
    },
    {
        id: 2, 
        name: 'Mago',
        class: 'Mago',
        level: 2,
        hp: 50,
        maxHp: 100,
        status: 'descansando',
        isAlive() {
            return this.hp > 0;
        }
    },
    {
        id: 3, 
        name: 'Arquero',
        class: 'Arquero',
        level: 3,
        hp: 80,
        maxHp: 100,
        status: 'activo',
        isAlive() {
            return this.hp > 0;
        }
    },
    {
        id: 4, 
        name: 'Arquero 2',
        class: 'Arquero',
        level: 4,
        hp: 100,
        maxHp: 100,
        status: 'descansando',
        guild: 'Arqueritos',
        isAlive() {
            return this.hp > 0;
        }
    }
];