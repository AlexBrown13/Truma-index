import ReactPlayer from "react-player";

export default function Video() {
  return (
    <div
      style={{
        marginTop: "50px",
        backgroundColor: "#f0f0f0",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          width: "50%",
          height: "450px",
        }}
      >
        <ReactPlayer
          slot="media"
          src="https://www.youtube.com/watch?v=2KXtlIX_yUs"
          style={{ height: "100%", width: "100%" }}
          controls={false}
        />
      </div>
    </div>
  );
}
