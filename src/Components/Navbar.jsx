import { Keyboard } from "@phosphor-icons/react/dist/ssr"
import KeyboardIcon from '../assets/keyboard.svg'; // Import the SVG

const Navbar = () => { 
    return ( 
        <nav className="w-11/12 py-6 px-10">
            <div className="flex flex-row gap-3 items-center justify-start">
                {/* <img src={KeyboardIcon} alt="Keyboard" className="w-12 h-12 text-correct" /> Add SVG icon */}
                <Keyboard className="h-16 w-16 text-correct"/>
                <span className="text-3xl text-correct font-bold font-oxygen">aaravtype</span> {/* Make text smaller */}
            </div>
        </nav>
    )
}
export default Navbar