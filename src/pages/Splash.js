import logo from '../images/content/logo.png';

function Splash(){
   return(
      <section>
         <div className="container mx-auto min-h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
               <div className="w-96 md:w-4/12 rounded-md border-2 border-pink-200 shadow-lg transition-shadow text-center">
                  <img className="mx-auto mb-8" src={logo} alt="Luxspace | Fullfill your house with beautiful furniture"/>
                  <p className="mb-16 px-4">Kami menyediakan furinture berkelas yang membuat runagan terasa homey.</p>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Splash;