import { Request, Response } from 'express';
import ProductModel from '../models/ProductModel';

export const getAll = async (req: Request, res: Response) => {
    const products = await ProductModel.findAll();
    res.send(products);
};

export const getProductById = async (req: Request<{ id: number }>, res: Response) => {
    const product = await ProductModel.findByPk(req.params.id);
    return product ? res.json(product) : res.status(404).json({ error: 'Produto não encontrado.' });
};

export const createProduct = async (req: Request, res: Response) => {
    try {
       
        const { name, description, price } = req.body;
        if (!name?.trim() || !description?.trim() || !price) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        const product = await ProductModel.create({ name, description, price, Image });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
    try {


        const { name, description, price, image } = req.body;
        if (!name?.trim() || !description?.trim() || !price) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const product = await ProductModel.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

        product.name = name;
        product.description = description;
        product.price = price;
        product.image = image || product.image;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};

export const destroyProductById = async (req: Request<{ id: number }>, res: Response) => {
    try {

      
        const product = await ProductModel.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Produto não encontrado.' });

        await product.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json('Erro interno no servidor: ' + error);
    }
};
