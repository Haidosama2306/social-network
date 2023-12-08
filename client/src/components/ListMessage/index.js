import React, {  useCallback, useEffect, useRef, useState } from 'react';
import useStyle from './style.module.css'
import axios from 'axios';

function ListMessage({ messages, ref, chooseUser }) {
    const [file, setFile]=useState('')
    const [dataMess, setDataMess] = useState()
    const [page, setPage] = useState(0)
    useEffect(()=>{
      console.log(messages);
      setDataMess(messages)
    console.log(dataMess);

    },[messages])
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
      const bearerToken = localStorage.getItem('auth_token');
    const headers = {
  'Authorization': `Bearer ${bearerToken}`,
  'Content-Type': 'application/json',

};
    const handleScroll = (e)=>{
        console.log(e.target.scrollTop);
        if (e.target.scrollTop == 0) {
          setPage(page+1)
          console.log(page);
          const data = {receiver_user_id: chooseUser, page: page}
            // Thêm phần tử mới bên trong phần tử cuộn
            axios.post(`http://localhost:5000/messages/get-message`,{data: data}, {headers: headers})
            .then(message=>{
              if (message.data.messages.length!=0) {
                console.log(message.data);
              message.data.messages.forEach(element => {
                setDataMess(pre=>[element,...pre])
              });
              }
            })
        }
    }
    return (
        <>
        <div ref={ref}  className={`${useStyle.box}`}   onScroll={handleScroll}>
            
            {dataMess && dataMess.map((message,i) => {
                const check = localStorage.getItem('auth_user') == message.user_id
                const checkFile = message.type
               
                return(
                       <div key={i}>
                    <div  className={(check ? useStyle.sender + ' bg-primary ' : useStyle.receiver) + ' mb-3 sub-element'}>
                        { (checkFile=='text' )? message.content:''}
                        {((checkFile!='text' && checkFile !=undefined) ? <a data-b={message.file} data-type={message.type} data-name={message.content} onClick={handleDownload}>{message.content}<img src='https://img.favpng.com/18/21/5/text-file-computer-icons-png-favpng-8mTLWF2sfzqqSnR2nPbsuvr6g.jpg'/> </a> : '')}
                    </div></div>
                )
                
            })}
  </div>
        </>
    );
}

export default ListMessage;