import React from 'react'
import { useState, useRef, useEffect } from 'react'
import html2canvas from "html2canvas";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";
import axios from 'axios';
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
    const [aiLoading, setAiLoading] = useState(false);
    const fileInputRef = useRef(null);
    // const coverRef = useRef(null);


    const [data, setData] = useState({
        title: '',
        author: '',
        genre: '',
        price: 0,
        description: '',
        pdf: null,
        image: null,
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

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser?.username) {
        setData(prev => ({ ...prev, author: loggedInUser.username }));
    }
}, []);

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
  if (!file || !file.type.startsWith("image/")) return;

  setBgImage(URL.createObjectURL(file));

  const reader = new FileReader();
  reader.onloadend = () => {
    setData(prev => ({ ...prev, image: reader.result }));
  };
  reader.readAsDataURL(file);
};



  const handleFileChanges = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setBgImage(URL.createObjectURL(file));

  const reader = new FileReader();
  reader.onloadend = () => {
    setBook(prev => ({ ...prev, image: reader.result }));
  };
  reader.readAsDataURL(file);
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
  
   const handleSubmit = async (e) => {
  e.preventDefault();

   if (!data.title.trim()) {
    alert("Title is required");
    return;
  }
   if (!data.author.trim()) {
    alert("Author is required");
    return;
  }
  if (!data.genre.trim()) {
    alert("Genre is required");
    return;
  }
  if (!data.price || isNaN(data.price) || data.price <= 0) {
    alert("Price must be greater than 0");
    return;
  }
  if (!data.description.trim() || data.description.length < 10) {
    alert("Description must be at least 10 characters");
    return;
  }
  if (!data.pdf) {
    alert("Please select a PDF file");
    return;
  }
  if (data.pdf.size > 20 * 1024 * 1024) { 
    alert("PDF must be less than 20MB");
    return;
  }
  if (data.pdf.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }

  try {
    
    if (coverRef.current) {
      const canvas = await html2canvas(coverRef.current);
      const imageData = canvas.toDataURL("image/png");

      setData((prev) => ({
        ...prev,
        image: imageData
      }));
      
      const finalData = {
    ...data,
    back_cover: imageData,
    published_date: new Date().toISOString()
  };

      dispatch(postData({ data: finalData, file: data.pdf }));
      console.log("Final Data:", { ...data, image: imageData });
      
    } else {
      dispatch(postData({ data, file: data.pdf }));
      console.log("Final Data (without image):", data);
    }
    setData({
      title: "",
      author: "",
      genre: "",
      price: 0,
      description: "",
      pdf: null,
      image: null,
      date: new Date(),
    });

    setBgImage(null);
    setBgColor("#d3d3d3");
    setFont("Arial");
    setPosition("");

    alert("Book Successfully Uploaded")
  } catch (err) {
    console.error("Error capturing cover:", err);
  }
};


  const handleGenerateDescription = async () => {
  if (!data.title || !data.genre) {
    alert("Please enter Title and Genre first");
    return;
  }
  try {
    setAiLoading(true);
    const res = await axios.post(
      "https://author-book-u7or.onrender.com/ai/generate-description",
      { title: data.title, genre: data.genre }
    );
    setData(prev => ({ ...prev, description: res.data.description || "" }));
  } catch (e) {
    console.error(e);
    alert("Failed to generate description");
  } finally {
    setAiLoading(false);
  }
};

  return (
   <>
   <div className='Book_container'>
      <div><h3>UPLOAD YOUR BOOK HERE</h3></div>
      <div className='metadata'>
        <div className='ip_box'><input placeholder='Title' name='title' value={data.title} onChange={handleChange}/></div>
        <div className='ip_box'><input placeholder='Author' name='author' value={data.author} onChange={handleChange} disabled/></div>
        <div className='ip_box'><input placeholder='Genre' name='genre' value={data.genre} onChange={handleChange}/></div>
      </div>


      <div className='Book_cover'>
        <div className='cov'>
           <div className='book bg_style' ref={coverRef} style={{backgroundColor: bgColor,  backgroundImage: bgImage ? `url(${bgImage})` : "none"}}>
             <div className='' style={{textAlign:"center", fontSize:'20px', height:'80%',...(positionStyles[position] || {})}}>
                <p style={{fontFamily:font, fontWeight:'700', fontSize:'min(2em, 30px)' }}>Title</p></div>
             <div style={{textAlign:"center",display:'flex', justifyContent:'center', alignItems:'center', fontSize:'min(1.2rem, 30px)',height:'20%',backgroundColor: bgColor}}>
                <p>{data.author}</p>       
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
          <button className='common_button' style={{marginTop:'10px'}} onClick={handleGenerateDescription}>TRY AI CAPTION</button>
        </div>
      </div>
       
      <div className='pdf_import'>
        <div className='pdf_style'>
            <label htmlFor="pdf-upload" className="custom-upload">Upload PDF</label>
            <input placeholder='Price' type='file' accept="application/pdf" onChange={handleFileonChange}/>
        </div>
        <p>{error}</p>
      </div>
      <div style={{width:'100%', height:'fit-content',marginTop:'13px', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <button className='common_button' onClick={handleSubmit}>SUBMIT</button>
      </div>

   </div>
    
   </>
  )
}

export default UploadBook

