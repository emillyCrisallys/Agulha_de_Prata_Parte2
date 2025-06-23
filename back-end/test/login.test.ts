import request from "supertest";
import app from "../src/index"; 
import UserModel from "../src/models/UserModel"; 
import { generateToken } from "../src/utils/jwt";

jest.mock("../src/models/UserModel");

describe("Login User", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
    password: "hashedpassword",
    validatePassword: jest.fn().mockResolvedValue(true),
  };

  beforeEach(() => {
    const UserModel = require("../src/models/UserModel");
    UserModel.findOne = jest.fn().mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Deve retornar erro se email ou senha estiverem ausentes", async () => {
    const res = await request(app).post("/login").send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Email and password are required" });
  });

  test("Deve retornar erro se o usuário não for encontrado", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/login")
      .send({ email: "notfound@example.com", password: "123456" });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "User not found" });
  });

  test("Deve retornar erro se a senha for inválida", async () => {
    mockUser.validatePassword = jest.fn().mockResolvedValue(false);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Email or password are invalid" });
  });

  test("Deve retornar um token se o login for bem-sucedido", async () => {
    const mockToken = "fake-jwt-token";
    (generateToken as jest.Mock).mockReturnValue(mockToken);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "123456" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Login successful", token: mockToken });
  });

  it("Deve retornar sucesso ao fazer login com credenciais válidas", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body).toHaveProperty("token");
  });
});
