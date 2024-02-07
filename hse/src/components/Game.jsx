import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoxNotification from './BoxNotification';
import HeaderBgBig from '../assets/headerBgBig.svg';
import HeaderBgSmall from '../assets/navBg.svg';
import GameBg from '../assets/game-bg.svg';
import GameBgSmall from '../assets/gameBg.svg';
import Heart from '../assets/heart.svg';
import CircleBox1 from "../assets/circle.svg";
import Result from './Result';
import './game.css';
const Game = ({ loginUsername }) => {
  const [number, setNumber] = useState(0);
  const [hearts, setHearts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [interactedNotifications, setInteractedNotifications] = useState(0);
  const [showAppreciationMessage, setShowAppreciationMessage] = useState(false);
  const [randomAppreciationMessage, setRandomAppreciationMessage] = useState('');
  const [chosenOptions, setChosenOptions] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [warningMessage, setWarningMessage] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [correctClicks, setCorrectClicks] = useState(0);
  const [wrongChoices, setWrongChoices] = useState(0);

  const appreciationMessages = [
    'عالی! کارت فوق‌العاده بود!',
    'واقعاً عالیه! ادامه بده!',
    'شگفت‌آور! تو همیشه برتری را نشان می‌دهی!',
    'واه، عالی بود! همینطور ادامه بده!',
    'فوق‌العاده! بهت افتخار می‌کنم!',
    'واااو! تو واقعاً شگفت‌آوری!',
    // اضافه کردن پیام‌های بیشتر به میزان نیاز
  ];

  const warningMessages = [
    'این باکس را قبلاً انتخاب کردی!',
    'وای! دوباره؟! اینجا رو کلیک کردی!',
    'اوه! این باکس را قبلاً انتخاب کردی دیگه!',
    'دوباره؟ ای بابا برو سراغ جاهای جدید!',
    'وووی! بازم تو همین باکس تکراری رو انتخاب کردی!',
    // اضافه کردن پیام‌های بیشتر به میزان نیاز
  ];

  const navigate = useNavigate();

  const notifications = [
    { id: 1, question: 'چی رعایت نشده؟', correctChoice: 'تجهیزات حفاظ فردی نداره', incorrectChoice: 'آجر رو گرفته سمت صورتش' },
    { id: 2, question: 'چی رعایت نشده؟', incorrectChoice: 'تخته کار مهار نشده', correctChoice: 'تخته کار کوتاهه' },
    { id: 3, question: 'چی رعایت نشده؟', correctChoice: 'مسیرخروجی لیفتراک مسدود نشده', incorrectChoice: 'راننده لیفتراک کمربند نبسته' },
    { id: 4, question: 'چی رعایت نشده؟', incorrectChoice: 'رو به بیل گرفته', correctChoice: 'دستکش کار ندارهه' },
    { id: 5, question: 'چی رعایت نشده؟', incorrectChoice: 'تعداد بلوک ها کمه', correctChoice: 'چیدن بلوک زیر تخته کار' },
    { id: 6, question: 'چی رعایت نشده؟', correctChoice: 'خوردن و آشامیدن در محل کار', incorrectChoice: 'پوشیدن کاور' },
    { id: 7, question: 'چی رعایت نشده؟', correctChoice: 'مته روی زمین رها شده', incorrectChoice: 'مته به برق نیست' },
    { id: 8, question: 'چی رعایت نشده؟', incorrectChoice: 'Correct choice for box 2', correctChoice: 'Incorrect choice for box 2' },
    { id: 9, question: 'چی رعایت نشده؟', correctChoice: 'کپسول اطفای حریق زیر تخته کاره', incorrectChoice: 'کپسول اطفای حریق سرجاش نیست' },
    // Add more notifications as needed for small boxes
  ];

  const handleWarningMessage = () => {
    // انتخاب یک پیام هشدار تصادفی
    const randomIndex = Math.floor(Math.random() * warningMessages.length);
    const selectedWarningMessage = warningMessages[randomIndex];
  
    // نمایش پیام هشدار
    setWarningMessage(selectedWarningMessage);
  
    // پس از مدت زمان مشخص، پنهان کردن پیام هشدار
    setTimeout(() => {
      setWarningMessage('');
    }, 5000); // 5000 میلی‌ثانیه = 5 ثانیه
  };
  
  
  const handleBigBoxClick = (boxId) => {
    if (!gameOver) {
      const bigBox = document.querySelector(`.boxesBigBox${boxId}`);
      if (!bigBox.classList.contains(`boxesBigBox${boxId}active`)) {
        if (clickedBoxes.includes(boxId)) {
          // Log a warning message for clicking the same box again
          console.error("Error: You already clicked this big box!");
          handleWarningMessage("قبلا کلیک شده!");
          console.warn("Warning: You already clicked this box!");
        } else {
          bigBox.classList.add(`boxesBigBox${boxId}active`);
          const selectedNotification = notifications.find((notification) => notification.id === boxId);
          setCurrentNotification(selectedNotification);
          setShowNotification(true);
          // Increment interactedNotifications when a notification is triggered
          setInteractedNotifications((prev) => prev + 1);
  
          // Add the clicked box to the state
          setClickedBoxes((prevClickedBoxes) => [...prevClickedBoxes, boxId]);
        }
      } else {
        // Log a warning message for clicking the same box again
        console.error("Error: You already clicked this big box!");
        handleWarningMessage("قبلا کلیک شده!");
        console.warn("Warning: You already clicked this box!");
      }
    }
  };
  
  
  const handleBoxClick = (boxId) => {
    if (!gameOver) {
      if (!clickedBoxes.includes(boxId)) {
        setClickedBoxes((prevClickedBoxes) => [...prevClickedBoxes, boxId]);
        const box = document.getElementById(`box${boxId}`);
        box.classList.add(`box${boxId}active`);
        const selectedNotification = notifications.find((notification) => notification.id === boxId);
        setCurrentNotification(selectedNotification);
        setShowNotification(true);
        // Increment interactedNotifications when a notification is triggered
        setInteractedNotifications((prev) => prev + 1);
      } else {
        // Display a warning message for clicking the same box again
        handleWarningMessage("قبلا کلیک شده!");
        console.warn("Warning: You already clicked this box!");
      }
    }
  };

  const handleNotificationChoice = (isCorrect) => {
    if (isCorrect) {
      setNumber((prevNumber) => prevNumber + 1);
      setCorrectClicks((prevCorrectClicks) => prevCorrectClicks + 1);
  
      // Check if correctClicks is an odd number and show appreciation message
      if (correctClicks % 2 !== 0) {
        // Display appreciation message
        setShowAppreciationMessage(true);
  
        // Randomly select an appreciation message
        const randomIndex = Math.floor(Math.random() * appreciationMessages.length);
        setRandomAppreciationMessage(appreciationMessages[randomIndex]);
  
        // After a certain time (e.g., 3 seconds), hide the appreciation message
        setTimeout(() => {
          setShowAppreciationMessage(false);
        }, 4000);
      }
    } else {
      setHearts((prevHearts) => prevHearts - 1);
      setMistakes((prevMistakes) => prevMistakes + 1); // Increment mistakes for losing hearts
      setWrongChoices((prevWrongChoices) => prevWrongChoices + 1); // Increment wrong choices count
    }
  
    // Close the notification modal
    setShowNotification(false);
    setCurrentNotification(null);
  
    // Add the chosen option to the state
    setChosenOptions([...chosenOptions, isCorrect]);
  };
  

  const handleGameContentClick = (e) => {
    if (!gameOver) {
      const isBoxClick =
        e.target &&
        (e.target.classList.contains('box') ||
          e.target.classList.contains('boxesBigBox') ||
          e.target.closest('.box') ||
          e.target.closest('.boxesBigBox'));

      if (!isBoxClick) {
        // Increment mistakes for losing hearts
        setMistakes((prevMistakes) => prevMistakes + 1);

        if (hearts > 0) {
          setHearts((prevHearts) => prevHearts - 1);
        }
      }
    }
  };

  const resetGame = () => {
    console.log('Game reset!');
    setNumber(0);
    setHearts(6);
    setGameOver(false);
    setGameWon(false);
    setShowNotification(false);
    setCurrentNotification(null);
    setMistakes(0);
    setCorrectClicks(0);

    document.querySelectorAll('.box').forEach((box) => box.classList.remove('boxactive'));
    document.querySelectorAll('.boxesBigBox').forEach((bigBox) => bigBox.classList.remove('boxesBigBoxactive'));
  };


  useEffect(() => {
    // Check if correctClicks is an odd number and show appreciation message
    if (correctClicks % 2 !== 0) {
      // Display appreciation message
      setShowAppreciationMessage(true);

      // Randomly select an appreciation message
      const randomIndex = Math.floor(Math.random() * appreciationMessages.length);
      setRandomAppreciationMessage(appreciationMessages[randomIndex]);

      // After a certain time (e.g., 3 seconds), hide the appreciation message
      setTimeout(() => {
        setShowAppreciationMessage(false);
      }, 4000);
    }

    // Check if the user has chosen both options for all 9 notifications or lost all hearts
    if (chosenOptions.length === 9 || hearts === 0) {
      // The user has chosen both options for all 9 notifications, interacted with all big boxes and small boxes,
      // or lost all hearts, end the game
      endGame();
    }
  }, [correctClicks, chosenOptions, hearts]);

  const endGame = () => {
    // Logic to end the game...
    console.log('Game ended!');
    setGameOver(true);

    // Show the popup for 5 seconds before redirecting
    setTimeout(() => {
      navigate('/result', {
        state: {
          username: loginUsername,
          mistakes: mistakes,
          rightClicks: correctClicks,
          wrongChoices: wrongChoices,
          losingHearts: 6 - hearts, // Calculate the number of losing hearts
        },
      });
    }, 5000); // 5000 milliseconds = 5 seconds
  };





  return (
    <div className='game'>
      <div className='gameHeader'>
        <div className='headerBg'>
          <img src={HeaderBgBig} alt='' />
        </div>

        <div className='headerBgSmall'>
          <img src={HeaderBgSmall} alt='' />
        </div>

        <div className='headerContentGame'>
          <div className='hearts'>
            {[...Array(6)].map((_, index) => (
              <div key={index} className={`heart ${index < hearts ? 'active' : 'inactive'}`}>
                <img src={Heart} alt='' />
              </div>
            ))}
          </div>
          <div className='texts'>
            <span className='number'>{number}</span>
            <span className='text'>تشخیص درست</span>
          </div>
        </div>
      </div>

      <div className='gameContent' onClick={handleGameContentClick}>
        <div className='gameBg'>
          <img src={GameBg} alt='game' />
          <div className="boxesBig">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((boxId) => (
              <div key={boxId} className={`boxesBigBox boxesBigBox${boxId}`} onClick={() => handleBigBoxClick(boxId)}>
                <img src={CircleBox1} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className='gameBgSmall'>
          <img className='bgSmallImg' src={GameBgSmall} alt='gameBg' />

          <div className="boxsContainer">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((boxId) => (
              <div key={boxId} id={`box${boxId}`} className={`box box${boxId}`}>
                <span onClick={() => handleBoxClick(boxId)}>
                  <img className={`box${boxId}img`} src={CircleBox1} alt="" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gameFooter">
        {/* <div className="loggedInUser">Logged in as: {loginUsername}</div> */}
        <Link to={"/"} className="gameBtn">
          پایان بازی
        </Link>
      </div>


      {/* GAME OVER CONDITION */}
      {gameOver && <div className={`popupLayer ${gameOver ? 'active' : ''}`}></div>}
      {gameOver && (
        <>
          <div className="popup active">
            <div className="popupHeader">
              <p>بازی به اتمام رسید!</p>
            </div>
            <div className="popupText">
              <p>
                برای دیدن نتایج،
              </p>
              <p>
                لطفا صبر کنید تا به صفحه بعد منتقل شوید.
              </p>
            </div>
          </div>
        </>
      )}


      {/* NOTIFICATIONS */}
      {showNotification && currentNotification && (
        <BoxNotification
          question={currentNotification.question}
          correctChoice={currentNotification.correctChoice}
          incorrectChoice={currentNotification.incorrectChoice}
          onChoice={handleNotificationChoice}
        />
      )}


      {/* APPRECIATION MESSAGE  */}
      {showAppreciationMessage && (
        <div className="appreciation-message">
          <p style={{ color: 'white' }}>{randomAppreciationMessage}</p>
        </div>
      )}

      {/* WARNING MESSAGE */}
      {warningMessage && (
        <div className="warning-message">
          <p style={{ color: 'white' }}>{warningMessage}</p>
        </div>
      )}

    </div>
  );
};

export default Game;
