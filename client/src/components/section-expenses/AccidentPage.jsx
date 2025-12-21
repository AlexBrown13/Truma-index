import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import TitlePage from "../../elements/TitlePage";

export default function TopAccidentCities() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=57c5aef9-70f9-4b71-82fa-52304cfbd031&limit=32000"
    )
      .then((res) => res.json())
      .then((json) => {
        // Extract records
        const records = json.result.records;
        // Sort cities by SUMACCIDEN (total accidents) descending
        const sorted = records.sort((a, b) => b.SUMACCIDEN - a.SUMACCIDEN);
        // Take top 5 cities
        const top5 = sorted.slice(0, 6);

        // Map to chart-friendly format
        const chartData = top5.map((city) => ({
          city: city.city,
          accidents: city.SUMACCIDEN,
        }));

        setData(chartData);
      });
  }, []);

  return (
    <>
      <TitlePage name={"תאונות דרכים בשנת 2023"} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: 4,
        }}
      >
        {/* LEFT SIDE – TEXT */}
        <Box sx={{ width: "40%", ml: 4 }}>
          <Typography variant="h5" gutterBottom>
            Lorem ipsum dolor sit amet.
          </Typography>

          <Typography variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            et, sit adipisci aspernatur voluptas deserunt dignissimos tempora
            vel, voluptatem iusto laborum temporibus dolores voluptate? Ipsum
            facilis architecto fuga vitae facere.
          </Typography>
        </Box>

        <Box sx={{ width: "60%", height: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accidents" fill="#9CC4D0" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import TitlePage from "../../elements/TitlePage";

// export default function AccidentPage() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const resourceId = "57c5aef9-70f9-4b71-82fa-52304cfbd031";
//     const limit = 1000;
//     const url = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceId}&limit=${limit}`;

//     const accidentsCached = localStorage.getItem("accidentsData");

//     if (accidentsCached) {
//       setData(JSON.parse(accidentsCached));
//     } else {
//       fetch(url)
//         .then((res) => res.json())
//         .then((json) => {
//           setData(json.result.records);
//           localStorage.setItem(
//             "accidentsData",
//             JSON.stringify(json.result.records)
//           );
//         })
//         .catch((error) => console.log(error));
//     }
//   }, []);

//   const summarizedData = data.reduce((acc, item) => {
//     const city = item.city || "לא ידוע";
//     const sumAcc = Number(item.SUMACCIDEN) || 0;

//     const found = acc.find((c) => c.city === city);
//     if (found) {
//       found.SUMACCIDEN += sumAcc;
//     } else {
//       acc.push({ city, SUMACCIDEN: sumAcc });
//     }

//     return acc;
//   }, []);

//   return (
//     <>
//       <TitlePage name={"Accidents"} />

//       <div style={{ width: "100%", height: 500 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={summarizedData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="city" angle={-45} textAnchor="end" interval={0} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="SUMACCIDEN" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </>
//   );
// }
