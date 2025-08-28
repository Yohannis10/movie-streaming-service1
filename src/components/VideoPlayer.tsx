import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ isOpen, onClose, movieTitle }) => {
  if (!isOpen) return null;

  // Sample video URLs - in a real app, these would come from your backend
  const sampleVideos = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  ];

  const randomVideo = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="absolute top-4 left-4 z-10">
          <h3 className="text-white text-lg font-semibold">{movieTitle}</h3>
          <p className="text-gray-300 text-sm">Sample Preview</p>
        </div>

        <video
          controls
          autoPlay
          className="w-full h-full"
          poster="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1"
        >
          <source src={randomVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;