document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContainer = document.getElementById('quiz-container');
    const resultsScreen = document.getElementById('results-screen');
    const startButton = document.getElementById('start-quiz');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-quiz');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreElement = document.querySelector('#score span');
    const progressElement = document.querySelector('#progress span');
    const finalScoreElement = document.querySelector('#final-score span');
    const feedbackElement = document.getElementById('feedback');
    const imageContainer = document.getElementById('image-container');
    const staffNoteDisplay = document.getElementById('staff-note-display');
    const pianoContainer = document.getElementById('piano-container');
    const clefElement = document.getElementById('clef');
    const noteElement = document.getElementById('note');

    // Quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    let quizQuestions = [];

    // Event listeners
    startButton.addEventListener('click', startQuiz);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    restartButton.addEventListener('click', startQuiz);

    // Questions array
    const questions = [
        {
            question: "According to music theory, which two notes are particularly helpful to remember as reference points when reading notes on the treble clef?",
            imageType: "custom",
            imageUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMjAwIj4KICAgIDwhLS0gU3RhZmYgLS0+CiAgICA8ZyBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxsaW5lIHgxPSIzMCIgeTE9IjQwIiB4Mj0iNDcwIiB5Mj0iNDAiLz4KICAgICAgICA8bGluZSB4MT0iMzAiIHkxPSI2MCIgeDI9IjQ3MCIgeTI9IjYwIi8+CiAgICAgICAgPGxpbmUgeDE9IjMwIiB5MT0iODAiIHgyPSI0NzAiIHkyPSI4MCIvPgogICAgICAgIDxsaW5lIHgxPSIzMCIgeTE9IjEwMCIgeDI9IjQ3MCIgeTI9IjEwMCIvPgogICAgICAgIDxsaW5lIHgxPSIzMCIgeTE9IjEyMCIgeDI9IjQ3MCIgeTI9IjEyMCIvPgogICAgPC9nPgogICAgCiAgICA8IS0tIFRyZWJsZSBDbGVmIC0tPgogICAgPHRleHQgeD0iNDAiIHk9IjkwIiBmb250LXNpemU9IjYwIiBmb250LWZhbWlseT0ic2VyaWYiPiYjMTE5MDcwOzwvdGV4dD4KICAgIAogICAgPCEtLSBOb3RlcyAtLT4KICAgIDxnPgogICAgICAgIDxjaXJjbGUgY3g9IjE0MCIgY3k9IjEyMCIgcj0iOCIgZmlsbD0iYmxhY2siLz48dGV4dCB4PSIxMzUiIHk9IjE1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5FPC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjE4MCIgY3k9IjExMCIgcj0iOCIgZmlsbD0iYmxhY2siLz48dGV4dCB4PSIxNzUiIHk9IjE1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5GPC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjEwMCIgcj0iOCIgZmlsbD0iYmxhY2siLz48dGV4dCB4PSIyMTUiIHk9IjE1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJyZWQiPkc8L3RleHQ+CiAgICAgICAgPGNpcmNsZSBjeD0iMjYwIiBjeT0iOTAiIHI9IjgiIGZpbGw9ImJsYWNrIi8+PHRleHQgeD0iMjU1IiB5PSIxNTAiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCI+QTwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSI4MCIgcj0iOCIgZmlsbD0iYmxhY2siLz48dGV4dCB4PSIyOTUiIHk9IjE1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5CPC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjM0MCIgY3k9IjcwIiByPSI4IiBmaWxsPSJibGFjayIvPjx0ZXh0IHg9IjMzNSIgeT0iMTUwIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9InJlZCI+QzwvdGV4dD4KICAgICAgICA8Y2lyY2xlIGN4PSIzODAiIGN5PSI2MCIgcj0iOCIgZmlsbD0iYmxhY2siLz48dGV4dCB4PSIzNzUiIHk9IjE1MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj5EPC90ZXh0PgogICAgICAgIDxjaXJjbGUgY3g9IjQyMCIgY3k9IjUwIiByPSI4IiBmaWxsPSJibGFjayIvPjx0ZXh0IHg9IjQxNSIgeT0iMTUwIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiPkU8L3RleHQ+CiAgICA8L2c+CiAgICAKICAgIDwhLS0gTG9jYXRpb24gaW5kaWNhdG9ycyAtLT4KICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjEwMCIgcj0iMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmVkIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjQiLz4KICAgIDxjaXJjbGUgY3g9IjM0MCIgY3k9IjcwIiByPSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZWQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNCIvPgogICAgCiAgICA8dGV4dCB4PSIxMDAiIHk9IjE4MCIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPktleSByZWZlcmVuY2UgcG9pbnRzIGluIHRoZSB0cmVibGUgY2xlZjogQyBhbmQgRzwvdGV4dD4KPC9zdmc+",
            answers: [
                { text: "C and G", correct: true },
                { text: "E and A", correct: false },
                { text: "F and B", correct: false },
                { text: "D and F", correct: false }
            ],
            explanation: "The positions of C and G on the staff are important reference points that make it easier to read other notes on the staff. G sits on the second line, while C sits on the first ledger line above the staff."
        },
        {
            question: "What are the seven basic pitch names used in Western music?",
            answers: [
                { text: "A, B, C, D, E, F, G", correct: true },
                { text: "Do, Re, Mi, Fa, Sol, La, Ti", correct: false },
                { text: "1, 2, 3, 4, 5, 6, 7", correct: false },
                { text: "C, D, E, F, G, A, B", correct: false }
            ]
        },
        {
            question: "What does this symbol represent?",
            imageType: "clef",
            clefType: "treble",
            answers: [
                { text: "Bass Clef", correct: false },
                { text: "Treble Clef", correct: true },
                { text: "Alto Clef", correct: false },
                { text: "Tenor Clef", correct: false }
            ]
        },
        {
            question: "What does this symbol represent?",
            imageType: "clef",
            clefType: "bass",
            answers: [
                { text: "Bass Clef", correct: true },
                { text: "Treble Clef", correct: false },
                { text: "Alto Clef", correct: false },
                { text: "Tenor Clef", correct: false }
            ]
        },
        {
            question: "On the piano keyboard, how many black keys are in each octave?",
            answers: [
                { text: "5", correct: true },
                { text: "7", correct: false },
                { text: "8", correct: false },
                { text: "12", correct: false }
            ]
        },
        {
            question: "How many lines does a standard musical staff have?",
            answers: [
                { text: "4", correct: false },
                { text: "5", correct: true },
                { text: "6", correct: false },
                { text: "7", correct: false }
            ]
        },
        {
            question: "What note is represented on the treble clef's second line from the bottom?",
            imageType: "staff",
            clefType: "treble",
            notePosition: "line-2", // Position for G4
            answers: [
                { text: "E", correct: false },
                { text: "F", correct: false },
                { text: "G", correct: true },
                { text: "A", correct: false }
            ]
        },
        {
            question: "What note is represented on the bass clef's second line from the top?",
            imageType: "staff",
            clefType: "bass",
            notePosition: "line-4", // Position for D3
            answers: [
                { text: "C", correct: false },
                { text: "D", correct: true },
                { text: "E", correct: false },
                { text: "F", correct: false }
            ]
        },
        {
            question: "The modern musical staff evolved from what early notation system?",
            answers: [
                { text: "Gregorian neumes", correct: true },
                { text: "Egyptian hieroglyphics", correct: false },
                { text: "Chinese tablature", correct: false },
                { text: "Roman numerals", correct: false }
            ],
            explanation: "The modern staff evolved from Gregorian neumes, which were symbols placed above text to indicate melodic movement."
        },
        {
            question: "The lines and spaces of the staff represent:",
            answers: [
                { text: "Pitch heights", correct: true },
                { text: "Rhythmic values", correct: false },
                { text: "Finger positions", correct: false },
                { text: "Volume levels", correct: false }
            ],
            explanation: "The vertical position on the staff represents the pitch height - higher positions indicate higher pitches, and lower positions indicate lower pitches."
        },
        {
            question: "Why does the treble clef wrap around the G line?",
            answers: [
                { text: "To mark the position of G4", correct: true },
                { text: "It's just decorative", correct: false },
                { text: "To separate high and low notes", correct: false },
                { text: "To indicate the start of a measure", correct: false }
            ],
            explanation: "The treble clef (also called G clef) wraps around the second line from the bottom, marking the position of G4. This helps musicians locate other notes in relation to G."
        },
        {
            question: "Which octave contains 'Middle C'?",
            answers: [
                { text: "Octave 2", correct: false },
                { text: "Octave 3", correct: false },
                { text: "Octave 4", correct: true },
                { text: "Octave 5", correct: false }
            ]
        },
        {
            question: "What do we call the short lines drawn above or below the staff to extend its range?",
            answers: [
                { text: "Extension lines", correct: false },
                { text: "Range lines", correct: false },
                { text: "Ledger lines", correct: true },
                { text: "Staff markers", correct: false }
            ]
        },
        {
            question: "What mnemonic is commonly used to remember the lines in the treble clef (from bottom to top)?",
            answers: [
                { text: "Every Good Boy Does Fine", correct: true },
                { text: "Empty Garbage Before Dad Flips", correct: false },
                { text: "Every Girl Buys Dress Fabric", correct: false },
                { text: "Even George Bush Drives Fast", correct: false }
            ]
        },
        {
            question: "What mnemonic is commonly used to remember the spaces in the treble clef (from bottom to top)?",
            answers: [
                { text: "FACE", correct: true },
                { text: "ACEG", correct: false },
                { text: "FBAD", correct: false },
                { text: "EGBD", correct: false }
            ]
        },
        {
            question: "What mnemonic is commonly used to remember the lines in the bass clef (from bottom to top)?",
            answers: [
                { text: "Good Boys Do Fine Always", correct: true },
                { text: "Great Big Dogs Fight Animals", correct: false },
                { text: "Giant Birds Don't Fly Away", correct: false },
                { text: "Good Burritos Don't Fall Apart", correct: false }
            ]
        },
        {
            question: "What mnemonic is commonly used to remember the spaces in the bass clef (from bottom to top)?",
            answers: [
                { text: "All Cows Eat Grass", correct: true },
                { text: "A Cat Eats Grapes", correct: false },
                { text: "All Children Enjoy Games", correct: false },
                { text: "Always Check Every Gate", correct: false }
            ]
        },
        {
            question: "Which note does the treble clef symbol curl around, marking its position?",
            answers: [
                { text: "G4", correct: true },
                { text: "F4", correct: false },
                { text: "E4", correct: false },
                { text: "A4", correct: false }
            ]
        },
        {
            question: "Which note do the dots on the bass clef surround, marking its position?",
            answers: [
                { text: "F3", correct: true },
                { text: "G3", correct: false },
                { text: "E3", correct: false },
                { text: "D3", correct: false }
            ]
        },
        {
            question: "Where is Middle C (C4) located in relation to the treble clef?",
            answers: [
                { text: "On the first ledger line below the staff", correct: true },
                { text: "On the bottom line of the staff", correct: false },
                { text: "On the first space of the staff", correct: false },
                { text: "On the first ledger line above the staff", correct: false }
            ]
        },
        {
            question: "Where is Middle C (C4) located in relation to the bass clef?",
            answers: [
                { text: "On the first ledger line above the staff", correct: true },
                { text: "On the top line of the staff", correct: false },
                { text: "On the top space of the staff", correct: false },
                { text: "On the second ledger line above the staff", correct: false }
            ]
        },
        {
            question: "On the piano keyboard, black keys are arranged in groups of:",
            imageType: "piano",
            answers: [
                { text: "2 and 3", correct: true },
                { text: "3 and 4", correct: false },
                { text: "1 and 2", correct: false },
                { text: "3 and 2", correct: false }
            ]
        },
        {
            question: "Which of the following is NOT a common type of clef used in music notation?",
            answers: [
                { text: "Treble clef", correct: false },
                { text: "Bass clef", correct: false },
                { text: "Alto clef", correct: false },
                { text: "B clef", correct: true }
            ],
            explanation: "The common clefs in music notation are the Treble (G) clef, Bass (F) clef, Alto (C) clef, and Tenor (C) clef. There is no standard 'B clef'."
        },
        {
            question: "What instrument typically uses the bass clef?",
            answers: [
                { text: "Flute", correct: false },
                { text: "Cello", correct: true },
                { text: "Violin", correct: false },
                { text: "Clarinet", correct: false }
            ],
            explanation: "The cello typically uses the bass clef for much of its music because it plays in a lower register, though it sometimes uses tenor or treble clef for higher passages."
        },
        {
            question: "Why do we need different clefs in music?",
            answers: [
                { text: "To avoid using too many ledger lines", correct: true },
                { text: "To make music harder to read", correct: false },
                { text: "For historical reasons only", correct: false },
                { text: "To indicate different tempos", correct: false }
            ],
            explanation: "Different clefs allow us to notate different pitch ranges while minimizing the use of ledger lines, making the music easier to read for various instruments and vocal ranges."
        },
        {
            question: "Which key represents an enharmonic equivalent (two names for the same pitch)?",
            answers: [
                { text: "C", correct: false },
                { text: "D", correct: false },
                { text: "F", correct: false },
                { text: "C♯/D♭", correct: true }
            ]
        },
        {
            question: "What is the standard range of a piano in octave notation?",
            answers: [
                { text: "A0 to C8", correct: true },
                { text: "C1 to A8", correct: false },
                { text: "G1 to F8", correct: false },
                { text: "C0 to C9", correct: false }
            ]
        },
        {
            question: "What is the difference between a staff and a stave in music notation?",
            answers: [
                { text: "There is no difference - they are the same thing", correct: true },
                { text: "A staff has 4 lines while a stave has 5 lines", correct: false },
                { text: "A staff is used for vocal music while a stave is for instrumental music", correct: false },
                { text: "A staff is horizontal while a stave is vertical", correct: false }
            ],
            explanation: "Staff and stave are two terms for the same thing - a set of five horizontal lines used for music notation."
        },
        {
            question: "How many spaces are there between the lines of a staff?",
            answers: [
                { text: "3 spaces", correct: false },
                { text: "4 spaces", correct: true },
                { text: "5 spaces", correct: false },
                { text: "6 spaces", correct: false }
            ],
            explanation: "A staff has five lines and four spaces between them."
        },
        {
            question: "When a note is written on a line of the staff, where does the line pass through the note?",
            answers: [
                { text: "The top of the note", correct: false },
                { text: "The bottom of the note", correct: false },
                { text: "The center of the note", correct: true },
                { text: "The left side of the note", correct: false }
            ],
            explanation: "When a note is written on a line, the line passes through the center of the note."
        },
        {
            question: "What determines the pitch of a note on the staff?",
            answers: [
                { text: "The size of the note", correct: false },
                { text: "The color of the note", correct: false },
                { text: "The position of the note (higher or lower)", correct: true },
                { text: "The shape of the note", correct: false }
            ],
            explanation: "The vertical position of a note on the staff determines its pitch - higher positions indicate higher pitches."
        },
        {
            question: "How are notes that are written above each other on the staff played?",
            answers: [
                { text: "They are played one after another", correct: false },
                { text: "They are played at the same time", correct: true },
                { text: "They are played in reverse order", correct: false },
                { text: "They are played randomly", correct: false }
            ],
            explanation: "Notes written vertically above each other on the staff are played simultaneously."
        },
        {
            question: "What are ledger lines used for?",
            answers: [
                { text: "To connect different staves", correct: false },
                { text: "To extend the staff for notes that are too high or low", correct: true },
                { text: "To indicate the end of a musical phrase", correct: false },
                { text: "To show the time signature", correct: false }
            ],
            explanation: "Ledger lines are short lines that extend the staff when notes are too high or low to write on the staff itself."
        },
        {
            question: "How are the lines and spaces of the staff counted?",
            answers: [
                { text: "From top to bottom", correct: false },
                { text: "From bottom to top", correct: true },
                { text: "From left to right", correct: false },
                { text: "From right to left", correct: false }
            ],
            explanation: "The lines and spaces of the staff are counted from bottom to top, with the bottom line being the 1st line."
        },
        {
            question: "What is the correct way to read notes on a staff?",
            answers: [
                { text: "From right to left", correct: false },
                { text: "From top to bottom", correct: false },
                { text: "From left to right", correct: true },
                { text: "From bottom to top", correct: false }
            ],
            explanation: "Notes on the staff are read from left to right, with notes on the left being played before notes on the right."
        },
        {
            question: "When a note is written in a space of the staff, how does it appear?",
            answers: [
                { text: "The note is split by the space", correct: false },
                { text: "The note fills the entire space", correct: true },
                { text: "The note is written above the space", correct: false },
                { text: "The note is written below the space", correct: false }
            ],
            explanation: "When a note is written in a space, it fills the entire space between the lines."
        },
        {
            question: "What is the plural form of both 'staff' and 'stave'?",
            answers: [
                { text: "staffs and staves", correct: false },
                { text: "staves", correct: true },
                { text: "staffs", correct: false },
                { text: "staffes", correct: false }
            ],
            explanation: "The plural form of both 'staff' and 'stave' is 'staves'."
        },
        {
            question: "What is the pattern of black keys on a piano keyboard?",
            answers: [
                { text: "Groups of 2 and 3", correct: true },
                { text: "Groups of 3 and 4", correct: false },
                { text: "Groups of 1 and 2", correct: false },
                { text: "Groups of 4 and 5", correct: false }
            ],
            explanation: "The black keys on a piano keyboard appear in groups of 2 and 3, with the group of 2 appearing before and after each C."
        },
        {
            question: "How can you identify the note C on a piano keyboard?",
            answers: [
                { text: "It's the white key just to the left of any group of 2 black keys", correct: true },
                { text: "It's the white key just to the right of any group of 2 black keys", correct: false },
                { text: "It's the white key between any group of 3 black keys", correct: false },
                { text: "It's the white key at the very end of the keyboard", correct: false }
            ],
            explanation: "The white key just to the left of any group of 2 black keys is always a C."
        },
        {
            question: "What is an enharmonic equivalent?",
            answers: [
                { text: "Two different names for the same pitch", correct: true },
                { text: "Two different pitches with the same name", correct: false },
                { text: "Two notes that sound exactly the same", correct: false },
                { text: "Two notes that are one octave apart", correct: false }
            ],
            explanation: "An enharmonic equivalent is when a note can be called by two different names, like C♯ and D♭, which are the same pitch."
        },
        {
            question: "What is the standard range of a piano in octave notation?",
            answers: [
                { text: "A0 to C8", correct: true },
                { text: "C0 to A8", correct: false },
                { text: "G1 to F8", correct: false },
                { text: "C0 to C9", correct: false }
            ],
            explanation: "A standard piano has 88 keys, ranging from A0 (the lowest A) to C8 (the highest C)."
        },
        {
            question: "What is the mnemonic for remembering the lines in the treble clef from bottom to top?",
            answers: [
                { text: "Every Good Boy Does Fine", correct: true },
                { text: "Good Boys Do Fine Always", correct: false },
                { text: "All Cows Eat Grass", correct: false },
                { text: "FACE", correct: false }
            ],
            explanation: "The mnemonic 'Every Good Boy Does Fine' helps remember the lines in the treble clef: E, G, B, D, F."
        },
        {
            question: "What is the mnemonic for remembering the spaces in the treble clef from bottom to top?",
            answers: [
                { text: "FACE", correct: true },
                { text: "Every Good Boy Does Fine", correct: false },
                { text: "All Cows Eat Grass", correct: false },
                { text: "Good Boys Do Fine Always", correct: false }
            ],
            explanation: "The spaces in the treble clef spell out 'FACE': F, A, C, E."
        },
        {
            question: "What is the mnemonic for remembering the lines in the bass clef from bottom to top?",
            answers: [
                { text: "Good Boys Do Fine Always", correct: true },
                { text: "Every Good Boy Does Fine", correct: false },
                { text: "All Cows Eat Grass", correct: false },
                { text: "FACE", correct: false }
            ],
            explanation: "The mnemonic 'Good Boys Do Fine Always' helps remember the lines in the bass clef: G, B, D, F, A."
        },
        {
            question: "What is the mnemonic for remembering the spaces in the bass clef from bottom to top?",
            answers: [
                { text: "All Cows Eat Grass", correct: true },
                { text: "Good Boys Do Fine Always", correct: false },
                { text: "Every Good Boy Does Fine", correct: false },
                { text: "FACE", correct: false }
            ],
            explanation: "The mnemonic 'All Cows Eat Grass' helps remember the spaces in the bass clef: A, C, E, G."
        },
        {
            question: "Where is Middle C (C4) located on the treble clef?",
            answers: [
                { text: "On the first ledger line below the staff", correct: true },
                { text: "On the bottom line of the staff", correct: false },
                { text: "On the first space of the staff", correct: false },
                { text: "On the first ledger line above the staff", correct: false }
            ],
            explanation: "Middle C (C4) is written on the first ledger line below the treble clef staff."
        },
        {
            question: "Where is Middle C (C4) located on the bass clef?",
            answers: [
                { text: "On the first ledger line above the staff", correct: true },
                { text: "On the top line of the staff", correct: false },
                { text: "On the top space of the staff", correct: false },
                { text: "On the first ledger line below the staff", correct: false }
            ],
            explanation: "Middle C (C4) is written on the first ledger line above the bass clef staff."
        },
        {
            question: "What is the purpose of ledger lines?",
            answers: [
                { text: "To extend the staff for notes that are too high or low", correct: true },
                { text: "To connect different staves", correct: false },
                { text: "To indicate the end of a musical phrase", correct: false },
                { text: "To show the time signature", correct: false }
            ],
            explanation: "Ledger lines extend the staff when we need to notate pitches that are higher or lower than the staff can accommodate."
        },
        {
            question: "How many ledger lines can be used for a single note?",
            answers: [
                { text: "As many as needed", correct: true },
                { text: "Maximum of 2", correct: false },
                { text: "Maximum of 3", correct: false },
                { text: "Maximum of 4", correct: false }
            ],
            explanation: "Multiple ledger lines can be used as needed to notate very high or low notes."
        },
        {
            question: "What is the relationship between the piano keyboard and the grand staff?",
            answers: [
                { text: "Bass clef for lower notes, treble clef for higher notes", correct: true },
                { text: "Bass clef for higher notes, treble clef for lower notes", correct: false },
                { text: "Bass clef for left hand, treble clef for right hand", correct: false },
                { text: "Bass clef for black keys, treble clef for white keys", correct: false }
            ],
            explanation: "The bass clef corresponds to the lower section of the keyboard (left side), while the treble clef corresponds to the higher section (right side)."
        },
        {
            question: "What is the standard number of keys on a piano?",
            answers: [
                { text: "88", correct: true },
                { text: "76", correct: false },
                { text: "61", correct: false },
                { text: "49", correct: false }
            ],
            explanation: "A standard piano has 88 keys, ranging from A0 to C8."
        },
        {
            question: "What is the pattern of white and black keys on a piano?",
            answers: [
                { text: "White keys for natural notes, black keys for sharps and flats", correct: true },
                { text: "White keys for sharps, black keys for flats", correct: false },
                { text: "White keys for high notes, black keys for low notes", correct: false },
                { text: "White keys for major keys, black keys for minor keys", correct: false }
            ],
            explanation: "The white keys represent the seven natural notes (A, B, C, D, E, F, G), while the black keys represent the sharps and flats."
        },
        {
            question: "What is the relationship between the position of notes on the staff and their pitch?",
            answers: [
                { text: "Higher position = higher pitch, lower position = lower pitch", correct: true },
                { text: "Higher position = lower pitch, lower position = higher pitch", correct: false },
                { text: "Position doesn't affect pitch", correct: false },
                { text: "Position only matters for rhythm", correct: false }
            ],
            explanation: "As notes move higher on the staff, their pitch increases, and as they move lower, their pitch decreases."
        },
        {
            question: "What is the purpose of the grand staff?",
            answers: [
                { text: "To combine treble and bass clefs for a wider range of notes", correct: true },
                { text: "To separate different instruments", correct: false },
                { text: "To show different time signatures", correct: false },
                { text: "To indicate different keys", correct: false }
            ],
            explanation: "The grand staff combines treble and bass clefs to notate a wider range of pitches, commonly used in piano music."
        },
        {
            question: "How are octaves numbered in musical notation?",
            answers: [
                { text: "Starting from C, with Middle C as C4", correct: true },
                { text: "Starting from A, with Middle A as A4", correct: false },
                { text: "Starting from 1, with Middle C as C1", correct: false },
                { text: "Starting from 0, with Middle C as C0", correct: false }
            ],
            explanation: "Octaves are numbered starting from C, with Middle C designated as C4. Each C starts a new octave number."
        },
        {
            question: "What is the relationship between the black keys and the natural notes?",
            answers: [
                { text: "Black keys are modifications (sharps/flats) of the natural notes", correct: true },
                { text: "Black keys are completely separate from natural notes", correct: false },
                { text: "Black keys are higher versions of natural notes", correct: false },
                { text: "Black keys are lower versions of natural notes", correct: false }
            ],
            explanation: "Black keys represent the sharps and flats - modifications of the natural notes represented by white keys."
        },
        {
            question: "What is the significance of Middle C in music notation?",
            answers: [
                { text: "It serves as a reference point between treble and bass clefs", correct: true },
                { text: "It's the highest note on the piano", correct: false },
                { text: "It's the lowest note on the piano", correct: false },
                { text: "It's the only note that can be written on ledger lines", correct: false }
            ],
            explanation: "Middle C (C4) is particularly important as it serves as a reference point between the treble and bass clefs in the grand staff."
        }
    ];

    function startQuiz() {
        welcomeScreen.style.display = 'none';
        resultsScreen.style.display = 'none';
        quizContainer.style.display = 'block';
        
        // Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = '0';
        
        // Shuffle questions but use all of them instead of just 10
        quizQuestions = [...questions].sort(() => Math.random() - 0.5);
        progressElement.textContent = `1/${quizQuestions.length}`;
        
        // Start with first question
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        
        // Update progress
        progressElement.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
        
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(quizQuestions[currentQuestionIndex]);
        } else {
            endQuiz();
        }
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        
        // Handle image display if required
        if (question.imageType) {
            if (question.imageType === "clef") {
                staffNoteDisplay.style.display = 'block';
                pianoContainer.style.display = 'none';
                imageContainer.innerHTML = '';
                clefElement.className = question.clefType;
                noteElement.style.display = 'none';
            } else if (question.imageType === "staff") {
                staffNoteDisplay.style.display = 'block';
                pianoContainer.style.display = 'none';
                imageContainer.innerHTML = '';
                clefElement.className = question.clefType;
                noteElement.style.display = 'block';
                
                // Position the note
                positionNoteOnStaff(question.notePosition);
            } else if (question.imageType === "piano") {
                staffNoteDisplay.style.display = 'none';
                pianoContainer.style.display = 'block';
                imageContainer.innerHTML = '';
            } else if (question.imageType === "custom" && question.imageUrl) {
                staffNoteDisplay.style.display = 'none';
                pianoContainer.style.display = 'none';
                
                // Create and display custom image
                const img = document.createElement('img');
                img.src = question.imageUrl;
                img.alt = "Music notation diagram";
                img.style.maxWidth = '100%';
                
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            }
        } else {
            staffNoteDisplay.style.display = 'none';
            pianoContainer.style.display = 'none';
            imageContainer.innerHTML = '';
        }
        
        // Create answer buttons
        question.answers.sort(() => Math.random() - 0.5).forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function positionNoteOnStaff(position) {
        // Position values are based on lines and spaces of the staff
        const positions = {
            // Treble clef positions (C4 - G5)
            'ledger-below-1': { top: '125%' }, // C4 (Middle C)
            'space-below-1': { top: '112.5%' }, // D4
            'line-1': { top: '100%' }, // E4
            'space-1': { top: '87.5%' }, // F4
            'line-2': { top: '75%' }, // G4
            'space-2': { top: '62.5%' }, // A4
            'line-3': { top: '50%' }, // B4
            'space-3': { top: '37.5%' }, // C5
            'line-4': { top: '25%' }, // D5
            'space-4': { top: '12.5%' }, // E5
            'line-5': { top: '0%' }, // F5
            'space-above-1': { top: '-12.5%' }, // G5
            
            // Bass clef positions (E2 - B3)
            'ledger-below-bass-1': { top: '125%' }, // E2
            'space-below-bass-1': { top: '112.5%' }, // F2
            'line-bass-1': { top: '100%' }, // G2
            'space-bass-1': { top: '87.5%' }, // A2
            'line-bass-2': { top: '75%' }, // B2
            'space-bass-2': { top: '62.5%' }, // C3
            'line-bass-3': { top: '50%' }, // D3
            'space-bass-3': { top: '37.5%' }, // E3
            'line-bass-4': { top: '25%' }, // F3
            'space-bass-4': { top: '12.5%' }, // G3
            'line-bass-5': { top: '0%' }, // A3
            'space-above-bass-1': { top: '-12.5%' }, // B3
            'ledger-above-bass-1': { top: '-25%' } // C4 (Middle C)
        };
        
        // Set note position
        if (positions[position]) {
            noteElement.style.top = positions[position].top;
            noteElement.style.left = '60%'; // Horizontal position
        } else {
            // Default position (middle of staff)
            noteElement.style.top = '50%';
            noteElement.style.left = '60%';
        }
    }

    function resetState() {
        nextButton.style.display = 'none';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        staffNoteDisplay.style.display = 'none';
        pianoContainer.style.display = 'none';
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        // Apply styling to show correct/incorrect
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
            button.disabled = true;
        });
        
        if (correct) {
            score++;
            scoreElement.textContent = score;
        }
        
        // Show explanation if available
        if (currentQuestion.explanation) {
            const explanationDiv = document.createElement('div');
            explanationDiv.classList.add('explanation');
            explanationDiv.textContent = currentQuestion.explanation;
            answerButtonsElement.appendChild(explanationDiv);
        }
        
        if (currentQuestionIndex < quizQuestions.length - 1) {
            nextButton.style.display = 'block';
        } else {
            endQuiz();
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function endQuiz() {
        quizContainer.style.display = 'none';
        resultsScreen.style.display = 'block';
        
        finalScoreElement.textContent = `${score}/${quizQuestions.length}`;
        
        // Provide feedback based on score
        const percentage = (score / quizQuestions.length) * 100;
        
        if (percentage >= 90) {
            feedbackElement.textContent = "Excellent! You're a music theory master!";
        } else if (percentage >= 70) {
            feedbackElement.textContent = "Great job! You have a solid understanding of music notation.";
        } else if (percentage >= 50) {
            feedbackElement.textContent = "Good effort! With a bit more practice, you'll become a music notation expert.";
        } else {
            feedbackElement.textContent = "Keep practicing! Music notation takes time to master.";
        }
    }
});