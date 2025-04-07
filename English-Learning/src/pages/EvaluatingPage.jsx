import { useState,useContext, useEffect } from 'react';


import Modal from '../components/Modal';
import BookStack from '../assets/icons/book-stack.png';
import { AlertContext } from '../context/alertContext';
import { FaPencilAlt, FaFistRaised, FaBookOpen } from 'react-icons/fa';
import { MdOutlineNearbyError, MdAutoFixHigh } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import './EvaluatePage.scss';
import FountainPen from '../assets/icons/fountain-pen.png';
import axios from 'axios';
const EvaluatingPage = ({}) => {
  const setAlertData = useContext(AlertContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [activeRightBtns, setActiveRightBtns] = useState({});
  const [evaluatingResult, setEvaluatingResult] = useState(null);
  const [refiningResult, setRefiningResult] = useState("");
  const [formData, setFormData] = useState({
    topic: '',
    essay: '',
  });
  const [stats, setStats] = useState({
      words: 0,
      sentences: 0,
      characters: 0,
      paragraphs: 0,
    });

  const [debouncedText, setDebouncedText] = useState(formData.essay);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(formData.essay);
    }, 500); 

    return () => clearTimeout(timer); 
  }, [formData.essay]);

  const rightBtnClickEvent = (index) => {
    setActiveRightBtns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const handleEvaluateSubmit = async (event)=>{
      event.preventDefault(); 
      if(formData.essay==""||formData.topic==""){
          setAlertData({ active: true, status: 'failed', message: 'Essay and topic mising' });
      }
      else{
        setAlertData({ active: true, status: 'waiting', message: 'please waiting ...' })
        await axios.post('/api/essay/evaluate',formData,{
            withCredentials:true,
            headers:{
              'Content-Type': 'application/json',
            }
          }).then(res=>{
            console.log(res.data)
            setEvaluatingResult({
              scores: {
                CCScore: res.data.coherence_cohesion,
                TAScore: res.data.task_response,
                LRScore: res.data.lexical_resource,
                GRAScore: res.data.grammatical_range_accuracy,
                overallScore: res.data.overall_band,
              },
              feedback: res.data.feedback,
              mistakes: res.data.mistakes
            });


            setAlertData({active:true,status:'success',message:"Evaluate success!"});
            
          })
          .catch(err=>setAlertData({active:true,status:'failed',message:err.response.data.message}))
        
        }


  }
  const handleRefineSubmit = async (event) => {
    if (formData.essay == '' ) {
      setAlertData({ active: true, status:'failed', message: 'missing essay' });
    } 
    else{
      setAlertData({ active: true, status: 'waiting', message: 'please waiting ...' })

      await axios
        .post('/api/essay/refine', {essay:formData.essay}, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res.data.result);
          setRefiningResult(res.data.result);
          setAlertData({ active: true,status:'success', message: 'Refine success!' });
          openModal()
        })
        .catch((err) =>
          setAlertData({
            active: true,
            status:'failed',
            message: err.response.data.message,
          })
        );
      }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;  
    setFormData({
      ...formData,
      [name]: value,
  });}
  const caculateStatistics= (text)=>{
    const words = text.trim().split(/\s+/).filter(Boolean).length;
     const sentences = text.split(/[.!?]+/).filter(Boolean).length;
     const characters = text.length;
     const paragraphs = text.split('\n\n').filter(Boolean).length;
      setStats({
        words,
        sentences,
        characters,
        paragraphs,
      });
  }


useEffect(()=>{
  caculateStatistics(debouncedText)
},[debouncedText])



  return (
    <>
      {true ? (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <div className='bg-amber-100 w-1/2 h-4/5 rounded-2xl place-items-center px-3 py-5 flex flex-col'>
            <h1 className='title  text-indigo-800 text-4xl font-pacifico mb-5'>
              Refined essay
            </h1>
            <div className='w-9/10 h-full bg-amber-50 border-1 border-amber-200 rounded-2xl overflow-y-scroll p-5 '>
              <pre className='whitespace-pre-wrap break-words'>
                {refiningResult}
              </pre>
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}

      <form
        action={'/api/essay/evaluate'}
        method='POST'
        onSubmit={handleEvaluateSubmit}>
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
              value={formData.topic}
              onChange={handleChange}
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
                value={formData.essay}
                onChange={handleChange}
                className=' w-full h-120 bg-slate-50 rounded-xl lg:px-10 lg:pt-10 lg:pb-20 resize-none '></textarea>

              <button
                className='evaluate-btn absolute right-4 top-2 border-1 border-green-600 rounded-xl bg-green-500 p-2 place-items-center cursor-pointer hover:bg-green-700 transition-all duration-300 linear '
                type='submit'>
                <img src={FountainPen} alt='evaluate-btn' className='h-5 w-5' />
              </button>
              <button
                className='refine-button absolute bg-indigo-800 text-slate-50 rounded-r-4xl top-5 text-center content-center place-items-center cursor-pointer'
                type='button'
                onClick={() => handleRefineSubmit()}>
                <MdAutoFixHigh className='w-6 h-6' />
                <p className='text font-poppins text-xs'>Refine</p>
              </button>
              <button
                className='open-refined-box-button absolute bg-pink-500 text-slate-50 rounded-r-4xl top-20 text-center content-center place-items-center cursor-pointer'
                onClick={() => openModal()}
                type='button'>
                <FaBookOpen className='w-4 h-4' type='button' />

                <p className='text font-poppins text-xs'>open Box</p>
              </button>
              <div className='w-full h-15 z-3 px-4 pt-1 absolute bottom-1 border-t-1 border-stone-300  bg-slate-50  flex flex-row  place-items-center'>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>Words</p>
                  <p className='font-semibold text-lg'>{stats.words}</p>
                </div>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>
                    Sentences
                  </p>
                  <p className='font-semibold text-lg'>{stats.sentences}</p>
                </div>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>
                    Paragraphs
                  </p>
                  <p className='font-semibold text-lg'>{stats.paragraphs}</p>
                </div>
                <div className='mx-3 place-items-center'>
                  <p className='text-stone-500 text-sm font-roboto'>
                    Characters
                  </p>
                  <p className='font-semibold text-lg'>{stats.characters}</p>
                </div>
              </div>
            </div>
          </div>
          {
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
                  {evaluatingResult ? (
                    <ul>
                      <li className='flex flex-row place-items-center mb-1'>
                        <AiFillCheckCircle className='w-6 h-6 mr-2 text-emerald-500' />
                        <p className='font-bold mr-2'>Task Response : </p>
                        <p>{evaluatingResult.scores.TAScore}</p>
                      </li>
                      <li className='flex flex-row place-items-center mb-1'>
                        <AiFillCheckCircle className='w-6 h-6 mr-2 text-emerald-500' />
                        <p className='font-bold mr-2'>
                          Coherence and cohesion :
                        </p>
                        <p>{evaluatingResult.scores.CCScore}</p>
                      </li>
                      <li className='flex flex-row place-items-center mb-1'>
                        <AiFillCheckCircle className='w-6 h-6 mr-2 text-emerald-500' />
                        <p className='font-bold mr-2'>
                          Grammatical range accuracy :
                        </p>
                        <p>{evaluatingResult.scores.GRAScore}</p>
                      </li>
                      <li className='flex flex-row place-items-center mb-1'>
                        <AiFillCheckCircle className='w-6 h-6 mr-2 text-emerald-500' />
                        <p className='font-bold mr-2'>Lexical resource : </p>
                        <p>{evaluatingResult.scores.LRScore}</p>
                      </li>

                      <li className='flex flex-row place-items-center mb-1'>
                        <AiFillCheckCircle className='w-6 h-6 mr-2 text-emerald-500' />
                        <p className='font-bold mr-2'>Overall : </p>
                        <p>{evaluatingResult.scores.overallScore}</p>
                      </li>
                    </ul>
                  ) : (
                    'No data'
                  )}
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
                  {evaluatingResult
                    ? evaluatingResult.mistakes.map((item, index) => (
                        <div className='flex flex-row'>
                          <p className='mb-2 inline'>
                            <p className='inline font-bold'>
                              - mistake {index + 1} :{' '}
                            </p>
                            {item}
                          </p>
                        </div>
                      ))
                    : 'No data'}
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
                  <p>Feedbacks</p>
                </button>
                <div
                  className={`button-content  ${
                    activeRightBtns[2] ? 'active' : 'inactive'
                  } rounded-xl py-3 px-5 overflow-y-scroll`}>
                  {evaluatingResult
                    ? evaluatingResult.feedback.map((item, index) => (
                        <div className=''>
                          <p className='mb-2'>- {item}</p>
                        </div>
                      ))
                    : 'No data'}
                </div>
              </div>
            </div>
          }
        </div>
      </form>
    </>
  );
};
export default EvaluatingPage;
