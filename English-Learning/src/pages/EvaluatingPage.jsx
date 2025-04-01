import { useState } from 'react';

import BookStack from '../assets/icons/book-stack.png';
import { FaPencilAlt, FaFistRaised } from 'react-icons/fa';
import { MdOutlineNearbyError, MdAutoFixHigh } from 'react-icons/md';
import './EvaluatePage.scss';
import FountainPen from '../assets/icons/fountain-pen.png';
import axios from 'axios';
const EvaluatingPage = ({}) => {
  const [activeRightBtns, setActiveRightBtns] = useState({});

  const rightBtnClickEvent = (index) => {
    setActiveRightBtns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const EvaluatingBtn = () => {
    console.log('button clicked');
    try {
      const response = axios.post('http://localhost:3000/essay/evaluate', {
        hello: 'word',
      });
      console.log(response);
    } catch {
      console.log('error');
    }
  };

  return (
    <>
      <form action={'http://localhost:3000/essay/evaluate'} method='POST'>
        <div className=' w-full py-10 inline-flex justify-center'>
          <img src={BookStack} alt='book-stack' className='size-15 mr-5' />
          <div>
            <p className='text-3xl font-ubuntu font-semibold'>
              Essay Evaluating
            </p>
            <p className='text-stone-600'>Get your score</p>
          </div>
        </div>
        <div className='flex mb-3'>
          <div className='border-dashed border-2 w-4/7 h-30 '>
            <textarea
              name='topic'
              id=''
              className='w-full h-full px-5 py-2 placeholder:text-center placeholder:text-xl  resize-none outline-none'
              placeholder='Enter your topics here'></textarea>
          </div>
        </div>
        <div className='flex flex-row'>
          <div className='essay-section lg:w-4/6 md:w-4/5   '>
            <div className='relative w-6/7 border-2 border-stone-500 border-dashed rounded-xl bg-slate-50'>
              <textarea
                name='essay'
                id=''
                className=' w-full h-120 bg-slate-50 rounded-xl lg:px-10 lg:pt-10 lg:pb-20 resize-none '></textarea>

              <button
                className='evaluate-btn absolute right-4 top-2 border-1 border-green-600 rounded-xl bg-green-500 p-2 place-items-center cursor-pointer hover:bg-green-700 transition-all duration-300 linear '
                type='submit'>
                <img src={FountainPen} alt='evaluate-btn' className='h-5 w-5' />
              </button>
              <button className='refine-button absolute bg-indigo-800 text-slate-50 rounded-r-4xl top-15 text-center content-center place-items-center cursor-pointer'>
                <MdAutoFixHigh className='w-6 h-6' />
                <p className='text font-poppins text-xs'>Refine</p>
              </button>
              <div className='w-full h-15 z-5 px-4 pt-1 absolute bottom-1 border-t-1 border-stone-300  bg-slate-50  flex flex-row  place-items-center'>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>Words</p>
                  <p className='font-semibold text-lg'>98</p>
                </div>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>
                    Sentences
                  </p>
                  <p className='font-semibold text-lg'>2</p>
                </div>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>
                    Pharagraphs
                  </p>
                  <p className='font-semibold text-lg'>133</p>
                </div>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>
                    Characters
                  </p>
                  <p className='font-semibold text-lg'>2</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/6 place-items-center flex-col flex h-full'>
            <div className='border-red-400 rounded-xl flex flex-col w-6/7 border-1 mb-5 overflow-hidden '>
              <button
                key={0}
                className={` button-evaluate-site bg-linear-to-r from-red-600 to-red-400 border-red-400   inline-flex justify-center place-items-center m-0 ${
                  activeRightBtns[0] ? 'active' : 'inactive'
                }`}
                onClick={() => rightBtnClickEvent(0)}
                type='button'>
                <FaPencilAlt className='mr-1 w-4 h-4' />
                <p>Evaluate</p>
              </button>
              <div
                className={`button-content  ${
                  activeRightBtns[0] ? 'active' : 'inactive'
                } rounded-xl py-3 px-7 overflow-y-scroll`}>
                <p>mmmmmmmmm</p>
              </div>
            </div>
            <div className='border-amber-400 rounded-xl flex flex-col w-6/7 border-1 mb-5 overflow-hidden'>
              <button
                key={1}
                className={` button-evaluate-site bg-linear-to-r from-amber-500 to-amber-300  border-amber-400  inline-flex justify-center place-items-center ${
                  activeRightBtns[1] ? 'active' : 'inactive'
                }`}
                onClick={() => rightBtnClickEvent(1)}
                type='button'>
                <MdOutlineNearbyError className='mr-1 w-5 h-5' />
                <p>Mistakes</p>
              </button>
              <div
                className={`button-content  ${
                  activeRightBtns[1] ? 'active' : 'inactive'
                } rounded-xl py-3 px-7 overflow-y-scroll`}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  velit exercitationem voluptate distinctio perferendis incidunt
                  aspernatur quae veritatis atque illo aperiam, eveniet,
                  delectus impedit? Id, at? Ipsam ratione culpa accusantium?
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
                  optio nisi facere, ipsum placeat ipsam reprehenderit
                  voluptatibus obcaecati qui iste dolores? Fugiat atque quos
                  dolore, amet dolores iste vero earum! Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. Dolores facere voluptatum
                  ex asperiores. Vero autem, quia magnam blanditiis nemo,
                  adipisci fugit nihil libero praesentium iste nesciunt ipsam.
                  Soluta, ad natus.
                </p>
              </div>
            </div>
            <div className='border-sky-400 rounded-xl flex flex-col w-6/7 border-1 mb-5 overflow-hidden'>
              <button
                key={2}
                className={` button-evaluate-site bg-linear-to-r from-sky-500 to-sky-300   border-sky-400  inline-flex justify-center place-items-center ${
                  activeRightBtns[2] ? 'active' : 'inactive'
                }`}
                onClick={() => rightBtnClickEvent(2)}
                type='button'>
                <FaFistRaised className='mr-1 w-4 h-4' />
                <p>Key improvements</p>
              </button>
              <div
                className={`button-content  ${
                  activeRightBtns[2] ? 'active' : 'inactive'
                } rounded-xl py-3 px-7 overflow-y-scroll`}>
                <p>mmmmmmmmm</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default EvaluatingPage;
