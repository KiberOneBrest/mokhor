'use client';

import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    height: '',
    birthDate: '',
    favoriteColor: '',
    favoriteGame: '',
    favoriteFruit: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Если поле было с ошибкой, убираем её при вводе
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Улучшенная валидация
  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'height',
      'birthDate',
      'favoriteColor',
      'favoriteGame',
      'favoriteFruit',
    ];
    const newErrors = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      const value = formData[field];
      let isEmpty = false;

      // Проверка на пустоту в зависимости от типа
      if (value === undefined || value === null) {
        isEmpty = true;
      } else if (typeof value === 'string' && value.trim() === '') {
        isEmpty = true;
      } else if (typeof value === 'number' && isNaN(value)) {
        isEmpty = true;
      } else if (field === 'height' && (value === '' || value === undefined || value === null)) {
        isEmpty = true;
      } else if (field === 'birthDate' && !value) {
        isEmpty = true;
      }

      if (isEmpty) {
        newErrors[field] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Логируем данные формы и ошибки для отладки
    console.log('📋 Данные формы:', formData);
    console.log('❌ Ошибки валидации:', newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Формируем список полей с ошибками
      const fieldNames = {
        firstName: 'Имя',
        lastName: 'Фамилия',
        height: 'Рост',
        birthDate: 'Дата рождения',
        favoriteColor: 'Любимый цвет',
        favoriteGame: 'Любимая игра',
        favoriteFruit: 'Любимый фрукт',
      };
      const errorFields = Object.keys(errors)
        .filter((key) => errors[key])
        .map((key) => fieldNames[key] || key)
        .join(', ');
      setStatus({
        type: 'error',
        message: `Пожалуйста, заполните: ${errorFields}`,
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Форма успешно отправлена!' });
        setFormData({
          firstName: '',
          lastName: '',
          patronymic: '',
          height: '',
          birthDate: '',
          favoriteColor: '',
          favoriteGame: '',
          favoriteFruit: '',
        });
        setErrors({});
      } else {
        setStatus({ type: 'error', message: data.error || 'Ошибка отправки' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Ошибка соединения с сервером' });
    } finally {
      setLoading(false);
    }
  };



  const getInputClassName = (fieldName) => {
    const base =
      'w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-black/40 border rounded-md focus:outline-none focus:ring-2 text-white transition-colors text-sm sm:text-base';
    const errorBorder = errors[fieldName]
      ? 'border-red-500 focus:ring-red-500'
      : 'border-[#A7EF9E]/30 focus:ring-[#A7EF9E]';
    return `${base} ${errorBorder}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-[#A7EF9E]/30 text-white">
      <h2 className="text-xl sm:text-2xl font-bold text-[#A7EF9E] mb-3 sm:mb-4">Анкета</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Поля – все одинаковой структуры, но с адаптивными отступами */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1">Имя *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={getInputClassName('firstName')}
          />
          {errors.firstName && (
            <p className="text-red-400 text-[10px] sm:text-xs mt-1">Поле обязательно</p>
          )}
        </div>

        {/* Повторить для всех остальных полей (фамилия, отчество, рост, дата, цвет, игра, фрукт) с аналогичными классами */}
        {/* ... (остальные поля – копируем, меняем только name и label) */}

        {/* Сообщение статуса */}
        {status.message && (
          <div
            className={`p-2 rounded text-sm ${
              status.type === 'success'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 sm:py-2.5 px-4 bg-[#A7EF9E] text-black font-bold rounded-md hover:bg-[#8fd686] transition disabled:opacity-50 text-sm sm:text-base"
        >
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}