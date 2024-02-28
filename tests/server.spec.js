const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("ruta GET /cafes devuelve un status code 200, y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
    const nonExistentId = 999; // ID inexistente
    const token = "placeholder-token"; // Token
    const response = await request(server)
      .delete(`/cafes/${nonExistentId}`)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });

  it("ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const newCafe = { id: 99, nombre: "Affogato" }; // Agregamos un nuevo café. El ID es alto para que no se sobreponga a posibles IDs futuros.
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
  });

  it("ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un ID en parámetros diferente al ID dentro del payload", async () => {
    const cafeId = 1; // ID del cafe a actualizar
    const updatedCafe = { id: 6, nombre: "Cafe actualizado" }; // Cafe actualizado con un ID distinto
    const response = await request(server)
      .put(`/cafes/${cafeId}`)
      .send(updatedCafe);
    expect(response.status).toBe(400);
  });
});
