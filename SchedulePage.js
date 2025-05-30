import React, { useState, useEffect } from 'react';

const cleaningTypes = ["Генеральная", "Регулярная", "После ремонта", "После аренды"];
const durationOptions = [
  "0:15", "0:30", "0:45", "1:00", "1:15", "1:30", "1:45", "2:00",
  "2:15", "2:30", "2:45", "3:00", "3:15", "3:30", "3:45", "4:00",
  "4:15", "4:30", "4:45", "5:00", "5:15", "5:30", "5:45", "6:00",
  "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45", "8:00"
];
const clientsList = ["Андерсен", "Иванов", "Осло Клиник", "Студия №5"];
const coworkersList = ["Мария", "Андрей", "Елена"];

function SchedulePage() {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem('scheduleRows');
    return saved ? JSON.parse(saved) : [];
  });
  const [newRow, setNewRow] = useState({ date: '', start: '', end: '', hours: '', type: '', client: '', coworker: '' });
  const [clientSuggestions, setClientSuggestions] = useState([]);
  const [coworkerSuggestions, setCoworkerSuggestions] = useState([]);

  useEffect(() => {
    localStorage.setItem('scheduleRows', JSON.stringify(rows));
  }, [rows]);

  const handleChange = (e, field, index = null) => {
    const value = e.target.value;
    if (index === null) {
      setNewRow({ ...newRow, [field]: value });
      if (field === 'client') {
        const filtered = clientsList.filter(c => c.toLowerCase().includes(value.toLowerCase()));
        setClientSuggestions(filtered);
      }
      if (field === 'coworker') {
        const filtered = coworkersList.filter(cw => cw.toLowerCase().includes(value.toLowerCase()));
        setCoworkerSuggestions(filtered);
      }
    } else {
      const updatedRows = [...rows];
      updatedRows[index][field] = value;
      setRows(updatedRows);
    }
  };

  const handleAddRow = () => {
    if (!newRow.date || !newRow.start) return;
    setRows([...rows, newRow]);
    setNewRow({ date: '', start: '', end: '', hours: '', type: '', client: '', coworker: '' });
    setClientSuggestions([]);
    setCoworkerSuggestions([]);
  };

  const handleDeleteRow = (index) => {
    if (window.confirm("Удалить эту строку?")) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  const handleClientSuggestionClick = (suggestion) => {
    setNewRow({ ...newRow, client: suggestion });
    setClientSuggestions([]);
  };

  const handleCoworkerSuggestionClick = (suggestion) => {
    setNewRow({ ...newRow, coworker: suggestion });
    setCoworkerSuggestions([]);
  };

  return (
    <div>
      <h2>Табель</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Начало</th>
            <th>Конец</th>
            <th>Часы</th>
            <th>Описание</th>
            <th>Клиент</th>
            <th>С кем</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="date" value={row.date} onChange={(e) => handleChange(e, "date", index)} /></td>
              <td><input type="time" value={row.start} onChange={(e) => handleChange(e, "start", index)} /></td>
              <td><input type="time" value={row.end} onChange={(e) => handleChange(e, "end", index)} /></td>
              <td>
                <select value={row.hours} onChange={(e) => handleChange(e, "hours", index)}>
                  <option value="">--</option>
                  {durationOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td>
                <select value={row.type} onChange={(e) => handleChange(e, "type", index)}>
                  <option value="">--</option>
                  {cleaningTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  value={row.client}
                  onChange={(e) => handleChange(e, "client", index)}
                  list={`clients-list-${index}`}
                />
                <datalist id={`clients-list-${index}`}>
                  {clientsList.map((client) => (
                    <option key={client} value={client} />
                  ))}
                </datalist>
              </td>
              <td>
                <input
                  value={row.coworker}
                  onChange={(e) => handleChange(e, "coworker", index)}
                  list={`coworkers-list-${index}`}
                />
                <datalist id={`coworkers-list-${index}`}>
                  {coworkersList.map((cw) => (
                    <option key={cw} value={cw} />
                  ))}
                </datalist>
              </td>
              <td><button onClick={() => handleDeleteRow(index)}>Удалить</button></td>
            </tr>
          ))}
          <tr>
            <td><input type="date" value={newRow.date} onChange={(e) => handleChange(e, "date")} /></td>
            <td><input type="time" value={newRow.start} onChange={(e) => handleChange(e, "start")} /></td>
            <td><input type="time" value={newRow.end} onChange={(e) => handleChange(e, "end")} /></td>
            <td>
              <select value={newRow.hours} onChange={(e) => handleChange(e, "hours")}>
                <option value="">--</option>
                {durationOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </td>
            <td>
              <select value={newRow.type} onChange={(e) => handleChange(e, "type")}>
                <option value="">--</option>
                {cleaningTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </td>
            <td style={{ position: 'relative' }}>
              <input
                value={newRow.client}
                onChange={(e) => handleChange(e, "client")}
                autoComplete="off"
              />
              {clientSuggestions.length > 0 && (
                <ul style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', margin: 0, padding: '0 5px', listStyle: 'none', maxHeight: '100px', overflowY: 'auto', zIndex: 1 }}>
                  {clientSuggestions.map((suggestion) => (
                    <li key={suggestion} style={{ cursor: 'pointer' }} onClick={() => handleClientSuggestionClick(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </td>
            <td style={{ position: 'relative' }}>
              <input
                value={newRow.coworker}
                onChange={(e) => handleChange(e, "coworker")}
                autoComplete="off"
              />
              {coworkerSuggestions.length > 0 && (
                <ul style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', margin: 0, padding: '0 5px', listStyle: 'none', maxHeight: '100px', overflowY: 'auto', zIndex: 1 }}>
                  {coworkerSuggestions.map((suggestion) => (
                    <li key={suggestion} style={{ cursor: 'pointer' }} onClick={() => handleCoworkerSuggestionClick(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </td>
            <td><button onClick={handleAddRow}>Добавить</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SchedulePage;
