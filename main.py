from fastapi import FastAPI, Depends, HTTPException, status, Request, APIRouter
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List, Optional
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


app = FastAPI()
templates = Jinja2Templates(directory='templates')

# static folder
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.route('/')
def home(request: Request):
    return templates.TemplateResponse('main.html', {'request': request})


@app.route('/test')
def home(request: Request):
    return templates.TemplateResponse('test.html', {'request': request})



















link = 'http://127.0.0.1:8000'


for route in app.routes[4:]:
    print(f'{link}{route.path }')
#run command: uvicorn main:app --reload