import { QuizSettings } from '@/type/questions';

export const dummyTestData: QuizSettings = {
  title: "Computer Fundamentals Test",
  coverImage: "",
  subject: "computer",
  grade: "A",
  language: "english",
  visibility: "public",
  questions: [
    {
      question: {
        text: "What does CPU stand for?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "easy",
      options: [
        { text: "Central Processing Unit" },
        { text: "Computer Processing Unit" },
        { text: "Central Processor Unit" },
        { text: "Computer Processor Unit" },
      ],
      answer: [{ text: "Central Processing Unit" }],
      explanation: {
        text: "CPU stands for Central Processing Unit, which is considered the brain of the computer, responsible for executing instructions and performing calculations.",
      },
    },
    {
      question: {
        text: "Which of the following is not an output device?",
      },
      type: "MULTIPLE",
      points: "1",
      time: "60",
      difficulty: "Easy",
      options: [
        { text: "Monitor" },
        { text: "Keyboard" },
        { text: "Printer" },
        { text: "Speaker" },
      ],
      answer: [{ text: "Keyboard" }, { text: "Printer" }],
      explanation: {
        text: "The keyboard is an input device used to input data into the computer, whereas the others listed (Monitor, Printer, Speaker) are output devices used to display or produce information.",
      },
    },
    {
      question: {
        text: "What is the main function of an operating system?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "Medium",
      options: [
        { text: "Manage hardware resources" },
        { text: "Run applications" },
        { text: "Store data" },
        { text: "Connect to the internet" },
      ],
      answer: [{ text: "Manage hardware resources" }],
      explanation: {
        text: "The main function of an operating system is to manage hardware resources, including memory, CPU, and peripheral devices, and provide a platform for running applications.",
      },
    },
    // Add other questions here

    {
      question: {
        text: "Which storage device has the fastest access time?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "Medium",
      options: [
        { text: "Solid State Drive (SSD)" },
        { text: "Hard Disk Drive (HDD)" },
        { text: "CD-ROM" },
        { text: "USB Flash Drive" },
      ],
      answer: [{ text: "Solid State Drive (SSD)" }],
      explanation: {
        text: "Solid State Drive (SSD) has the fastest access time among the listed storage devices because it uses flash memory for data storage, resulting in quicker data retrieval compared to traditional HDDs.",
      },
    },

    {
      question: {
        text: "What is the purpose of RAM in a computer?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "Hard",
      options: [
        { text: "Permanent storage of data" },
        { text: "Running applications" },
        { text: "Displaying output" },
        { text: "Temporary storage of data and instructions" },
      ],
      answer: [{ text: "Temporary storage of data and instructions" }],
      explanation: {
        text: "RAM (Random Access Memory) in a computer is used for temporary storage of data and instructions that the CPU needs to access quickly during program execution.",
      },
    },

    {
      question: {
        text: "Which of the following is not a type of computer virus?",
      },
      type: "Multiple Choice",
      points: "1",
      time: "60",
      difficulty: "Easy",
      options: [
        { text: "Trojan Horse" },
        { text: "Spyware" },
        { text: "Keyboard" },
        { text: "Worm" },
      ],
      answer: [{ text: "Keyboard" }],
      explanation: {
        text: "Keyboard is not a type of computer virus. Trojan Horse, Spyware, and Worm are examples of computer viruses.",
      },
    },
    {
      question: {
        text: "What is the default file extension for a Microsoft Word document?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "Easy",
      options: [
        { text: ".docx" },
        { text: ".pdf" },
        { text: ".txt" },
        { text: ".xls" },
      ],
      answer: [{ text: ".docx" }],
      explanation: {
        text: "The default file extension for a Microsoft Word document is .docx (Word Open XML Document), which is the format used for Word documents created in versions of Microsoft Word 2007 and later.",
      },
    },
    {
      question: {
        text: "What is the purpose of a router in a computer network?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "Medium",

      options: [
        { text: "To connect multiple devices within a network" },
        { text: "To amplify internet speed" },
        { text: "To store data" },
        { text: "To increase computer memory" },
      ],
      answer: [{ text: "To connect multiple devices within a network" }],
      explanation: {
        text: "A router in a computer network is used to connect multiple devices within a network and facilitate the exchange of data between them.",
      },
    },
    {
      question: {
        text: "Which of the following is an example of an input device?",
      },
      type: "Multiple Choice",
      points: "1",
      time: "60",
      difficulty: "Easy",
      options: [
        { text: "Monitor" },
        { text: "Printer" },
        { text: "Keyboard" },
        { text: "Speaker" },
      ],
      answer: [{ text: "Keyboard" }],
      explanation: {
        text: "A keyboard is an example of an input device, used to input data and commands into the computer system.",
      },
    },
    {
      question: {
        text: "What is the function of the BIOS in a computer?",
      },
      type: "SINGLE",
      points: "1",
      time: "60",
      difficulty: "Medium",
      options: [
        { text: "To load the operating system" },
        { text: "To display graphics on the screen" },
        { text: "To store user data" },
        { text: "To enhance internet speed" },
      ],
      answer: [{ text: "To load the operating system" }],
      explanation: {
        text: "The BIOS (Basic Input/Output System) in a computer is responsible for initializing and booting up the computer hardware and loading the operating system into memory.",
      },
    },
  ],
  tags: ["computer fundamentals", "test", "mixed"],
};
