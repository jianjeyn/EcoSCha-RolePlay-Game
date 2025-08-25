import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Background from "../components/common/Background";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/quiz-topics`)
      .then(res => {
        setTopics(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setQuestions(topic.questions);
    setCurrentIdx(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setFinished(true);
    }
  };

  const checkEssayAnswer = (input, sample) => {
    // Case-insensitive, ignore whitespace
    return input.trim().toLowerCase() === sample.trim().toLowerCase();
  };

  if (loading) {
    return <div className="text-center text-white">Memuat soal...</div>;
  }

  if (!selectedTopic) {
    return (
      <Background>
        <Header />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          <h1 className="text-white text-2xl font-bold mb-8">Pilih Topik Quiz</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <button key={topic._id} onClick={() => handleTopicSelect(topic)} className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-all">
                <img src={topic.cardImage} alt={topic.topicName} className="w-32 h-32 object-contain mx-auto mb-4" />
                <div className="font-bold text-lg text-gray-800 text-center mb-2">{topic.topicName}</div>
                <div className="text-gray-700 text-center mb-2">{topic.topicTitle}</div>
                <div className="text-gray-500 text-center text-sm">{topic.description}</div>
              </button>
            ))}
          </div>
        </main>
      </Background>
    );
  }

  if (finished) {
    // Simpan jawaban ke backend jika perlu
    setTimeout(() => navigate("/leaderboard"), 1500);
    return (
      <Background>
        <Header />
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          <h1 className="text-green-600 text-3xl font-bold mb-8">Quiz Selesai!</h1>
          <p className="text-white">Jawabanmu telah direkam. Menunggu hasil leaderboard...</p>
        </main>
      </Background>
    );
  }

  const q = questions[currentIdx];
  return (
    <Background>
      <Header />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl text-center">
          <h2 className="text-xl font-bold mb-4">{selectedTopic.topicTitle}</h2>
          <div className="mb-6 text-gray-800 font-poppins">{q.question}</div>
          {q.type === "multiple_choice" && (
            <div className="flex flex-col gap-4 mb-6">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(q.questionId, idx)}
                  className={`py-3 px-6 rounded-xl border ${answers[q.questionId] === idx ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
          {q.type === "true_false" && (
            <div className="flex flex-row gap-8 mb-6 justify-center">
              <button
                onClick={() => handleAnswer(q.questionId, true)}
                className={`py-3 px-6 rounded-xl border ${answers[q.questionId] === true ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800"}`}
              >Benar</button>
              <button
                onClick={() => handleAnswer(q.questionId, false)}
                className={`py-3 px-6 rounded-xl border ${answers[q.questionId] === false ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800"}`}
              >Salah</button>
            </div>
          )}
          {q.type === "essay" && (
            <div className="mb-6">
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-xl border bg-gray-200 text-gray-800"
                placeholder="Jawaban singkat..."
                value={answers[q.questionId] || ""}
                onChange={e => handleAnswer(q.questionId, e.target.value)}
              />
              {q.sampleAnswer && answers[q.questionId] && (
                <div className="mt-2 text-sm text-gray-500">
                  <strong>Contoh Jawaban:</strong> {q.sampleAnswer}
                  <br />
                  <span className={checkEssayAnswer(answers[q.questionId], q.sampleAnswer) ? "text-green-600" : "text-red-600"}>
                    {checkEssayAnswer(answers[q.questionId], q.sampleAnswer) ? "Jawaban benar" : "Jawaban belum sesuai"}
                  </span>
                </div>
              )}
            </div>
          )}
          <button
            onClick={handleNext}
            className="bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 font-poppins mt-4"
          >
            {currentIdx < questions.length - 1 ? "Lanjut Soal" : "Selesai Quiz"}
          </button>
        </div>
      </main>
    </Background>
  );
};

export default QuizPage;
