import React, { useCallback, useState } from 'react';
import useStyle from './style.module.css'
function ListMessage({ messages }) {
    const [file, setFile]=useState('')
    const handleDownload = useCallback((e) => {
        let url = ''
        try {
          const decodedData = atob(e.target.getAttribute('data-b').split(',')[1]);
          const uint8Array = new Uint8Array(decodedData.length);
    
          for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
    
          const blob = new Blob([uint8Array], { type: e.target.getAttribute('data-type') });
      
          url = URL.createObjectURL(blob);
        } catch (error) {
          console.error('PDF Loading Error:', error);
        }
        const a = document.createElement('a');
        a.href = url;
        a.download = e.target.getAttribute('data-name'); 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, [])
    
    return (
        <>
            {messages && messages.map((message,i) => {
                const check = localStorage.getItem('auth_user') == message.user_id
                const checkFile = message.type
                return(
                    <div key={i} className={(check ? useStyle.sender + ' bg-primary ' : useStyle.receiver) + ' mb-3'}>
                        { (checkFile=='text' )? message.content:''}
                        {((checkFile!='text' && checkFile !=undefined) ? <a data-b={message.file} data-type={message.type} data-name={message.content} onClick={handleDownload}>{message.content}<img src='https://img.favpng.com/18/21/5/text-file-computer-icons-png-favpng-8mTLWF2sfzqqSnR2nPbsuvr6g.jpg'/> </a> : '')}
                    </div>

                )
                
            })}

        </>
    );
}

export default ListMessage;