import { employees, worktimes, prepayments } from '../models/models.js'

export const getAlkalmazottak = async (req, res) => {
  try {
    const results = await employees.findAll()
    res.send(results)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const createAlkalmazott = async (req, res) => {
  try {
    const { name, address, position, pricePerHour } = req.body
    const result = await employees.create({ name, address, position, pricePerHour })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const updateAlkalmazott = async (req, res) => {
  try {
    const { name, address, position, pricePerHour } = req.body
    const result = await employees.update({ name, address, position, pricePerHour }, { where: { id: req.params.id } })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const removeAlkalmazott = async (req, res) => {
  try {
    await employees.destroy({ where: { id: req.params.id } })
    res.send(true)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const getMunkaidok = async (req, res) => {
  try {
    const results = await worktimes.findAll({ include: { model: employees, required: false } })
    res.send(results)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const createMunkaido = async (req, res) => {
  try {
    const { date, start, end, employeeId } = req.body
    const result = await worktimes.create({ date, start, end, employeeId })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const updateMunkaido = async (req, res) => {
  try {
    const { date, start, end, employeeId } = req.body
    const result = await worktimes.update({ date, start, end, employeeId }, { where: { id: req.params.id } })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const removeMunkaido = async (req, res) => {
  try {
    await worktimes.destroy({ where: { id: req.params.id } })
    res.send(true)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const getFizeteselolegek = async (req, res) => {
  try {
    const results = await prepayments.findAll({ include: { model: employees, required: false } })
    res.send(results)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const createFizeteseloleg = async (req, res) => {
  try {
    const { month, day, value, employeeId } = req.body
    const result = await prepayments.create({ month, day, value, employeeId })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const updateFizeteseloleg = async (req, res) => {
  try {
    const { month, value, day, employeeId } = req.body
    const result = await prepayments.update({ month, day, value, employeeId }, { where: { id: req.params.id } })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}

export const removeFizeteseloleg = async (req, res) => {
  try {
    await prepayments.destroy({ where: { id: req.params.id } })
    res.send(true)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}