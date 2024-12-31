function Video({ src }) {
  return (
    <div>
      <video src={src} controls autostart autoPlay muted/>
    </div>
  );
};
export default Video;