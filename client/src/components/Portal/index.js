import { useEffect, useMemo } from "react"
import ReactDOM from 'react-dom';

const Portal = ({children}) => {
  const parent = document.getElementById('modal')
    const el = useMemo(()=>document.createElement('div'),[])

    useEffect(()=>{
        parent.appendChild(el)

        return () =>{
            parent.removeChild(el)
        }
    },[])
    
  return ReactDOM.createPortal(children,el)
}

export default Portal
