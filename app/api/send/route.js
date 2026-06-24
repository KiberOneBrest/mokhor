import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    // Извлекаем поля, которые приходят из формы
    const {
      firstName,
      lastName,
      patronymic,
      height,
      birthDate,
      favoriteColor,
      favoriteGame,
      favoriteFruit,
    } = body;

    // Валидация обязательных полей (все кроме отчества)
    if (!firstName || !lastName || !height || !birthDate || !favoriteColor || !favoriteGame || !favoriteFruit) {
      return new Response(
        JSON.stringify({ error: 'Все поля, кроме отчества, обязательны для заполнения' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Отправка письма через Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [process.env.EMAIL_TO || 'your_email@example.com'],
      subject: '📋 Новая анкета с сайта',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Новая анкета</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #f4f7fc;
                -webkit-font-smoothing: antialiased;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.05);
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px 20px;
                border-radius: 16px 16px 0 0;
                text-align: center;
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: 0.5px;
              }
              .header p {
                margin: 8px 0 0;
                font-size: 16px;
                opacity: 0.9;
              }
              .content {
                padding: 30px 25px;
                background: #ffffff;
                border-radius: 0 0 16px 16px;
              }
              .field {
                margin-bottom: 18px;
                border-bottom: 1px solid #eef2f7;
                padding-bottom: 14px;
              }
              .field:last-child {
                border-bottom: none;
                margin-bottom: 0;
              }
              .label {
                font-size: 13px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.3px;
                color: #8898aa;
                margin-bottom: 4px;
              }
              .value {
                font-size: 18px;
                font-weight: 500;
                color: #1a1a2e;
                padding: 6px 0 2px;
                word-break: break-word;
              }
              .value.highlight {
                background: #f0f4ff;
                padding: 6px 12px;
                border-radius: 8px;
                display: inline-block;
              }
              .icon {
                font-size: 22px;
                margin-right: 8px;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #edf2f7;
                text-align: center;
                color: #a0aec0;
                font-size: 14px;
              }
              .footer strong {
                color: #4a5568;
              }
              .badge {
                display: inline-block;
                background: #ebf4ff;
                color: #3182ce;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
              }
              @media (max-width: 480px) {
                .container { padding: 10px; }
                .header h1 { font-size: 22px; }
                .value { font-size: 16px; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Новая анкета</h1>
                <p>Данные из формы</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label"><span class="icon">👤</span> Имя</div>
                  <div class="value">${firstName}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">👤</span> Фамилия</div>
                  <div class="value">${lastName}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">👤</span> Отчество</div>
                  <div class="value">${patronymic || '—'}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">📏</span> Рост (см)</div>
                  <div class="value highlight">${height}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">📅</span> Дата рождения</div>
                  <div class="value">${birthDate}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">🎨</span> Любимый цвет</div>
                  <div class="value">${favoriteColor}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">🎮</span> Любимая игра</div>
                  <div class="value">${favoriteGame}</div>
                </div>
                <div class="field">
                  <div class="label"><span class="icon">🍉</span> Любимый фрукт</div>
                  <div class="value">${favoriteFruit}</div>
                </div>

                <div style="margin-top: 25px; padding: 16px; background: #f7fafc; border-radius: 12px; text-align: center;">
                  <span class="badge">🕒 Дата отправки</span>
                  <span style="display: block; margin-top: 6px; font-weight: 500; color: #2d3748;">
                    ${new Date().toLocaleString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span style="display: block; margin-top: 4px; font-size: 12px; color: #a0aec0;">
                    ID заявки: ${Date.now().toString(36).toUpperCase()}
                  </span>
                </div>
              </div>
              <div class="footer">
                <p style="margin: 0;">Это автоматическое уведомление с вашего сайта.</p>
                <p style="margin: 4px 0 0; font-size: 12px;">
                  <strong>Resend</strong> • Письмо доставлено через <a href="https://resend.com" style="color: #667eea; text-decoration: none;">Resend</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        Новая анкета
        --------------------
        Имя: ${firstName}
        Фамилия: ${lastName}
        Отчество: ${patronymic || '—'}
        Рост: ${height} см
        Дата рождения: ${birthDate}
        Любимый цвет: ${favoriteColor}
        Любимая игра: ${favoriteGame}
        Любимый фрукт: ${favoriteFruit}
        --------------------
        Дата: ${new Date().toLocaleString('ru-RU')}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Ошибка отправки письма' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Форма успешно отправлена!', id: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Ошибка:', error);
    return new Response(
      JSON.stringify({ error: 'Ошибка сервера' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}