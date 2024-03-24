import { useContext } from 'react';
import { Button } from '../shared/components/button/Button';

import { ModalContext } from '../contexts/ModalContext';

import './DeleteUserModal.css';

export const DeleteUserModal = () => {
    const modalContext = useContext(ModalContext)!;
    let modalStatus = modalContext.modalStatus;
    let setModalStatus = modalContext.setModalStatus;
    const removeUser = modalContext.removeUser;
    const userId = modalContext.userId;

    const handleYesClick = () => {
        setModalStatus(false);
        removeUser(userId);
    };

    return (
        modalStatus && (
            <div id='modal-overlay' data-testid='modal-overlay-test' onClick={() => setModalStatus(false)}>
                <div id='modal-card' data-testid='modal-card-test' onClick={(e) => e.stopPropagation()}>
                    <div id='modal-text'>Are you sure you want to remove this user?</div>

                    <div id='buttons-list'>
                        <Button type='button' data_test_id='yes-button' buttonMessage='Yes' color='#4CAF50' onClick={handleYesClick} />
                        <Button
                            type='button'
                            data_test_id='no-button'
                            buttonMessage='No'
                            color='#E53935'
                            onClick={() => setModalStatus(false)}
                        />
                    </div>
                </div>
            </div>
        )
    );
};
