import React, { useRef, useEffect, useState } from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Swal from 'sweetalert2'

function factorial(n) {
  if (n === 0 || n === 1) {
      return 1;
  }
  return n * factorial(n - 1);
}

// Probability of pulling a normal monster from a deck of 40 cards
function binomCoeff(n, k) {
  return Math.floor(factorial(n) / (factorial(k) * factorial(n - k)));
}

function hypergeometricDistribution(n, k, s, i) {
  return (binomCoeff(s, i) * binomCoeff(n - s, k - i)) / binomCoeff(n, k);
}

function multivariateHypergeometricDistribution(n, s, i, k) {
  console.log("Deck size: " + n);
  console.log("Number of cards drawn: " + k);
  console.log("Number of successes: " + s);
  console.log("Number of successes drawn: " + i);
  if (s.length !== i.length) {
      throw new Error("Arrays s and i must have the same length.");
  }

  let numerator = 1;
  let denominator = binomCoeff(n, k);

  for (let j = 0; j < s.length; j++) {
      numerator *= binomCoeff(s[j], i[j]);
  }

  console.log("Numerator: " + numerator);
  console.log("Denominator: " + denominator);
  console.log("Probability: " + numerator / denominator);
  return numerator / denominator;
}


var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

  function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

export default function DrawProbability() {

    const canvasRef = useRef(null);
    // state for deck size 
    const [deckSize, setDeckSize] = useState(40);
    // state for number of cards drawn
    const [numDrawn, setNumDrawn] = useState(5);
    // Cards in added to deck
    const [inputs, setInputs] = useState(1);

    // ADDED CARDS TO DECK
    const [cards, setCards] = useState([]);
    // Card name
    const [cardName, setCardName] = useState('');
    // Number of copies
    const [copies, setCopies] = useState(3);
    // Minimum in opening
    const [min, setMin] = useState(1);
    // Maximum in opening
    const [max, setMax] = useState(3);

    function individualProb(card) {
      let probs = [];
      console.log(card);
      let n = deckSize
      let k = numDrawn
      let s = card.copies
      let i = card.min
      let j = card.max
      for (let x = i; x <= j; x++) {
        probs.push(
          {
            x: x.toString()+"/"+k.toString(),
            prob: hypergeometricDistribution(n, k, s, x)*100
          }
        );
      }
      let sum = 0;
      probs.forEach((prob) => {
        sum += prob.prob;
      });
      probs.push(
        {
          x: i.toString()+"-"+j.toString()+"/"+k.toString(),
          prob: sum
        }
      );
      return probs.map((prob) => (
        <div>
          <span>{prob.x}:</span> {prob.prob.toFixed(2)}%
        </div>
      ));
    }

    function totalProb() {
      if (cards.length > 1) {
        console.log("Calculating total probability...");
        let probs = [];
        let n = deckSize
        let k = numDrawn
        let copies = []
        let mins = []
        cards.forEach((card) => {
          copies.push(card.copies);
          mins.push(card.min);
        });
        let final = multivariateHypergeometricDistribution(n, copies, mins, k)*100;
        return final.toFixed(2);
      } else {
        return 0;
      }
    }


    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
  
      function drawRectangles() {
        let rects = [];
        cards.forEach((card, index) => {
          for (let i = 0; i < card.copies; i++) {
            rects.push({
              name: card.name,
              color: card.color,
            });
          }
        });

        let rects2 = [];
        for (let i = 0; i < deckSize; i++) {
          rects2.push({
            name: null,
            color: '#fff',
          });
        }

        // remove rects2 elements equal to the number of cards in rects
        rects2.splice(0, rects.length);
      
        rects = rects.concat(rects2);
        // rects shuffle
        
        shuffle(rects);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

  
        const cols = Math.min(10);
        const rows = Math.ceil(deckSize / cols);
        const gap = 10; // Gap between cards
        const rectWidth = (canvas.width - (cols + 1) * gap) / cols;
        const rectHeight = (canvas.height - (rows + 1) * gap) / rows;
        const radius = 20; // Radius for rounded corners
  
        for (let i = 0; i < deckSize; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = col * (rectWidth + gap) + gap;
          const y = row * (rectHeight + gap) + gap;

          ctx.font = '40px Arial';

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
  
          drawRoundedRect(ctx, x, y, rectWidth, rectHeight, radius);


          if (rects[i].name === null) {
            ctx.fillStyle = '#ccc';
          } else {
            ctx.fillStyle = rects[i].color;
          }
          ctx.fill();
          ctx.stroke();
  
          ctx.fillStyle = '#fff';
          if (rects[i].name == null) {
            ctx.fillText(i + 1, x + rectWidth / 2, y + rectHeight / 2);
          } else {
            // rotate text
            
            ctx.save();
            ctx.font = '20px Arial';
            ctx.translate(x + rectWidth / 2, y + rectHeight / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.translate(-(x + rectWidth / 2), -(y + rectHeight / 2));
            ctx.fillText(rects[i].name, x + rectWidth / 2, y + rectHeight / 2);
            ctx.restore();
          }

        }
      }
  
      drawRectangles();
  
      // Handle canvas resizing
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawRectangles();
      };
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [deckSize, cards]);


  return (
    <main className="flex flex-col min-h-screen justify-between items-center">
      <Header />
      <div className="w-full bg-gradient-to-r from-red-200 to-blue-200 p-6 flex flex-row justify-center items-start space-x-4">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center space-y-4 flex-1">
          <h3 className="text-2xl font-semibold mb-2">Probability Calculator</h3>
          <p className="mb-4 text-center w-full">
            Calculate the probability of drawing a specific card in your opening hand using the hypergeometric distribution. This tool helps you understand your deck's consistency and make informed decisions when building your deck.
          </p>
          <div className="flex flex-col space-y-4 w-full">
            <h3 className="text-2xl font-semibold mb-2">Base Settings</h3>
            <div className='flex flex-row justify-center items-center space-x-4 w-full'>
              <div className='flex flex-col w-full'>
                <label htmlFor="deckSize" className="text-lg font-semibold">Deck Size<span className="text-sm text-gray-500"> (Number of Cards in Deck)</span></label>
                <input type="number" id="deckSize" name="deckSize" className="p-2 border border-gray-300 rounded-lg w-full" onChange={(e) => setDeckSize(e.target.value)} defaultValue={deckSize} disabled={cards.length > 0} />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor="numDrawn" className="text-lg font-semibold">Hand Size<span className="text-sm text-gray-500"> (Number of Cards Drawn)</span></label>
                <input type="number" id="numDrawn" name="numDrawn" className="p-2 border border-gray-300 rounded-lg w-full" onChange={(e) => setNumDrawn(e.target.value)} defaultValue={numDrawn} disabled={cards.length > 0} />
              </div>
            </div>
          </div>
            <div className="flex flex-col space-y-4 w-full pt-10">
              <h3 className="text-2xl font-semibold mb-2">Add to Deck<span className="text-sm text-gray-500"> (Once you add a card, base settings will be disabled)</span></h3>
              <div className='flex flex-col w-full'>
                <label className="text-lg font-semibold">Card Name</label>
                <input type="text" className="p-2 border border-gray-300 rounded-lg w-full" onChange={(e) => setCardName(e.target.value)} value={cardName} placeholder='Rescue Cat' />
              </div>
              <div className='flex flex-col w-full'>
                <label className="text-lg font-semibold">Number of Copies</label>
                <input type="number" className="p-2 border border-gray-300 rounded-lg w-full" onChange={(e) => setCopies(e.target.value)} value={copies} placeholder='3' min={1} max={3} />
              </div>
              <div className='flex flex-col w-full'>
                <label className="text-lg font-semibold">Minimum in Opening</label>
                <input type="number" className="p-2 border border-gray-300 rounded-lg w-full" onChange={(e) => setMin(e.target.value)} value={min} placeholder='1' min={0} max={3} />
              </div>
              <div className='flex flex-col w-full'>
                <label className="text-lg font-semibold">Maximum in Opening</label>
                <input type="number" className="p-2 border border-gray-300 rounded-lg w-full" onChange={(e) => setMax(e.target.value)} value={max} placeholder='3' min={0} max={3} />
              </div>
            
            <button className="bg-secondary text-white font-semibold p-2 rounded-lg hover:bg-secondary-dark transition duration-100"
              onClick={() => {
                if (cardName === '') {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a card name!',
                  });
                  return;
                }
                if (min > 3 || max > 3 || copies > 3) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Minimum in opening, maximum in opening, and number of copies must be less than or equal to 3!',
                  });
                  return;
                }
                if (min > max) {  
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Minimum in opening must be less than or equal to maximum in opening!',
                  });
                  return;
                }
                if (min < 0 || max < 0) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Minimum and maximum in opening must be greater than or equal to 0!',
                  });
                  return;
                }
                if (max > copies) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Maximum in opening must be less than or equal to the number of copies!',
                  });
                  return;
                }
                if (cards.length >= deckSize) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have reached the maximum number of cards in your deck!',
                  });
                  return;
                }
                if (copies < 1 || copies+cards.length > deckSize) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Number of copies must be greater than or equal to 1! Or, you have reached the maximum number of cards in your deck!',
                  });
                  return;
                }
                setCards([...cards, { name: cardName, copies, min, max, color: colorArray[Math.floor(Math.random() * colorArray.length)] }]);
                setCardName('');
                setCopies(1);
                setMin(0);
                setMax(0);
              }
              }
            >Add Card</button>
            </div>  
        </div>
        <div className="flex flex-col space-y-4 w-full justify-center items-center flex-1">
              <h3 className="text-2xl font-semibold mb-2 mt-6">Results 🚀</h3>
              <canvas ref={canvasRef} className='w-full' />
              <ul className="flex flex-col w-full">
                {cards.map((card, index) => (
                  <>
                  <li key={index} className="flex flex-row justify-between items-center rounded-lg px-5 py-2" style={{ backgroundColor: card.color }}>
                    <span
                      className='flex-1'
                    ><span className='font-bold'>Name:</span> {card.name}</span>
                    <span
                      className='flex-none mr-10'
                    ><span className='font-bold'>Copies:</span> {card.copies}</span>
                    <span
                      className='flex-none mr-10'
                    ><span className='font-bold'>Have to see:</span> {card.min}</span>
                    <span
                      className='flex-none '
                    ><span className='font-bold'>Up to:</span> {card.max}</span>
                  </li>
                  <div className='flex flex-row justify-between items-center rounded-b-lg mx-10 bg-gray-50 py-2 px-4 text-sm mb-4'>
                    <span className='font-bold'>Opening #{card.name}:</span> {individualProb(card)}
                  </div>
                  </>
                ))}
              </ul>

                <div className="flex flex-row justify-between items-center rounded-lg px-5 py-2 w-full bg-white text-black">
                <h3 className="text-2xl font-semibold">TOTAL <span className='text-sm font-normal'>(min of each)</span></h3>
                <h3 className="text-2xl">Probability: {totalProb()}%</h3>
                
              </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
