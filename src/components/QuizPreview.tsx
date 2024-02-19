import Image from 'next/image';

import { useQuizData } from '@/provider/QuizDataProvider';

import Accordion from './reusable/Accordion';

const QuizPreview = () => {
  const { quizData: quiz } = useQuizData();

  return (
    <div className=" relative w-full min-h-[90vh]">
      <div className="w-full bg-white rounded-lg  shadow-xl ">
        <div className="bg-gray-700 text-white px-4 py-2 flex justify-between items-center sticky top-[10vh]">
          <div className="flex items-center">
            <Image
              src={quiz.coverImage || "/quiz.jpg"}
              alt="quiz cover image"
              width={50}
              height={50}
            />
            <div className="flex flex-col ml-2">
              <h2 className="font-semibold text-lg">{quiz.title}</h2>
              <span className="text-sm">{quiz.subject}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold underline mb-2">Quiz Details</h2>

            <table className="table-auto w-full border-collapse">
              <tbody className="text-left">
                <tr className="border-b border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Subject:</strong>
                  </td>
                  <td className="py-2">{quiz.subject}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Grade:</strong>
                  </td>
                  <td className="py-2">{quiz.grade}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Language:</strong>
                  </td>
                  <td className="py-2">{quiz.language}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Visibility:</strong>
                  </td>
                  <td className="py-2">{quiz.visibility}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Tags:</strong>
                  </td>
                  <td className="py-2">{quiz.tags.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 underline">Questions</h2>
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-4  p-2 rounded-lg shadow-lg">
                <div className="flex md:flex-row flex-col-reverse justify-between md:items-center border-b-2 border-gray-500 py-4">
                  <div className="md:w-auto w-full">
                    <h3 className="text-lg font-semibold mb-1">
                      Q.{index + 1}: {question.question.text}
                    </h3>
                    {question.question?.image && (
                      <div className="flex justify-center">
                        <Image
                          src={question.question.image}
                          alt="Question Image"
                          width={200}
                          height={200}
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-sm font-semibold space-x-4">
                    <span>{question.type}</span>
                    <span>|</span>
                    <span>{question.points} Points</span>
                    <span>|</span>
                    <span>{question.time} sec</span>
                    <span>|</span>
                    <span>{question.difficulty}</span>
                  </div>
                </div>

                <ol className="list-inside list-decimal mt-2">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className={`flex items-center justify-between py-2 px-4 mb-2 rounded-md border border-gray-300 hover:border-gray-400 ${
                        question.answer.some((ans) => ans.text === option.text)
                          ? "bg-green-100 border-green-500 text-green-700 font-semibold"
                          : "bg-white"
                      }`}
                    >
                      <span className="flex-1">{option.text}</span>
                      {option.image && (
                        <div className="ml-4">
                          <Image
                            src={option.image}
                            alt="Option Image"
                            width={100}
                            height={100}
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
                <Accordion title="Explanation">
                  <div className="mt-2">
                    <p>{question.explanation.text}</p>
                    {question.explanation.image && (
                      <div className="mt-2">
                        <Image
                          src={question.explanation.image}
                          alt="explanation image"
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                  </div>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
