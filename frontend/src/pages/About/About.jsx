import Header from "../../components/Header/Header"
import Writer from '../../assets/view.jpg'
import Background from '../../assets/lock.jpg'
import Footer from "../../components/Footer/Footer"
import { FaBusinessTime, FaCode, FaDev } from "react-icons/fa"
import AboutCard from "../../components/About/AboutCard"
import Contact from '../../assets/view.jpg'
import { Button, Label, Textarea, TextInput } from "flowbite-react"

const About = () => {
  return (
    <div className="bg-black w-full overflow-hidden">
      <Header/>
      <section className="w-full h-[50vh] bg-white">
        <div className="flex relative sm:justify-end justify-start w-full sm:px-32 px-2">
          <div className="sm:p-6 p-4 mt-20 bg-white text-gray-700 w-[450px] h-fit">
            <p className="text-base">
              I am a self learner, a web mechanical engineer, a software engineer/fullstack developer, a cloud engineer and tech support engineer on the side.
              i live with the phylosophy of the impediment of actions advances action, what stands in the way becomes the way. With this phylosophy, i am able 
              to see most of my obsacles as an oppuetunity to grow.
            </p>
          </div>
          <div className="w-[650px] sm:block hidden p-6 h-[350px] text-gray-500 bg-white sm:absolute relative z-30 left-10 top-20">
            <h1 className="mb-5 text-base">About Me</h1>
            <h2 className="text-[2rem] p-3">
              If you pray for knowledge, ya Allah will provide you with circumstance and oppurtunity to grow that knowledge, your response is what matters. 
            </h2>
          </div>
        </div>
      </section>



      {/* yellow and black followers */}
      <section className="w-full h-[80vh] object-cover relative" style={{backgroundImage:`url(${Writer})`, backgroundSize:'cover', backgroundPosition:'center'}}>
        <div className="flex items-center justify-center gap-16 p-8 bg-yellow-300 text-black font-semibold text-lg w-fit absolute bottom-0 sm:left-[30%] left-0">
          <div>
            <h1 className="font-bold sm:text-[4rem] text-[2rem] sm:mb-8 mb-4">39K</h1>
            <h4 className="font-semibold text-base">Foolowers</h4>
          </div>
          <div>
            <h1 className="font-bold sm:text-[4rem] text-[2rem] sm:mb-8 mb-4">3</h1>
            <h4 className="font-semibold text-base">Companies</h4>
          </div>
          <div>
            <h1 className="font-bold sm:text-[4rem] text-[2rem] sm:mb-8 mb-4">19</h1>
            <h4 className="font-semibold text-base">Projects live</h4>
          </div>
        </div>
      </section>


      {/* list of work section */}
      <section style={{backgroundAttachment: 'fixed', backgroundImage: `url(${Background})`, backgroundPosition: 'center', backgroundColor:'rgba(77, 82, 86, 0.9)', backgroundBlendMode:'multiply'}} className="bg-cover p-8">
        <div className="text-center mb-10 font-extrabold text-3xl text-[white]">
          <h1>Services</h1>
        </div>
        <div className="flex sm:flex-row flex-col gap-5 items-center justify-between px-10">
          <AboutCard Logo={<FaCode className="mb-5 mx-auto w-10 h-10"/>} title='Frontend' description='Crafting visually appealing and user-friendly interfaces with React.js that work seamlessly across all devices'/>
          <AboutCard Logo={<FaBusinessTime className="mb-5 mx-auto w-10 h-10"/>} title='Backend' description='Designing and implementing RESTful APIs with Express.js to facilitate efficient communication between the frontend and backend.'/>
          <AboutCard Logo={<FaDev className="mb-5 mx-auto w-10 h-10"/>} title='Devops' description='Setting up continuous integration and continuous deployment pipelines to streamline development and deployment processes.'/>
        </div>
      </section>


      {/* contact me section */}
      <section className="w-full bg-black p-10">
        <h1 className="text-white text-2xl">Contact Me</h1>
        <div className="flex items-center justify-center gap-5">
          <div className="sm:w-1/2 w-full">
            <h2 className="text-white text-center text-sm">Send Message</h2>
            <form className="w-full" action="">
              <div className="w-full">
               <Label className="w-full text-white mb-2">FullName</Label>
                <TextInput type="text" />
              </div>
              <div className="w-full">
               <Label className="w-full text-white mb-2">Email</Label>
                <TextInput type="email" />
              </div>
              <div className="w-full">
               <Label className="w-full text-white mb-2">Message</Label>
                <Textarea />
              </div>
              <Button className="px-3 hover:bg-white hover:text-black flex items-center justify-center">Send</Button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default About