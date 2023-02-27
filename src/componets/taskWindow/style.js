const style = document.createElement("style");
style.innerHTML = `
  *{
    margin: 0;
    padding: 0;
  }
  .draggable{
    padding: 8px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    background-color: #33002c;
    color: white;
  }
  .header--img{
    width: 10px;
    fill: white;
  }
`;

export default style;