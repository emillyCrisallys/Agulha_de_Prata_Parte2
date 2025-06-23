import { Request, Response } from 'express';
import InventoryModel from '../models/InventoryModel';
import ProductModel from '../models/ProductModel';

export const getAll = async (req: Request, res: Response) => {
    const inventory = await InventoryModel.findAll();
    res.send(inventory);
};

export const getInventoryByProductId = async (req: Request<{ id: number }>, res: Response) => {
    const inventory = await InventoryModel.findOne({ where: { productId: req.params.id } });
    return inventory ? res.json(inventory) : res.status(404).json({ error: 'Estoque não encontrado.' });
};

export const createInventory = async (req: Request, res: Response) => {
    try {
        const { productId, stock } = req.body; 

        if (!productId || stock === undefined) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

              // Verifica se o produto existe antes de criar o estoque
        const product = await ProductModel.findOne({ where: { id: productId } });

        if (!product) {
                return res.status(400).json({ error: 'Não pode ser atribuído estoque a um produto que não existe.' });
        }
        const inventory = await InventoryModel.create({
            productId,
            stock
        });

        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor: ' + error });
    }
};


export const updateInventory = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const { stock } = req.body; 
        
        if (stock === undefined) {
            return res.status(400).json({ error: 'A quantidade de estoque é obrigatória.' });
        }

        const inventory = await InventoryModel.findOne({ where: { id: req.params.id } }); // 🚨 Buscar pelo ID correto
        
        if (!inventory) {
            return res.status(404).json({ error: 'Estoque não encontrado.' });
        }

        inventory.stock = stock; 
        await inventory.save();

        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor', details: error });
    }
};

export const deleteInventory = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const { id } = req.params;

       
        if (!id) {
            return res.status(400).json({ error: 'O ID do estoque é obrigatório.' });
        }

        
        const inventory = await InventoryModel.findOne({ where: { id } });

        
        if (!inventory) {
            return res.status(404).json({ error: 'Estoque não encontrado.' });
        }

    
        await inventory.destroy();

        res.status(200).json({ message: 'Estoque removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno no servidor', details: error });
    }
};
