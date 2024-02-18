import Image from 'next/image';

import { useQuizData } from '@/provider/QuizDataProvider';

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
                <tr className="border-b-2 border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Subject:</strong>
                  </td>
                  <td className="py-2">{quiz.subject}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Grade:</strong>
                  </td>
                  <td className="py-2">{quiz.grade}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="pr-4 py-2">
                    <strong className="text-gray-800">Language:</strong>
                  </td>
                  <td className="py-2">{quiz.language}</td>
                </tr>
                <tr>
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
              <div key={index} className="mb-4">
                <div className="flex md:flex-row flex-col-reverse justify-between md:items-center border-b-2 border-gray-500">
                  <h3 className="text-lg font-semibold mb-1">
                    Q.{index + 1}: {question.question.text}
                  </h3>
                  <span className="text-sm font-semibold wfull text-end">
                    {question.points} Points | {question.time} sec |{" "}
                    {question.difficulty}
                  </span>
                </div>
                <ol className="list-inside list-decimal">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className={`${
                        question.answer.includes(option) &&
                        "text-green-500 font-semibold"
                      }`}
                    >
                      {option.text}
                    </li>
                  ))}
                </ol>
                <p className="text-sm mt-2">
                  <strong>Explanation: </strong>
                  {question.explanation.text}
                </p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
