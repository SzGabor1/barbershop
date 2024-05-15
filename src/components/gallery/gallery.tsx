import React, { useEffect, useState } from 'react';

interface ImageData {
    pk: number;
    type: string;
    blob_data: string;
}

const Gallery: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;

    const [imageData, setImageData] = useState<ImageData[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    
    async function fetchImages() {
        try {
            const response = await fetch(`${backendURL}/api/gallery/blobs/`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json();
            setImageData(data.results);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);

    const getBase64ImageSrc = (base64Data: string) => `data:image/png;base64,${base64Data}`;

    const handleImageClick = (base64Data: string) => {
        setSelectedImage(base64Data);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="gallery-container py-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {imageData.map((image, index) => (
                    <div key={index} className="bg-white p-4 shadow-md rounded overflow-hidden transform transition duration-300 hover:scale-110" onClick={() => handleImageClick(image.blob_data)}>
                        <img src={getBase64ImageSrc(image.blob_data)} alt={`Image ${index}`} className="w-full h-auto rounded cursor-pointer" />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50" onClick={handleCloseModal}>
                    <div className="relative w-3/4 h-3/4">
                        <img src={getBase64ImageSrc(selectedImage)} alt="Enlarged Image" className="absolute top-0 left-0 w-full h-full object-contain" />
                        <button className="absolute top-2 right-2 text-white text-lg px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
