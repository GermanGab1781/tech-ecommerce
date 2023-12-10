import { BsInstagram, BsWhatsapp, BsFacebook, BsFillTelephoneFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { HiLocationMarker, HiReceiptRefund } from 'react-icons/hi'
export default function Footer() {
  return (
    <div className="relative flex md:flex-row bg-black text-white flex-col gap-y-5 py-5 place-content-evenly text-center md:text-3xl text-xl border-t-2 border-orange-400">
      <div className='h-full'>
        <span className='text-2xl md:text-3xl text-orange-400'>Contact</span>
        <div className="flex flex-col gap-y-2 pl-2 ml-7 text-start md:place-items-start place-items-center text-xl ">
          <a className='relative' href="mailto:germangabriel1998@gmail.com" target="_blank" rel='noreferrer'><AiOutlineMail className="absolute text-orange-400 -left-8 bottom-1 h-5 w-10 " />germangabriel1998@gmail.com</a>
          <a className="relative" href="https://wa.me/2215770092" target="_blank" rel='noreferrer'><BsFillTelephoneFill className="absolute text-orange-400 -left-8 bottom-1 h-5 w-10 " />+2215770092</a>
          <a className="relative" href="https://maps.app.goo.gl/hwMh3QRAoGxSxqnP8" target="_blank" rel='noreferrer'><HiLocationMarker className="absolute text-orange-400 -left-8 bottom-1 h-5 w-10 " />Buenos Aires, La Plata</a>
          <a className="relative" href="https://wa.me/2215770092?text=Hola,quiero devolver mi producto" target="_blank" rel='noreferrer'><HiReceiptRefund className="absolute text-orange-400 -left-8 bottom-1 h-5 w-10 " />Regret button</a>
        </div>
      </div>

      <div className="h-full">
        <span className='text-2xl md:text-3xl text-orange-400'>Social</span>
        <div className="flex flex-row pt-5 gap-x-3 md:place-content-start place-content-center">
          <a href="https://www.instagram.com/german_gabriel__" target="_blank" rel='noreferrer'><BsInstagram className="h-10 w-10 scale-110 transition-all " /></a>
          <a className="md:ml-6 ml-3" href="https://wa.me/2215770092" target="_blank" rel='noreferrer'><BsWhatsapp className="h-10 w-10 scale-110 transition-all" /></a>
          <a className="md:ml-6 ml-3" href="https://es-la.facebook.com/" target="_blank" rel='noreferrer'><BsFacebook className="h-10 w-10 scale-110 transition-all" /></a>
        </div>
      </div>
    </div>

  )
}
