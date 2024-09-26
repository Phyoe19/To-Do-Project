
import { Router } from 'express'; 
import TodoController from "../controllers/TodoControllers.js";  

const router = Router(); 



// Define routes and create todo
router.route('/todos').get(TodoController.todo).post(TodoController.create);

// Retrieve,Update and Delete a todo by ID
router.route("/todos/:todoId").get(TodoController.retrieve).patch(TodoController.update).delete(TodoController.delete);

export default router;



