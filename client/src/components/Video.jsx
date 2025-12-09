import ReactPlayer from "react-player";

export default function Video() {
  return (
    <div
      style={{
        marginTop: "50px",
        backgroundColor: "#f0f0f0",
        padding: "40px 0",
        display: "flex",
        justifyContent: "left",
      }}
    >
      <ReactPlayer
        slot="media"
        src="https://www.youtube.com/watch?v=2KXtlIX_yUs"
        style={{ height: "450px", width: "50%" }}
        controls={false}
      />
    </div>
  );
}
