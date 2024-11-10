import { Cursor } from "@phosphor-icons/react"
import useStore from "../store"
const Unfocused = () => { 
    const {
        isFocused, 
        setIsFocused
    } = useStore()
    const handleFocus = () => { 
        setIsFocused(true)
    }
    return ( 
        <div onClick={handleFocus} onKeyDown={handleFocus} className="w-full py-16 flex items-center justify-center">
            <div className="flex flex-row text-untyped items-center justify-center gap-4">
                <Cursor size={16} weight="bold" />
                <span>Click to focus!</span>
            </div>
            
        </div>
    )
}
export default Unfocused