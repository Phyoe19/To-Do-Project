
import { Router } from 'express'; 
import TodoController from "../controllers/TodoControllers.js";  

const router = Router(); 



// Define routes
router.get('/todos', TodoController.todo);

// Create todos
router.post('/create-todo', TodoController.create);

// Retrieve a todo by ID
router.get('/:todoId', TodoController.retrieve);

// Update a todo by ID
router.patch('/:todoId', TodoController.update);

// Delete a todo by ID
router.delete('/delete/:todoId', TodoController.delete);


export default router;



