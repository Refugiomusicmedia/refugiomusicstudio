const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-studio-dark overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/fff43679-13ab-4436-8ab4-9b649738ed87.png"
          alt="Studio Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-studio-dark/80 to-studio-dark"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-studio-purple to-studio-pink bg-clip-text text-transparent">
            Refugio Music
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          A creative hub for artists, musicians and grassroots leaders that are using their talent to fulfill their dreams and inspire many others
        </p>
      </div>
    </div>
  );
};

export default Hero;