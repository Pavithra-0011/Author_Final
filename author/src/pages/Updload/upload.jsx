import React from 'react'
import { useState } from 'react'
import html2canvas from "html2canvas";
import { useRef } from 'react'
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import postData from '../../Redux/action/action.jsx'
import './upload.css'

function UploadBook() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [font, setFont] = useState("Arial");
    const [position, setPosition] = useState("");
    const [bgColor, setBgColor] = useState("#d3d3d3");
    const [showPicker, setShowPicker] = useState(false);
    const [bgImage, setBgImage] = useState(null);
    const fileInputRef = useRef(null);


    const [data, setData] = useState({
        title: '',
        author: '',
        genre: '',
        price: 0,
        description: '',
        pdf: null,
        date: new Date()
    })
    


    const coverRef = useRef();
    const handleDownload = async () => {
    const canvas = await html2canvas(coverRef.current);
    const link = document.createElement("a");
    link.download = "book-cover.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

    
     const positionStyles = {
    "top-middle": { display: "flex", justifyContent: "center", alignItems: "flex-start",},
    "center": { display: "flex", justifyContent: "center", alignItems: "center",},
    "center-left": { display: "flex", justifyContent: "flex-start", alignItems: "center",},
    "bottom-right": { display: "flex", justifyContent: "flex-end", alignItems: "end",},
  };

    const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed!");
        setPdfFile(null);
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB!");
        setPdfFile(null);
        return;
      }
      setPdfFile(file);
      setError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBgImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileonChange = (e) => {
    setData((prev) => ({
      ...prev,
      pdf: e.target.files[0],
    }));
  };
  
   const handleSubmit = (e) => {
    e.preventDefault();
    const file = data.pdf;

    if (!file) {
    alert("Please select a PDF file");
    return;
  }
    dispatch(postData({ data, file }));
    console.log("Final Data:", data);
  };

  return (
   <>
   <div className='Book_container'>
      <div><h3>UPLOAD YOUR BOOK HERE</h3></div>
      <div className='metadata'>
        <div className='ip_box'><input placeholder='Title' name='title' value={data.title} onChange={handleChange}/></div>
        <div className='ip_box'><input placeholder='Author' name='author' value={data.author} onChange={handleChange}/></div>
        <div className='ip_box'><input placeholder='Genre' name='genre' value={data.genre} onChange={handleChange}/></div>
      </div>


      <div className='Book_cover'>
        <div className='cov'>
           <div className='book bg_style' ref={coverRef} style={{backgroundColor: bgColor,  backgroundImage: bgImage ? `url(${bgImage})` : "none"}}>
             <div className='' style={{textAlign:"center", fontSize:'20px', height:'80%',...(positionStyles[position] || {})}}>
                <p style={{fontFamily:font, fontWeight:'700', fontSize:'min(2em, 30px)' }}>Title</p></div>
             <div style={{textAlign:"center",display:'flex', justifyContent:'center', alignItems:'center', fontSize:'min(1.2rem, 30px)',height:'20%',backgroundColor: bgColor}}>
                <p>author</p>       
             </div>
           </div>
           <div className='button_cov'>
              <button className='common_button' onClick={handleDownload}>Download Cover</button>
           </div>
        </div>

        <div className='custom'>

            <div className='group'>
              <h5>Select Font</h5>
              <div className='font_checkbox'>
                <div className='g1'>
                  <input type="radio" name="font"value="Cursive" onChange={(e) => setFont(e.target.value)}/>
                  <label>Cursive</label>
                </div>
                <div className='g1'>
                  <input type="radio" name="font" value="Trebuchet MS" onChange={(e) => setFont(e.target.value)}/>
                  <label>Lora</label>
                </div>
                <div className='g1'>
                  <input type="radio" name="font" value="Times New Roman" onChange={(e) => setFont(e.target.value)}/>
                  <label>Normal</label>
                </div>
              </div>
            </div>


            <div className='group'>
              <h5>Select Title Position</h5>
              <div className='pos_checkbox'>
                <div className='g1'>

                  <input type="radio" 
                  name="pos" 
                  value="top-middle"
                  checked={position === "top-middle"}
                  onChange={(e) => setPosition(e.target.value)}/>
                  <label>Top Middle</label>
                </div>

                  <div className='g1'>
                  <input type="radio" 
                  name="pos"
                  value="center"
                  checked={position === "center"}
                  onChange={(e) => setPosition(e.target.value)}
                  />
                  <label>Center</label>
                  </div>

                  <div className='g1'>
                  <input type="radio" 
                  name="pos" 
                  value="center-left"
                  checked={position === "center-left"}
                  onChange={(e) => setPosition(e.target.value)}
                  />
                  <label>Center Left</label>
                  </div>

                    <div className='g1'>
                  <input
                  type="radio"
                  name="pos"
                  value="bottom-right"
                  checked={position === "bottom-right"}
                  onChange={(e) => setPosition(e.target.value)}
                 />
                 <label>Bottom Right</label>
                    </div>

              </div>
            </div>

             <div className='group'>
                <h5 style={{marginBottom:'10px'}}>Price</h5>
                <div className='ip_box'>
                   <input placeholder='Price' name='price' type='number' value={data.price} onChange={handleChange}/>
                </div>
            </div>

            <div className='group'>
                <button className='common_button' onClick={() => setShowPicker(!showPicker)}>Select Solid Color</button>
                {showPicker && (
                  <SketchPicker
                  color={bgColor}
                  onChangeComplete={(color) => setBgColor(color.hex)}
                  />)}

                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange}/>
                <button className='common_button' style={{margin:'10px'}}  onClick={handleButtonClick}>Select BG Img</button>
            </div>

        </div>
      </div>


      <div className='description_box'>
        <div className='ip_box'>
          <textarea placeholder='Description' type='text' name='description' value={data.description} onChange={handleChange}/>
          <button className='common_button' style={{marginTop:'10px'}}>TRY AI CAPTION</button>
        </div>
      </div>
       
      <div className='pdf_import'>
        <div className='pdf_style'>
            <label htmlFor="pdf-upload" className="custom-upload">Upload PDF</label>
            <input placeholder='Price' type='file' accept="application/pdf" onChange={handleFileonChange}/>
        </div>
        <p>{error}</p>
      </div>
      <button className='common_button' onClick={handleSubmit}>SUBMIT</button>

   </div>
    
   </>
  )
}

export default UploadBook

