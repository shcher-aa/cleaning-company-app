import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { getDatabase, ref, onValue } from 'firebase/database';

const holidayMap = {
  '2025-01-01': 'Новый год',
  '2025-04-17': 'Страстной четверг',
  '2025-04-18': 'Страстная пятница',
  '2025-04-21': 'Пасхальный понедельник',
  '2025-05-01': 'Праздник труда',
  '2025-05-17': 'День Конституции Норвегии',
  '2025-05-29': 'Вознесение',
  '2025-06-09': 'Троица',
  '2025-12-25': 'Рождество',
  '2025-12-26': 'Второй день Рождества'
};

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayClients, setDayClients] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const db = getDatabase();
    const formatted = format(date, 'yyyy-MM-dd');
    const dateRef = ref(db, `calendar/${formatted}`);

    onValue(dateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const clientList = Object.values(data);
        setDayClients(clientList);
      } else {
        setDayClients([]);
      }
    });
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isHoliday = holidayMap[formattedDate];

      if (isHoliday) return 'holiday';
      if (isWeekend) return 'weekend';
    }
    return null;
  };

  const holidayName = holidayMap[format(selectedDate, 'yyyy-MM-dd')];

  return (
    <div>
      <h2>Календарь</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
        locale="ru-RU"
      />
      <p>Выбранная дата: {selectedDate.toLocaleDateString('ru-RU')}</p>
      {holidayName && <p>Праздник: {holidayName}</p>}
      {dayClients.length > 0 && (
        <div>
          <h3>Запланированные уборки:</h3>
          <ul>
            {dayClients.map((client, index) => (
              <li key={index}>
                <strong>{client.name}</strong> — {client.service} ({client.time})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;

/* Add the following CSS classes to your global CSS file (e.g., index.css or App.css):

.holiday {
  background-color: #ffdddd !important;
  color: #b30000 !important;
  font-weight: bold;
}

.weekend {
  background-color: #f0f8ff !important;
  color: #003366 !important;
}

*/
