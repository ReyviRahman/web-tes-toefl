import { useEffect, useState } from "react";
import questions from "../../data/structure.json";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../components/NavbarUser";
import Main from "../../components/Main";

const Structure = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(10 * 60); // 25 menit
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setSelectedOption(answers[currentIndex]);
  }, [currentIndex]);

  const handleOptionChange = (i) => {
    setSelectedOption(i);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = i;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("structureAnswers", JSON.stringify(answers));
    navigate("/reading");
  };

  const jumpTo = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <NavbarUser />
      <Main>
        <div className="container mx-auto">
          {/* Header Timer */}
          <div className="flex sm:flex-row flex-col justify-between border border-b-0 py-2">
            <div className="flex sm:ms-5 mx-2">
              <button
                type="button"
                onClick={handleFinish}
                className="sm:w-fit w-full bg-green-600 px-3 py-1 rounded text-white"
              >
                Selesai
              </button>
              <h1 className="sm:w-fit w-full px-3 py-1 text-red-600 border ms-2 rounded text-center">
                {formatTime()}
              </h1>
            </div>
            <h1 className="px-3 py-1 text-primary text-center border ms-2 me-2 mt-2 sm:mt-0 rounded">
              SESI: STRUCTURE AND WRITTEN EXPRESSION
            </h1>
          </div>

          {/* Konten Utama */}
          <div className="flex sm:flex-row flex-col border min-h-[589px]">
            {/* Kolom Soal */}
            <div className="basis-full sm:p-10 p-2 flex flex-col gap-3">
              {currentQuestion.type === "written" ? (
                <>
                  <p className="text-lg mb-3">
                    Pilih bagian yang salah pada kalimat di bawah ini:
                  </p>
                  <div
                    className="border p-3 rounded-md bg-gray-50"
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion.question,
                    }}
                  />
                </>
              ) : (
                <p className="text-lg">{currentQuestion.question}</p>
              )}

              <div className="flex mt-4">
                <div className="pe-2">
                  <p className="border border-secondary px-3 py-1 rounded-md">
                    {currentIndex + 1}
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {["A", "B", "C", "D"].map((label, idx) => (
                    <div className="flex items-center" key={idx}>
                      <input
                        id={`option-${idx}`}
                        type="radio"
                        name="answer"
                        checked={selectedOption === idx}
                        onChange={() => handleOptionChange(idx)}
                        className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor={`option-${idx}`}
                        className="cursor-pointer ml-2 break-words"
                      >
                        ({label}) {currentQuestion.options?.[idx] ?? ""}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="mt-5" />
              <div className="flex justify-between">
                {currentIndex > 0 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center"
                  >
                    <span className="material-symbols-outlined border border-secondary rounded-full me-2">
                      chevron_left
                    </span>
                    Sebelumnya
                  </button>
                ) : (
                  <div />
                )}

                {currentIndex + 1 < questions.length ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center"
                  >
                    Selanjutnya
                    <span className="material-symbols-outlined border border-secondary rounded-full ms-2">
                      chevron_right
                    </span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {/* Kolom Navigasi Soal */}
            <div className="basis-1/3 border-l sm:border-t-0 border-t-1 p-4">
              <div className="grid grid-cols-5 gap-4">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => jumpTo(index)}
                    className={`border py-1 text-center rounded cursor-pointer ${
                      currentIndex === index
                        ? "bg-primary text-white"
                        : answers[index] !== null
                        ? "border-secondary"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Structure;
