import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const LearningMaterialPage = () => {
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetchRandomMaterial();
  }, []);

  const fetchRandomMaterial = async () => {
    try {
      setLoading(true);
      // API call to get random material (video or article)
      const response = await fetch('/api/learning-materials/random');
      const material = await response.json();
      setCurrentMaterial(material);
      setShowContent(false); // Reset to instruction first
    } catch (error) {
      console.error('Error fetching material:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartLearning = () => {
    setShowContent(true);
  };

  const handleNext = () => {
    fetchRandomMaterial();
  };

  const renderVideoContent = (material) => (
    <div className="max-w-4xl w-full space-y-6">
      {/* Video Player */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={material.embedUrl}
          title={material.title}
          className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
          frameBorder="0"
          allowFullScreen
        />
      </div>
      
      {/* Video Info */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{material.title}</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {material.watchTime}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{material.summary}</p>
        
        {/* Key Points */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Poin Utama:</h3>
          <ul className="space-y-2">
            {material.keyPoints?.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Source Credit */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Sumber: {material.sourceCredit.platform} • 
            <span className="ml-1">Dipublikasi: {new Date(material.sourceCredit.publishedDate).toLocaleDateString('id-ID')}</span>
          </p>
        </div>
      </div>
    </div>
  );

  const renderArticleContent = (material) => (
    <div className="max-w-4xl w-full space-y-6">
      {/* Article Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{material.title}</h2>
          <div className="flex flex-col items-end space-y-2">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {material.readTime}
            </span>
            <span className="text-sm text-gray-500">{material.region}</span>
          </div>
        </div>
        
        {/* Thumbnail */}
        {material.thumbnailUrl && (
          <img
            src={material.thumbnailUrl}
            alt={material.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
            onError={(e) => {
              e.target.src = "/assets/images/placeholder-news.png";
            }}
          />
        )}
        
        {/* Summary */}
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-blue-800 mb-2">Ringkasan:</h3>
          <p className="text-blue-700">{material.summary}</p>
        </div>
        
        {/* Key Points */}
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-gray-800">Poin Utama:</h3>
          <ul className="space-y-2">
            {material.keyPoints?.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{material.content}</p>
        </div>
        
        {/* Source Credit */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Sumber: {material.sourceCredit.publication} • 
              <span className="ml-1">
                {new Date(material.publishedDate).toLocaleDateString('id-ID')}
              </span>
            </p>
            <a
              href={material.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Baca artikel lengkap
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow"></div>
        </div>
      );
    }

    if (!showContent && currentMaterial) {
      // Show instruction with preview
      return (
        <div className="max-w-4xl w-full space-y-6">
          {/* Instruction Image */}
          <div className="max-w-3xl w-full mx-auto">
            <img
              src="/assets/images/icons/vid-instruction.png"
              alt="Learning Instruction"
              className="w-full h-auto rounded-3xl shadow-lg"
            />
          </div>

          {/* Material Preview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-yellow text-white rounded-full font-semibold">
                {currentMaterial.type === 'video' ? '🎥 VIDEO' : '📰 ARTIKEL'}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800">
                {currentMaterial.title}
              </h3>
              
              <p className="text-gray-600 max-w-2xl mx-auto">
                {currentMaterial.summary}
              </p>
              
              <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
                <span>
                  ⏱️ {currentMaterial.type === 'video' ? currentMaterial.watchTime : currentMaterial.readTime}
                </span>
                <span>📍 {currentMaterial.region || currentMaterial.category}</span>
              </div>
              
              <button
                onClick={handleStartLearning}
                className="bg-yellow hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                MULAI BELAJAR
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (showContent && currentMaterial) {
      return (
        <div className="space-y-6">
          {currentMaterial.type === 'video' 
            ? renderVideoContent(currentMaterial)
            : renderArticleContent(currentMaterial)
          }
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
            >
              MATERI SELANJUTNYA
            </button>
            <button
              onClick={() => setShowContent(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
            >
              KEMBALI
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Background>
      <Header />

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
        {renderContent()}
      </main>
    </Background>
  );
};

export default LearningMaterialPage;