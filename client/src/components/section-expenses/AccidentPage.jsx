import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AccidentPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const resourceId = "57c5aef9-70f9-4b71-82fa-52304cfbd031";
    const limit = 1000;
    const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceId}&limit=${limit}`;

    const accidentsCached = localStorage.getItem("accidentsData");

    if (accidentsCached) {
      setData(JSON.parse(accidentsCached));
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          setData(json.result.records);
          localStorage.setItem(
            "accidentsData",
            JSON.stringify(json.result.records)
          );
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const summarizedData = data.reduce((acc, item) => {
    const city = item.city || "לא ידוע";
    const sumAcc = Number(item.SUMACCIDEN) || 0;

    const found = acc.find((c) => c.city === city);
    if (found) {
      found.SUMACCIDEN += sumAcc;
    } else {
      acc.push({ city, SUMACCIDEN: sumAcc });
    }

    return acc;
  }, []);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={summarizedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="SUMACCIDEN" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
