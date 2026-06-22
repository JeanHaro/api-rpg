import { Character, CharacterClass } from '../types';

// Obtener información de los personajes
export const getInfo = ( char: Character ): string => {
    return `[${char.name}] | [${char.class}] | Nivel [${char.level}] | HP: [${char.hp}/${char.maxHp}]`;
}

// Obtener personajes vivos
export const getAliveCharacters = ( chars: Character[] ): Character[] => {
    return chars.filter( char => char.isAlive() )
}

// Obtener personajes por clase
export const getByClass = ( chars: Character[], charClass: CharacterClass ): Character[] => {
    return chars.filter( char => char.class === charClass);
}

// Buscar el personaje por ID
export const findById = ( chars: Character[], id: number ): Character | undefined => {
    return chars.find(char => char.id === id);
}

// Crear - retorna el nuevo personaje
// Omit, ahí le decimos que obtenemos todas las propiedades de Character, pero omite id y isAlive para editarlas
export const createCharacter = ( 
    chars: Character[], 
    data: Omit<Character, 'id' | 'isAlive'> 
): Character => {
    const newCharacter: Character = {
        ...data,
        id: chars.length === 0 ? 1 : Math.max(...chars.map( r => r.id )) + 1,
        isAlive() {
            return this.hp > 0;
        }
    };

    chars.push(newCharacter);

    return newCharacter;
}

// Actualizar - retorna el personaje actualizado o undefined si no existe
// Partial<...> - Lo mismo pero todas las propiedades son opcionales
// Object.assign - Muta el objeto directamente, copia solo las propiedades que llegaron en data sobre el objeto que está existiendo, si mandan solo hp, solo se cambia el valpr de hp
export const updateCharacter = ( 
    chars: Character[], 
    id: number, 
    data: Partial<Omit<Character, 'id' | 'isAlive'>> 
): Character | undefined => {
    const character = findById(chars, id);
    if ( !character ) return undefined;

    Object.assign(character, data);

    return character;
}

// Eliminar - retorna true si lo eliminó, false si no existía
export const deleteCharacter = ( 
    chars: Character[], 
    id: number 
): boolean => {
    const index = chars.findIndex( char => char.id === id );
    if ( index === -1 ) return false; // Si el indice no existe

    chars.splice(index, 1);

    return true;
}