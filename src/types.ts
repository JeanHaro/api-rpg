export type CharacterClass = 'Guerrero' | 'Mago' | 'Arquero';
export type CharacterStatus = 'activo' | 'muerto' | 'descansando';

export type Character = {
    id: number;
    name: string;
    class: CharacterClass;
    level: number;
    hp: number;
    maxHp: number;
    status: CharacterStatus;
    guild?: string;
    isAlive: () => boolean;
}

