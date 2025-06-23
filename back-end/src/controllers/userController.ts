import { Request, Response } from 'express'
import UserModel from '../models/UserModel'



const isValidCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0, remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;

    return remainder === parseInt(cpf.substring(10, 11));
};

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getAll = async (req: Request, res: Response) => {
    const users = await UserModel.findAll()
    res.send(users) 
}


export const getUserById = async (
    req: Request<{ id: string }>,
    res: Response) => {
   
        const user = await UserModel.findByPk(req.params.id)

        return res.json(user);

}

export const createUser = async (
    req: Request,
    res: Response) => {

        try{

            const { name, email, document, password } = req.body  

            // Check if the user already exists
             if (!name?.trim() || !email?.trim() || !document?.trim() || !password?.trim()) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            // Validação do e-mail
            if (!isValidEmail(email)) {
                return res.status(400).json({ error: 'E-mail inválido.' });
            }

            // Validação do CPF
            if (!isValidCPF(document)) {
                return res.status(400).json({ error: 'CPF inválido.' });
            }

            // Verifica se o CPF já está cadastrado
            const existingUser = await UserModel.findOne({ where: { document } });
            
                if (existingUser) {
                    return res.status(400).json({ error: 'CPF já cadastrado.' });
                }

            const user = await UserModel.create({
                name,
                email,
                document,
                password
            })
            res.status(201).json(user)
    
        } catch(error){
            res.status(500).json('Erro interno no servidor ' + error )

        }
    
              
} 

export const updateUser = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const { name, password } = req.body;
        const loggedUser = req.user; // <-- Corrigido aqui!

        if ((!name || !name.trim()) && (!password || !password.trim())) {
            return res.status(400)
                .json({ error: 'Informe pelo menos nome ou senha para atualizar.' });
        }

        const user = await UserModel.findByPk(req.params.id);

        if (!user) {
            return res.status(404)
                .json({ error: 'Usuário não encontrado.' });
        }

        // Só o proprietário do perfil pode atualizar
        if (user.id !== loggedUser?.id) {
            return res.status(403)
                .json({ error: 'Acesso negado. Você não pode atualizar este perfil.' });
        }

        if (name) user.name = name;
        if (password) user.password = password;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json('Erro interno no servidor ' + error);
    }
};

export const destroyUserById = async (
    req: Request<{ id: string }>,
    res: Response) => {

        try{
   
            const user = await UserModel.findByPk(req.params.id)

            if (!user) {
                   return res.status(404)
                       .json({ error: 'Usuário não encontrado.' });
            }

            await user.destroy()

            res.status(204).send()

        }catch(error){

            res.status(500).json('Erro interno no servidor ' + error )
        }

}