import Todo from '../models/todo.js'; 
const TodoController = {
    todo : async (req, res) => {
        try {
            const result = await Todo.find();
            // if (!result || result.length === 0) {
            //     return res.status(404).json({
            //         message: "No todos found",
            //     });
            // }
            res.status(200).json({
                message: "Todo lists retrieved successfully",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something Went Wrong",
                error: error.message,
            });
        }
    },

    create: async (req, res) => {
        const todos = req.body
        try {
            const result = await Todo.create(todos);
            
            res.status(200).json({
                message: "Todo Create Success",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                message: "Something Went Wrong",
                error: error.message,
            });
        }
    },
    retrieve: async (req, res) => {
        const todoId = req.params.todoId
        try {
            const result = await Todo.findById(todoId)
            
            res.status(200).json({
                message: "Retrieved Todo is success",
                data: result,
            })
        } catch (error) {
            res.status(500).json({
                message: "Something Went Wrong",
                error: error.message,
            });
        }
    },

    update: async (req, res) => {
        const todoId = req.params.todoId;
        const updatedTodo = req.body;
        try {
            const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true,});
            
            res.status(200).json({
                message: "Retrieved Todo is success",
                data: result,
    
            })
        } catch (error) {
            res.status(500).json({
                message: "Something Went Wrong",
                error: error.message,
            });
        }
    
    },

    delete: async (req, res) => {
        try {
            const result = await Todo.findByIdAndDelete(req.params.todoId)          
            res.status(200).json({
                message: "Deleted Todo success",
                data: null,
            })
        } catch (error) {
            res.status(500).json({
                message: "Failed to Deleted Todo",
                error: error.message,
            })
        }
    }

}

export default TodoController;
