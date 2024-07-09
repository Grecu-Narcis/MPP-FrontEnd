import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

function getRandomInt(maxLimit: number): number {
    return Math.floor(Math.random() * (maxLimit + 1));
}

export default function View360() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(transcript);
    };

    const path = 'interior-0' + getRandomInt(4).toString() + '.jpg';

    return (
        <div>
            <ReactPhotoSphereViewer src={'interior-01.jpg'} height={'100vh'} width={'100%'}></ReactPhotoSphereViewer>
        </div>
    );
}
