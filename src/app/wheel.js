'use client';
import { Heart, Star, Wand2 } from 'lucide-react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const KindergartenSelector = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [winner, setWinner] = useState(null);
  const [predetermined, setPredetermined] = useState(null);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  
 const students = [
    "🦁 Anh",
    "🐘 Châu",
    "🐯 Dạt",
    "🐰 Hào",
    "🐶 Hân",
    "🐱 Hương",
    "🐼 Khánh",
    "🦊 Liên",
    "🐸 Bảo Long",
    "🦒 Thành Long",
    "🐢 Ngọc Ngân",
    "🐨 Bảo Ngân",
    "🦄 Ngọc",
    "🐠 Nhân",
    "🦋 Như",
    "🐝 Oanh",
    "🐹 Phong",
    "🦉 Phú",
    "🦁 Phúc",
    "🐘 Thọ",
    "🐯 Tiến",
    "🐰 Tính",
    "🐶 Trân",
    "🐱 Trúc",
    "🐼 Trực",
    "🦊 Uyên",
    "🐸 Vy",
    "🐢 Ý"
  ];

  const getRandomIndex = (exclude = null) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * students.length);
    } while (newIndex === exclude);
    return newIndex;
  };

  const startSelection = () => {
    if (isSelecting || !predetermined) return;
    
    setIsSelecting(true);
    setWinner(null);
    setShowWinnerDialog(false);
    
    const targetIndex = students.indexOf(predetermined);
    let jumps = 0;
    const totalJumps = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
    let speed = 250;
    
    const jumpToRandom = () => {
      if (jumps < totalJumps) {
        setActiveIndex(getRandomIndex(activeIndex));
        jumps++;
        setTimeout(jumpToRandom, speed);
      } else {
        setActiveIndex(targetIndex);
        setIsSelecting(false);
        setWinner(predetermined);
        setShowWinnerDialog(true);
      }
    };
    
    jumpToRandom();
  };

  const toggleTeacherMode = () => {
    setIsTeacherMode(!isTeacherMode);
    // setPredetermined(null);
    // setWinner(null);
    setShowWinnerDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Teacher Mode Toggle */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTeacherMode}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full 
                     hover:bg-purple-200 transition-colors"
          >
            <Wand2 className="w-4 h-4 text-purple-600" />
            <span className="text-purple-600 font-medium">
              {isTeacherMode ? "Exit Teacher Mode" : "Teacher Mode"}
            </span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-400 animate-spin" />
            Let's Pick a Friend!
            <Star className="w-8 h-8 text-yellow-400 animate-spin" />
          </h1>
        </div>

        {/* Teacher Mode Selection Panel */}
        {isTeacherMode && (
          <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
            <h2 className="text-purple-600 font-bold mb-4">Choose the Winner:</h2>
            <div className="grid grid-cols-4 gap-2">
              {students.map((student) => (
                <button
                  key={student}
                  onClick={() => {
                    setPredetermined(student)
                    toggleTeacherMode();
                  }}
                  className={`p-2 rounded-xl transition-all
                    ${predetermined === student ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-blue-50 hover:bg-blue-100'}
                  `}
                >
                  {student}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Display */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl mb-8">
          <div className="grid grid-cols-4 gap-4">
            {students.map((student, index) => (
              <div
                key={student}
                className={`
                  relative p-4 rounded-2xl transition-all duration-300
                  ${activeIndex === index ? 'transform scale-110' : ''}
                  ${activeIndex === index ? 'bg-yellow-100' : 'bg-blue-50'}
                  border-4 
                  ${activeIndex === index ? 'border-yellow-400' : 'border-blue-200'}
                  hover:border-pink-300
                `}
              >
                <div className="text-center">
                  <div className="text-3xl mb-1">{student.split(' ')[0]}</div>
                  <div className="text-lg font-bold text-purple-600">
                    {student.split(' ')[1]}
                  </div>
                </div>
                
                {activeIndex === index && (
                  <div className="absolute -inset-1">
                    <div className="absolute top-0 right-0">
                      <Heart className="w-6 h-6 text-pink-400 animate-bounce" />
                    </div>
                    <div className="absolute top-0 left-0">
                      <Heart className="w-6 h-6 text-pink-400 animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={startSelection}
            disabled={isSelecting || !predetermined}
            className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 
                     text-white text-2xl font-bold rounded-full shadow-lg
                     hover:from-pink-500 hover:to-purple-500 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform transition hover:scale-105"
          >
            {isSelecting ? '✨ Picking... ✨' : '🌈 Pick a Friend! 🌈'}
          </button>
          
          {!predetermined && (
            <div className="text-purple-600 font-medium">
              {isTeacherMode ? "Please select a winner first" : "Waiting for teacher to set up..."}
            </div>
          )}
        </div>

        {/* Winner Dialog */}
        <AlertDialog open={showWinnerDialog} onOpenChange={setShowWinnerDialog}>
          <AlertDialogContent className="bg-gradient-to-r from-pink-100 to-purple-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl text-center text-purple-600 mb-4">
                🎉 We Have a Winner! 🎉
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                <div className="text-4xl mb-4">{winner?.split(' ')[0]}</div>
                <div className="text-2xl font-bold text-purple-600">
                  {winner?.split(' ')[1]}
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-2">
                Yay! 🎈
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default KindergartenSelector;