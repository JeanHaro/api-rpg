import { Router } from "express";
import { 
    createNewCharacter,
    deleteExistingCharacter,
    getAlive, 
    getAllCharacters, 
    getCharacterById, 
    getCharacterInfo, 
    getCharactersByClass,
    updateExistingCharacter
} from "../controllers/characters.controller";

const router = Router();

// GETs
router.get('/', getAllCharacters);
router.get('/alive', getAlive); // Antes que el id
router.get('/class/:class', getCharactersByClass); // Antes que el id
router.get('/:id', getCharacterById);
router.get('/:id/info', getCharacterInfo);

// POST
router.post('/', createNewCharacter);

// PATCH
router.patch('/:id', updateExistingCharacter);

// DELETE
router.delete('/:id', deleteExistingCharacter);

export default router;
