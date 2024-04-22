import { useEffect, useState } from "react";
import { useImageService } from "../services/image.service";

export function useApp() {

    const { findAllBreeds, findImageByBreeds } = useImageService();
    const [breeds, setBreeds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadingModal, setLoadingModal] = useState(false);

    useEffect(() => {
        fetchAllBreeds();
    }, []);

    const fetchAllBreeds = async () => {
        try {
            const data = await findAllBreeds();
            setBreeds(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al buscar razas:', error);
            setLoading(false);
        }
    };

    const handleBreedClick = async (breed: string) => {
        try {
            setLoadingModal(true);
            const data = await findImageByBreeds(breed);
            setImages(Object.values(data.message).flat());
            setCurrentIndex(0);
            setLoadingModal(false);
            setSelectedBreed(breed); 
        } catch (error) {
            console.error('Error al buscar imagenes por razas :', error);
            setLoadingModal(false);
        }
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleBackgroundClick = () => {
        setSelectedBreed(null);
    };

    return { images, breeds, loading, selectedBreed, currentIndex, loadingModal, handleBreedClick, handleNextClick, handlePrevClick, handleBackgroundClick };
}
