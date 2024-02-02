import { Router } from 'express'
import { getAlkalmazottak, createAlkalmazott, updateAlkalmazott, removeAlkalmazott, getMunkaidok, createMunkaido, updateMunkaido, removeMunkaido, getFizeteselolegek, createFizeteseloleg, updateFizeteseloleg, removeFizeteseloleg } from '../controllers/controller.js'

const router = Router()

router.get('/alkalmazottak', getAlkalmazottak)
router.post('/alkalmazott', createAlkalmazott)
router.patch('/alkalmazott/:id', updateAlkalmazott)
router.delete('/alkalmazott/:id', removeAlkalmazott)

router.get('/munkaidok', getMunkaidok)
router.post('/munkaido', createMunkaido)
router.patch('/munkaido/:id', updateMunkaido)
router.delete('/munkaido/:id', removeMunkaido)

router.get('/fizeteselolegek', getFizeteselolegek)
router.post('/fizeteseloleg', createFizeteseloleg)
router.patch('/fizeteseloleg/:id', updateFizeteseloleg)
router.delete('/fizeteseloleg/:id', removeFizeteseloleg)

export default router