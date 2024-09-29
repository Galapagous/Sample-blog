import Header from "../../components/Header/Header"
import PostImage1 from '../../assets/signin.jpg'
import Footer from "../../components/Footer/Footer"
import { FaSearch } from "react-icons/fa"
import { Button, Select, TextInput } from "flowbite-react"
import TopicCard from "../../components/TopicCard/TopicCard"
import { topic } from "../../assets/data"
import { useEffect, useState } from "react"



function Posts() {


  // variables
  const [searchForm, setSearchForm] = useState({})
  const [filteredTopic, setFilteredTopic] = useState([])


  // search filter system
  useEffect(()=>{
    const filterTopic = ()=>{
      if(!searchForm) return
      let searchResult = topic;
      if(searchForm.category === 'all') {
        setFilteredTopic(topic)
        return
      }
      if(searchForm.category) searchResult = searchResult.filter(eachTopic=>eachTopic.category === searchForm.category)
      if(searchForm.name) searchResult = searchResult.filter(eachTopic=>eachTopic.title === searchForm.name)
      setFilteredTopic(searchResult)
      }
      filterTopic()
  }, [searchForm])



  const handleSearch = ()=>{
    alert('form submitted')
  }


  const handlePagination = (direction)=>{
    alert(direction)
  }


  const handleSelect = (e)=>{
    if(e.target.name === 'category' && e.target.value === 'all') setFilteredTopic(topic)
    setSearchForm({...searchForm, [e.target.name]: e.target.value})
  }

  return (
    <div className="w-full h-full bg-[#0f0e0e]">
      <Header/>
      <div  className="w-full h-[70vh] bg-[#cac1ac] flex items-center justify-center gap-20">
        <div className="sm:w-[40%] w-full p-2">
          <h2 className="sm:text-2xl text-xl font-medium">Featured Post</h2>
          <h1 className="sm:text-[3.5rem] text-[2rem] font-medium mb-2 sm:mb-1">
            What push my grit
          </h1>
          <p className="sm:text-base text-sm h-[150px] sm:h-auto overflow-hidden">
            I heard a quote as follows, turn your conditions into pain, turn your pain into determination
            turn your determination inot action, turn your action into experience into knowledge, turn your 
            knowledge into the life that you want. its not that hard. you just need to be completely fed up
             with where you are.
          </p>
          <div className="flex items-center justify-start gap-4 py-2">
            <span className="text-sm font-medium">By Muhammed Musa</span>
            <div className="w-1 h-5 bg-gray-700 rounded-full"></div>
            <span className="text-sm font-medium">May 23 2024</span>
          </div>
          <button className="bg-yellow-300 mt-2 text-black font-semibold px-4 py-2">Read more</button>
        </div>
        <div className="w-[30%] hidden sm:flex overflow-hidden h-[300px]">
          <img className="w-full h-full object-cover" src={PostImage1} alt="post image here" />
        </div>
      </div>
      <div className="bg-white py-5 sm:px-14 px-4">
        <div>
          <h1 className="text-4xl mb-5">All Post</h1>
          <form onSubmit={handleSearch} className="mb-2 flex items-start justify-start sm:gap-20 gap-1 sm:flex-row flex-col">
            <TextInput className="w-full sm:w-auto" onChange={handleSelect} name="topic" type="text" placeholder="search posts"/>
            <Select onChange={handleSelect} name='category' className="text-gray-500 w-full sm:w-auto" id="category">
              <option value="all">all</option>
              <option value="Phylosophy">Phylosophy</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
            </Select>
            <Button className="bg-gray-500 text-white px-6 py-1 rounded-sm w-full sm:w-auto">
              <FaSearch/>
            </Button>
          </form>
          <hr className="h-[2px] bg-red-400"/>
        </div>
        <div className="py-4 flex items-center justify-evenly flex-wrap">
          {filteredTopic.map((eachTopic, index)=>{
            return(
              <TopicCard {...eachTopic} key={index}/>
            )
          })}
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={()=>{handlePagination('prev')}} className="text-black font-semibold">Prev</Button>
          {
            [1,2,3].map((_, index)=>{
              <div className="text-red-400" key={index}>1</div>
            })
          }
          <Button onClick={()=>{handlePagination('next')}} className="text-black font-semibold">Next</Button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Posts