import axios, { AxiosRequestConfig } from 'axios';
import { Car, Owner, CarFormData } from '../types';

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem('jwt');
    return {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    };
};

// Получить все автомобили
export const getCars = async (): Promise<Car[]> => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        getAxiosConfig()
    );
    return response.data;
};

// Удалить автомобиль
export const deleteCar = async (id: number): Promise<void> => {
    await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cars/${id}`,
        getAxiosConfig()
    );
};

// Добавить автомобиль
export const addCar = async (car: CarFormData): Promise<Car> => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cars`,
        car,
        getAxiosConfig()
    );
    return response.data;
};

// Обновить автомобиль
export const updateCar = async (car: Car): Promise<Car> => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/cars/${car.id}`,
        car,
        getAxiosConfig()
    );
    return response.data;
};

// Получить владельцев
export const getOwners = async (): Promise<Owner[]> => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/owners`,
        getAxiosConfig()
    );
    return response.data;
};