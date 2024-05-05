import axios from 'axios';
import { useState } from 'react';

export function UploadImage() {
    const [image, setImage] = useState<File | null>(null);

    const onChange = (event: any) => {
        console.log('image upload');
        const file = event.target.files[0];
        setImage(file);
    };

    const handleUploadImage = () => {
        if (!image) return;

        const imageForm = new FormData();
        imageForm.append('image', image);

        axios.post('http://localhost:8080/api/images/saveImage', imageForm).then(() => {
            console.log('Image uploaded');
        });
    };

    return (
        <>
            <input type='file' accept='.jpg,.jpeg,.png' onChange={onChange} />
            <button type='button' onClick={handleUploadImage}>
                Upload
            </button>
        </>
    );
}
