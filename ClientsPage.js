import React, { useState } from 'react';

function ClientsPage() {
  const userRole = 'менеджер'; // заменишь потом на реальное значение
  const canEdit = userRole === 'менеджер' || userRole === 'начальник';

  const [clients, setClients] = useState([
    { name: 'Анн Эльнесоген', address: 'Olaf Ryes Gate 12', code: '1234', duration: '2:00' },
    { name: 'Отчет Бьорна', address: 'Bjørnveien 5', code: '5678', duration: '1:30' }
  ]);

  const [newClient, setNewClient] = useState({ name: '', address: '', code: '', duration: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.address && newClient.code && newClient.duration) {
      setClients([...clients, newClient]);
      setNewClient({ name: '', address: '', code: '', duration: '' });
    }
  };

  const handleDeleteClient = (index) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  const handleEditClient = (index, field, value) => {
    const updatedClients = [...clients];
    updatedClients[index][field] = value;
    setClients(updatedClients);
  };

  return (
    <div>
      <h2>Список клиентов</h2>

      <div style={{ marginBottom: '1em' }}>
        <input name="name" placeholder="Имя" value={newClient.name} onChange={handleChange} />
        <input name="address" placeholder="Адрес" value={newClient.address} onChange={handleChange} />
        <input name="code" placeholder="Код входа" value={newClient.code} onChange={handleChange} />
        <input name="duration" placeholder="Время на уборку" value={newClient.duration} onChange={handleChange} />
        {canEdit && <button onClick={handleAddClient}>Добавить</button>}
      </div>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Адрес</th>
            <th>Код входа</th>
            <th>Время на уборку</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>
                {canEdit ? (
                  <input
                    value={client.name}
                    onChange={(e) => handleEditClient(index, 'name', e.target.value)}
                  />
                ) : client.name}
              </td>
              <td>
                {canEdit ? (
                  <input
                    value={client.address}
                    onChange={(e) => handleEditClient(index, 'address', e.target.value)}
                  />
                ) : client.address}
              </td>
              <td>
                {canEdit ? (
                  <input
                    value={client.code}
                    onChange={(e) => handleEditClient(index, 'code', e.target.value)}
                  />
                ) : client.code}
              </td>
              <td>
                {canEdit ? (
                  <input
                    value={client.duration}
                    onChange={(e) => handleEditClient(index, 'duration', e.target.value)}
                  />
                ) : client.duration}
              </td>
              <td>
                {canEdit && (
                  <button onClick={() => handleDeleteClient(index)}>Удалить</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsPage;
