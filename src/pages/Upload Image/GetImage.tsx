import axios from 'axios';
import { useState } from 'react';

export function ViewImagePage() {
    const [imgUrl, setImgUrl] = useState<string>('');

    axios.get('http://localhost:8080/api/images/getImage/1').then((response) => {
        console.log(response.data);
        setImgUrl('data:image/jpeg;base64,' + response.data);
    });

    return (
        <div>
            <h1>View Image</h1>
            <img src={imgUrl} />
        </div>
    );
}
