import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Components
import ButtonRegion from "../elements/ButtonRegion";
import CardTextByEvent from "./CardTextByEvent";
import CityList from "./CityList";

// material ui
import { Box } from "@mui/material";

const markersData = [
  {
    id: 0,
    cityName: "ירושלים",
    position: [31.7776, 35.2305],
    story: `הוא חצה את הרחוב הראשי בעיר העתיקה של ירושלים, ובכל פינה הרגיש את
        הזיכרונות חוזרים — הרעש של הפיצוצים מהעימותים, ריח האבק והשריפות, הצעקות
        של האנשים מסביב. אפילו העץ הפשוט בכיכר הקטנה עורר בו תחושת אי-נוחות: כאן
        הבין שהעולם השתנה לצמיתות. למרות שהרחוב היום שקט ומלא חיים, גופו והלב
        שלו זכרו את כל מה שקרה שם. כל צעד במקום הזה מעורר את הזיכרון מחדש, כאילו
        האזור עצמו נשא את צלקות האירוע.`,
    date: "10.02.2020",
  },
  {
    id: 1,
    cityName: "תל אביב",
    position: [32.0853, 34.7818],
    story: `היא טיילה ברחוב דיזנגוף בצהריים, כשהשמש של אביב פיזרה אור על הבניינים הישנים והחנויות הקטנות. פתאום נשמע רעש חזק, כמו פיצוץ רחוק, והאוויר התמלא באבק וצרחות. הלב שלה קפץ; היא הרגישה את הזמן נעצר לרגע.
בכל פעם שהיא עברה שוב במקום הזה, אפילו שנים אחרי, הרעש החוזר בזיכרון גרם לה להקפיא, ידיה הזיעו והדופק שלה עלה. תל אביב תמיד הייתה מקום מלא חיים ושמחה, אבל עבורה, הרחוב הזה נשא את צל האירוע, זיכרון שלא נעלם.`,
    date: "23.07.2015",
  },
];

const words = ["spray", "elite", "exuberant", "destruction", "present"];

export default function Map() {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState("");
  const [story, setStory] = useState("");

  const israelBounds = [
    [33.3, 35.92], // north-east
    [29.48, 34.27], //south-west
  ];

  const handleMarkerClick = (id) => {
    id = Number(id);
    const obj = markersData.find((marker) => marker.id === id);
    setCityName(obj.cityName);
    setStory(obj.story);
    setDate(obj.date);
  };

  const markerElement = () => {
    return markersData.map((marker) => {
      return (
        <Marker
          key={marker.id}
          position={marker.position}
          eventHandlers={{ click: () => handleMarkerClick(marker["id"]) }}
        >
          <Popup>{marker.cityName}</Popup>
        </Marker>
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 4, // spacing between left and right
        p: 2, // padding around container
        mt: 6,
        alignItems: "flex-start",
        //backgroundColor: "lightgray",
      }}
    >
      <Box sx={{ flex: 1, border: "0px solid #000", height: "600px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            border: "1px solid #000",
            height: "50%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <CityList />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ButtonRegion />
          </Box>
        </Box>
        <Box sx={{ height: "50%" }}>
          <CardTextByEvent story={story} cityName={cityName} date={date} />
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <MapContainer
          bounds={israelBounds}
          style={{ height: "600px", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {markerElement()}
        </MapContainer>
      </Box>
    </Box>
  );
}
