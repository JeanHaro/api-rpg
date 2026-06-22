import { Request, Response } from "express";

// -> Data
import { characters } from '../data/characters';

// -> Utils
import {
    createCharacter,
    deleteCharacter,
    findById, 
    getAliveCharacters, 
    getByClass, 
    getInfo, 
    updateCharacter
} from "../utils/character.utils";

// -> Tipos
import { Character, CharacterClass, CharacterStatus } from "../types";

const validClasses: CharacterClass[] = ['Guerrero', 'Mago', 'Arquero'];
const validStatus: CharacterStatus[] = ['activo', 'muerto', 'descansando'];

// GET /characters - todos los personajes
export const getAllCharacters = ( req: Request, res: Response ): void => {
    res.json(characters);
}

// GET /characters/alive - solo los vivos
export const getAlive =  ( req: Request, res: Response ): void => {
    res.json(getAliveCharacters(characters));
}

// GET /characters/class/:class - filtrar por clase 
export const getCharactersByClass = ( req: Request, res: Response ): void => {
    const charClass = req.params.class as CharacterClass;

    if ( !validClasses.includes(charClass) ) {
        res.status(400).json({
            error: `Clase inválida. Opciones: ${ validClasses.join(', ') }`
        });

        return;
    }

    res.json(getByClass(characters, charClass));
}

// GET /characters/:id - uno por id
export const getCharacterById = ( req: Request, res: Response ): void => {
    const id = Number(req.params.id);
    const character = findById(characters, id);

    if ( !character ) {
        res.status(404).json({
            error: `Personaje con id ${ id } no encontrado`
        });

        return;
    }

    res.json(character);
}

// GET /characters/:id/info - string formateado del personaje
export const getCharacterInfo = ( req: Request, res: Response ): void => {
    const id = Number(req.params.id);
    const character = findById(characters, id);

    if ( !character ) {
        res.status(404).json({
            error: `Personaje con id ${ id } no encontrado`
        })

        return;
    }
        
    res.json({ info: getInfo(character) })
}

// POST /characters
export const createNewCharacter = ( req: Request, res: Response ): void => {
    const data = req.body;

    if (
        !data.name ||
        !data.class ||
        !data.level ||
        !data.hp ||
        !data.maxHp ||
        !data.status
    ) {
        res.status(400).json({
            error: 'Faltan campos obligatorios: name, class, level, hp, maxHp, status'
        });

        return;
    }

    if ( !validClasses.includes(data.class) ) {
        res.status(400).json({
            error: `Clase inválida. Opciones: ${validClasses.join(', ')}`
        });

        return;
    }

    const newCharacter = createCharacter(characters, data);

    res.status(201).json(newCharacter);
}

// PATCH /characters/:id
export const updateExistingCharacter = ( req: Request, res: Response ): void => {
    const id = Number(req.params.id);
    const data = req.body;

    if ( data.class && !validClasses.includes(data.class) ) {
        res.status(400).json({
            error: `Clase inválida. Opciones: ${ validClasses.join(', ') }`
        });

        return;
    }

    if ( data.status && !validStatus.includes(data.status.toLowerCase()) ) {
        res.status(400).json({
            error: `Estado inválida. Opciones: ${ validStatus.join(', ') }`
        });

        return;
    }

    // Solo extraes los campos que existen en Employee
    const allowedData: Partial<Omit<Character, 'id'>> = {
        ...(data.name       && { name: data.name }),
        ...(data.class      && { class: data.class }),
        ...(data.level      && { level: data.level }),
        ...(data.hp         && { hp: data.hp }),
        ...(data.maxHp      && { maxHp: data.maxHp }),
        ...(data.status     && { status: data.status.toLowerCase() }),
        ...(data.guild      && { guild: data.guild }),
    }

    const updated = updateCharacter( characters, id, allowedData );

    if ( !updated )  {
        res.status(404).json({
            error: `Personaje con id ${ id } no encontrado`
        });

        return;
    }

    res.json(updated);
}

// DELETE /characters/:id
export const deleteExistingCharacter = ( req: Request, res: Response ): void => {
    const id = Number(req.params.id);
    const deleted = deleteCharacter(characters, id);

    if ( !deleted ) {
        res.status(404).json({
            error: `Personaje con id ${ id } no encontrado`
        });

        return;
    }

    res.json({
        message: `Personaje ${ id } eliminado correctamente`
    });
}