import axios from "axios";

const apiEndPoint = 'http://localhost:8080/api/images';

export async function saveImage(image: File, userId: number) {
    const imageForm = new FormData();
    imageForm.append('image', image);
    imageForm.append('userId', userId.toString());

    await axios.post(apiEndPoint + '/saveImage', imageForm);
}

export async function getImageByUserId(userId: number): Promise<string> {
    const response = await axios.get(apiEndPoint + '/getImage/' + userId);
    return response.data;
}