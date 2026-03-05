import api from "./axios";

// GET /pets
export const getPets = async (params = {}) => {
    const res = await api.get("/pets", { params });
    return res.data;
};

// GET /pets/:pet_id
export const getPetById = async (petId) => {
    const res = await api.get(`/pets/${petId}`);
    return res.data;
};