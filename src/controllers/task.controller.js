import Task from "../models/Task";
import { getPagination } from "../libs/getPagination";

export const findAllTasks = async (req, res) => {
  try {
     const { size, page, nombre   } = req.query;
 
     const condition = nombre 
       ? {
           nombre: { $regex: new RegExp(nombre), $options: "i" },

         }
       : {};




    const { limit, offset } = getPagination(page, size);

    const data = await Task.paginate(condition,  { offset, limit });

    console.log(data);

    res.json({
      totalItems: data.totalDocs,
      tasks: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || " Somenting goes wrong retrievening  the tasks ",
    });
  }
};
//  const buscarUser = async (req, res) => {
//   try {
//     // const { size, page, apellido } = req.query;
//     const  apellidos =  req.body.apellido;

//     const condition_dos = apellidos
//       ? {
//           apellidos: { $regex: new RegExp(apellidos), $options: "i" },
//         }
//       : {};

//     // const { limit, offset } = getPagination(page, size);

//     const data = await Task.paginate(condition_dos);

//     const apellido = data.condition_dos;
//     console.log('buscarUser', apellido);
//     res.apellido

//   } catch (error) {

//   }

// };

export const createTask = async (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }
  
  try {
    const newTask = new Task({
      apellido: req.body.apellido,
      nombre: req.body.nombre,
      informacion: req.body.informacion,
      motivo: req.body.motivo,
      estado: req.body.estado,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      done: req.body.done ? req.body.done : false,
      email: req.body.email,
      valor: req.body.valor,
      available: req.body.available,
      asignado: req.body.asignado,
    });
    const taskSaved = await newTask.save();
    console.log(taskSaved);
    res.json("Task a new  Created");
  } catch (error) {
    res.status(500).json({
      message: error.message || " Error creting o sending task",
    });
  }
};

export const findAllDoneTasks = async (req, res) => {
  try {
    const task = await Task.find({ done: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || " Somenting goes wrong retrievening  the tasks ",
    });
  }
};

export const findOneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task)
      return res
        .status(404)
        .json({ message: `task with id ${id} does not exist` });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error Recibiendo tarea id ${id}`,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: `Task delete` });
  } catch (error) {
    res.status(500).json({
      message: `error deleting Task: ${id}`,
    });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await Task.findAndModify(id, req.body);
    res.json({ message: `Task was updated successfully` });
  } catch (error) {
    res.status(500).json({
      message: `error Actualizando Tarea : ${id}`,
    });
  }
};
