import React, { useEffect, useState } from 'react'
import StorageService from '../../../services/StorageService';

export default function ModeSwitcher() {
  const [mode, setMode] = useState(StorageService.mode);
  
  useEffect(() => {
    StorageService.mode = mode;
  }, [mode])

  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  }

  return (
    <div onClick={handleClick}>
      {mode === "dark" ?
        <i className="fa fa-sun-o fa-lg"></i> :
        <i className="fa fa-moon-o fa-lg"></i>
      }
    </div>
  )
}
