import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';

import { useSelector, useDispatch } from 'react-redux';
import {selectCardList, setCardList} from '../redux/balancesSlice'

import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import {GrFormNext} from 'react-icons/gr'
import {GrFormPrevious} from 'react-icons/gr'

import { Navigation, FreeMode, Pagination,  } from 'swiper/modules';

import { Swiper, SwiperSlide,  } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/free-mode";

import mastercard from "../images/Mastercard.png"

const TotalBalance = () => {
    const cardList = useSelector(selectCardList)
    const dispatch = useDispatch()

    const cardListRef = collection(db, "accounts")

    // function to get data from firestore
    // useEffect(() => {
    //     const getCardList = async () => {
    //         try {
    //             const data = await getDocs(cardListRef);
    //             const filteredData = data.docs.map((doc) => ({
    //                 ...doc.data()
    //             }));
    //             dispatch(setCardList(filteredData));
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    
    //     getCardList();
    // }, [cardListRef, dispatch]);

    const getCardList = async () => {
        try {
          const data = await getDocs(cardListRef);
          return data.docs.map((doc) => ({
            ...doc.data(),
          }));
        } catch (err) {
          throw new Error('Failed to fetch card list');
        }
      };
    useQuery('cardList', getCardList, {
        refetchOnWindowFocus: false, 
        onSuccess: (fetchedData) => {
            dispatch(setCardList(fetchedData))
        }
      });
      

    const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
    const [nextEl, setNextEl] = useState<HTMLElement | null>(null)
  
    const totalAccountBalance = cardList.reduce((acc: any, card: any) => acc + Number(card.accountBalance), 0)
  return (
    <div className=' '>
        <h3 className='text-left text-gray02 text-[22px]'>Total Balance</h3>
        <div className='bg-[#FFF] h-[232px]  px-6 py-5 mt-2 divide-y rounded-lg '> 

            <div className='flex justify-between items-center  pb-3'>
                <p className='text-defaultBlack font-extrabold text-[22px] '>${totalAccountBalance}</p>
                <p className='t ext-secondary text-sm '>All Accounts</p>
            </div> 

            <div className='pt-3'>
            <Swiper
            modules={[FreeMode, Pagination, Navigation]}
          slidesPerView={1}
          
          pagination= {{clickable: true}}
          freeMode={true}
          
          navigation={{ prevEl, nextEl }}
        
        className="mySwiper grid  p-4"
      >
        
            {cardList.map((card: any) => 
              <SwiperSlide key={card.accountNumber} className="shrink-0  bg-[#299D91]  p-4 ">
                <div className=''>

                    <div className='flex justify-between '>
                        <div className='text-left'>
                            <p className='text-greyish2 text-sm font-medium'>Account Type</p>
                            <p className='text-[#FFF] text-base font-semibold '>{card.accountType}</p>
                        </div>

                        <img src={mastercard} alt="mastercard" className='w-12 h-8'/>
                    </div>

                    <div className='flex justify-between items-center pt-2'>
                        <p className='text-greyish2 text-sm font-medium'>{card.accountNumber.toString()
        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "**** **** **** $4")}</p>

                        <div className='flex items-center space-x-3'>
                            <p className='text-[#FFF] font-bold'>${card.accountBalance}</p>
                            <BsFillArrowUpRightCircleFill className='w-4 h-4 rounded-[20px] text-white bg-pry-col'/>
                        </div>
                    </div> 
                </div>
                
                      
              </SwiperSlide>
      )}
          <div className='flex justify-between items-center mt-5'>
            <button ref={(node) => setPrevEl(node)} className='flex items-center text-sm font-medium'> <GrFormPrevious className='w-4 h-4'/>
             Previous</button>
             <button ref={(node) => setNextEl(node)} className='flex items-center text-sm font-medium'>Next <GrFormNext className='w-4 h-4'/></button>
          </div>
            
        
        </Swiper>
                
                 

            </div>
        </div>
    </div>
  )
}

export default TotalBalance