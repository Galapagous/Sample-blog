import Header from '../../components/Header/Header'
import Image from '../../assets/food.jpg'
import Image2 from '../../assets/lock.jpg'
import Image3 from '../../assets/worktable.jpg'
import Image4 from '../../assets/view.jpg'
import Latest from '../../assets/signout.jpg'
import Latest3 from '../../assets/cars.jpg'
import Background from '../../assets/life.jpg'
import Latest2 from '../../assets/life.jpg'
import { useEffect, useRef, useState } from 'react'
import TopicCard from '../../components/TopicCard/TopicCard'
import LatestCard from '../../components/LatestCard/LatestCard'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import FadeInSection from '../../components/Utils/FadeinSection'
import axios from 'axios'


const Homepages = () => {

  const [currentPost, setCurrentPost]= useState(0)
  const [fade, setFade] = useState(false)
  const contentRef = useRef()


  // data fetching criteria
  const [category, setCategory] = useState('all')


  const homeData = [
    {
      category:"Phylosophy",
      title:"The quran teaches us that Allah does not burden the heart more than it can bear",
      desc:"The Quran teaches us that Allah, in His infinite wisdom and mercy, does not burden a soul with more than it can bear. This profound message serves as a source of comfort and strength for believers facing life's challenges. It reassures us that every trial and hardship we encounter is within our capacity to endure, even when it feels overwhelming. This teaching encourages patience, resilience, and faith, reminding us that we are never alone in our struggles. With trust in Allah, we can find the strength to overcome difficulties, knowing that they are part of a divine plan designed to help us grow and draw closer to Him",
      date:"08 - 10 - 2024",
      image: Image4
    },
    {
      category:"Food",
      title:"Allah said in the holy quran the in the end, islam will be split to so my groups",
      desc:"In the Holy Quran, it is mentioned that the followers of Islam will eventually divide into different groups or sects, each claiming to follow the true path. This prophecy is reflected in the hadiths where the Prophet Muhammad (PBUH) foretold that his Ummah (community) would split into seventy-three sects, but only one would be on the right path. This highlights the importance of adhering to the core teachings of Islam and the Quran while recognizing that differences in interpretation and practice are inevitable. Muslims are encouraged to seek knowledge, remain united in their faith, and avoid division to maintain the strength and unity of the Ummah.",
      date:"04 - 10 - 2024",
      image: Image
    },
    {
      category:"Lifestyle",
      title:"George orwell teaches us to never abandone the truth.",
      desc:"George Orwell, through his works, particularly in 1984, teaches the profound importance of holding onto the truth in the face of overwhelming pressure. He illustrates how truth can be manipulated and how societies can be led astray when individuals forsake their commitment to reality. Orwell's message is a powerful reminder that abandoning the truth not only erodes personal integrity but also paves the way for tyranny and oppression. Upholding the truth, even when it is difficult, is essential for maintaining freedom and justice in any society",
      date:"02 - 10 - 2024",
      image: Image2
    },
  ]


  // ------------Animation-------------
  useEffect(() => {
    const changeCurrentMovie = setInterval(() => {
      setFade(true)
      setTimeout(() => {
        setCurrentPost((prevPost) => 
          prevPost === homeData.length - 1 ? 0 : prevPost + 1
        );
        setFade(false);
      }, 500);
    }, 10000);
    
    return () => clearInterval(changeCurrentMovie);
  }, [homeData.length]);
  
  

  // -------------Reaveal on scroll in progress--------------
  const [isIntersecting, seIsintersecting] = useState(false)
  const ref = useRef(null)
  
  useEffect(()=>{
    const observer = new IntersectionObserver(([entry])=>{
      seIsintersecting(entry.isIntersecting)
    }, {rootMargin: '-300px'});
    console.log(isIntersecting)
    observer.observe(ref.current)
  }, [isIntersecting])

  useEffect(()=>{
    if(isIntersecting){
      ref.current.querySelectorAll('div').forEach((el=>{
        el.classList.add('slide-in')
      }))
    } else{
      ref.current.querySelectorAll('div').forEach((el)=>{
        el.classList.remove('slide-in')
      })
    }
  }, [isIntersecting])
  // -------------Reaveal on scroll in progress--------------



  // fetch post latest posts
  useEffect(()=>{
    const getTopPost = async()=>{
      const post = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post?max=6`)
      console.log(post)
    }
    getTopPost()
  },[])


  // // fetch post by pagination
  // useEffect(()=>{
  //   const getTopPost = async()=>{
  //     const post = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post?pag=1,5`)
  //     console.log(post)
  //   }
  //   getTopPost()
  // },[])


  // fetch post by category
  useEffect(()=>{
    const getTopPost = async()=>{
      const post = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post?cat=programming`)
      console.log(post)
    }
    getTopPost()
  },[])


  const sampleText = 'In this world where speed is the order of the day, speed have been our major priority. Also a website with bad speed wont have a good SEO rating.'

  const handlePostNavigation = (index)=>{
    setCurrentPost(index)
  }

  return (
    <div ref={ref} className="w-[100%] overflow-hidden">
      <div className="">
      <div style={{backgroundImage:`url(${homeData[currentPost]?.image})`}} className="bg-cover min-h-[100vh] relative transition-all duration-500 ease-in-out after:w-full after:h-full after:bg-black after:absolute after:top-0 after:left-0 after:opacity-60">
        <Header/>
        <FadeInSection>

        <section className="w-full h-full">
          <div style={{opacity: fade ? '0' : '1', transition: 'opacity 400ms ease-in'}} className="absolute bottom-[150px] left-[20px] text-white sm:w-[70%] w-full z-30">
          <h3 className='mb-3 text-base'>{homeData[currentPost]?.category}</h3>
          <h1 className='sm:text-[2rem] text-xl font-[700]'>{homeData[currentPost]?.title}</h1>
          <div className="flex items-center justify-start gap-[10px] mt-10">
            <span className='min-w-[120px] hidden sm:flex'>{homeData[currentPost]?.date}</span>
            <div className="w-8 h-1 bg-white rounded-sm"></div>
            <p className='sm:text-[1.2rem] text-lg'>
              {homeData[currentPost]?.desc.split(' ').splice(0, 30).join(' ')}
              ... <Link to='/post/1' className='text-lg font-semibold bg-orange-400 px-6 py-2 block w-fit mt-4'>Read More</Link>
            </p>
          </div>
          </div>
          <div className="pageCounter">
            {homeData.map((eachData, index)=>{
              return(
                <div onClick={()=>{handlePostNavigation(index)}} key={index} className={`${currentPost === index ? "counter" : "unactive"}`}></div>
              )
            })}
          </div>
        </section>
      </FadeInSection>
      

        {/* --------Popular topics-------- */}
      </div>
      {/* --------Popular topics-------- */}  
      <FadeInSection>

        <section style={{backgroundAttachment: 'fixed', backgroundImage: `url(${Background})`, backgroundPosition: 'center'}} className="bg-cover p-8">
          <h1 className='text-[3rem] font-semibold text-white'>Popular <span style={{color: 'tomato'}}>Topics</span></h1>
          <ul className='flex items-center justify-start gap-3 my-4'>
            <li className='text-white text-xl hover:bg-orange-400 cursor-pointer px-4 py-2'>All</li>
            <li className='text-white text-xl hover:bg-orange-400 cursor-pointer px-4 py-2'>Coding</li>
            <li className='text-white text-xl hover:bg-orange-400 cursor-pointer px-4 py-2'>Lifestyle</li>
            <li className='text-white text-xl hover:bg-orange-400 cursor-pointer px-4 py-2'>Fashion</li>
          </ul>
          <div className="flex items-center justify-start gap-10 flex-wrap">
            {[1,2,3,4,5,6,7,8].map((eachCard, index)=>{
              return(
                <TopicCard key={index} Image={Image3} date='08.08.2021' title='Dream destinations to visit this year in Paris' desc='Progressively incentivize cooperative systems through technically sound functionalities. Credibly productivate seamless data with flexible schemas.'/>
              )
            })}
          </div>
          <div className='w-full flex items-center justify-center'>
          <Link className='px-8 py-3 bg-[tomato] text-white text-center w-fit' to='/posts'>See More</Link>
          </div>
        </section>
      </FadeInSection>


        {/* -----Latest section----- */}
        <FadeInSection>

        <section className='w-[100vw] min-h-[100vh] mx-[0px] relative px-[10px] py-[100px]'>
          <h1 ref={contentRef} className='text-[2rem] text-gray-500 mb-3'>Latest</h1>
          <div style={{backgroundImage: `url(${Latest})`}} className="w-full min-h-[70vh] bg-cover border-2 border-gray-500 bg-bottom flex items-center justify-center text-white">
            <div className='p-4'>
              <h2 className='my-auto text-[1rem] bg-gray-500 px-7 py-3 w-fit'>Tech</h2>
              <h1 className='text-[2rem]'>How to optimize react applications</h1>
              {<p className='text-[1.2rem] w-[50%] my-2 text-base'>
                {sampleText.split(' ').slice(0, 20).join(' ')}
                ... <button className='px-6 py-1.5 mt-2 bg-orange-400 text-white'>Read more</button>
              </p>}
              <div className='w-[50px] h-1 bg-white my-3'></div>
              <span>09 - 09 - 2024</span>
            </div>
          </div>
        </section>
        </FadeInSection>

        {/* --------Most liked-------- */}
        <FadeInSection>
        <section className='w-[100vw] min-h-[80vh] my-8 relative py-3 sm:px-28 px-2'>
          <h1 className='text-[2rem] mb-3'>Most <span style={{color: 'tomato'}}>Liked</span></h1>
          <div className="text-white w-full flex items-center justify-center flex-wrap gap-5">
                <LatestCard Image={Latest3} time='09 - 09 - 2024' title='How to optimize react applications' desc='In this world where speed is the order of the day, speed have been our major priority. Also a website with bad speed wont have a good SEO rating.'/>
                <LatestCard Image={Latest2} time='09 - 09 - 2024' title='How to optimize react applications' desc='In this world where speed is the order of the day, speed have been our major priority. Also a website with bad speed wont have a good SEO rating.'/>
          </div>
        </section>
        </FadeInSection>
      </div>
      <Footer/>
    </div>
  )
}

export default Homepages