from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

class Book(BaseModel):
    title : str = Field(..., description="Title of the book")
    author : str = Field(..., description="Author of the book")
    genre : str = Field(..., description="Genre of the book")   
    pdf : str = Field(..., description="PDF file path of the book")  
    price : float = Field(..., description="Price of the book")
    back_cover : Optional[str] = Field(..., description="Back cover image path of the book")
    description : Optional[str] = Field(..., description="Description of the book")
    published_date : datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
