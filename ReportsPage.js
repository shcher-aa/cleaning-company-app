

import React, { useState } from "react";

const ReportsPage = () => {
  const [selectedType, setSelectedType] = useState("employee");
  const [selectedEntity, setSelectedEntity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);

  const mockEmployees = ["Иван Иванов", "Ольга Смирнова", "Пётр Петров"];
  const mockClients = ["Клиент 1", "Клиент 2", "Клиент 3"];

  const generateReport = () => {
    // Здесь можно будет заменить на реальные данные из базы
    const dummyData = [
      { date: "2025-05-01", hours: "2:30", client: "Клиент 1", employee: "Иван Иванов", partner: "Ольга Смирнова", task: "Поддерживающая уборка" },
      { date: "2025-05-03", hours: "1:45", client: "Клиент 2", employee: "Иван Иванов", partner: "Пётр Петров", task: "Генеральная уборка" }
    ];
    setReportData(dummyData);
  };

  const exportReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + [
      ["Дата", "Часы", "Клиент", "Сотрудник", "С кем", "Тип"],
      ...reportData.map(r => [r.date, r.hours, r.client, r.employee, r.partner, r.task])
    ].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Отчёты</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Тип отчёта</label>
          <select
            value={selectedType}
            onChange={e => {
              setSelectedType(e.target.value);
              setSelectedEntity("");
            }}
            className="border rounded px-3 py-2"
          >
            <option value="employee">По сотруднику</option>
            <option value="client">По клиенту</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            {selectedType === "employee" ? "Сотрудник" : "Клиент"}
          </label>
          <select
            value={selectedEntity}
            onChange={e => setSelectedEntity(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Выберите</option>
            {(selectedType === "employee" ? mockEmployees : mockClients).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">С даты</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">По дату</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={generateReport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Сформировать отчёт
        </button>
        <button
          onClick={exportReport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={reportData.length === 0}
        >
          Экспорт в CSV
        </button>
      </div>

      {reportData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Дата</th>
                <th className="border px-4 py-2">Часы</th>
                <th className="border px-4 py-2">Клиент</th>
                <th className="border px-4 py-2">Сотрудник</th>
                <th className="border px-4 py-2">С кем</th>
                <th className="border px-4 py-2">Тип уборки</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.hours}</td>
                  <td className="border px-4 py-2">{item.client}</td>
                  <td className="border px-4 py-2">{item.employee}</td>
                  <td className="border px-4 py-2">{item.partner}</td>
                  <td className="border px-4 py-2">{item.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;