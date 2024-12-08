const VideoAnimation = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-lg">
      {/* Video Element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full object-cover">
        <source src="/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="rounded-lg bg-black/50 px-6 py-3 text-3xl font-bold text-white">
          Your Animation Title
        </h2>
      </div>
    </div>
  );
};

export default VideoAnimation;
