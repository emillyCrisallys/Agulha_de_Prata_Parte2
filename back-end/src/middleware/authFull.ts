import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import UserModel from "../models/UserModel";

// Extensão da tipagem do Express para incluir req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
        document: string;
      };
    }
  }
}

export const authFull = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Acesso não autorizado",
      message: "Token de acesso não fornecido",
    });
  }

  try {
    // Aceita token com formato { id } ou { user: { id } }
    const decoded = verifyToken(token) as { id?: number; user?: { id: number } };
    const userId = decoded.id ?? decoded.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Acesso não autorizado",
        message: "Token inválido",
      });
    }

    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Acesso não autorizado",
        message: "Usuário não encontrado",
      });
    }

    // Injeta os dados do usuário autenticado no req
    req.user = {
      id: user.id!,
      email: user.email!,
      name: user.name!,
      document: user.document!.toString(),
    };

    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(401).json({
      success: false,
      error: "Acesso não autorizado",
      message: "Token inválido ou expirado",
    });
  }
};