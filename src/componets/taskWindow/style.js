const style = document.createElement('style');
style.innerHTML = `
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul{
    list-style-type:none;
  }
  .draggable{
    padding: 8px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    background-color: #33002c;
    color: white;
  }
  .header--img{
    width: 20px;
    height: 20px;
    fill: #fff;
    margin-left: 8px;
  }
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 5px;
    padding-bottom:5px;
  }
  .titleBtn{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    border-radius: 4px;
    cursor: pointer;
  }
  .titleBtn svg{
    width: 26px;
    height: 26px;
  }
  .titleBtn:hover {
   background-color: #e3fbe5;
  }
  .main{
    display:flex;
    padding: 16px;
    flex-direction: column;
    margin-bottom: 25px;
  }
  .main label{
    font-weight: 600;
    margin-bottom:5px;
  }
  .main textarea{
    resize: unset;
    border-radius: 4px;
    border: 1px solid #eee;
    outline: unset;
    padding: 8px;
  }
  .subBntMain{
    display:flex;
    align-items:center;
    cursor:pointer;
    margin-bottom:10px;
  }
  .subTask{
    padding-left: 16px;
    padding-right: 16px;
  }
  .subBnt{
    margin-left: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    border: 1px solid rgb(235,233,233);
    border-radius: 4px;
    padding: 6px;
  }
  .subBnt:hover{
     background-color: #eee;
  }
  .subList li{
    display: flex;
    align-items: flex-start;
    align-items:center;
    padding: 4px 6px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
   }
   .subUser{
   fill:#b0b0b0;
    width:30px;
    height: 25px;
   }
   .subDelete{
    width: 18px;
    height: 18px;
    margin-right:6px;
    padding: 2px;
    cursor:pointer;
   }
   .subDelete:hover{
        background-color: #fba7a7;
   }
  .subSettings{
    display:flex;
    align-items:center;
    margin-left:5px;
  }
   .subSettings .titleBtn svg{ 
    width: 20px;
    height: 20px;
    }
   .subInput{
    display: flex;
    margin-left: 8px;
    flex: 1;
    padding: 5px;
    flex: 1;
    border-color: transparent;
    background-color: transparent;
    outline: unset;
    resize: none;
    overflow: hidden;
    min-height: 46px;
   }
    
`;

export default style;
