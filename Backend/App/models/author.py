from pydantic import BaseModel, Field
from typing import Optional

class Author(BaseModel):
    Author : str = Field(..., description="Name of the author")
    email : Optional[str] = Field(..., description="Email of the author")
    password : str = Field(..., description="Password of the author")
    
    