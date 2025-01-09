const Listen = () => {
  const videos = [
    {
      id: "RHyadcYpB3k", // Replace with actual YouTube video IDs
      title: "Studio Session 1",
    },
    {
      id: "yb66jVzFVpY",
      title: "Studio Session 2",
    },
    {
      id: "7x3cTeT3NA8",
      title: "Studio Session 3",
    },
  ];

  return (
    <section id="listen" className="py-20 bg-studio-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl  text-center mb-12">
          <span className="bg-gradient-to-r from-studio-copper to-studio-gold bg-clip-text text-transparent">
            Listen
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative aspect-video bg-black/20 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listen;