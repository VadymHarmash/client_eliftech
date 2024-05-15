import React, { useState } from 'react';

export default function RegisterModal({ styles, onClose, eventId }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        whereHeared: ''
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateDate = (date) => {
        const re = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/;
        return re.test(date);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        else if (!validateDate(formData.dateOfBirth)) newErrors.dateOfBirth = 'Invalid date format (dd.mm.yyyy)';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        const response = await fetch(`${process.env.SERVER}${eventId}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            onClose()
            document.location.reload();
        } else {
            console.error('Error registering participant');
        }
    };

    const formFields = [
        { key: 1, id: 'name', label: 'Full name' },
        { key: 2, id: 'email', label: 'Email' },
        { key: 3, id: 'dateOfBirth', label: 'Date of birth' }
    ];

    return (
        <div className={styles.registerModal}>
            <div className={styles.registerModal__wrapper}>
                <div className={styles.registerModal__content}>
                    <div className={styles.registerModal__header}>
                        <h2 className={styles.registerModal__header__title}>Event registration</h2>
                        <span className={styles.registerModal__header__close} onClick={onClose}>X</span>
                    </div>
                    <div className={styles.registerModal__info}>
                        {formFields.map((field) => (
                            <label key={field.key} className={styles.registerModal__label}>
                                <span>{field.label}</span>
                                <input
                                    type="text"
                                    name={field.id}
                                    value={formData[field.id]}
                                    onChange={handleFormChange}
                                />
                                {errors[field.id] && <span className={styles.error}>{errors[field.id]}</span>}
                            </label>
                        ))}
                    </div>
                    <div className={styles.registerModal__whereHeared}>
                        <span>Where did you hear about this event?</span>
                        <div className={styles.registerModal__whereHeared__buttons}>
                            {['Social media', 'Friends', 'Found myself'].map((option, index) => (
                                <div key={index} className={styles.registerModal__whereHeared__button}>
                                    <input
                                        type="radio"
                                        name="whereHeared"
                                        id={option}
                                        value={option}
                                        onChange={handleFormChange}
                                    />
                                    <label htmlFor={option}>{option}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSubmit} className={styles.registerModal__submit}>Send</button>
                </div>
            </div>
        </div>
    );
}
