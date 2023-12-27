import React, { PropsWithChildren } from 'react';
import styles from './DeleteForm.module.css'

interface IModalProps {
    active: boolean;
    title: string;
    onSubmit: () => void;
    onClose: () => void;
}

const DeleteForm = ({active, title, onSubmit, onClose, children}: PropsWithChildren<IModalProps>) => {
    if (!active){
        return null;
    }
    return(
        <div className={styles.modal} onClick = {onClose}>
            <div className={styles.modal__content} onClick = {(event) => event.stopPropagation() }>
                <div className={styles.modal__header}>
                    <div className={styles.modal__title}>{title}</div>
                </div>
                <div className={styles.modal__body}>{children}</div>
                <div className={styles.modal__footer}>
                    <button className="btn" onClick= {onSubmit}>YES</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteForm;