import {  useState } from 'react';

const useToggle = (bool = false) => {

    const [state,setState] = useState(bool)
    const [eventElement, setEventElement] = useState(null)

    const toggle = () => {
      setState(prev=>!prev)
    }

    const toggleWithEvent = (e) => {
        setEventElement(e.target)
        setState(prev=>!prev)
    }


    return {
      state,
      toggle,
      eventElement,
      toggleWithEvent
    };
}
export default useToggle