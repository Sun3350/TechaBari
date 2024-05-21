import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import sample from '../public/blogImage.jpg'
import sample2 from '../public/pic1.jpg'
import sample3 from '../public/p (3).jpg'
import sample4 from '../public/p (2).jpg'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className=" w-full  items-center py 20 p-20 flex flex-col  justify-between">
       <div className="w-full h-screen flex justify-between items-center  py-20">
        <div className="w-7/12 h-full p-10 flex flex-col justify-between">
         <Image src={sample} alt="sample image" className=" w-full h-4/6 rounded-2xl"/>
         <h3>TECHNOLOGY</h3>
         <h2>what will happen to the text we just assign to this page incase ther is an error of undefined</h2>
         <p>Tunde | 2  agodays</p>
        </div>
        <div className="w-6/12 h-full">
        <div className="w-full h-1/4 rounded-2xl my-10 flex justify-between">
        <Image src={sample3} alt="sample image" className="w-2/5 h-full rounded-2xl"/>
        <div className="w-7/12">
        <h3>TECHNOLOGY</h3>
         <h4 className="my-2">what will happen to the text we just assign </h4>
         <p>Tunde | 2 agodays</p>
        </div>
        
        </div>
        <div className="w-full h-1/4 rounded-2xl my-10 flex justify-between">
        <Image src={sample4} alt="sample image" className="w-2/5 h-full rounded-2xl"/>
        <div className="w-7/12">
        <h3>TECHNOLOGY</h3>
         <h4 className="my-2">what will happen to the text we just assign </h4>
         <p>Tunde | 2 ago days</p>
        </div>
        
        </div>
        <div className="w-full h-1/4 rounded-2xl my-10 flex justify-between">
        <Image src={sample2} alt="sample image" className="w-2/5 h-full rounded-2xl"/>
        <div className="w-7/12">
        <h3>TECHNOLOGY</h3>
         <h4 className="my-2">what will happen to the text we just assign </h4>
         <p>Tunde | 2 agodays</p>
        </div>
        
        </div>
        </div>
       </div>
       <div className=" w-full h-screen  items-center py-10  lg:flex bg-lime-500">
           <div className="w-8/12 h-full bg-amber-200">
              second 
           </div>
           <div className="w-2/6 bg-gray-400">
            what 
           </div>
       </div>
      </div>
      
    </main>
  );
}
