import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import sample from '../public/blogImage.jpg'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className=" w-full h-screen  items-center py 20 p-20 lg:flex">
       <div className="w-full flex justify-between items-center h-full">
        <div className="w-7/12 h-full p-10 flex flex-col justify-between">
         <Image src={sample} alt="sample image" className="w-full h-4/6 rounded-2xl"/>
         <h3>TECHNOLOGY</h3>
         <h2>what will happen to the text we just assign to this page incase ther is an error of undefined</h2>
         <p>Tunde | 2  agodays</p>
        </div>
        <div className="w-6/12 h-full">
        <div className="w-full h-1/4 rounded-2xl my-10 flex justify-between">
        <Image src={sample} alt="sample image" className="w-2/5 h-full rounded-2xl"/>
        <div className="w-7/12">
        <h3>TECHNOLOGY</h3>
         <h4 className="my-2">what will happen to the text we just assign </h4>
         <p>Tunde | 2 agodays</p>
        </div>
        
        </div>
        <div className="w-full h-1/4 rounded-2xl my-10 flex justify-between">
        <Image src={sample} alt="sample image" className="w-2/5 h-full rounded-2xl"/>
        <div className="w-7/12">
        <h3>TECHNOLOGY</h3>
         <h4 className="my-2">what will happen to the text we just assign </h4>
         <p>Tunde | 2 ago days</p>
        </div>
        
        </div>
        <div className="w-full h-1/4 rounded-2xl my-10 flex justify-between">
        <Image src={sample} alt="sample image" className="w-2/5 h-full rounded-2xl"/>
        <div className="w-7/12">
        <h3>TECHNOLOGY</h3>
         <h4 className="my-2">what will happen to the text we just assign </h4>
         <p>Tunde | 2 agodays</p>
        </div>
        
        </div>
        </div>
       </div>
      </div>
    </main>
  );
}
