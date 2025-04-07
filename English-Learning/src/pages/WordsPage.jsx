import { useState, useContext,useRef } from 'react';

import MemoLoss from "../assets/icons/memory-loss.png"
import { CgSearch } from "react-icons/cg";
import { AlertContext } from '../context/alertContext';
import axios from 'axios';
const WordsPage =({})=>{
    const setAlertData = useContext(AlertContext);
    const audioRef = useRef(null);
    const [data, setData] = useState({
      definitions: '',
      audio: '',
      wordName: '',
      phonetic: '',
    });

    const [word,setWord]=useState();
     const handlePlayAudio = () => {
       if (audioRef.current) {
         audioRef.current.play(); 
       }
     };
      const handleFindMeaning = async () => {
        console.log(word)
        if (word == '') {
          setAlertData({
            active: true,
            status: 'failed',
            message: 'Word mising',
          });
        } else {
          setAlertData({
            active: true,
            status: 'waiting',
            message: 'please waiting ...',
          });
          await axios
            .get(`/api/words/word-meaning?word=${word}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then((res) => {
                setData({
                definitions: res.data[0].meanings,
                wordName: res.data[0].word,
                phonetic: res.data[0].phonetic,
                });
                setAlertData({
                active: true,
                status: 'success',
                message: 'Find successfully!',
                });
                res.data[0].phonetics.forEach((item,index)=>{
                    if(item.audio!==''){
                         setData((prevData) => ({
                           ...prevData,
                           audio: item.audio,
                         }));
                        return;
                    }

                })
            })
            .catch((err) =>
              setAlertData({
                active: true,
                status: 'failed',
                message: err.response.data.message,
              })
            );
        }
      };

   
    return (
      <>
        <div className='content'>
          <div className=' w-full py-10 inline-flex justify-center'>
            <img src={MemoLoss} alt='book-stack' className='size-17 mr-5' />
            <div>
              <p className='text-3xl font-ubuntu font-semibold'>
                Word Searching
              </p>
              <p className='text-stone-600'>Create your words list</p>
            </div>
          </div>
          <div className='w-full flex justify-center    place-items-center'>
            <div className='relative p-3 lg:w-4/7 sm:w-9/10 xs:w-full *: mt-5 bg-slate-50 rounded-4xl shadow-xl  ring-1 ring-blue-100 flex justify-center place-items-center '>
              <div className='absolute -top-9 left-0 h-14 w-25 bg-sky-600 rounded-lg -z-1 text-center text-slate-50 pt-2'>
                Look up
              </div>
              <div className='absolute -top-9 left-30 h-14 w-25 bg-sky-300  rounded-lg -z-1 text-center text-sky-700 pt-2'>
                words list
              </div>
              <div className=' w-9/10  flex flex-col justify-between'>
                <div className='flex flex-row my-4  '>
                  <input
                    type='text'
                    className='w-8/10 h-10  rounded-lg px-3 font-roboto border-2    border-stone-200 '
                    value={word}
                    onChange={(event) => {
                      setWord(event.target.value);
                    }}
                  />
                  <button
                    className='w-2/10 ml-5 bg-cyan-500 rounded-md shadow-lg text-slate-50 cursor-pointer hover:bg-cyan-700 '
                    onClick={() => handleFindMeaning()}>
                    Look up
                  </button>
                </div>
                <div className='h-8/13 w-full  rounded-xl pt-2 px-5 shadow-lg '>
                  <div className='flex flex-row place-items-start  border-b-1 border-stone-400 pb-3'>
                    <h1 className='text-3xl text-slate-600 font-Ubuntu font-semibold mr-15'>
                      {data.wordName ? data.wordName : 'Word'}
                    </h1>
                    <div className=' pt-2'>
                      <p className='text-sm font-semibold text-[rgb(65,77,113,0.8)]'>
                        ({data.phonetic ? data.phonetic : 'phonetic'})
                      </p>
                      <p className='font-bold text-blue-950 hover:text-blue-500 cursor-pointer ' onClick={()=>handlePlayAudio()}>Play audio</p>
                      <audio src={data.audio?data.audio:""} ref={audioRef}>hello</audio>
                    </div>
                  </div>
                  {data.definitions ? (
                    data.definitions.map((item, index) => (
                      <>
                        <hr />

                        <div className=' font-semibold text-blue-950 py-4'>
                          <p className=' mb-4'>
                            {`(${item.partOfSpeech})`} Definition :{' '}
                            {item.definitions[0].definition}
                          </p>
                          <div className='bg-amber-400 px-5 py-3 rounded-md text-slate-50'>
                            {item.definitions[0].example}
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <div className=' font-semibold text-blue-950 py-4'>
                      <p className=' mb-4'>
                        (noun) Definition : Lorem ipsum dolor sit amet,
                        consectetur adi
                      </p>

                      <div className='bg-amber-400 px-5 py-3 rounded-md text-slate-50'>
                        Example right here
                      </div>
                    </div>
                  )}
                </div>
                <div className=' flex flex-row my-5'>
                  <select
                    name=''
                    id=''
                    className='w-2/7  mr-10 outline-none border-1 rounded-lg border-orange-300 px-2 text-orange-800'>
                    <option value=''>11111</option>
                    <option value=''>1dadasda11</option>

                    <option value=''>122222</option>
                  </select>
                  <button className='bg-linear-to-r from-yellow-400 to-orange-500 px-15 h-10 rounded-full text-slate-50'>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
export default WordsPage